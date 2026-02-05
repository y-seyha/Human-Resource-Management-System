import React, { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import ActionDropdown from "../components/ui/ActionDropdown";
import MainLayout from "../components/Layouts/DashboardLayout";

const Payroll = () => {
  const [search, setSearch] = useState("");

  const payrollData = [
    {
      id: 1,
      name: "Alice Smith",
      department: "IT",
      salary: 4000,
      bonus: 200,
      deduction: 100,
      net: 4100,
      status: "Paid",
      date: "2026-02-01",
    },
    {
      id: 2,
      name: "Bob Jones",
      department: "HR",
      salary: 3500,
      bonus: 0,
      deduction: 50,
      net: 3450,
      status: "Pending",
      date: "2026-02-01",
    },
    {
      id: 3,
      name: "Charlie Brown",
      department: "Sales",
      salary: 3800,
      bonus: 100,
      deduction: 80,
      net: 3820,
      status: "Paid",
      date: "2026-02-01",
    },
  ];

  const filteredPayroll = payrollData.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatusColor = (status) => {
    if (status === "Paid") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    if (status === "Failed") return "bg-red-100 text-red-700";
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-gray-100 to-blue-50 min-h-screen p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Payroll</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Generate Payroll
          </button>
        </div>

        {/* Search */}
        <SearchBar
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Payroll Table */}
        <div className="bg-white shadow rounded mt-4 overflow-x-auto">
          <table className="min-w-full text-left divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Department</th>
                <th className="p-3">Salary</th>
                <th className="p-3">Bonus</th>
                <th className="p-3">Deductions</th>
                <th className="p-3">Net Pay</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Payment Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayroll.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 font-medium">{emp.name}</td>
                  <td className="p-3">{emp.department}</td>
                  <td className="p-3">${emp.salary}</td>
                  <td className="p-3">${emp.bonus}</td>
                  <td className="p-3">${emp.deduction}</td>
                  <td className="p-3 font-semibold">${emp.net}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                        emp.status,
                      )}`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">{emp.date}</td>
                  <td className="p-3 text-center">
                    <ActionDropdown
                      onEdit={() => alert(`View/Edit ${emp.name}`)}
                      onDelete={() => alert(`Mark Paid ${emp.name}`)}
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

export default Payroll;
