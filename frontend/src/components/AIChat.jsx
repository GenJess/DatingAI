import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Send, Bot, User, Sparkles, TrendingUp, Clock, MessageCircle } from 'lucide-react';
import { mockAnalyticsData } from '../mock';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your dating analytics AI assistant. I've analyzed your Hinge data and I'm ready to help! I can provide insights on your messaging patterns, optimal timing for likes, sentiment analysis, and much more. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock AI responses based on user data
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('timing') || message.includes('when') || message.includes('best time')) {
      return "Based on your data, your peak activity times are:\n\n📈 **Best days for likes**: Tuesday-Thursday (higher match rates)\n⏰ **Optimal timing**: 6-9 PM (you get 40% more responses)\n📊 Your matches tend to be most active on Sunday evenings, making it perfect for engaging conversations!\n\nYour data shows 25% higher response rates when you send messages between 6-9 PM compared to morning hours.";
    }
    
    if (message.includes('message') || message.includes('conversation') || message.includes('chat')) {
      return "Here's what I found about your messaging patterns:\n\n💬 **Most effective openers**:\n• 'Good morning 🌞' - 78% response rate\n• Questions about weekends - 65% response rate\n\n📝 **Message insights**:\n• Your average message length: 12 words\n• You use emojis in 40% of messages (great for engagement!)\n• Your conversations last average 8 messages\n\n🎯 **Tip**: Your data shows longer conversations (10+ messages) happen when you ask open-ended questions about hobbies or experiences.";
    }
    
    if (message.includes('sentiment') || message.includes('mood') || message.includes('feeling')) {
      return "📊 **Sentiment Analysis of Your Conversations**:\n\n😊 **Positive sentiment**: 72% of your messages\n😐 **Neutral**: 23%\n😔 **Negative**: 5%\n\n✨ **Key findings**:\n• Your most positive conversations happen on weekends\n• Messages with 🌞, ☕, and 😅 emojis get better responses\n• You tend to be more enthusiastic in evening conversations\n\n💡 **Recommendation**: Keep up the positive energy! Your upbeat messaging style correlates with longer conversations.";
    }
    
    if (message.includes('match') || message.includes('success') || message.includes('rate')) {
      return "🎯 **Your Match Success Analysis**:\n\n📈 **Match conversion**: 15 matches from your activity\n💬 **Message rate**: 89% (you message most matches!)\n⏱️ **Response time**: 2.5 hours average (faster than 65% of users)\n\n🏆 **Success patterns**:\n• Matches made on Tuesday-Thursday have 30% higher conversation rates\n• Your longest conversations (3+ weeks) started with hobby-related questions\n• Morning matches tend to lead to more substantial conversations\n\n🚀 **Growth opportunity**: Your data suggests increasing activity on Tuesday mornings could boost match quality.";
    }
    
    if (message.includes('profile') || message.includes('prompt') || message.includes('photo')) {
      return "📸 **Profile Performance Insights**:\n\nBased on your match patterns and conversation starters:\n\n🎭 **Most engaging prompts** (based on comments received):\n• Your travel photos get 40% more likes with comments\n• Hobby-related prompts generate better conversation starters\n\n💡 **Optimization suggestions**:\n• Add more photos from your hiking mentions (comes up in 3 conversations)\n• Consider prompts about weekend activities (your most successful conversation topic)\n\n📊 **Engagement data**: Profiles that comment on your prompts lead to 60% longer conversations.";
    }
    
    // Default response
    return "That's an interesting question! Based on your Hinge data, I can help you with:\n\n🕐 **Timing optimization** - best times to like and message\n💬 **Message analysis** - what works best for you\n😊 **Sentiment insights** - mood patterns in your conversations\n🎯 **Match success rates** - what leads to better connections\n📸 **Profile optimization** - based on your engagement patterns\n\nWhat specific aspect would you like me to analyze for you?";
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: generateAIResponse(input),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "When is the best time to send likes?",
    "Analyze my messaging patterns",
    "What's my conversation success rate?",
    "Give me profile optimization tips"
  ];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4 pb-20 md:pb-4">
      {/* Header */}
      <Card className="mb-4">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-purple-600" />
            AI Dating Coach
          </CardTitle>
          <CardDescription>
            Get personalized insights from your Hinge activity data
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-lg font-bold">{mockAnalyticsData.overview.totalMatches}</p>
              <p className="text-xs text-gray-600">Total Matches</p>
            </div>
            <div className="text-center">
              <MessageCircle className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-bold">{mockAnalyticsData.overview.totalMessages}</p>
              <p className="text-xs text-gray-600">Messages</p>
            </div>
            <div className="text-center">
              <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p className="text-lg font-bold">{mockAnalyticsData.overview.averageResponseTime}</p>
              <p className="text-xs text-gray-600">Avg Response</p>
            </div>
            <div className="text-center">
              <Sparkles className="w-5 h-5 text-orange-600 mx-auto mb-1" />
              <p className="text-lg font-bold">72%</p>
              <p className="text-xs text-gray-600">Positive Sentiment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col mb-4 min-h-96">
        <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-purple-600 text-white rounded-br-sm' 
                  : 'bg-gray-100 text-gray-900 rounded-bl-sm'
              }`}>
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                <div className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      {/* Quick Questions */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors"
              onClick={() => setInput(question)}
            >
              {question}
            </Badge>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me about your dating patterns, optimal timing, message analysis..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          onClick={handleSendMessage}
          disabled={!input.trim() || isLoading}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AIChat;