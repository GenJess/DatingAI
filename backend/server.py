from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import google.generativeai as genai


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Configure Gemini
genai.configure(api_key=os.environ['GEMINI_API_KEY'])
model = genai.GenerativeModel('gemini-1.5-flash')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(chat_message: ChatMessage):
    try:
        # Enhanced system prompt with dating context
        system_prompt = """You are an expert dating coach and analytics assistant. You have access to the user's Hinge dating data and can provide personalized insights on:
        
        - Optimal timing for likes and messages
        - Message analysis and conversation strategies  
        - Profile optimization tips
        - Sentiment analysis of conversations
        - Success rate patterns and improvements
        - Dating psychology and behavioral insights
        
        Be friendly, encouraging, and data-driven in your responses. Use emojis and formatting to make your advice engaging and actionable. Always provide specific, personalized recommendations based on typical dating data patterns."""
        
        # Combine system prompt with user message
        full_prompt = f"{system_prompt}\n\nUser question: {chat_message.message}"
        
        # Generate response using Gemini
        response = model.generate_content(full_prompt)
        
        # Create session ID if not provided
        session_id = chat_message.session_id or str(uuid.uuid4())
        
        # Store chat in database (optional)
        chat_record = {
            "session_id": session_id,
            "user_message": chat_message.message,
            "ai_response": response.text,
            "timestamp": datetime.utcnow()
        }
        await db.chat_history.insert_one(chat_record)
        
        return ChatResponse(
            response=response.text,
            session_id=session_id
        )
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Error generating AI response")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
