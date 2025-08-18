import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart, MessageCircle, ThumbsUp, XCircle, TrendingUp, Clock, Users, Activity } from 'lucide-react';
import { mockAnalyticsData, mockRecentActivity } from '../mock';

const MetricCard = ({ title, value, description, icon: Icon, trend }) => (
  <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && (
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                {trend}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className="p-3 rounded-full bg-gradient-to-br from-purple-100 to-pink-100">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const ActivityItem = ({ activity }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'match': return Heart;
      case 'message': return MessageCircle;
      case 'like': return ThumbsUp;
      case 'block': return XCircle;
      default: return Activity;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'match': return 'text-red-500 bg-red-50';
      case 'message': return 'text-blue-500 bg-blue-50';
      case 'like': return 'text-green-500 bg-green-50';
      case 'block': return 'text-gray-500 bg-gray-50';
      default: return 'text-purple-500 bg-purple-50';
    }
  };

  const Icon = getIcon(activity.type);
  const colorClass = getColor(activity.type);

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className={`p-2 rounded-full ${colorClass}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
        <p className="text-xs text-gray-500">
          {new Date(activity.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Dating Analytics
          </h1>
          <p className="text-gray-600 mt-2">Insights from your Hinge activity</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Matches"
            value={mockAnalyticsData.overview.totalMatches}
            icon={Heart}
            trend="+12%"
          />
          <MetricCard
            title="Messages Sent"
            value={mockAnalyticsData.overview.totalMessages}
            icon={MessageCircle}
            trend="+8%"
          />
          <MetricCard
            title="Likes Received"
            value={mockAnalyticsData.overview.totalLikes}
            icon={ThumbsUp}
            trend="+23%"
          />
          <MetricCard
            title="Avg Response Time"
            value={mockAnalyticsData.overview.averageResponseTime}
            icon={Clock}
            description="Faster than 65% of users"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4">
            <TabsTrigger value="overview" data-testid="overview-tab">Overview</TabsTrigger>
            <TabsTrigger value="activity" data-testid="activity-tab">Activity</TabsTrigger>
            <TabsTrigger value="conversations" data-testid="conversations-tab">Chats</TabsTrigger>
            <TabsTrigger value="insights" data-testid="insights-tab">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockRecentActivity.slice(0, 5).map((activity, index) => (
                      <ActivityItem key={index} activity={activity} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Peak Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Activity Patterns
                  </CardTitle>
                  <CardDescription>When you're most active</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Peak Activity</span>
                      <Badge variant="secondary">{mockAnalyticsData.overview.peakActivity}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Longest Conversation</span>
                      <Badge variant="outline">{mockAnalyticsData.overview.longestConversation}</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Activity by Hour</p>
                      <div className="grid grid-cols-7 gap-1">
                        {mockAnalyticsData.activityByHour.map((hour, index) => (
                          <div key={index} className="text-center">
                            <div 
                              className="w-full bg-gradient-to-t from-purple-200 to-purple-400 rounded-sm mb-1"
                              style={{ height: `${Math.max(hour.activity * 2, 8)}px` }}
                            />
                            <span className="text-xs text-gray-500">{hour.hour}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Activity</CardTitle>
                <CardDescription>Your activity over the past few months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalyticsData.monthlyStats.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                      <span className="font-medium">{month.month}</span>
                      <div className="flex gap-4">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {month.matches}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {month.messages}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {month.likes}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Conversations
                </CardTitle>
                <CardDescription>Your chat history and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalyticsData.conversations.map((conv) => (
                    <div key={conv.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Match from {new Date(conv.matchDate).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">{conv.messageCount} messages over {conv.duration}</p>
                        </div>
                        <Badge variant={conv.status === 'active' ? 'default' : 'secondary'}>
                          {conv.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 italic">"{conv.lastMessage}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Response Patterns */}
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Patterns</CardTitle>
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

              {/* Top Messages */}
              <Card>
                <CardHeader>
                  <CardTitle>Most Used Messages</CardTitle>
                  <CardDescription>Your go-to conversation starters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalyticsData.topMessages.map((msg, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="text-sm italic">"{msg.message}"</span>
                        <Badge variant="outline">{msg.count}x</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;