"use client"

import React, { useState } from "react";

const CustomerChat = () => {
  const [messages, setMessages] = useState([
    { sender: "Customer", text: "Hello, I need help with my shipment." },
    { sender: "You", text: "Sure, can you please share your order ID?" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");
  };

  return (
    <div className="p-6 h-[80vh] flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Customer Chat</h2>

      <div className="flex-1 border border-gray-300 rounded-lg p-4 overflow-y-auto bg-gray-50 shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "You"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CustomerChat;
