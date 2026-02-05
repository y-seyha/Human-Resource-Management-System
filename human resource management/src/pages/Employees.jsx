import React, { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import ActionDropdown from "../components/ui/ActionDropdown";
import MainLayout from "../components/Layouts/DashboardLayout";

const Employees = () => {
  const [search, setSearch] = useState("");

  const employees = [
    {
      id: 1,
      name: "Alice Smith",
      email: "alice@example.com",
      department: "IT",
      position: "Web Developer",
      role: "Developer",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Jones",
      email: "bob@example.com",
      department: "HR",
      position: "Human Resource",
      role: "HR Manager",
      status: "On Leave",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      department: "Sales",
      position: "Sale Executive",
      role: "Sales Rep",
      status: "Active",
    },
  ];

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-gray-100 to-blue-50  p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Employee
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Employee Table */}
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Department</th>
                <th className="p-3">Position</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{emp.id}</td>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.department}</td>
                  <td className="p-3">{emp.position}</td>
                  <td className="p-3">{emp.role}</td>
                  <td
                    className={`p-3 font-semibold ${
                      emp.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {emp.status}
                  </td>
                  <td className="p-3">
                    <ActionDropdown
                      onEdit={() => alert(`Edit ${emp.name}`)}
                      onDelete={() => alert(`Delete ${emp.name}`)}
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

export default Employees;
