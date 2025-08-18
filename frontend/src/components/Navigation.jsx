import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Sparkles, Calendar, User, TrendingUp } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: TrendingUp, label: 'Overview', key: 'overview' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', key: 'analytics' },
    { path: '/chat', icon: Sparkles, label: 'AI Coach', key: 'chat' },
    { path: '/calendar', icon: Calendar, label: 'Calendar', key: 'calendar' },
    { path: '/profile', icon: User, label: 'Profile', key: 'profile' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 md:relative md:border-t-0 md:border-r md:w-64 md:h-screen md:flex-col sunday-vibes">
      <div className="flex md:flex-col h-16 md:h-full">
        {/* Logo - Desktop only */}
        <div className="hidden md:flex items-center justify-center py-6 border-b border-gray-100">
          <h1 className="text-xl font-bold brunch-gradient bg-clip-text text-transparent">
            Dating Analytics
          </h1>
        </div>
        
        {/* Navigation Items */}
        <div className="flex md:flex-col flex-1 md:py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.key}
                to={item.path}
                className={`flex flex-col md:flex-row items-center justify-center md:justify-start flex-1 md:flex-none px-3 py-2 md:py-3 md:px-6 text-xs md:text-sm font-medium transition-all duration-300 hover:bg-purple-50 group ${
                  active 
                    ? 'text-purple-600 bg-purple-50 border-t-2 md:border-t-0 md:border-r-2 border-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Icon className={`w-5 h-5 md:w-4 md:h-4 mb-1 md:mb-0 md:mr-3 transition-all duration-300 ${
                  active ? 'text-purple-600 scale-110' : 'group-hover:scale-105'
                }`} />
                <span className="md:block">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;