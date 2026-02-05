import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import MainLayout from "../components/Layouts/DashboardLayout";
import Navbar from "../components/ui/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Dashboard = () => {
  const employees = [
    { id: 1, name: "Alice", dept: "IT", status: "Active" },
    { id: 2, name: "Bob", dept: "HR", status: "On Leave" },
    { id: 3, name: "Charlie", dept: "Sales", status: "Active" },
    { id: 4, name: "Diana", dept: "Marketing", status: "Active" },
    { id: 5, name: "Evan", dept: "IT", status: "Active" },
    { id: 6, name: "Frank", dept: "HR", status: "Active" },
  ];

  const leaves = [
    {
      name: "Alice",
      type: "Sick",
      from: "2026-02-01",
      to: "2026-02-03",
      status: "Pending",
    },
    {
      name: "Bob",
      type: "Annual",
      from: "2026-02-05",
      to: "2026-02-07",
      status: "Approved",
    },
    {
      name: "Charlie",
      type: "Emergency",
      from: "2026-02-08",
      to: "2026-02-09",
      status: "Pending",
    },
    {
      name: "Diana",
      type: "Annual",
      from: "2026-02-10",
      to: "2026-02-12",
      status: "Approved",
    },
    {
      name: "Evan",
      type: "Sick",
      from: "2026-02-13",
      to: "2026-02-14",
      status: "Approved",
    },
    {
      name: "Frank",
      type: "Annual",
      from: "2026-02-15",
      to: "2026-02-18",
      status: "Pending",
    },
  ];

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Attendance",
        data: [80, 75, 90, 85, 95, 100],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79,70,229,0.2)",
      },
    ],
  };

  const pieData = {
    labels: ["HR", "IT", "Sales", "Marketing"],
    datasets: [
      {
        label: "Payroll Distribution",
        data: [5000, 7000, 6000, 4000],
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"],
      },
    ],
  };

  return (
    <MainLayout>
      <div>
        <Navbar />
      </div>
      <div className="bg-gradient-to-r from-gray-100 to-blue-50 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* TABLES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Employee List */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Employee List (Top 5)
            </h2>

            <table className="min-w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.slice(0, 5).map((emp) => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{emp.id}</td>
                    <td className="p-3 font-medium">{emp.name}</td>
                    <td className="p-3">{emp.dept}</td>
                    <td
                      className={`p-3 font-semibold ${
                        emp.status === "Active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {emp.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Leave Requests */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Leave Requests (Top 5)
            </h2>

            <table className="min-w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Employee</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">From</th>
                  <th className="p-3">To</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.slice(0, 5).map((leave, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">{leave.name}</td>
                    <td className="p-3">{leave.type}</td>
                    <td className="p-3">{leave.from}</td>
                    <td className="p-3">{leave.to}</td>
                    <td className="p-3 font-semibold">{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-4 h-80">
            <Line
              data={lineData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>

          <div className="bg-white shadow rounded-lg p-4 h-80">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
