"use client";


interface Order {
  id: number;
  pickupAddress: string;
  dropAddress: string;
  expectDeliveryDate: string;
  goodsDescription: string;
  estimatedCost: number;
  vehicleType: string;
  status: string;
}


interface Props {
  orders: Order[];
}

export default function LoadHistory({ orders }: Props) {
  return (
    <div className="bg-white dark:bg-card mx-4 p-8 rounded-2xl shadow-md">
        <div className="flex justify-between"><h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-300">Load History</h2>
       <button
        onClick={() => (window.location.href = "/customer/orders")}
        className="mb-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
      >
        Show More
      </button></div>
      
      <table className="w-full text-left   ">
        <thead  className=" p-5 " >
          <tr className="text-gray-600 dark:text-gray-300 border-b border-zinc-700 ">
            <th className="py-2 bg-gray-50 dark:bg-background hover:bg-purple-300 dark:hover:bg-purple-600 dark:hover-text-white">Goods</th>
            <th className="py-2 bg-gray-50 dark:bg-background hover:bg-purple-300 dark:hover:bg-purple-600 dark:hover-text-white">Pickup</th>
            <th className="py-2 bg-gray-50 dark:bg-background hover:bg-purple-300 dark:hover:bg-purple-600 dark:hover-text-white">Drop</th>
            <th className="py-2 bg-gray-50 dark:bg-background hover:bg-purple-300 dark:hover:bg-purple-600 dark:hover-text-white">Status</th>
          </tr>
        </thead>
        <tbody className=" p-5 ">
          {orders.slice(0, 5).map((order) => (
            <tr key={order.id} className="border-b border-gray-200 dark:border-card bg-gray-50 dark:bg-background hover:bg-purple-300 dark:hover:bg-purple-600 dark:hover-text-white">
              <td className="py-2 ">{order.goodsDescription}</td>
              <td className="py-2 ">{order.pickupAddress}</td>
              <td className="py-2 ">{order.dropAddress}</td>
              <td className="py-2 ">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
}
