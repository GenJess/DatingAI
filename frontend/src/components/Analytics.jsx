import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BarChart3, MessageCircle, Heart, ThumbsUp, Users, TrendingUp, Clock, Target, Zap, Calendar } from 'lucide-react';
import { mockAnalyticsData } from '../mock';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  
  // Enhanced mock message history data
  const messageHistory = [
    {
      id: 1,
      matchDate: '2024-01-15',
      matchName: 'Sarah',
      messages: [
        { sender: 'user', text: 'Hey! Love your travel photos', timestamp: '2024-01-15 19:30' },
        { sender: 'match', text: 'Thank you! That was from my trip to Bali', timestamp: '2024-01-15 19:45' },
        { sender: 'user', text: 'Amazing! What was your favorite part?', timestamp: '2024-01-15 20:15' },
        { sender: 'match', text: 'Definitely the rice terraces in Ubud. So peaceful!', timestamp: '2024-01-15 20:30' },
      ],
      status: 'ongoing',
      totalMessages: 12,
      lastActivity: '2024-01-28'
    },
    {
      id: 2,
      matchDate: '2024-01-20',
      matchName: 'Alex',
      messages: [
        { sender: 'match', text: 'Coffee enthusiast too I see! ☕', timestamp: '2024-01-20 10:15' },
        { sender: 'user', text: 'Guilty as charged! What\'s your go-to order?', timestamp: '2024-01-20 10:45' },
        { sender: 'match', text: 'Oat milk cortado, you?', timestamp: '2024-01-20 11:00' },
        { sender: 'user', text: 'We have similar taste! Love a good cortado', timestamp: '2024-01-20 11:30' },
      ],
      status: 'ended',
      totalMessages: 8,
      lastActivity: '2024-01-25'
    },
    {
      id: 3,
      matchDate: '2024-02-03',
      matchName: 'Jordan',
      messages: [
        { sender: 'user', text: 'That hiking photo is incredible! Where was it taken?', timestamp: '2024-02-03 16:20' },
        { sender: 'match', text: 'Thanks! That\'s from Angel\'s Landing in Zion', timestamp: '2024-02-03 17:15' },
        { sender: 'user', text: 'No way! I\'ve been wanting to do that hike', timestamp: '2024-02-03 17:45' },
        { sender: 'match', text: 'It\'s challenging but so worth it! The views are unreal', timestamp: '2024-02-03 18:00' },
      ],
      status: 'ongoing',
      totalMessages: 15,
      lastActivity: '2024-02-10'
    }
  ];

  const MessageBubble = ({ message, isUser }) => (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-xs p-3 rounded-2xl ${
        isUser 
          ? 'brunch-gradient text-white rounded-br-md' 
          : 'bg-gray-100 text-gray-900 rounded-bl-md'
      }`}>
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-purple-100' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );

  return (
    <div className="sunday-vibes min-h-screen">
      <div className="max-w-6xl mx-auto p-4 space-y-6 pb-20 md:pb-4">
        
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold brunch-gradient bg-clip-text text-transparent">
            Deep Analytics
          </h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into your dating patterns</p>
        </div>

        {/* Period Selector */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
            {['1month', '3months', '6months', 'all'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className={`rounded-full ${selectedPeriod === period ? 'brunch-gradient text-white' : ''}`}
              >
                {period === '1month' ? '1M' : period === '3months' ? '3M' : period === '6months' ? '6M' : 'All'}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-4 brunch-card">
            <TabsTrigger value="performance" className="data-[state=active]:brunch-gradient data-[state=active]:text-white">Performance</TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:brunch-gradient data-[state=active]:text-white">Messages</TabsTrigger>
            <TabsTrigger value="patterns" className="data-[state=active]:brunch-gradient data-[state=active]:text-white">Patterns</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:brunch-gradient data-[state=active]:text-white">History</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Match Rate */}
              <Card className="brunch-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500" />
                    Match Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">68%</div>
                  <p className="text-sm text-gray-600 mb-4">Above average for your demographic</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>This month</span>
                      <span className="font-medium">+12%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-rose-400 to-pink-400 h-2 rounded-full" style={{width: '68%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Rate */}
              <Card className="brunch-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    Response Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">84%</div>
                  <p className="text-sm text-gray-600 mb-4">Excellent conversation starter</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Avg response time</span>
                      <span className="font-medium">2.5 hours</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full" style={{width: '84%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Score */}
              <Card className="brunch-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Engagement Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">92</div>
                  <p className="text-sm text-gray-600 mb-4">Top 10% of users</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Improvement</span>
                      <span className="font-medium text-green-600">+15 pts</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Metrics */}
            <Card className="brunch-card">
              <CardHeader>
                <CardTitle>Performance Breakdown</CardTitle>
                <CardDescription>Detailed analysis of your dating metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Likes & Matches</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Likes sent</span>
                        <span className="font-medium">127</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Likes received</span>
                        <span className="font-medium">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Matches created</span>
                        <span className="font-medium">15</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Conversations</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Messages sent</span>
                        <span className="font-medium">47</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Avg messages per conversation</span>
                        <span className="font-medium">8.2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Conversations > 10 messages</span>
                        <span className="font-medium">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Message Success Rate */}
              <Card className="brunch-card">
                <CardHeader>
                  <CardTitle>Message Success Analysis</CardTitle>
                  <CardDescription>What works best in your conversations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <h4 className="font-semibold text-emerald-900 mb-2">🎯 Top Performing Openers</h4>
                    <div className="space-y-2 text-sm text-emerald-700">
                      <div className="flex justify-between">
                        <span>"Good morning 🌞"</span>
                        <span className="font-medium">78% response</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Travel questions</span>
                        <span className="font-medium">65% response</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Food/coffee topics</span>
                        <span className="font-medium">71% response</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-900 mb-2">📊 Message Metrics</h4>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div className="flex justify-between">
                        <span>Avg message length</span>
                        <span className="font-medium">12 words</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Emoji usage</span>
                        <span className="font-medium">40% of messages</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Question usage</span>
                        <span className="font-medium">55% of messages</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Messages */}
              <Card className="brunch-card">
                <CardHeader>
                  <CardTitle>Most Used Messages</CardTitle>
                  <CardDescription>Your go-to conversation starters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalyticsData.topMessages.map((msg, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                        <span className="text-sm font-medium">"{msg.message}"</span>
                        <Badge variant="outline" className="font-medium">{msg.count}x</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Time Patterns */}
              <Card className="brunch-card">
                <CardHeader>
                  <CardTitle>Activity Patterns</CardTitle>
                  <CardDescription>When you're most successful</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Best Days for Activity</h4>
                      <div className="space-y-2">
                        {['Sunday', 'Tuesday', 'Wednesday', 'Thursday'].map((day, index) => (
                          <div key={day} className="flex items-center justify-between">
                            <span className="text-sm">{day}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full">
                                <div 
                                  className="h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                                  style={{ width: `${[85, 70, 75, 68][index]}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{[85, 70, 75, 68][index]}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Peak Hours</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {['6PM', '7PM', '8PM', '9PM'].map((hour) => (
                          <div key={hour} className="text-center p-2 bg-purple-50 rounded-lg">
                            <div className="text-sm font-medium text-purple-700">{hour}</div>
                            <div className="text-xs text-purple-600">Peak</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Patterns */}
              <Card className="brunch-card">
                <CardHeader>
                  <CardTitle>Response Patterns</CardTitle>
                  <CardDescription>How quickly you typically respond</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalyticsData.responsePatterns.avgResponseTime.map((pattern, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{pattern.timeRange}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                              style={{ width: `${pattern.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">{pattern.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="brunch-card">
              <CardHeader>
                <CardTitle>Message History</CardTitle>
                <CardDescription>Your recent conversations in detail</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {messageHistory.map((conversation) => (
                    <div key={conversation.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{conversation.matchName}</h4>
                          <p className="text-sm text-gray-600">
                            Matched {new Date(conversation.matchDate).toLocaleDateString()} • {conversation.totalMessages} messages
                          </p>
                        </div>
                        <Badge variant={conversation.status === 'ongoing' ? 'default' : 'secondary'}>
                          {conversation.status}
                        </Badge>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                        {conversation.messages.map((message, index) => (
                          <MessageBubble 
                            key={index} 
                            message={message} 
                            isUser={message.sender === 'user'} 
                          />
                        ))}
                        {conversation.totalMessages > conversation.messages.length && (
                          <div className="text-center py-2">
                            <span className="text-xs text-gray-500">
                              ... {conversation.totalMessages - conversation.messages.length} more messages
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;