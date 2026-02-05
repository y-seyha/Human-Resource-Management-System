import React, { useState } from "react";
import MainLayout from "../components/Layouts/DashboardLayout";
import SearchBar from "../components/ui/SearchBar";
import ActionDropdown from "../components/ui/ActionDropdown";
import { CSVLink } from "react-csv";

const Attendance = () => {
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const departments = ["IT", "HR", "Sales", "Marketing", "Finance"];

  const attendanceData = [
    {
      id: 1,
      name: "Alice Smith",
      department: "IT",
      date: "2026-02-05",
      checkIn: "09:05",
      checkOut: "17:00",
      hours: 7.9,
      status: "Present",
    },
    {
      id: 2,
      name: "Bob Jones",
      department: "HR",
      date: "2026-02-05",
      checkIn: "-",
      checkOut: "-",
      hours: 0,
      status: "Absent",
    },
    {
      id: 3,
      name: "Charlie Brown",
      department: "Sales",
      date: "2026-02-05",
      checkIn: "09:20",
      checkOut: "17:00",
      hours: 7.7,
      status: "Late",
    },
  ];

  // Filters and search
  let filtered = attendanceData.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterDept ? emp.department === filterDept : true) &&
      (filterStatus ? emp.status === filterStatus : true),
  );

  // Sort
  if (sortKey) {
    filtered.sort((a, b) =>
      sortKey === "hours"
        ? b.hours - a.hours
        : a[sortKey].localeCompare(b[sortKey]),
    );
  }

  const getStatusColor = (status) => {
    if (status === "Present") return "bg-green-100 text-green-700";
    if (status === "Late") return "bg-yellow-100 text-yellow-700";
    if (status === "Absent") return "bg-red-100 text-red-700";
  };

  const toggleSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-gray-100 to-blue-50 min-h-screen p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Attendance</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="font-bold text-gray-600">Present Today</h2>
            <p className="text-2xl font-bold text-green-600">
              {attendanceData.filter((emp) => emp.status === "Present").length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="font-bold text-gray-600">Absent Today</h2>
            <p className="text-2xl font-bold text-red-600">
              {attendanceData.filter((emp) => emp.status === "Absent").length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="font-bold text-gray-600">Late Today</h2>
            <p className="text-2xl font-bold text-yellow-600">
              {attendanceData.filter((emp) => emp.status === "Late").length}
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 justify-between">
          <div className="flex flex-1 gap-4">
            <SearchBar
              placeholder="Search by employee name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
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
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>

            <select
              className="border rounded px-3 py-2"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
              <option value="hours">Hours Worked</option>
            </select>
          </div>

          <div className="flex gap-2 mt-2 sm:mt-0">
            <CSVLink
              data={filtered}
              filename={"attendance.csv"}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Export CSV
            </CSVLink>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedRows.length > 0 && (
          <div className="mb-4">
            <span className="font-semibold mr-4">
              {selectedRows.length} selected
            </span>
            <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition">
              Mark Leave
            </button>
            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
              Adjust Hours
            </button>
          </div>
        )}

        {/* Attendance Table */}
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-left divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-center">Select</th>
                <th className="p-3">Employee</th>
                <th className="p-3">Department</th>
                <th className="p-3">Date</th>
                <th className="p-3">Check-in</th>
                <th className="p-3">Check-out</th>
                <th className="p-3">Hours</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(emp.id)}
                      onChange={() => toggleSelect(emp.id)}
                    />
                  </td>
                  <td className="p-3 font-medium">{emp.name}</td>
                  <td className="p-3">{emp.department}</td>
                  <td className="p-3">{emp.date}</td>
                  <td className="p-3">{emp.checkIn}</td>
                  <td className="p-3">{emp.checkOut}</td>
                  <td className="p-3">{emp.hours}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                        emp.status,
                      )}`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <ActionDropdown
                      onEdit={() => alert(`Edit attendance of ${emp.name}`)}
                      onDelete={() => alert(`Mark leave for ${emp.name}`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Attendance;
