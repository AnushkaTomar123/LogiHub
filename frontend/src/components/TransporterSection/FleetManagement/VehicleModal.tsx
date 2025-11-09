import { MdClose } from "react-icons/md";

export default function VehicleModal({
  form,
  vehicleTypes,
  vehicleModels,
  editingVehicle,
  onChange,
  onSubmit,
  onClose,
}: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]">
      <div className="bg-[#1e1e2d] rounded-2xl shadow-xl p-6 w-[90%] max-w-lg relative text-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <MdClose size={24} />
        </button>

        <h3 className="text-xl font-semibold mb-6 text-center">
          {editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
        </h3>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            placeholder="Vehicle Number"
            value={form.vehicleNumber}
            onChange={(e) => onChange({ ...form, vehicleNumber: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />

          <select
            value={form.vehicleType}
            onChange={(e) => onChange({ ...form, vehicleType: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          >
            <option value="">Select Vehicle Type</option>
            {vehicleTypes.map((type: string) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={form.model}
            onChange={(e) => onChange({ ...form, model: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          >
            <option value="">Select Model</option>
            {vehicleModels.map((m: string) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Capacity (Tons)"
            value={form.capacity}
            onChange={(e) =>
              onChange({ ...form, capacity: Number(e.target.value) })
            }
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />

          <select
            value={form.status}
            onChange={(e) => onChange({ ...form, status: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="ON_ROUTE">ON_ROUTE</option>
            <option value="UNAVAILABLE">UNAVAILABLE</option>
          </select>

          <button
            type="submit"
            className="w-full bg-violet-600 py-2 rounded-lg hover:bg-violet-700"
          >
            {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
          </button>
        </form>
      </div>
    </div>
  );
}
