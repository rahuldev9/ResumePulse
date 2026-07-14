import StatusBadge from "./StatusBadge";

type Props = {
  change: {
    type: string;
    oldValue: string;
    newValue: string;
    severity: string;
  };
};

export default function ChangeCard({ change }: Props) {
  return (
    <div className="bg-white rounded shadow p-5 mb-4">
      <StatusBadge status={change.severity} />

      <h3 className="font-bold mt-3">{change.type}</h3>

      <div className="mt-2">
        <p>
          <strong>Old:</strong> {change.oldValue}
        </p>

        <p>
          <strong>New:</strong> {change.newValue}
        </p>
      </div>
    </div>
  );
}
