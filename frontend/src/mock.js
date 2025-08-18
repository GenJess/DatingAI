// Mock data based on the Hinge activity structure provided
export const mockAnalyticsData = {
  overview: {
    totalMatches: 15,
    totalMessages: 47,
    totalLikes: 8,
    totalBlocks: 7,
    averageResponseTime: "2.5 hours",
    longestConversation: "13 messages",
    peakActivity: "Sunday evenings"
  },
  
  monthlyStats: [
    { month: "Jan 2024", matches: 3, messages: 12, likes: 2 },
    { month: "Feb 2024", matches: 2, messages: 8, likes: 1 },
    { month: "Mar 2024", matches: 4, messages: 15, likes: 3 },
    { month: "Apr 2024", matches: 6, messages: 12, likes: 2 }
  ],

  activityByHour: [
    { hour: "6AM", activity: 2 },
    { hour: "9AM", activity: 5 },
    { hour: "12PM", activity: 8 },
    { hour: "3PM", activity: 12 },
    { hour: "6PM", activity: 18 },
    { hour: "9PM", activity: 25 },
    { hour: "12AM", activity: 8 }
  ],

  conversations: [
    {
      id: 1,
      matchDate: "2024-01-15",
      messageCount: 13,
      lastMessage: "How was your weekend?",
      status: "active",
      duration: "3 weeks"
    },
    {
      id: 2,
      matchDate: "2024-01-20",
      messageCount: 5,
      lastMessage: "That's awesome, congrats!",
      status: "ended",
      duration: "4 days"
    },
    {
      id: 3,
      matchDate: "2024-02-03",
      messageCount: 8,
      lastMessage: "I love hiking on weekends!",
      status: "active",
      duration: "2 weeks"
    }
  ],

  responsePatterns: {
    avgResponseTime: [
      { timeRange: "0-1 hour", percentage: 35 },
      { timeRange: "1-6 hours", percentage: 40 },
      { timeRange: "6-24 hours", percentage: 20 },
      { timeRange: "1+ days", percentage: 5 }
    ]
  },

  topMessages: [
    { message: "Good morning 🌞", count: 4 },
    { message: "How was your weekend?", count: 3 },
    { message: "I'm in meetings all day 😅", count: 6 },
    { message: "Cool, I'll text you when I'm free.", count: 3 }
  ]
};

export const mockRecentActivity = [
  {
    type: "match",
    description: "New match",
    timestamp: "2024-01-28T18:30:00Z",
    icon: "heart"
  },
  {
    type: "message",
    description: "Sent message to Sarah",
    timestamp: "2024-01-28T15:45:00Z",
    icon: "message-circle"
  },
  {
    type: "like",
    description: "Received like with comment",
    timestamp: "2024-01-27T20:15:00Z",
    icon: "thumbs-up"
  },
  {
    type: "block",
    description: "Conversation ended",
    timestamp: "2024-01-26T12:00:00Z",
    icon: "x-circle"
  }
];