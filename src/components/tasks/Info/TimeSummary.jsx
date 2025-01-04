import { calculateUniqueDays } from "@/utils";

const TimeSummary = ({ tasks }) => {
  const totalMinutes = tasks.length * 25;
  const totalHours = Math.floor(totalMinutes / 60); // Convert to whole hours

  // Calculate total unique days based on tasks
  const totalDays = calculateUniqueDays(tasks);

  // Get all task dates
  const taskDates = tasks.map((task) => new Date(task.timestamp)); // Assuming each task has a `timestamp` field

  // Determine the first and last dates in the tasks
  const minDate = new Date(Math.min(...taskDates.map((date) => date.getTime())));
  const maxDate = new Date(Math.max(...taskDates.map((date) => date.getTime())));

  // Calculate the total days in the date range
  const totalCalendarDays =
    Math.round((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1; // Inclusive of start and end date

  // Calculate skipped days
  const skippedDays = totalCalendarDays - totalDays;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-center">
      <SummaryCard label="Days" value={totalDays} />
      <SummaryCard label="Skipped Days" value={Math.max(0, skippedDays)} />
      <SummaryCard label="Hours" value={totalHours} />
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
