import { calculateUniqueDays } from "@/utils";

const TimeSummary = ({ tasks }) => {
  const totalMinutes = tasks.length * 25;
  const totalHours = totalMinutes / 60;
  const totalDays = calculateUniqueDays(tasks);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
      <SummaryCard label="Days" value={totalDays} />
      <SummaryCard label="Hours" value={totalHours.toFixed(2)} />
      <SummaryCard
        label="Minutes"
        value={`${tasks.length} * 25 = ${totalMinutes}`}
      />
      <SummaryCard label="Total Tasks" value={tasks.length} />
    </div>
  );
};

export default TimeSummary;

// Reusable summary card component
const SummaryCard = ({ label, value }) => (
  <div className="bg-primary lg:bg-gray-100 text-white md:text-black p-2 rounded-lg shadow-sm">
    <span className="text-sm font-semibold">{label}</span>
    <div className="text-lg font-bold">{value}</div>
  </div>
);
