import React, { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import ActionDropdown from "../components/ui/ActionDropdown";
import MainLayout from "../components/Layouts/DashboardLayout";

const Payroll = () => {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

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

  // Unique departments for filter
  const departments = ["All", ...new Set(payrollData.map((p) => p.department))];

  const getStatusColor = (status) => {
    if (status === "Paid") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    if (status === "Failed") return "bg-red-100 text-red-700";
  };

  // Filtered payroll
  const filteredPayroll = payrollData.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept =
      departmentFilter === "All" || emp.department === departmentFilter;
    const matchesStatus = statusFilter === "All" || emp.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Page Header */}
        <PageHeader
          title="Payroll"
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          buttonText="Generate Payroll"
          onButtonClick={() => alert("Generate Payroll clicked")}
        />

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Header Row for Cards */}
        <div className="hidden md:flex bg-gray-100 text-gray-600 font-semibold px-4 py-2 rounded-t-lg">
          <div className="w-1/12">#</div>
          <div className="w-2/12">Employee</div>
          <div className="w-2/12">Department</div>
          <div className="w-1/12">Salary</div>
          <div className="w-1/12">Bonus</div>
          <div className="w-1/12">Deduction</div>
          <div className="w-1/12">Net</div>
          <div className="w-1/12">Status</div>
          <div className="w-2/12">Date</div>
          <div className="w-1/12 text-right">Actions</div>
        </div>

        {/* Payroll Cards */}
        <div className="flex flex-col">
          {filteredPayroll.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No payroll records found.
            </p>
          )}

          {filteredPayroll.map((emp, index) => (
            <div
              key={emp.id}
              className="flex flex-col md:flex-row items-start md:items-center bg-white border-b border-gray-200 hover:bg-gray-50 px-4 py-4 md:py-3 transition rounded-lg"
            >
              <div className="w-full md:w-1/12 font-medium text-gray-700">
                {index + 1}
              </div>
              <div className="w-full md:w-2/12 font-medium text-gray-800">
                {emp.name}
              </div>
              <div className="w-full md:w-2/12 text-gray-600">
                {emp.department}
              </div>
              <div className="w-full md:w-1/12 text-gray-600">
                ${emp.salary}
              </div>
              <div className="w-full md:w-1/12 text-gray-600">${emp.bonus}</div>
              <div className="w-full md:w-1/12 text-gray-600">
                ${emp.deduction}
              </div>
              <div className="w-full md:w-1/12 font-semibold">${emp.net}</div>
              <div className="w-full md:w-1/12 flex justify-center md:justify-start">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                    emp.status,
                  )}`}
                >
                  {emp.status}
                </span>
              </div>
              <div className="w-full md:w-2/12 text-gray-600">{emp.date}</div>
              <div className="w-full md:w-1/12 flex justify-end gap-2 mt-2 md:mt-0">
                <ActionDropdown
                  onEdit={() => alert(`View/Edit ${emp.name}`)}
                  onDelete={() => alert(`Mark Paid ${emp.name}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Payroll;
