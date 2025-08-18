import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { User, Settings, Download, Upload, BarChart3, Calendar, MessageSquare } from 'lucide-react';
import { mockAnalyticsData } from '../mock';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'Dating Analytics User',
    email: 'user@example.com',
    dataSource: 'Hinge Export',
    lastSync: '2024-01-28',
    totalDays: '847 days of data'
  });

  const handleDataUpload = () => {
    // This will be implemented in backend integration
    alert('Data upload feature will be available after backend integration!');
  };

  const handleExport = () => {
    // This will be implemented in backend integration
    alert('Export feature will be available after backend integration!');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pb-20 md:pb-4">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6 text-purple-600" />
            Profile & Settings
          </CardTitle>
          <CardDescription>
            Manage your account and data preferences
          </CardDescription>
        </CardHeader>
      </Card>

      {/* User Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={userData.name} 
                onChange={(e) => setUserData({...userData, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={userData.email} 
                onChange={(e) => setUserData({...userData, email: e.target.value})}
              />
            </div>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Data Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Data Overview</CardTitle>
          <CardDescription>Summary of your imported dating data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-700">{mockAnalyticsData.overview.totalMatches}</p>
              <p className="text-sm text-purple-600">Total Matches</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-700">{mockAnalyticsData.overview.totalMessages}</p>
              <p className="text-sm text-blue-600">Messages Sent</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-700">847</p>
              <p className="text-sm text-green-600">Days of Data</p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <User className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-700">72%</p>
              <p className="text-sm text-orange-600">Success Rate</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Data Source</span>
              <Badge variant="secondary">{userData.dataSource}</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Last Sync</span>
              <Badge variant="outline">{userData.lastSync}</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Data Range</span>
              <Badge variant="outline">{userData.totalDays}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Import new data or export your insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-20 border-dashed border-2"
              onClick={handleDataUpload}
            >
              <Upload className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Upload New Data</p>
                <p className="text-xs text-gray-500">Import Hinge JSON export</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-20"
              onClick={handleExport}
            >
              <Download className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Export Insights</p>
                <p className="text-xs text-gray-500">Download your analytics</p>
              </div>
            </Button>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">How to get your Hinge data:</h4>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Go to Hinge Settings → "Download My Data"</li>
              <li>Request your data export (takes 24-48 hours)</li>
              <li>Download the JSON file when ready</li>
              <li>Upload it here for analysis</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy & Security</CardTitle>
          <CardDescription>Your data privacy is our priority</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">🔒 Data Security</h4>
              <p className="text-sm text-green-700">
                Your data is processed locally and never shared with third parties. 
                All analysis happens on your device or our secure servers.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">⚠️ Data Retention</h4>
              <p className="text-sm text-yellow-700">
                Your data is stored securely and can be deleted at any time. 
                Contact support if you want to remove all your data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;