# Dating Analytics App - Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for converting the frontend mock data to real backend functionality using the provided Hinge activity data.

## Data Structure Analysis

### Input Data Format (Hinge Export)
```json
{
  "block": [{"block_type": "remove", "timestamp": "2020-07-18 14:09:00"}],
  "match": [{"timestamp": "2020-07-18 03:59:55.799"}],
  "like": [{"timestamp": "2020-07-17 22:21:59", "like": [{"timestamp": "...", "comment": "..."}]}],
  "chats": [{"body": "Message text", "timestamp": "2020-07-18 13:43:25.874"}]
}
```

## API Endpoints

### 1. Analytics Data
**Endpoint:** `GET /api/analytics`
**Response:**
```json
{
  "overview": {
    "totalMatches": 15,
    "totalMessages": 47,
    "totalLikes": 8,
    "totalBlocks": 7,
    "averageResponseTime": "2.5 hours",
    "longestConversation": "13 messages",
    "peakActivity": "Sunday evenings"
  },
  "monthlyStats": [...],
  "activityByHour": [...],
  "conversations": [...],
  "responsePatterns": {...},
  "topMessages": [...]
}
```

### 2. Calendar/Heatmap Data
**Endpoint:** `GET /api/calendar?year=2024&month=1`
**Response:**
```json
{
  "2024-01-15": {
    "matches": 2,
    "messages": 5,
    "likes": 1,
    "total": 8
  }
}
```

### 3. AI Chat Integration
**Endpoint:** `POST /api/chat`
**Request:**
```json
{
  "message": "When is the best time to send likes?",
  "session_id": "user-session-123"
}
```
**Response:**
```json
{
  "response": "Based on your data, your peak activity times are...",
  "timestamp": "2024-01-28T10:15:00Z"
}
```

### 4. Data Upload
**Endpoint:** `POST /api/upload-data`
**Request:** Multipart form with JSON file
**Response:**
```json
{
  "success": true,
  "processed": {
    "matches": 15,
    "messages": 47,
    "likes": 8,
    "blocks": 7
  }
}
```

## Database Models

### 1. User Data
```python
class UserData(BaseModel):
    id: str
    created_at: datetime
    matches: List[Match]
    messages: List[Message] 
    likes: List[Like]
    blocks: List[Block]
```

### 2. Chat Sessions
```python
class ChatSession(BaseModel):
    id: str
    user_id: str
    messages: List[ChatMessage]
    created_at: datetime
```

## Mock Data Replacement Plan

### Frontend Files to Update:
- `mock.js` - Remove after backend integration
- `Dashboard.jsx` - Replace mock data with API calls
- `AIChat.jsx` - Connect to real LLM backend
- `CalendarView.jsx` - Use real activity data
- `Profile.jsx` - Connect to user data management

### Backend Implementation Steps:
1. **Data Processing Service** - Parse Hinge JSON export
2. **Analytics Engine** - Calculate metrics from raw data
3. **LLM Integration** - Set up Emergent LLM service
4. **Calendar Service** - Generate heatmap data
5. **User Management** - Handle data uploads and storage

## AI Chat Context System

### Data Context for LLM:
```python
user_context = {
    "total_matches": 15,
    "total_messages": 47,
    "peak_hours": ["6PM", "7PM", "8PM", "9PM"],
    "peak_days": ["Tuesday", "Wednesday", "Thursday"],
    "conversation_patterns": {...},
    "sentiment_analysis": {...},
    "success_metrics": {...}
}
```

### LLM System Prompt:
"You are a dating analytics AI assistant. You have access to the user's Hinge activity data including matches, messages, likes, and timing patterns. Provide personalized insights on optimal timing, message strategies, profile optimization, and dating success patterns."

## Integration Priority:
1. **Phase 1:** Basic analytics API (matches, messages, likes)
2. **Phase 2:** Calendar heatmap functionality  
3. **Phase 3:** AI chat with LLM integration
4. **Phase 4:** Data upload and user management
5. **Phase 5:** Advanced analytics and insights

## Frontend-Backend Integration Points:
- Replace `mockAnalyticsData` with `/api/analytics`
- Replace `mockRecentActivity` with `/api/recent-activity`
- Connect AI chat to `/api/chat` endpoint
- Connect calendar to `/api/calendar` endpoint
- Add data upload functionality to Profile page

## Success Metrics:
- All mock data successfully replaced with real backend data
- AI chat provides contextual insights based on user's actual data
- Calendar heatmap accurately reflects user activity patterns
- Real-time analytics updates when new data is uploaded