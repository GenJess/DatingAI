import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, Heart, MessageCircle, ThumbsUp, Calendar } from 'lucide-react';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0)); // January 2024
  
  // Mock activity data for calendar heatmap
  const activityData = {
    '2024-01-15': { matches: 2, messages: 5, likes: 1, total: 8 },
    '2024-01-16': { matches: 0, messages: 3, likes: 2, total: 5 },
    '2024-01-18': { matches: 1, messages: 7, likes: 0, total: 8 },
    '2024-01-20': { matches: 1, messages: 2, likes: 1, total: 4 },
    '2024-01-22': { matches: 0, messages: 8, likes: 2, total: 10 },
    '2024-01-23': { matches: 2, messages: 4, likes: 0, total: 6 },
    '2024-01-25': { matches: 1, messages: 6, likes: 1, total: 8 },
    '2024-01-28': { matches: 3, messages: 9, likes: 2, total: 14 },
    '2024-01-30': { matches: 0, messages: 4, likes: 3, total: 7 },
    '2024-02-02': { matches: 1, messages: 3, likes: 0, total: 4 },
    '2024-02-05': { matches: 2, messages: 6, likes: 1, total: 9 },
    '2024-02-08': { matches: 0, messages: 5, likes: 2, total: 7 },
    '2024-02-12': { matches: 1, messages: 8, likes: 1, total: 10 },
    '2024-02-14': { matches: 3, messages: 12, likes: 3, total: 18 }, // Valentine's Day spike
    '2024-02-16': { matches: 1, messages: 4, likes: 0, total: 5 },
    '2024-02-20': { matches: 0, messages: 6, likes: 2, total: 8 },
    '2024-02-25': { matches: 2, messages: 5, likes: 1, total: 8 },
  };

  const getIntensity = (total) => {
    if (total === 0) return 'bg-gray-100';
    if (total <= 3) return 'bg-purple-200';
    if (total <= 7) return 'bg-purple-400';
    if (total <= 12) return 'bg-purple-600';
    return 'bg-purple-800';
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Create calendar grid
  const calendarDays = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayActivity = activityData[dateKey] || { matches: 0, messages: 0, likes: 0, total: 0 };
    calendarDays.push({ day, dateKey, activity: dayActivity });
  }

  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 pb-20 md:pb-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-600" />
            Activity Calendar
          </CardTitle>
          <CardDescription>
            Heatmap view of your dating activity over time
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{monthName}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Legend */}
          <div className="flex items-center gap-4 mb-6 text-sm">
            <span className="text-gray-600">Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
              <div className="w-3 h-3 bg-purple-200 rounded-sm"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-sm"></div>
              <div className="w-3 h-3 bg-purple-600 rounded-sm"></div>
              <div className="w-3 h-3 bg-purple-800 rounded-sm"></div>
            </div>
            <span className="text-gray-600">More</span>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(name => (
              <div key={name} className="text-center text-xs font-medium text-gray-500 p-2">
                {name}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((dayData, index) => (
              <div
                key={index}
                className={`aspect-square p-1 rounded-sm cursor-pointer transition-all hover:ring-2 hover:ring-purple-300 ${
                  dayData ? getIntensity(dayData.activity.total) : ''
                }`}
                onClick={() => dayData && setSelectedDay(dayData)}
              >
                {dayData && (
                  <div className="w-full h-full flex items-center justify-center text-xs font-medium text-gray-700">
                    {dayData.day}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Day Details */}
      {selectedDay && (
        <Card>
          <CardHeader>
            <CardTitle>
              Activity Details - {new Date(selectedDay.dateKey).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50">
                <Heart className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold text-red-700">{selectedDay.activity.matches}</p>
                  <p className="text-sm text-red-600">Matches</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50">
                <MessageCircle className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-blue-700">{selectedDay.activity.messages}</p>
                  <p className="text-sm text-blue-600">Messages</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50">
                <ThumbsUp className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-green-700">{selectedDay.activity.likes}</p>
                  <p className="text-sm text-green-600">Likes</p>
                </div>
              </div>
            </div>

            {selectedDay.activity.total > 0 && (
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-700">
                  <strong>Total Activity:</strong> {selectedDay.activity.total} interactions
                </p>
                {selectedDay.dateKey === '2024-02-14' && (
                  <Badge variant="secondary" className="mt-2 bg-pink-100 text-pink-700">
                    💕 Valentine's Day spike!
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Activity Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Patterns</CardTitle>
          <CardDescription>Insights from your activity calendar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Most Active Day</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                February 14th (18 activities)
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">Average Weekly Activity</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                12 interactions
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium">Most Active Weekday</span>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Sunday evenings
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;