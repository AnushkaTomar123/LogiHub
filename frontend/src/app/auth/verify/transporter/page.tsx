"use client";
import axios from 'axios';
import { useState, FormEvent } from 'react';
import {
  FaTruck,
  FaShieldAlt,
  FaBuilding,
  FaCheckCircle,
  FaSpinner,
  FaSignInAlt,
  FaCamera,
  FaClipboardCheck,
  FaTimes,
} from 'react-icons/fa';

// Interface for Transporter Details including File objects
interface TransporterFormData {
  companyName: string;
  contactPersonName: string;
  contactNumber: string;
  userEmail:string;
  address: string;
  panNumber: string;
  aadhaarNumber: string;
  totalVehicles: number | '';
  vehicleTypes: string;
  profilePhoto: File | null;
  rcProofDocument: File | null;
}

const Transporter = () => {
  const [formData, setFormData] = useState<TransporterFormData>({
    companyName: '',
    contactPersonName: '',
    contactNumber: '',
    userEmail:'',
    address: '',
    panNumber: '',
    aadhaarNumber: '',
    totalVehicles: '',
    vehicleTypes: '',
    profilePhoto: null,
    rcProofDocument: null,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'totalVehicles') {
      setFormData({ ...formData, [name]: value === '' ? '' : Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleVehicleTypeChange = (type: string) => {
    const types = formData.vehicleTypes.split(',').filter(t => t);
    if (types.includes(type)) {
      setFormData({
        ...formData,
        vehicleTypes: types.filter(t => t !== type).join(','),
      });
    } else {
      setFormData({
        ...formData,
        vehicleTypes: [...types, type].join(','),
      });
    }
  };

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setStatus("idle");
  setMessage("");

  const totalVehiclesValue = Number(formData.totalVehicles);

  // Validation
  if (
    !formData.companyName ||
    !formData.contactPersonName ||
    !formData.contactNumber ||
    !formData.userEmail ||
    !formData.address ||
    !formData.panNumber ||
    !formData.aadhaarNumber ||
    !formData.vehicleTypes||
    
    totalVehiclesValue < 1
  ) {
    setStatus("error");
    setMessage(
      "Please fill all required fields, upload documents, and ensure total vehicles is at least 1."
    );
    setLoading(false);
    return;
  }

  try {
    // Prepare form data for backend
    const data = new FormData();
    data.append("companyName", formData.companyName);
    data.append("contactPersonName", formData.contactPersonName);
    data.append("contactNumber", formData.contactNumber);
    data.append("userEmail", formData.userEmail);
    data.append("address", formData.address);
    data.append("panNumber", formData.panNumber);
    data.append("aadhaarNumber", formData.aadhaarNumber);
    data.append("vehicleTypes", formData.vehicleTypes);
    data.append("totalVehicles", formData.totalVehicles.toString());

    if (formData.profilePhoto) {
      data.append("profilePhoto", formData.profilePhoto);
    }

    if (formData.rcProofDocument) {
      data.append("rcProofDocument", formData.rcProofDocument);
    }

    // 🚀 Send data to backend API
    const response = await axios.post("http://localhost:8080/api/transporters", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200 || response.status === 201) {
      setStatus("success");
      setMessage("Profile saved successfully! Redirecting to login after verification...");
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    }
  } catch (error: any) {
    console.error("Onboarding failed:", error);
    setStatus("error");
    setMessage(error.response?.data?.message || "Failed to save profile.");
  } finally {
    setLoading(false);
  }
};


  const vehicleOptions = ['Truck (Full Load)', 'Mini-Truck (LTL)', 'Tempo', 'Cargo Van'];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-xl p-8 md:p-12">
        <div className="text-center mb-10">
          <FaTruck className="text-blue-600 mx-auto text-5xl mb-3" />
          <h2 className="text-3xl font-extrabold text-gray-800">
            Transporter Profile Setup & Verification
          </h2>
          <p className="text-gray-500 mt-2">
            Fill in all required business and verification details to start your services.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4 flex items-center">
            <FaBuilding className="mr-2" /> Business Information
          </h3>

          {/* Section 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="companyName"
              type="text"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
              required
            />

            <input
              name="contactPersonName"
              type="text"
              placeholder="Contact Person Name"
              value={formData.contactPersonName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
              required
            />

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
            <input
              name="userEmail"
              type="email"
              placeholder="Enter your email"
              value={formData.userEmail}
              onChange={handleChange}
              maxLength={50}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            

            <textarea
              name="address"
              placeholder="Primary Address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500 md:col-span-2"
              required
            />
          </div>

          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mt-6 mb-4 flex items-center">
            <FaShieldAlt className="mr-2" /> Verification & Assets
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="panNumber"
              type="text"
              placeholder="PAN Card Number"
              value={formData.panNumber}
              onChange={handleChange}
              maxLength={10}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500 uppercase"
              required
            />

            <input
              name="aadhaarNumber"
              type="text"
              placeholder="Aadhaar Card Number"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              maxLength={12}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
              required
            />

            <div className="md:col-span-2">
              <label htmlFor="totalVehicles" className="block text-sm font-medium text-gray-700 mb-1">
                Total Number of Vehicles
              </label>
              <input
                id="totalVehicles"
                name="totalVehicles"
                type="number"
                placeholder="Enter at least 1 vehicle"
                value={formData.totalVehicles}
                onChange={handleChange}
                min={1}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaCamera className="mr-2 text-blue-600" /> Upload Profile Photo
              </label>
              <input
                name="profilePhoto"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              
              />
              {formData.profilePhoto && (
                <p className="text-xs text-green-600 mt-1">Selected: {formData.profilePhoto.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaClipboardCheck className="mr-2 text-blue-600" /> Upload Vehicle RC/PUC Document
              </label>
              <input
                name="rcProofDocument"
                type="file"
                accept=".pdf, image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                
              />
              {formData.rcProofDocument && (
                <p className="text-xs text-green-600 mt-1">Selected: {formData.rcProofDocument.name}</p>
              )}
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center">
              <FaTruck className="mr-2 text-blue-600" /> Vehicle Types
            </label>
            <div className="flex flex-wrap gap-4">
              {vehicleOptions.map(type => (
                <label
                  key={type}
                  className="inline-flex items-center cursor-pointer bg-blue-50 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.vehicleTypes.includes(type)}
                    onChange={() => handleVehicleTypeChange(type)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">{type}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Note: Only JPEG, PNG, or PDF files are accepted for uploads.
            </p>
          </div>

          {status !== 'idle' && (
            <div
              className={`p-3 rounded-lg flex items-center text-sm font-medium ${
                status === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {status === 'success' ? (
                <FaCheckCircle className="mr-2 text-lg" />
              ) : (
                <FaTimes className="mr-2 text-lg" />
              )}
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || status === 'success'}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-lg flex items-center justify-center gap-3 ${
              loading || status === 'success'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading && <FaSpinner className="animate-spin text-lg" />}
            {status === 'success' ? (
              <>
                <FaCheckCircle className="text-xl" /> Saved! Redirecting to Login...
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

export default Transporter;
