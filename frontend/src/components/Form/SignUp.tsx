"use client";
import { FormEvent, useState } from "react";
import axios from "axios";

const Signup= () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const target = e.target as typeof e.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const username = target.username.value;
    const email = target.email.value;
    const password = target.password.value;

    try {
      const res = await axios.post(
  "http://localhost:8080/api/auth/signup",
  {
    username,
    email,
    password,
  },
  {
    withCredentials: true, // important when allowCredentials=true
  }
);



      // backend sends { message: "User registered successfully" }
      alert(res.data.message);
      window.location.href = "/auth/login";
    } catch (err: any) {
      console.error(err);
      if (err.response) {
        // Backend error
        alert("Signup Failed: " + err.response.data.message || err.response.data);
      } else {
        alert("Signup Failed: Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">

        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center items-start bg-gradient-to-br from-blue-600 to-cyan-600 text-white p-10 md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Join Logihub</h2>
          <ul className="space-y-3 text-lg">
            <li>✔ Fast registration and easy account setup.</li>
            <li>✔ Track shipments immediately after signup.</li>
            <li>✔ Hassle-free cargo management dashboard.</li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center items-center p-10 w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
          <p className="text-gray-500 mb-6">Fill in your details to signup</p>

          <form className="w-full space-y-4" onSubmit={handleSignup}>
            <input
              name="username" // changed from "name" to "username"
              type="text"
              placeholder="Username"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-2 rounded-md hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>

            <p className="text-center text-gray-500 mt-4">
              Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login Here</a>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Signup;
