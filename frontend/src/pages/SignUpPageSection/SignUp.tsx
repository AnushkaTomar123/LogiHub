"use client";
import { FormEvent, useState } from "react";
import axios from "axios";

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;

    try {
      const res = await axios.post("http://localhost:8080/api/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup Successful! Welcome " + res.data.name);
      window.location.href = "/login";
    } catch (err: any) {
      console.error(err);
      if (err.response) {
        // Backend error
        alert("Signup Failed: " + err.response.data);
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
        <div className="hidden md:flex flex-col justify-center items-start bg-green-600 text-white p-10 md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Join Tomar Cargo Carriers!</h2>
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
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>

            <p className="text-center text-gray-500 mt-4">
              Already have an account? <a href="/login" className="text-green-500 hover:underline">Login Here</a>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Signup;
