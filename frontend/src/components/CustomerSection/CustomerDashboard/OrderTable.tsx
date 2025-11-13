"use client";

const orders = [
  {
    id: "3039887iu",
    commodity: "kacchha mal",
    source: "Indore, M.P",
    destination: "Kanpur, U.P",
    pickupDate: "10/04/2024",
    deliveryDate: "15/04/2024",
    weight: "10 ton",
    payment: "50000",
    status: "Delivered",
  },
  {
    id: "3039887iu",
    commodity: "kacchha mal",
    source: "Indore, M.P",
    destination: "Kanpur, U.P",
    pickupDate: "10/04/2024",
    deliveryDate: "15/04/2024",
    weight: "10 ton",
    payment: "50000",
    status: "Pending",
  },
];

export default function OrderTable() {
  return (
    <div className="bg-gray-100 dark:bg-background border border-white dark:border-card  rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button className="bg-violet-600 text-gray-50 px-3 py-1 rounded text-sm">Recent Order</button>
        </div>
        <div className="flex items-center gap-2">
          <input
            placeholder="Search Order..."
            className="px-3 py-1 rounded bg-gray-100 dark:bg-card text-sm text-white outline-none"
          />
          <button className="bg-violet-600 text-gray-50 px-3 py-1 rounded text-sm">View More</button>
        </div>
      </div>

      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="py-2">Order ID</th>
            <th className="py-2">Commodity</th>
            <th className="py-2">Delivery Source</th>
            <th className="py-2">Delivery Destination</th>
            <th className="py-2">Pickup Date</th>
            <th className="py-2">Delivery Date</th>
            <th className="py-2">Weight</th>
            <th className="py-2">Payment</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="py-2">{order.id}</td>
              <td className="py-2">{order.commodity}</td>
              <td className="py-2">{order.source}</td>
              <td className="py-2">{order.destination}</td>
              <td className="py-2">{order.pickupDate}</td>
              <td className="py-2">{order.deliveryDate}</td>
              <td className="py-2">{order.weight}</td>
              <td className="py-2">{order.payment}</td>
              <td
                className={`py-2 font-semibold ${
                  order.status === "Delivered" ? "text-green-400" : "text-red-400"
                }`}
              >
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
