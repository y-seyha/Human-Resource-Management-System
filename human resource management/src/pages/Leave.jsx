import React, { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import ActionDropdown from "../components/ui/ActionDropdown";
import MainLayout from "../components/Layouts/DashboardLayout";

const LeaveManagement = () => {
  const [search, setSearch] = useState("");

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

  const filteredRequests = leaveRequests.filter((req) =>
    req.name.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatusColor = (status) => {
    if (status === "Approved") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-gray-100 to-blue-50 min-h-screen p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Leave Management</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Apply Leave
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search leave requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Leave Table */}
        <div className="bg-white shadow rounded overflow-x-auto mt-4">
          <table className="min-w-full text-left">
            <thead className="bg-gray-200 sticky top-0 shadow-sm">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Department</th>
                <th className="p-3">Type</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">End Date</th>
                <th className="p-3">Days</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-3 font-medium">{req.name}</td>
                  <td className="p-3">{req.department}</td>
                  <td className="p-3">{req.type}</td>
                  <td className="p-3">{req.start}</td>
                  <td className="p-3">{req.end}</td>
                  <td className="p-3">{req.days}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(req.status)}`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <ActionDropdown
                      onEdit={() => alert(`Approve/Reject ${req.name}`)}
                      onDelete={() => alert(`Delete request of ${req.name}`)}
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

export default LeaveManagement;
