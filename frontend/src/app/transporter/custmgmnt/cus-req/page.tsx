"use client"
import React, { useState } from "react";

const CustomerRequest = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: "Ananya Singh", request: "Need truck for Delhi to Mumbai", status: "Pending" },
    { id: 2, name: "Rahul Mehta", request: "Cargo delivery to Pune", status: "Approved" },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Requests</h2>

      <table className="w-full border border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Request</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="text-center hover:bg-gray-50">
              <td className="border p-2">{req.id}</td>
              <td className="border p-2">{req.name}</td>
              <td className="border p-2">{req.request}</td>
              <td className={`border p-2 font-medium ${
                  req.status === "Pending" ? "text-yellow-600" : "text-green-600"
                }`}>
                {req.status}
              </td>
              <td className="border p-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerRequest;
