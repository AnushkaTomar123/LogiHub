import { FaTimes, FaAngleRight, FaBox, FaTruckLoading, FaShippingFast, FaRupeeSign, FaCalendarAlt, FaWeightHanging } from "react-icons/fa";

type Booking = {
  id: number;
  pickupAddress: string;
  dropAddress: string;
  goodsDescription: string;
  vehicalType: string;
  pickupDate: string;
  expectDeliveryDate: string;
  capacity: number;
  estimatedCost: number;
};

type Props = {
  booking: Booking;
  onClose: () => void;
};

export default function BookingDetailsModal({ booking, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start z-50 p-6 pt-20">
      <div className="bg-gray-200 dark:bg-card rounded-xl shadow-2xl w-full max-w-3xl text-gray-100">
        {/* Header */}
        <div className="p-5 border-b border-gray-700 flex justify-between items-center bg-[#3C3D3F] rounded-t-xl">
          <h2 className="text-2xl font-bold text-violet-400">
            Booking Details (ID: {booking.id})
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 p-2">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="flex justify-between items-center p-4 bg-[#3C3D3F] rounded-lg">
            <div>
              <p className="text-base font-semibold text-gray-400">Route:</p>
              <p className="text-xl font-extrabold text-white">
                {booking.pickupAddress} <FaAngleRight className="inline mx-1 text-violet-400" /> {booking.dropAddress}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-400">Cost:</p>
              <p className="text-2xl font-bold text-green-400 flex items-center justify-end">
                <FaRupeeSign className="w-4 h-4" />
                {booking.estimatedCost?.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 border border-gray-700 rounded-lg bg-[#3C3D3F]">
              <p className="font-semibold text-gray-400 flex items-center gap-1">
                <FaBox className="text-violet-400" /> Goods Description:
              </p>
              <p className="font-bold text-white">{booking.goodsDescription}</p>
            </div>
            <div className="p-3 border border-gray-700 rounded-lg bg-[#3C3D3F]">
              <p className="font-semibold text-gray-400 flex items-center gap-1">
                <FaTruckLoading className="text-violet-400" /> Vehicle Type:
              </p>
              <p className="font-bold text-white">{booking.vehicalType}</p>
            </div>
            <div className="p-3 border border-gray-700 rounded-lg bg-[#3C3D3F] col-span-2">
              <p className="font-semibold text-gray-400 flex items-center gap-1">
                <FaShippingFast className="text-violet-400" /> Expected Delivery:
              </p>
              <p className="font-bold text-white">{booking.expectDeliveryDate}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-[#3C3D3F] rounded-b-xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-600 rounded-lg font-semibold text-gray-300 hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
