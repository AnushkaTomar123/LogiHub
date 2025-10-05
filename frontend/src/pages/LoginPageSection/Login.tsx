"use client";
import { FormEvent, useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const username = target.username.value;
    const password = target.password.value;

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password } ,
        { withCredentials: true } 
      );

      alert(res.data.message); // backend sends { message: "Login successful" }
      // Redirect or handle login success
      window.location.href = "/dashboard"; 
    } catch (err: any) {
      console.error(err);
      if (err.response) {
        alert("Login Failed: " + (err.response.data.message || err.response.data));
      } else {
        alert("Login Failed: Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">

        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center items-start bg-blue-600 text-white p-10 md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Welcome to Tomar Cargo Carriers!</h2>
          <ul className="space-y-3 text-lg">
            <li>✔ Track your shipments in real-time with ease.</li>
            <li>✔ Get digital receipts and transparent updates.</li>
            <li>✔ Hassle-free cargo management for faster delivery.</li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center items-center p-10 w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">Login to your Account</h2>
          <p className="text-gray-500 mb-6">Please enter your details to login</p>

          <form className="w-full space-y-4" onSubmit={handleLogin}>
            <input 
              name="username" // changed from "email" to "username"
              type="text" 
              placeholder="Enter username" 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              name="password"
              type="password" 
              placeholder="Enter your password" 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-blue-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-red-500 hover:underline">Forget Password?</a>
            </div>

            <button 
              type="submit"
              className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-500 mt-2">or</p>

            <button 
              type="button"
              className={`w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Please wait..." : "Continue with Google"}
            </button>

            <p className="text-center text-gray-500 mt-4">
              Don’t have an account yet? <a href="/auth/signup" className="text-blue-500 hover:underline">Signup Now</a>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
