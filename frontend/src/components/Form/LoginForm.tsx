"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // 📩 Email validation function
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value.trim();
    const password = target.password.value.trim();

    // 🔹 Frontend Validation
    const tempErrors: { email?: string; password?: string } = {};

    if (!email) tempErrors.email = "Email is required.";
    else if (!isValidEmail(email)) tempErrors.email = "Invalid email format.";

    if (!password) tempErrors.password = "Password is required.";
    else if (password.length < 6)
      tempErrors.password = "Password must be at least 6 characters.";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { role, username: userName, email: userEmail } = res.data;

      // Save to localStorage
      localStorage.setItem("username", userName);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("role", role);

      // ✅ Success toast
      toast.success("Login successful!", {
        position: "top-right",
        theme: "colored",
        style: {
          background: "linear-gradient(to right, #1e3a8a, #f97316)",
          color: "white",
        },
      });

      // Redirect based on role
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
      }, 1500);
    } catch (err: any) {
      console.error("Login error:", err);

      const msg =
        err.response?.data?.message ||
        (err.response?.status === 404
          ? "User does not exist!"
          : err.response?.status === 401
          ? "Invalid email or password!"
          : "Login failed. Please try again.");

      toast.error(msg, {
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

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-background">
        <div className="flex w-full max-w-4xl bg-white  dark:bg-background shadow-2xl rounded-2xl overflow-hidden border border-gray-100 dark:border-border">
          {/* Left Side */}
          <div className="hidden md:flex flex-col justify-center items-start p-10 md:w-1/2 bg-gradient-to-br from-violet-50 to-violet-500 dark:from-purple-800 dark:via-indigo-800 dark:to-purple-600 text-gray-700 dark:text-white ">
            <h1 className="text-2xl font-extrabold mb-6">
              Welcome to LogiHub 🚚
            </h1>
            <p className="text-lg mb-6 text-violet-50">
              Your one-stop logistics and transport management platform.
            </p>
            <ul className="space-y-3 text-md text-violet-50">
              <li>• Track real-time shipments effortlessly</li>
              <li>• Manage consignments digitally</li>
              <li>• Get instant updates on delivery status</li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-center items-center p-10 w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-50">
              Login to LogiHub
            </h2>
            <p className="text-gray-500 dark:text-gray-300 mb-6">
              Access your dashboard and manage logistics
            </p>

            <form className="w-full space-y-4" onSubmit={handleLogin}>
              {/* Email */}
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className={`w-full dark:bg-card border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-violet-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={`w-full dark:bg-card border rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-violet-500"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-violet-500" />
                  <span>Remember me</span>
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-red-300  dark:text-red-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-br from-violet-600 to-cyan-600  dark:from-purple-800 dark:via-indigo-800 dark:to-purple-600 text-white py-2.5 rounded-md font-medium hover:bg-violet-700 transition duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-gray-400 text-sm mt-2">or</p>

              <button
                type="button"
                disabled={loading}
                className={`w-full  bg-gradient-to-br from-violet-600 to-cyan-600  dark:from-purple-800 dark:via-indigo-800 dark:to-purple-600 border border-gray-300 py-2.5 rounded-md text-gray-700 dark:text-gray-50 font-medium hover:bg-gray-50 transition duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Please wait..." : "Continue with Google"}
              </button>

              <p className="text-center text-gray-600 dark:text-gray-300 mt-4 text-sm">
                Don’t have an account?{" "}
                <a
                  href="/auth/signup"
                  className="text-violet-600 hover:underline font-medium"
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
