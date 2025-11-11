"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  MdSearch,
  MdVideocam,
  MdCall,
  MdMoreVert,
  MdSend,
  MdArrowBack,
  MdPeople, 
  MdRateReview,
} from "react-icons/md";
import TransporterHeader from "../../../components/TransporterSection/TransporterHeader";
import { useTheme } from "next-themes";

// --- Mock Data and Helper Interfaces ---

type ActiveSection = 'chats' | 'requests' | 'feedback';

interface ChatUser {
  id: number;
  name: string;
  role: 'Driver' | 'Customer';
  status: 'Typing' | 'Online' | 'Offline';
  lastMessageTime: string;
  unreadCount: number;
  lastMessage: string;
}

interface Message {
    id: number;
    sender: 'You' | 'Raghav';
    content: string;
    timestamp: string;
    date: string;
}

// Mock Data for the All Chats list
const MOCK_CHAT_LIST: ChatUser[] = [
  { id: 1, name: "Raghav", role: 'Driver', status: 'Typing', lastMessageTime: '05:48pm', unreadCount: 2, lastMessage: 'yes i am here' },
  { id: 2, name: "Suresh", role: 'Driver', status: 'Online', lastMessageTime: '04:43pm', unreadCount: 0, lastMessage: 'Okay, done.' },
  { id: 3, name: "Ramesh", role: 'Driver', status: 'Offline', lastMessageTime: '04:43pm', unreadCount: 0, lastMessage: 'Checking now.' },
  { id: 4, name: "Anushka", role: 'Customer', status: 'Online', lastMessageTime: '04:43pm', unreadCount: 1, lastMessage: 'Where is my load?' },
  { id: 5, name: "Deepak", role: 'Driver', status: 'Typing', lastMessageTime: '04:43pm', unreadCount: 1, lastMessage: 'Confirmed.' },
  { id: 6, name: "Vivek", role: 'Driver', status: 'Online', lastMessageTime: '04:43pm', unreadCount: 0, lastMessage: 'Got it.' },
];

// Initial Mock Messages for the Chat Panel
const INITIAL_MESSAGES: Message[] = [
    { id: 1, sender: 'You', content: "Hlo What are u doing", timestamp: '04:43pm', date: 'Today' },
];

// --- Helper Components ---

// Chat List Item (Unchanged)
const ChatListItem: React.FC<{ user: ChatUser, isActive: boolean, onClick: () => void }> = ({ user, isActive, onClick }) => {
    const roleClass = user.role === 'Driver' ? 'bg-green-600' : 'bg-violet-600';
    const unreadClass = user.unreadCount > 0 ? 'bg-red-600' : 'bg-gray-600';

    return (
        <div 
            onClick={onClick}
            className={`flex items-center p-3 cursor-pointer transition-colors ${
                isActive ? 'bg-[#3C3D3F]' : 'hover:bg-[#3C3D3F]'
            } border-b border-gray-700`}
        >
            <div className="relative w-12 h-12 mr-3">
                <div className="w-full h-full rounded-full bg-orange-500 flex items-center justify-center text-white text-lg font-bold">
                    {user.name.charAt(0)}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${user.status === 'Online' ? 'bg-green-500' : 'bg-gray-500'} border-2 border-[#1A1F26]`}></div>
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${roleClass} text-white`}>{user.role}</span>
                </div>
                <p className={`text-xs ${user.status === 'Typing' ? 'text-green-400' : 'text-gray-400'} truncate`}>
                    {user.status === 'Typing' ? 'Typing' : user.lastMessage}
                </p>
            </div>

            <div className="flex flex-col items-end text-xs ml-2">
                <span className="text-gray-400">{user.lastMessageTime}</span>
                {user.unreadCount > 0 && (
                    <span className={`w-4 h-4 mt-1 rounded-full flex items-center justify-center text-white ${unreadClass}`}>
                        {user.unreadCount}
                    </span>
                )}
            </div>
        </div>
    );
};

// Chat Bubble (Unchanged)
const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isYou = message.sender === 'You';
    return (
        <div className={`flex ${isYou ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl text-white shadow-md ${
                isYou ? 'bg-violet-600 rounded-br-none' : 'bg-[#3C3D3F] rounded-tl-none'
            }`}>
                <p className="text-sm">{message.content}</p>
                <span className={`text-xs mt-1 block ${isYou ? 'text-violet-200' : 'text-gray-400'} text-right`}>
                    {message.timestamp}
                </span>
            </div>
        </div>
    );
};

// Placeholder Content for other Tabs (Unchanged)
const PlaceholderPanel: React.FC<{ section: ActiveSection }> = ({ section }) => {
    const titleMap = {
        requests: "Customer Load Requests",
        feedback: "Customer Ratings and Feedback",
    };
    const iconMap = {
        requests: MdPeople,
        feedback: MdRateReview,
    };
    
    return (
        <div className="p-10 flex flex-col items-center justify-center h-full text-center bg-[#3C3D3F] rounded-xl border border-gray-700">
            {React.createElement(iconMap[section], { size: 64, className: 'text-violet-500 mb-4' })}
            <h2 className="text-2xl font-bold text-white mb-2">{titleMap[section]}</h2>
            <p className="text-gray-400">
                This area will display detailed {titleMap[section]}.
            </p>
        </div>
    );
};


// --- Main Component ---
export default function CustomerChats() {
  // --- State ---
  const [activeSection, setActiveSection] = useState<ActiveSection>('chats');
  const [activeChat, setActiveChat] = useState<ChatUser>(MOCK_CHAT_LIST[0]);
  const [isMobile, setIsMobile] = useState(false);
  
  const [chatSearchTerm, setChatSearchTerm] = useState(""); // New state for chat list search
  const [newMessage, setNewMessage] = useState(""); // New state for message input
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES); // State for chat messages
  
  

  
  // Tab data (Unchanged)
  const tabs: { label: string; section: ActiveSection }[] = [
    { label: "Customer Requests", section: 'requests' },
    { label: "Customer Chats", section: 'chats' },
    { label: "Customer Feedback", section: 'feedback' },
  ];

  // Logic to Filter Chat List by Search Term
  const filteredChatList = MOCK_CHAT_LIST.filter(user => 
    user.name.toLowerCase().includes(chatSearchTerm.toLowerCase()) || 
    user.lastMessage.toLowerCase().includes(chatSearchTerm.toLowerCase())
  );

  // Function to Handle Sending a Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const currentTime = new Date();
    const newMsg: Message = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage.trim(),
      timestamp: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today', // Simplified date logic
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
    
    // Auto-scroll to bottom functionality (requires use of useRef on message container)
    // For this demonstration, we just update the state.
  };

  // Function to Handle Call/Video Button Clicks
  const handleCall = (type: 'Video' | 'Audio') => {
      alert(`${type} call started with ${activeChat.name}! (Simulated)`);
  };


  
  
  const showChatList = !isMobile || (isMobile && activeSection === 'chats' && !activeChat);
  const showChatPanel = !isMobile || (isMobile && activeSection === 'chats' && activeChat);

  return (
    <div
        
        className={`min-h-screen bg-[#1A1F26] text-gray-100 transition-colors duration-300`}
    >
      <TransporterHeader />
      
      {/* Top Navigation Tabs */}
      <div className="p-6 pb-0 flex gap-4">
        {tabs.map(tab => (
          <button 
            key={tab.label}
            onClick={() => setActiveSection(tab.section)} 
            className={`px-6 py-2 rounded-t-xl font-semibold transition-colors border-b-4 ${
              activeSection === tab.section 
                ? 'border-violet-600 bg-[#3C3D3F] text-white' 
                : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="p-6 pt-3 h-[calc(100vh-130px)]">
        
        {/* --- Chat View --- */}
        {activeSection === 'chats' && (
            <div className="flex h-full gap-6">
                {/* Left Panel: All Chats List (Scrollable & Searchable) */}
                {showChatList && (
                    <div className={`flex flex-col ${isMobile ? 'w-full' : 'w-1/3 min-w-[300px]'} bg-[#3C3D3F] rounded-xl shadow-lg overflow-hidden`}>
                        <div className="p-3 bg-[#1A1F26] flex flex-col justify-between border-b border-gray-700">
                            <h2 className="text-xl font-bold text-white mb-2">All chats</h2>
                            
                            {/* Chat List Search Bar */}
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search chats..."
                                    value={chatSearchTerm}
                                    onChange={(e) => setChatSearchTerm(e.target.value)}
                                    className="w-full p-2 pl-10 rounded-lg bg-[#3C3D3F] text-white border border-gray-700 focus:ring-violet-500 focus:border-violet-500 text-sm"
                                />
                                <MdSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            </div>
                        </div>
                        
                        <div className="overflow-y-auto flex-1">
                            {filteredChatList.map(user => (
                                <ChatListItem 
                                    key={user.id}
                                    user={user}
                                    isActive={activeChat?.id === user.id}
                                    onClick={() => { setActiveChat(user); setMessages(INITIAL_MESSAGES); }} // Reset messages on chat change
                                />
                            ))}
                            {filteredChatList.length === 0 && (
                                <p className="p-4 text-center text-gray-400">No chats found.</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Right Panel: Active Chat Window */}
                {showChatPanel && activeChat && (
                    <div className={`flex flex-col ${isMobile ? 'w-full absolute inset-0 bg-[#1A1F26] z-40' : 'w-2/3 flex-1'} bg-[#1A1F26] rounded-xl shadow-lg border border-gray-700`}>
                        
                        {/* Chat Header */}
                        <div className="p-4 bg-[#3C3D3F] rounded-t-xl flex justify-between items-center border-b border-gray-700">
                          <div className="flex items-center">
                            {isMobile && (
                                <MdArrowBack onClick={() => setActiveChat(MOCK_CHAT_LIST[0])} size={24} className="mr-3 text-white cursor-pointer"/>
                            )}
                            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-md font-bold mr-3">
                                {activeChat.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{activeChat.name}</h3>
                              <p className={`text-sm ${activeChat.status === 'Typing' ? 'text-green-400' : 'text-gray-400'}`}>{activeChat.status}</p>
                            </div>
                          </div>
                          
                          {/* Call / Video Buttons */}
                          <div className="flex gap-4 text-gray-400">
                            <MdCall size={24} className="hover:text-white cursor-pointer" onClick={() => handleCall('Audio')} title="Audio Call"/>
                            <MdVideocam size={24} className="hover:text-white cursor-pointer" onClick={() => handleCall('Video')} title="Video Call"/>
                            <MdMoreVert size={24} className="hover:text-white cursor-pointer" />
                          </div>
                        </div>

                        {/* Messages Area (Chat History) */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-2">
                            <div className="text-center my-4">
                                <span className="text-xs text-gray-400 bg-[#1A1F26] px-3 py-1 rounded-full border border-gray-700">
                                    Today 
                                </span>
                            </div>
                            {messages.map(msg => (
                                <ChatBubble key={msg.id} message={msg} />
                            ))}
                        </div>

                        {/* Input Footer (Message Send) */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-[#3C3D3F] flex items-center gap-3 border-t border-gray-700">
                          <input
                            type="text"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1 p-3 rounded-xl bg-[#1A1F26] text-white border border-gray-700 focus:ring-violet-500 focus:border-violet-500"
                          />
                          <button type="submit" className="p-3 bg-violet-600 rounded-full hover:bg-violet-700 transition">
                            <MdSend size={24} className="text-white" />
                          </button>
                        </form>
                    </div>
                )}
            </div>
        )}
        
        {/* --- Placeholder Views for other Tabs --- */}
        {(activeSection === 'requests' || activeSection === 'feedback') && (
            <div className="h-full">
                <PlaceholderPanel section={activeSection} />
            </div>
        )}

      </div>
    </div>
  );
}