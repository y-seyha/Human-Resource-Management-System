import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import MainLayout from "../components/Layouts/DashboardLayout";
import PageHeader from "../components/ui/PageHeader";

const LeaveManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const leaveRequests = [
    {
      id: 1,
      name: "Alice Smith",
      department: "IT",
      type: "Sick",
      start: "2026-02-10",
      end: "2026-02-12",
      days: 3,
      status: "Pending",
    },
    {
      id: 2,
      name: "Bob Jones",
      department: "HR",
      type: "Annual",
      start: "2026-02-15",
      end: "2026-02-18",
      days: 4,
      status: "Approved",
    },
    {
      id: 3,
      name: "Charlie Brown",
      department: "Sales",
      type: "Sick",
      start: "2026-02-05",
      end: "2026-02-06",
      days: 2,
      status: "Rejected",
    },
  ];

  const getStatusColor = (status) => {
    if (status === "Approved") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
  };

  const filteredRequests = leaveRequests.filter((req) => {
    const matchesSearch =
      req.name.toLowerCase().includes(search.toLowerCase()) ||
      req.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || req.status === statusFilter;
    const matchesType = typeFilter === "All" || req.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const leaveTypes = ["All", ...new Set(leaveRequests.map((r) => r.type))];
  const statuses = ["All", "Pending", "Approved", "Rejected"];

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Page Header */}
        <PageHeader
          title="Leave Management"
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          buttonText="Apply Leave"
          onButtonClick={() => alert("Apply Leave clicked")}
        />

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {leaveTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Header Row */}
        <div className="hidden md:flex bg-gray-100 text-gray-600 font-semibold px-4 py-2 rounded-t-lg">
          <div className="w-1/12">#</div>
          <div className="w-3/12">Employee</div>
          <div className="w-2/12">Department</div>
          <div className="w-2/12">Type</div>
          <div className="w-3/12">Dates</div>
          <div className="w-1/12">Status</div>
          <div className="w-1/12 text-right">Actions</div>
        </div>

        {/* Leave Cards */}
        <div className="flex flex-col">
          {filteredRequests.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No leave requests found.
            </p>
          )}

          {filteredRequests.map((req, index) => (
            <div
              key={req.id}
              className="flex flex-col md:flex-row items-start md:items-center bg-white border-b border-gray-200 hover:bg-gray-50 px-4 py-4 md:py-3 transition rounded-lg"
            >
              <div className="w-full md:w-1/12 font-medium text-gray-700">
                {index + 1}
              </div>
              <div className="w-full md:w-3/12 font-medium text-gray-800">
                {req.name}
              </div>
              <div className="w-full md:w-2/12 text-gray-600">
                {req.department}
              </div>
              <div className="w-full md:w-2/12 text-gray-600">{req.type}</div>
              <div className="w-full md:w-3/12 text-gray-600">
                {req.start} → {req.end} ({req.days} days)
              </div>
              <div className="w-full md:w-1/12 flex justify-center md:justify-start">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                    req.status,
                  )}`}
                >
                  {req.status}
                </span>
              </div>
              <div className="w-full md:w-1/12 flex justify-end gap-2 mt-2 md:mt-0">
                <button className="text-blue-600 hover:text-blue-800 transition">
                  <FaEdit />
                </button>
                <button className="text-red-600 hover:text-red-800 transition">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default LeaveManagement;
