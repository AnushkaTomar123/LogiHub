
"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { role, username: userName, email: userEmail } = res.data;

      // 🔹 Save user data silently
      localStorage.setItem("username", userName);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("role", role);

      // 🔹 Success toast
      toast.success("Login successful!", {
        position: "top-right",
        theme: "colored",
        style: {
          background: "linear-gradient(to right, #1e3a8a, #f97316)",
          color: "white",
        },
      });

      // 🔹 Redirect by role
      setTimeout(() => {
        if (role === "ADMIN" || role === "SUPER_ADMIN") {
          window.location.href = "/admin/dashboard";
        } else if (role === "CUSTOMER") {
          window.location.href = "/customer/dashboard";
        } else if (role === "TRANSPORTER") {
          window.location.href = "/transporter/dashboard";
        } else {
          window.location.href = "/";
        }
      }, 1800);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed!", {
        position: "top-right",
        theme: "colored",
        style: {
          background: "linear-gradient(to right, #dc2626, #f87171)",
          color: "white",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 UI
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="flex w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          {/* Left Panel */}
          <div className="hidden md:flex flex-col justify-center items-start p-10 md:w-1/2 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
            <h1 className="text-4xl font-extrabold mb-6">
              Welcome to LogiHub 🚚
            </h1>
            <p className="text-lg mb-6 text-blue-50">
              Your one-stop logistics and transport management platform.
            </p>
            <ul className="space-y-3 text-md text-blue-50">
              <li>• Track real-time shipments effortlessly</li>
              <li>• Manage consignments digitally</li>
              <li>• Get instant updates on delivery status</li>
            </ul>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col justify-center items-center p-10 w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              Login to LogiHub
            </h2>
            <p className="text-gray-500 mb-6">
              Access your dashboard and manage logistics
            </p>

            <form className="w-full space-y-4" onSubmit={handleLogin}>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />

              <div className="flex justify-between items-center text-sm text-gray-600">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-blue-500" />
                  <span>Remember me</span>
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-red-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-gray-400 text-sm mt-2">or</p>

              <button
                type="button"
                disabled={loading}
                className={`w-full border border-gray-300 py-2.5 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Please wait..." : "Continue with Google"}
              </button>

              <p className="text-center text-gray-600 mt-4 text-sm">
                Don’t have an account?{" "}
                <a
                  href="/auth/signup"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

export default LoginForm;
