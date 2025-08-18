import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import AIChat from "./components/AIChat";
import CalendarView from "./components/CalendarView";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <BrowserRouter>
        <div className="md:flex">
          <Navigation />
          <main className="flex-1 md:ml-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<AIChat />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;