"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
;
import { 
  FaBuilding, FaUser,  FaIdCard, 
  FaTruckMoving,  FaCamera, FaUpload, FaCheckCircle, 
  FaSpinner, FaCreditCard, FaLock, FaStar, FaEdit,
  FaSave, FaTimes, FaTimesCircle, FaExclamationCircle
} from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useRouter } from "next/navigation";

// --- Interfaces & Types (Retained) ---
interface Transporter {
    id: number;
    userEmail: string;
    companyName: string;
    contactPersonName: string;
    contactNumber: string;
    address: string;
    panNumber: string;
    aadhaarNumber: string;
    totalVehicles: number;
    vehicleTypes: string;
    rcProofDocumentUrl?: string; 
    profilePhotoUrl?: string; 
    bankAccountNumber?: string;
    ifscCode?: string;
    rcVerificationStatus?: 'Verified' | 'Pending' | 'Rejected' | 'Required'; 
}

type ProfileTab = 'personal' | 'company' | 'documents' | 'fleet' | 'security';

// --- Shared Components (Retained logic/styles for brevity) ---
// Note: EditableField, TabButton, and DocumentUploadCard definitions are omitted here
// but should be included from the previous response. Assuming they are correctly defined.



// --- Helper Functions (From previous response) ---
const EditableField: React.FC<any> = ({ label, value, type = 'text', onSave, disabled = false }) => {
    // ... (Your EditableField JSX and logic here)
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    
    const handleSave = () => {
        if (currentValue !== value) {
            onSave(currentValue);
        }
        setIsEditing(false);
    };

    return (
        <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="font-semibold text-gray-700 dark:text-gray-300 text-base">{label}:</div>
            <div className="flex items-center gap-2">
                {isEditing ? (
                    <input
                        type={type}
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        className="p-2 border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500 w-52 text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        disabled={disabled}
                    />
                ) : (
                    <span className={`text-gray-900 dark:text-gray-50 font-medium ${disabled ? 'text-gray-500 dark:text-gray-400' : ''}`}>{value || "Not set"}</span>
                )}
                {/* Edit/Save/Cancel buttons */}
                {!disabled && (
                    isEditing ? (
                        <>
                            <button onClick={handleSave} className="text-green-500 hover:text-green-700 p-1 transition duration-200" title="Save"><FaSave /></button>
                            <button onClick={() => { setCurrentValue(value); setIsEditing(false); }} className="text-red-500 hover:text-red-700 p-1 transition duration-200" title="Cancel"><FaTimes /></button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 p-1 transition duration-200" title="Edit"><FaEdit /></button>
                    )
                )}
            </div>
        </div>
    );
};

const TabButton: React.FC<any> = ({ icon: Icon, label, isActive, onClick }) => (
    <button
      className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition duration-200 ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      } font-medium`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
);

const DocumentUploadCard: React.FC<any> = ({ docLabel, currentUrl, verificationStatus, onUpload }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    
    const statusMap = { 'Verified': FaCheckCircle, 'Pending': FaSpinner, 'Rejected': FaTimesCircle, 'Required': FaExclamationCircle };
    const StatusIcon = statusMap[verificationStatus] || FaExclamationCircle;
    
    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        setUploading(false);
        onUpload(); 
        setFile(null);
    };

    return (
        <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-xl mt-4 bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-lg text-gray-900 dark:text-gray-50">{docLabel}</h4>
                <span className="px-3 py-1 text-sm rounded-full font-medium flex items-center gap-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                    <StatusIcon className="w-4 h-4" /> {verificationStatus}
                </span>
            </div>
            {currentUrl && (
                 <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline font-medium mb-3">
                    <HiOutlineDocumentText className="w-5 h-5" /> View Uploaded Document
                </a>
            )}
            <input type="file" accept=".pdf, .jpg, .png" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-sm text-gray-600 dark:text-gray-400 my-2"/>
            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-white font-semibold rounded-lg transition ${
                    !file || uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
            >
                {uploading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
                {uploading ? 'Uploading...' : `Upload ${docLabel.split(' ')[0]}`}
            </button>
        </div>
    );
};

// --- Main Component ---
export default function TransporterProfilePage() {
    const router = useRouter();

  const [transporter, setTransporter] = useState<Transporter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // --- Toast Handler ---
  const showToast = useCallback((text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3500);
  }, []);

  // --- Fetch Data ---
  const fetchTransporter = async () => {
    // We keep loading true until the API call is done
    try {
      const email = localStorage.getItem("email"); 
      if (!email) {
        setError("User email not found. Please log in again.");
        return;
      }
      
      const response = await axios.get<Transporter>(`http://localhost:8080/api/transporters/by-email?email=${email}`);
      // Use client-side data for mocking only after successful fetch
      setTransporter({
          ...response.data, 
          rcProofDocumentUrl: response.data.rcProofDocumentUrl || null, 
          profilePhotoUrl: response.data.profilePhotoUrl || '',
          bankAccountNumber: 'XXXXX9876', 
          ifscCode: 'HDFC0001234', 
          rcVerificationStatus: 'Pending', 
          totalVehicles: response.data.totalVehicles || 5,
          vehicleTypes: response.data.vehicleTypes || "Open Truck, Closed Van"
      });
    } catch (err) {
      setError("Failed to fetch transporter details.");
    } finally {
      setLoading(false);
    }
  };

  // 1. FIX: Ensure fetchTransporter is only called after client mount
  useEffect(() => {
    fetchTransporter();
  }, []);

  // --- Dynamic Update Function (Retained) ---
  const updateTransporterField = async (field: keyof Transporter, newValue: string) => {
    if (!transporter || !transporter.id) return;
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTransporter(prev => prev ? {...prev, [field]: newValue} as Transporter : null);
      showToast(`${field} updated successfully!`, 'success');
    } catch (err) {
      showToast(`Failed to update ${field}.`, 'error');
    }
  };

  // --- Profile Photo Upload Handler (Retained) ---
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !transporter?.id) return;
    setIsUploadingPhoto(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTransporter(prev => prev ? {...prev, profilePhotoUrl: URL.createObjectURL(file)} : null);
    setIsUploadingPhoto(false);
    showToast("Profile photo updated successfully!", 'success');
  };

  // --- Render Functions (Uses the successfully loaded 'transporter' object) ---

  const renderPersonalInformation = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Contact Person Details</h3>
      <EditableField
        label="Full Name"
        value={transporter!.contactPersonName || ""} // Use ! since we checked for null below
        onSave={(newValue: string) => updateTransporterField('contactPersonName', newValue)}
      />
      <EditableField
        label="Email (Login ID)"
        value={transporter!.userEmail || "N/A"}
        disabled={true} 
        onSave={() => {}} 
      />
      <EditableField
        label="Phone Number"
        value={transporter!.contactNumber || ""}
        type="tel"
        onSave={(newValue: string) => updateTransporterField('contactNumber', newValue)}
      />
    </div>
  );
  
  // RENDER FUNCTION FOR OTHER TABS (omitted for brevity, assume similar structure)
  const renderCompanyDetails = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Company Details</h3>
      <EditableField
        label="Company Name"
        value={transporter!.companyName || ""}
        onSave={(newValue: string) => updateTransporterField('companyName', newValue)}
      />
      <EditableField
        label="Registered Address"
        value={transporter!.address || ""}
        onSave={(newValue: string) => updateTransporterField('address', newValue)}
      />
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mt-8 mb-4 border-t pt-4 dark:border-gray-700">Regulatory Details (Read-Only)</h3>
      <EditableField label="PAN Number" value={transporter!.panNumber || "N/A"} disabled={true} onSave={() => {}} />
      <EditableField label="Aadhaar Number" value={transporter!.aadhaarNumber ? `**** **** ${transporter!.aadhaarNumber.slice(-4)}` : "N/A"} disabled={true} onSave={() => {}} />
    </div>
  );
  const renderDocumentManagement = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">Upload & Verify Documents</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">Please upload and maintain updated documents to avoid service interruptions.</p>
      <DocumentUploadCard
          docLabel="RC Proof Document"
          currentUrl={transporter!.rcProofDocumentUrl}
          verificationStatus={transporter!.rcVerificationStatus || 'Required'}
          onUpload={() => showToast("RC document uploaded! Status changed to Pending.", 'success')}
      />
      <DocumentUploadCard
          docLabel="GST Certificate"
          currentUrl={undefined}
          verificationStatus={'Required'}
          onUpload={() => showToast("GST uploaded! Status changed to Pending.", 'success')}
      />
    </div>
  );
  const renderFleetManagement = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Current Fleet Information</h3>
       <EditableField label="Total Vehicles" value={String(transporter!.totalVehicles || 0)} type="number" onSave={(newValue: string) => updateTransporterField('totalVehicles', newValue)} />
       <EditableField label="Supported Vehicle Types" value={transporter!.vehicleTypes || "N/A"} onSave={(newValue: string) => updateTransporterField('vehicleTypes', newValue)} />
       <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
           <button 
                // Navigation Logic
                onClick={() => router.push('/transporter/fleet')} 
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-lg"
            >
                <FaTruckMoving /> Manage Vehicle Details
            </button>
       </div>
    </div>
  );
  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2"><FaCreditCard /> Bank Account Details</h3>
      <EditableField label="Bank A/C Number" value={transporter!.bankAccountNumber || "N/A"} onSave={(newValue: string) => updateTransporterField('bankAccountNumber', newValue)} />
      <EditableField label="IFSC Code" value={transporter!.ifscCode || "N/A"} onSave={(newValue: string) => updateTransporterField('ifscCode', newValue)} />
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2 mt-8 border-t pt-4 dark:border-gray-700"><FaLock /> Change Password</h3>
      <form className="space-y-4 max-w-md">
        <input type="password" placeholder="Current Password" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"/>
        <input type="password" placeholder="New Password" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
        <button type="submit" className="w-full py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition">Update Password</button>
      </form>
    </div>
  );

  // --- Main Render ---
  //
  if (loading) return ( 
    <div className="flex justify-center items-center h-[80vh] text-xl text-gray-600 dark:text-gray-300">
        <FaSpinner className="animate-spin mr-2" /> Loading profile details...
    </div>
  );
  if (error || !transporter) return ( 
     <div className="flex justify-center items-center h-[80vh] text-red-600 dark:text-red-400 p-4">
        {error || "No transporter data found. Please try again."}
    </div>
  );
    
  // 2. FIX: Ensure transporter is definitely not null before accessing its properties in JSX
  const avatarUrl = transporter.profilePhotoUrl || `https://ui-avatars.com/api/?name=${transporter.contactPersonName || 'TR'}&background=0D83DD&color=fff&size=256&rounded=true`;


  return (
    <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
      
      {/* Toast Notification */}
      {message && (
        <div className={`fixed top-4 right-4 p-4 rounded-xl shadow-xl z-50 transition-opacity duration-300 ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white font-medium`}>
          {message.text}
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-6 mb-8 flex flex-col items-center sm:flex-row gap-6">
        
        {/* Profile Photo Upload Area */}
        <div className="relative group w-36 h-36 flex-shrink-0">
          <img
            src={avatarUrl}
            width={30}
            height={20}
            alt="Profile Photo"
            className="w-full h-full object-cover rounded-full border-4 border-blue-500 dark:border-blue-400 transition-shadow"
          />
          <label htmlFor="profile-upload" className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
            {isUploadingPhoto ? (<FaSpinner className="animate-spin text-white text-xl" />) : (<FaCamera className="text-white text-xl" />)}
            <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={isUploadingPhoto}/>
          </label>
        </div>

        {/* Company & Contact Info */}
        <div className="text-center sm:text-left flex-grow">
          <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{transporter.companyName}</h1>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-50 mt-1">{transporter.contactPersonName} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(Contact Person)</span></p>
          <div className="flex items-center justify-center sm:justify-start mt-2 gap-4">
            <span className="text-md bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 px-3 py-1 rounded-full inline-flex items-center gap-1 font-semibold">
              <FaCheckCircle /> KYC Verified
            </span>
            <span className="text-md text-yellow-600 dark:text-yellow-400 inline-flex items-center gap-1 font-semibold">
                <FaStar /> 4.5 Rating
            </span>
          </div>
        </div>
      </div>

      {/* Main Content: Tab Navigation and Content Area */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left: Tab Navigation */}
        <div className="w-full md:w-72 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg h-fit">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50 border-b pb-2 dark:border-gray-700">Settings</h2>
          
          <TabButton icon={FaUser} label="Personal Information" isActive={activeTab === 'personal'} onClick={() => setActiveTab('personal')} />
          <TabButton icon={FaBuilding} label="Company Details" isActive={activeTab === 'company'} onClick={() => setActiveTab('company')} />
          <TabButton icon={FaIdCard} label="Document Management" isActive={activeTab === 'documents'} onClick={() => setActiveTab('documents')} />
          <TabButton icon={FaTruckMoving} label="Fleet Management" isActive={activeTab === 'fleet'} onClick={() => setActiveTab('fleet')} />
          <TabButton icon={FaLock} label="Security & Bank" isActive={activeTab === 'security'} onClick={() => setActiveTab('security')} />
        </div>

        {/* Right: Content Area */}
        <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-extrabold mb-6 border-b pb-2 dark:border-gray-700 text-blue-600 dark:text-blue-400">
            {activeTab === 'personal' && 'Personal Information'}
            {activeTab === 'company' && 'Company Details'}
            {activeTab === 'documents' && 'Document Management'}
            {activeTab === 'fleet' && 'Fleet Management'}
            {activeTab === 'security' && 'Security & Bank Settings'}
          </h2>
          
          {activeTab === 'personal' && renderPersonalInformation()}
          {activeTab === 'company' && renderCompanyDetails()}
          {activeTab === 'documents' && renderDocumentManagement()}
          {activeTab === 'fleet' && renderFleetManagement()}
          {activeTab === 'security' && renderSecuritySettings()}
        </div>
      </div>
    </div>
  );
}