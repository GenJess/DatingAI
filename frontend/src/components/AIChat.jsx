import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, Sparkles, User } from 'lucide-react';
import axios from 'axios';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hey there! 🌟 I'm your personal dating coach powered by Gemini. I've analyzed your Hinge data and I'm here to help you level up your dating game! Ask me about timing strategies, message optimization, or anything else - I've got insights ready to share!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const [selectedQuickQuestion, setSelectedQuickQuestion] = useState(0);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API = `${BACKEND_URL}/api`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        message: currentInput,
        session_id: sessionId
      });

      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: response.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      
      // Store session ID for continuity
      if (!sessionId) {
        setSessionId(response.data.session_id);
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment! 😅",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What's my optimal like timing?",
    "Analyze my conversation style",
    "How's my profile performing?",
    "Give me success rate insights",
    "What are my best openers?",
    "Show me engagement patterns",
    "How can I improve matches?",
    "What's my dating personality?"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  return (
    <div className="sunday-vibes min-h-screen">
      <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
        
        {/* Header */}
        <Card className="brunch-card mb-4 border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-full brunch-gradient">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              AI Dating Coach
            </CardTitle>
            <CardDescription>
              Powered by Gemini • Personalized insights from your data
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Chat Messages */}
        <Card className="brunch-card flex-1 flex flex-col mb-4 border-0">
          <CardContent className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <div className="w-10 h-10 rounded-full brunch-gradient flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-2xl ${
                    message.type === 'user' 
                      ? 'brunch-gradient text-white rounded-br-md shadow-lg' 
                      : 'bg-white text-gray-900 rounded-bl-md shadow-lg border border-gray-100'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                    <div className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {message.type === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-10 h-10 rounded-full brunch-gradient flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-lg border border-gray-100">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Quick Questions - Horizontal Scroll */}
        <div className="mb-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-white text-gray-700 border border-gray-200 hover:border-purple-200 hover:shadow-md`}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your dating patterns..."
            className="flex-1 rounded-full border-gray-200 focus:border-purple-300 focus:ring-purple-200"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="brunch-button text-white rounded-full px-6 shadow-lg"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;