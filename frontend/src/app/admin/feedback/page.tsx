"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "@/components/AdminSection/AdminHeader";
import { FaStar } from "react-icons/fa";

interface Feedback {
  id: number;
  userName: string;
  role: "CUSTOMER" | "TRANSPORTER";
  feedback: string;
  rating: number; // 1 to 5
  date: string;
}

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/feedback/all");
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 dark:text-gray-200">
        Loading Feedback...
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar
        key={i}
        className={`inline-block mr-1 ${
          i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  return (
    <section className="bg-gray-50 dark:bg-background text-gray-900 dark:text-gray-100 min-h-screen">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Customer & Transporter Feedback</h2>

        {feedbacks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No feedback available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-white dark:bg-card rounded-xl shadow p-4 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    {fb.userName}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      fb.role === "CUSTOMER"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    }`}
                  >
                    {fb.role}
                  </span>
                </div>
                <div className="flex items-center mb-2">{renderStars(fb.rating)}</div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{fb.feedback}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(fb.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
