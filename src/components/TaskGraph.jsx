import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement
);

const TaskGraph = ({ tasks }) => {
  const taskStats = tasks.reduce((stats, task) => {
    if (task.status === "completed") {
      const date = new Date(task.timestamp).toLocaleDateString();
      stats[date] = (stats[date] || 0) + 1;
    }
    return stats;
  }, {});

  const data = {
    labels: Object.keys(taskStats), // Dates
    datasets: [
      {
        label: "Tasks Completed",
        data: Object.values(taskStats), // Task counts
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        fill: true,
        tension: 0.3,
        pointStyle: "circle",
        pointRadius: 3, // Smaller point radius
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures better responsiveness
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: "Date", font: { size: 12 } } },
      y: {
        title: { display: true, text: "Tasks Completed", font: { size: 12 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="my-4 p-2 border rounded-lg shadow-md w-full  h-80">
      <h2 className="text-lg font-semibold mb-2">Task Completion Over Time</h2>
      <div style={{ width: "100%", height: "100%" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TaskGraph;
