type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const colors: Record<string, string> = {
    Important: "bg-red-500",
    Minor: "bg-yellow-500",
    "Needs Review": "bg-blue-500",
  };

  return (
    <span className={`text-white px-3 py-1 rounded ${colors[status]}`}>
      {status}
    </span>
  );
}
