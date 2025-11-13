"use client";

const cards = [
  { title: "Total Orders", value: "134" },
  { title: "Total Payments", value: "134" },
  { title: "Track Shipment" },
  { title: "Book a Vehicle" },
];

export default function InfoCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 p-2">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-gray-100 dark:bg-card p-4 rounded-lg flex flex-col justify-between"
        >
          <p className="text-gray-400 dark:text-gray-100 text-sm">{card.title}</p>
          {card.value && <p className="text-2xl font-semibold mt-1">{card.value}</p>}
        </div>
      ))}
    </div>
  );
}
