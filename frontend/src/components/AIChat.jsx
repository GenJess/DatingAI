import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, Sparkles, User } from 'lucide-react';

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
  const messagesEndRef = useRef(null);
  const [selectedQuickQuestion, setSelectedQuickQuestion] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI responses with more personality
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('timing') || message.includes('when') || message.includes('best time')) {
      return "✨ **Your Golden Hours** ✨\n\nI've analyzed your patterns and here's the magic formula:\n\n📅 **Best days for likes**: Tuesday-Thursday\n• 32% higher match rates on these days\n• People are more active midweek\n\n⏰ **Prime time**: 6-9 PM\n• You get 40% more responses during these hours\n• Sunday evenings are absolute gold for you!\n\n🎯 **Pro insight**: Your matches tend to be night owls - they're most responsive after 7 PM. Use this to your advantage!\n\n💡 **Bonus tip**: Avoid Monday mornings and Friday nights - engagement drops by 60% during these times.";
    }
    
    if (message.includes('message') || message.includes('conversation') || message.includes('chat')) {
      return "💬 **Your Messaging Superpower** 💬\n\nYour conversation style is working! Here's what I discovered:\n\n🏆 **Your best openers**:\n• 'Good morning 🌞' - crushing it with 78% response rate!\n• Weekend questions - 65% success rate\n• Emoji usage is *chef's kiss* - keep it up!\n\n📊 **Conversation flow**:\n• Average message length: 12 words (perfect!)\n• You use emojis in 40% of messages (ideal balance)\n• Your conversations average 8 messages\n\n🚀 **Level up strategy**:\n• Your 10+ message conversations happen when you ask about hobbies\n• People love your positive energy - it shows!\n• Try asking follow-up questions - it extends conversations by 50%";
    }
    
    if (message.includes('sentiment') || message.includes('mood') || message.includes('feeling')) {
      return "😊 **Your Vibe Check** 😊\n\nYour emotional intelligence is showing! Here's your sentiment breakdown:\n\n📈 **Positivity score**: 72% (amazing!)\n😊 **Positive**: 72% of your messages\n😐 **Neutral**: 23%\n😔 **Negative**: Only 5% (excellent emotional regulation!)\n\n✨ **Mood insights**:\n• Weekend you = most positive (87% positive sentiment)\n• Your favorite emojis (🌞, ☕, 😅) are conversation gold\n• Evening conversations show your best personality\n\n💎 **Secret sauce**: Your authenticity shines through. Keep being genuine - it's your superpower!";
    }
    
    if (message.includes('profile') || message.includes('prompt') || message.includes('photo')) {
      return "📸 **Profile Power Analysis** 📸\n\nYour profile is doing the heavy lifting! Here's the breakdown:\n\n🎭 **Engagement magnet prompts**:\n• Travel photos: +40% likes with comments\n• Hobby content: generates the best conversation starters\n• Your humor game is strong - people are commenting more!\n\n📊 **Performance metrics**:\n• Photo engagement: 80% (top tier!)\n• Prompt interaction: 60% (solid)\n• Overall profile appeal: 85% (you're killing it!)\n\n🚀 **Optimization tips**:\n• Add more hiking content (comes up in 3+ conversations)\n• Your weekend activity prompts are conversation goldmines\n• Consider adding a cooking photo - it's trending in your matches!";
    }
    
    // Default response with more personality
    return "Hey! 🎯 I'm here to help you dominate the dating game! I can dive deep into:\n\n🕐 **Timing mastery** - when to like, message, and engage\n💬 **Message magic** - what's working and what could be better\n😊 **Vibe analysis** - your emotional patterns and impact\n🎯 **Success metrics** - what's driving your best connections\n📸 **Profile optimization** - making your profile irresistible\n\nWhat would you like to explore first? I've got tons of insights waiting to be unleashed! ✨";
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
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedQuestionIndex === index
                    ? 'brunch-gradient text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-200 hover:shadow-md'
                }`}
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