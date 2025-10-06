interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
}

export default function StatsCard({ title, value, icon, color = "bg-primary" }: StatsCardProps) {
  return (
    <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`p-3 rounded-full text-white ${color}`}>{icon}</div>
    </div>
  );
}
