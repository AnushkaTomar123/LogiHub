"use client";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";

interface AddDriverModalProps {
  onClose: () => void;
  onAdd: (driverData: { driverName: string; licenseNumber: string; phoneNumber: string }) => void;
}

export default function AddDriverModal({ onClose, onAdd }: AddDriverModalProps) {
  const [form, setForm] = useState({ driverName: "", licenseNumber: "", phoneNumber: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-card p-6 rounded-xl w-[90%] max-w-md relative shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <MdClose size={24} />
        </button>
        <h3 className="text-lg font-semibold mb-4 text-center">Add Driver</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Driver Name"
            value={form.driverName}
            onChange={(e) => setForm({ ...form, driverName: e.target.value })}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="License Number"
            value={form.licenseNumber}
            onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
