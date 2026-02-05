import React, { useState } from "react";
import MainLayout from "../components/Layouts/DashboardLayout";
import PageHeader from "../components/ui/PageHeader";
import KpiCard from "../components/ui/KpiCard";
import ActionDropdown from "../components/ui/ActionDropdown";
import { CSVLink } from "react-csv";
import { FaUserCheck, FaUserTimes, FaUserClock } from "react-icons/fa";

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

  // Filters + search
  let filtered = attendanceData.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterDept ? emp.department === filterDept : true) &&
      (filterStatus ? emp.status === filterStatus : true),
  );

  // Sorting
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
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Page Header */}
        <PageHeader
          title="Attendance"
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          buttonText="Mark Attendance"
          onButtonClick={() => alert("Mark Attendance clicked")}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <KpiCard
            title="Present Today"
            value={attendanceData.filter((e) => e.status === "Present").length}
            icon={FaUserCheck}
            bgColor="bg-green-500"
          />
          <KpiCard
            title="Absent Today"
            value={attendanceData.filter((e) => e.status === "Absent").length}
            icon={FaUserTimes}
            bgColor="bg-red-500"
          />
          <KpiCard
            title="Late Today"
            value={attendanceData.filter((e) => e.status === "Late").length}
            icon={FaUserClock}
            bgColor="bg-yellow-500"
          />
        </div>

        {/* Filters + CSV Export */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 justify-between">
          <div className="flex flex-1 gap-4 flex-wrap">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>

            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
              <option value="hours">Hours Worked</option>
            </select>
          </div>

          <CSVLink
            data={filtered}
            filename={"attendance.csv"}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-2 sm:mt-0"
          >
            Export CSV
          </CSVLink>
        </div>

        {/* Bulk Actions */}
        {selectedRows.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <span className="font-semibold">
              {selectedRows.length} selected
            </span>
            <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
              Mark Leave
            </button>
            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
              Adjust Hours
            </button>
          </div>
        )}

        {/* Header Row for Desktop */}
        <div className="hidden md:flex bg-gray-100 text-gray-600 font-semibold px-4 py-2 rounded-t-lg">
          <div className="w-1/12 ">Select</div>
          <div className="w-2/12">Employee</div>
          <div className="w-2/12">Department</div>
          <div className="w-2/12">Date</div>
          <div className="w-1/12">Check-in</div>
          <div className="w-1/12">Check-out</div>
          <div className="w-1/12">Hours</div>
          <div className="w-1/12 text-center">Status</div>
          <div className="w-1/12 text-right">Actions</div>
        </div>

        {/* Attendance Cards */}
        <div className="flex flex-col gap-4">
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No attendance records found.
            </p>
          )}

          {filtered.map((emp) => (
            <div
              key={emp.id}
              className="flex flex-col md:flex-row items-start md:items-center bg-white border-b border-gray-200 hover:bg-gray-50 px-4 py-4 md:py-3 rounded-lg transition"
            >
              {/* Checkbox */}
              <div className="w-full md:w-1/12 flex justify-center md:justify-start">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(emp.id)}
                  onChange={() => toggleSelect(emp.id)}
                />
              </div>

              <div className="w-full md:w-2/12 font-medium text-gray-800">
                {emp.name}
              </div>
              <div className="w-full md:w-2/12 text-gray-600">
                {emp.department}
              </div>
              <div className="w-full md:w-2/12 text-gray-600">{emp.date}</div>
              <div className="w-full md:w-1/12 text-gray-600">
                {emp.checkIn}
              </div>
              <div className="w-full md:w-1/12 text-gray-600">
                {emp.checkOut}
              </div>
              <div className="w-full md:w-1/12 text-gray-600">{emp.hours}</div>

              <div className="w-full md:w-1/12 flex justify-center md:justify-start">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                    emp.status,
                  )}`}
                >
                  {emp.status}
                </span>
              </div>

              <div className="w-full md:w-1/12 flex justify-end gap-2 mt-2 md:mt-0">
                <ActionDropdown
                  onEdit={() => alert(`Edit attendance of ${emp.name}`)}
                  onDelete={() => alert(`Mark leave for ${emp.name}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Attendance;
