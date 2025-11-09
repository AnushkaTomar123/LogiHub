

const statusColors: Record<string, string> = {
  AVAILABLE: "bg-green-600",
  ON_ROUTE: "bg-red-600",
  UNAVAILABLE: "bg-yellow-500",
  MAINTENANCE: "bg-orange-500",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-3 py-1 text-xs rounded-full ${statusColors[status]} capitalize`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
