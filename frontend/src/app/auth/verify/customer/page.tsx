"use client";
import { useState, FormEvent } from "react";
import axios from "axios";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaSpinner,
  FaSignInAlt,
  FaTimes,
  FaCamera,
} from "react-icons/fa";

// Custom Close Icon
const InlineTimesIcon = () => <FaTimes className="h-4 w-4" />;

// Interface for Customer Form
interface CustomerFormData {
  fullName: string;
  contactNumber: string;
  customerAddress: string;
  userEmail : string;
  aadhaarNumber: string;
  profilePhoto: File | null;
}

const Customer = () => {
  const [formData, setFormData] = useState<CustomerFormData>({
    fullName: "",
    contactNumber: "",
    customerAddress: "",
    userEmail: "",
    aadhaarNumber: "",
    profilePhoto: null,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Handle Text Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  // Submit Form
  // Submit Form
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setStatus("idle");
  setMessage("");

  // Validation
  if (
    !formData.fullName ||
    !formData.contactNumber ||
    !formData.customerAddress ||
    !formData.aadhaarNumber ||
    !formData.profilePhoto
  ) {
    setStatus("error");
    setMessage("Please fill all required fields and upload a profile photo.");
    setLoading(false);
    return;
  }

  try {
    // Prepare form data for backend
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("contactNumber", formData.contactNumber);
    data.append("customerAddress", formData.customerAddress);
    data.append("userEmail", formData.userEmail);
    data.append("aadhaarNumber", formData.aadhaarNumber);
    if (formData.profilePhoto) {
      data.append("profilePhoto", formData.profilePhoto);
    }

    // Send to backend
    const response = await axios.post("http://localhost:8080/api/customers", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200 || response.status === 201) {
      setStatus("success");
      setMessage("Profile saved successfully! Redirecting to login page...");

      // Redirect after delay
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    }
  } catch (error: any) {
    console.error("Customer Onboarding failed:", error);
    setStatus("error");
    setMessage("Failed to save profile. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-background dark:to-card  flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-background border border-white dark:border-zinc-700 shadow-2xl rounded-2xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <FaUser className="text-blue-600 mx-auto text-5xl mb-3" />
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-50">
            Customer Profile Setup & Verification
          </h2>
          <p className="text-gray-500 mt-2">
            Fill the required contact and verification details to proceed.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Section 1 */}
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 border-b pb-2 mb-4 flex items-center gap-2">
            <FaUser className="text-blue-600" /> Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="md:col-span-2">
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Emial id */}
            <div className="md:col-span-2">
              <input
                name="userEmail"
                type="email"
                placeholder="enter your email"
                value={formData.userEmail}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Contact Number */}
            <div>
              <input
                name="contactNumber"
                type="tel"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                maxLength={10}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Aadhaar Number */}
            <div>
              <input
                name="aadhaarNumber"
                type="text"
                placeholder="Aadhaar Number"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                maxLength={12}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Section 2 */}
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 border-b pb-2 mt-6 mb-4 flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-600" /> Address & Documents
          </h3>

          {/* Customer Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Customer Address
            </label>
            <textarea
              name="customerAddress"
              placeholder="Enter Full Address"
              value={formData.customerAddress}
              onChange={handleChange}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-2">
              <FaCamera className="text-blue-600" />
              Upload Profile Photo
            </label>
            <input
              name="profilePhoto"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {formData.profilePhoto && (
              <p className="text-xs text-green-600 mt-1">
                Selected: {formData.profilePhoto.name}
              </p>
            )}
          </div>

          {/* Note */}
          <p className="text-xs text-gray-500">
            **Note:** Aadhaar number and profile photo are mandatory.
          </p>

          {/* Status Message */}
          {status !== "idle" && (
            <div
              className={`p-3 rounded-lg flex items-center text-sm font-medium ${
                status === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status === "success" ? (
                <FaCheckCircle className="mr-2 text-lg" />
              ) : (
                <InlineTimesIcon />
              )}
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || status === "success"}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-lg flex items-center justify-center gap-3 ${
              loading || status === "success"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading && <FaSpinner className="animate-spin text-lg" />}
            {status === "success" ? (
              <>
                <FaCheckCircle className="text-xl" /> Saved! Redirecting to
                Login...
              </>
            ) : (
              <>
                <FaSignInAlt className="text-xl" /> Save Profile and Go to Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Customer;
