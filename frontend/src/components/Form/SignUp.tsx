/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { FormEvent, useState } from "react";
import axios from "axios";

function StatusMessage({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) {
  const baseClasses = "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl text-white transition-opacity duration-300";
  const colorClasses = type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div className={`${baseClasses} ${colorClasses} flex items-center justify-between`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 opacity-75 hover:opacity-100">
        {/* Replaced <FaTimes /> with an inline SVG cross icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

const Signup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "", // CHANGED: Default role is now empty string ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null); // Clear previous message

    const { username, email, password, role } = formData;
    
    // VALIDATION ADDED: Check if all fields, including a valid role, are selected
    if (!username || !email || !password || !role) {
        setStatusMessage({ message: "Please fill all fields and select a role.", type: 'error' });
        setLoading(false);
        return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          username,
          email,
          password,
          role, // Sending the selected role to the backend
        },
        {
          withCredentials: true,
        }
      );

      // Backend sends { message: "User registered successfully" }
      setStatusMessage({ message: "Registration successful!", type: 'success' });
      
      // ----------------------------------------------------
      // ⭐ CORE LOGIC: ROLE-BASED REDIRECTION FOR ONBOARDING
      // ----------------------------------------------------

      if (role === "TRANSPORTER") {
        // Redirect to Transporter specific form
        window.location.href = "/auth/verify/transporter"; 
      } else if (role === "CUSTOMER") {
        // Redirect to Customer specific form
        window.location.href = "/auth/verify/customer";
      } else {
        // Fallback or unexpected role
         window.location.href = "/auth/login"; 
      }

    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.message || err.response?.data || "Signup Failed: Something went wrong";
      setStatusMessage({ message: errorMessage, type: 'error' });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      {statusMessage && (
        <StatusMessage 
            message={statusMessage.message} 
            type={statusMessage.type} 
            onClose={() => setStatusMessage(null)} 
        />
      )}
      <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden transform transition-all hover:shadow-3xl">

        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center items-start bg-gradient-to-br from-blue-700 to-cyan-600 text-white p-12 md:w-1/2">
          <h2 className="text-4xl font-extrabold mb-6 tracking-tight">Join Logihub Today</h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center">
                <span className="mr-3 text-xl">🚚</span> Seamless Logistics Management.
            </li>
            <li className="flex items-center">
                <span className="mr-3 text-xl">✅</span> Role-based Quick Setup.
            </li>
            <li className="flex items-center">
                <span className="mr-3 text-xl">📊</span> Access to your personalized dashboard.
            </li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center items-center p-10 w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Create Your Account</h2>
          <p className="text-gray-500 mb-8">Tell us who you are</p>

          <form className="w-full space-y-4" onSubmit={handleSignup}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              required
            />
            
            {/* -------------------- ROLE SELECT (FIXED) -------------------- */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer text-gray-700"
              required
            > 
              {/* Added disabled "Select Role" option */}
              <option value="" disabled hidden>Select Role</option> 
              <option value="CUSTOMER">Customer</option> 
              <option value="TRANSPORTER">Transporter</option>
            </select>
            {/* ------------------------------------------------------------------ */}


            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-3 mt-6 rounded-lg font-semibold shadow-md transition-all transform hover:scale-[1.01] hover:shadow-lg ${loading ? "opacity-70 cursor-not-allowed" : "hover:from-blue-700 hover:to-cyan-700"}`}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>

            <p className="text-center text-gray-500 mt-4 text-sm">
              Already have an account? <a href="/login" className="text-blue-600 hover:underline font-medium">Login Here</a>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Signup;
