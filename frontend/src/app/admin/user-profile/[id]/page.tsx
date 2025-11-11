"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AdminHeader from "@/components/AdminSection/AdminHeader";

type UserRole = "ADMIN" | "CUSTOMER" | "TRANSPORTER";

interface UserProfile {
  userId: number;
  username: string;
  email: string;
  role: UserRole;
  profilePhotoUrl?: string;
  companyName?: string;
  contactPersonName?: string;
  contactNumber?: string;
  totalVehicles?: number;
  vehicleTypes?: string;
  address?: string;
  contactNo?: string;
  aadhar?: string;
}

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get<UserProfile>(`http://localhost:8080/api/profile/${id}`) // ✅ fixed endpoint
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user profile:", err));
  }, [id]);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-gray-200">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <AdminHeader />
      <div className="max-w-4xl mx-auto bg-white dark:bg-card mt-8 p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-6">
          <img
            src={user.profilePhotoUrl || "/default-avatar.png"}
            alt={user.username}
            className="w-28 h-28 rounded-full border-4 border-purple-500"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="font-medium text-purple-600">{user.role}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {user.role === "TRANSPORTER" && (
            <>
              <h2 className="text-xl font-semibold">Transporter Details</h2>
              <p>Company: {user.companyName || "N/A"}</p>
              <p>Contact Person: {user.contactPersonName || "N/A"}</p>
              <p>Contact Number: {user.contactNumber || "N/A"}</p>
              <p>Total Vehicles: {user.totalVehicles ?? "N/A"}</p>
              <p>Vehicle Types: {user.vehicleTypes || "N/A"}</p>
            </>
          )}

          {user.role === "CUSTOMER" && (
            <>
              <h2 className="text-xl font-semibold">Customer Details</h2>
              <p>Address: {user.address || "N/A"}</p>
              <p>Contact No: {user.contactNo || "N/A"}</p>
              <p>Aadhar: {user.aadhar || "N/A"}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
