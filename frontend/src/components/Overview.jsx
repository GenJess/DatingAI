import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sparkles, TrendingUp, Clock, Users, Activity, Heart, MessageCircle, ThumbsUp, Calendar, Target, Zap } from 'lucide-react';
import { mockAnalyticsData, mockRecentActivity } from '../mock';

const MetricCard = ({ title, value, description, icon: Icon, trend, color = "brunch-lavender" }) => (
  <Card className="brunch-card hover:shadow-lg transition-all duration-300 border-0">
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
        <div className={`p-3 rounded-full bg-gradient-to-br from-purple-100 to-pink-100`}>
          <Icon className="w-6 h-6" style={{ color: `hsl(var(--${color}))` }} />
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
      case 'block': return Users;
      default: return Activity;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'match': return 'text-rose-500 bg-rose-50';
      case 'message': return 'text-blue-500 bg-blue-50';
      case 'like': return 'text-emerald-500 bg-emerald-50';
      case 'block': return 'text-gray-500 bg-gray-50';
      default: return 'text-purple-500 bg-purple-50';
    }
  };

  const Icon = getIcon(activity.type);
  const colorClass = getColor(activity.type);

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
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

const InsightCard = ({ title, value, insight, icon: Icon, color }) => (
  <Card className="brunch-card">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-full bg-${color}-100`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{insight}</p>
      </div>
    </CardContent>
  </Card>
);

const Overview = () => {
  const [selectedTab, setSelectedTab] = useState("metrics");
  
  return (
    <div className="sunday-vibes min-h-screen">
      <div className="max-w-6xl mx-auto p-4 space-y-6 pb-20 md:pb-4">
        
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold brunch-gradient bg-clip-text text-transparent">
            Your Dating Journey
          </h1>
          <p className="text-gray-600 mt-2">High-level insights from your Hinge activity</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Matches"
            value={mockAnalyticsData.overview.totalMatches}
            icon={Heart}
            trend="+12%"
            color="rose-500"
          />
          <MetricCard
            title="Messages Sent"
            value={mockAnalyticsData.overview.totalMessages}
            icon={MessageCircle}
            trend="+8%"
            color="blue-500"
          />
          <MetricCard
            title="Likes Received"
            value={mockAnalyticsData.overview.totalLikes}
            icon={ThumbsUp}
            trend="+23%"
            color="emerald-500"
          />
          <MetricCard
            title="Avg Response Time"
            value={mockAnalyticsData.overview.averageResponseTime}
            icon={Clock}
            description="Faster than 65% of users"
            color="purple-500"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 brunch-card">
            <TabsTrigger value="metrics" className="data-[state=active]:brunch-gradient data-[state=active]:text-white">Key Metrics</TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:brunch-gradient data-[state=active]:text-white">Smart Insights</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:brunch-gradient data-[state=active]:text-white">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Success Rate */}
              <InsightCard
                title="Match Success Rate"
                value="68%"
                insight="Above average for your age group"
                icon={Target}
                color="emerald"
              />

              {/* Peak Activity */}
              <InsightCard
                title="Peak Activity Day"
                value="Sunday"
                insight="Your matches are 40% more active"
                icon={Calendar}
                color="blue"
              />

              {/* Response Quality */}
              <InsightCard
                title="Response Quality"
                value="Excellent"
                insight="Your messages get 25% more replies"
                icon={Zap}
                color="purple"
              />
            </div>

            {/* Activity Heatmap Preview */}
            <Card className="brunch-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Activity Patterns
                </CardTitle>
                <CardDescription>Your peak activity times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Activity by Hour</p>
                    <div className="grid grid-cols-7 gap-2">
                      {mockAnalyticsData.activityByHour.map((hour, index) => (
                        <div key={index} className="text-center">
                          <div 
                            className="w-full bg-gradient-to-t from-purple-200 to-purple-400 rounded-lg mb-1 transition-all hover:scale-105"
                            style={{ height: `${Math.max(hour.activity * 3, 12)}px` }}
                          />
                          <span className="text-xs text-gray-500">{hour.hour}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Conversation Insights */}
              <Card className="brunch-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Conversation Insights
                  </CardTitle>
                  <CardDescription>What works best for you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <h4 className="font-semibold text-emerald-900 mb-2">🎯 Best Openers</h4>
                    <p className="text-sm text-emerald-700">
                      Questions about weekends get 65% response rate
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-900 mb-2">⏰ Optimal Timing</h4>
                    <p className="text-sm text-blue-700">
                      Sunday 6-9 PM shows highest engagement
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <h4 className="font-semibold text-purple-900 mb-2">💬 Message Style</h4>
                    <p className="text-sm text-purple-700">
                      Your positive tone leads to longer conversations
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Performance */}
              <Card className="brunch-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Profile Performance
                  </CardTitle>
                  <CardDescription>How your profile is performing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Photo Likes</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-4/5"/>
                        </div>
                        <span className="text-sm font-medium">80%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Prompt Engagement</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full w-3/5"/>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Appeal</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-rose-400 to-pink-400 rounded-full w-4/5"/>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="brunch-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockRecentActivity.slice(0, 8).map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
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

export default Overview;