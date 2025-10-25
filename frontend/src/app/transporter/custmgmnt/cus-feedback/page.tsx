"use client"
import React, { useState } from "react";

const CustomerFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    name: "",
    rating: "",
    comment: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newFeedback.name || !newFeedback.rating || !newFeedback.comment) return;
    setFeedbackList([...feedbackList, newFeedback]);
    setNewFeedback({ name: "", rating: "", comment: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Feedback</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow rounded-lg mb-6 border border-gray-200"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={newFeedback.name}
          onChange={(e) =>
            setNewFeedback({ ...newFeedback, name: e.target.value })
          }
          className="w-full border p-2 rounded mb-3"
        />

        <select
          value={newFeedback.rating}
          onChange={(e) =>
            setNewFeedback({ ...newFeedback, rating: e.target.value })
          }
          className="w-full border p-2 rounded mb-3"
        >
          <option value="">Select Rating</option>
          <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
          <option value="4">⭐⭐⭐⭐ Good</option>
          <option value="3">⭐⭐⭐ Average</option>
          <option value="2">⭐⭐ Poor</option>
          <option value="1">⭐ Very Bad</option>
        </select>

        <textarea
          placeholder="Write your feedback..."
          value={newFeedback.comment}
          onChange={(e) =>
            setNewFeedback({ ...newFeedback, comment: e.target.value })
          }
          className="w-full border p-2 rounded mb-3"
          rows="4"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Feedback
        </button>
      </form>

      {/* Feedback List */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Recent Feedback</h3>
        {feedbackList.length === 0 ? (
          <p className="text-gray-500">No feedback yet.</p>
        ) : (
          feedbackList.map((fb, index) => (
            <div
              key={index}
              className="border border-gray-200 p-3 rounded mb-3 bg-gray-50"
            >
              <p className="font-semibold">{fb.name}</p>
              <p className="text-yellow-500">{"⭐".repeat(fb.rating)}</p>
              <p className="text-gray-700 mt-1">{fb.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerFeedback;
