import React, { useState } from "react";
import MainLayout from "../components/Layouts/DashboardLayout";
import { CSVLink } from "react-csv";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Reports = () => {
  const [filterDept, setFilterDept] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Example Departments
  const departments = ["IT", "HR", "Sales", "Marketing", "Finance"];

  // Summary / Metrics Data
  const employees = [
    { id: 1, name: "Alice", department: "IT", status: "Active" },
    { id: 2, name: "Bob", department: "HR", status: "On Leave" },
    { id: 3, name: "Charlie", department: "Sales", status: "Active" },
    { id: 4, name: "David", department: "Marketing", status: "Active" },
    { id: 5, name: "Eva", department: "Finance", status: "On Leave" },
  ];

  const attendance = [
    { date: "2026-02-01", Present: 4, Absent: 1, Late: 0 },
    { date: "2026-02-02", Present: 3, Absent: 2, Late: 0 },
    { date: "2026-02-03", Present: 5, Absent: 0, Late: 1 },
    { date: "2026-02-04", Present: 4, Absent: 1, Late: 0 },
  ];

  const leaveRequests = [
    {
      id: 1,
      name: "Bob",
      type: "Sick",
      department: "HR",
      start: "2026-02-05",
      end: "2026-02-06",
      status: "Approved",
    },
    {
      id: 2,
      name: "Eva",
      type: "Annual",
      department: "Finance",
      start: "2026-02-07",
      end: "2026-02-08",
      status: "Pending",
    },
  ];

  const payrollData = [
    {
      id: 1,
      name: "Alice",
      department: "IT",
      net: 4100,
      status: "Paid",
      date: "2026-02-01",
    },
    {
      id: 2,
      name: "Bob",
      department: "HR",
      net: 3450,
      status: "Pending",
      date: "-",
    },
  ];

  // Filtered leave requests
  const filteredLeaves = leaveRequests.filter(
    (l) =>
      (filterDept ? l.department === filterDept : true) &&
      (filterStatus ? l.status === filterStatus : true),
  );

  const colors = ["#4ade80", "#facc15", "#f87171"]; // Green, Yellow, Red

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-gray-100 to-blue-50 min-h-screen p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="font-bold text-gray-600">Total Employees</h2>
            <p className="text-2xl font-bold text-gray-800">
              {employees.length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="font-bold text-gray-600">Employees on Leave</h2>
            <p className="text-2xl font-bold text-red-600">
              {employees.filter((e) => e.status === "On Leave").length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="font-bold text-gray-600">Active Employees</h2>
            <p className="text-2xl font-bold text-green-600">
              {employees.filter((e) => e.status === "Active").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <select
            className="border rounded px-3 py-2"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <CSVLink
            data={filteredLeaves}
            filename={"leave-report.csv"}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Export CSV
          </CSVLink>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Attendance Line Chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="font-bold text-gray-700 mb-2">Attendance Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendance}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Present" stroke="#4ade80" />
                <Line type="monotone" dataKey="Absent" stroke="#f87171" />
                <Line type="monotone" dataKey="Late" stroke="#facc15" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Leave Pie Chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="font-bold text-gray-700 mb-2">Leave by Type</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={filteredLeaves}
                  dataKey="id"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={(entry) => entry.type}
                >
                  {filteredLeaves.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Tables */}
        <div className="bg-white shadow rounded overflow-x-auto mb-6">
          <table className="min-w-full text-left divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Department</th>
                <th className="p-3">Leave Type</th>
                <th className="p-3">Start</th>
                <th className="p-3">End</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeaves.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50 transition">
                  <td className="p-3">{l.name}</td>
                  <td className="p-3">{l.department}</td>
                  <td className="p-3">{l.type}</td>
                  <td className="p-3">{l.start}</td>
                  <td className="p-3">{l.end}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        l.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : l.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payroll Table */}
        <div className="bg-white shadow rounded overflow-x-auto mb-6">
          <table className="min-w-full text-left divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Department</th>
                <th className="p-3">Net Pay</th>
                <th className="p-3">Status</th>
                <th className="p-3">Payment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payrollData.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.department}</td>
                  <td className="p-3">${p.net}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        p.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
