import React, { useState } from "react";
import MainLayout from "../components/Layouts/DashboardLayout";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");

  // Account state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  // const [notifications, setNotifications] = useState({
  //   email: true,
  //   sms: false,
  //   push: true,
  //   frequency: "daily",
  // });

  const [appearance, setAppearance] = useState({
    theme: "light",
    accentColor: "#4F46E5",
    fontSize: "medium",
  });

  const [security, setSecurity] = useState({
    twoFA: false,
    recentLogins: ["Chrome - Feb 4", "Firefox - Feb 3"],
  });

  const [system, setSystem] = useState({
    departments: ["IT", "HR", "Sales", "Marketing", "Finance"],
    leavePolicy: { annual: 12, sick: 10, unpaid: 5 },
    payrollFrequency: "Monthly",
  });

  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });
  // const handleNotificationChange = (e) => {
  //   const { name, type, checked, value } = e.target;
  //   setNotifications({
  //     ...notifications,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };
  const handleAppearanceChange = (e) =>
    setAppearance({ ...appearance, [e.target.name]: e.target.value });

  const tabs = [
    { key: "account", label: "Account" },
    { key: "notifications", label: "Notifications" },
    { key: "appearance", label: "Appearance" },
    { key: "security", label: "Security" },
    { key: "system", label: "System" },
  ];

  return (
    <MainLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full font-semibold transition ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg p-6">
          {/* Account */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-2">Profile Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  placeholder="Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  placeholder="Phone"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <h2 className="text-xl font-bold border-b pb-2 mt-4">
                Change Password
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleProfileChange}
                  placeholder="Current Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={profile.newPassword}
                  onChange={handleProfileChange}
                  placeholder="New Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleProfileChange}
                  placeholder="Confirm Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-2">Security</h2>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={security.twoFA}
                  onChange={() =>
                    setSecurity({ ...security, twoFA: !security.twoFA })
                  }
                  className="form-checkbox h-5 w-5"
                />
                Enable Two-Factor Authentication
              </label>

              <div>
                <h3 className="font-semibold mt-2">Recent Logins:</h3>
                <ul className="list-disc list-inside">
                  {security.recentLogins.map((login, idx) => (
                    <li key={idx}>{login}</li>
                  ))}
                </ul>
              </div>

              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "system" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-2">
                System / Admin
              </h2>
              <label className="flex flex-col gap-1">
                Departments:
                <input
                  type="text"
                  value={system.departments.join(", ")}
                  readOnly
                  className="border p-2 rounded bg-gray-100 cursor-not-allowed"
                />
                <small className="text-gray-500">
                  Manage departments from admin panel.
                </small>
              </label>
              <label className="flex items-center gap-2">
                Payroll Frequency:
                <select
                  value={system.payrollFrequency}
                  onChange={(e) =>
                    setSystem({ ...system, payrollFrequency: e.target.value })
                  }
                  className="border p-2 rounded"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Biweekly">Biweekly</option>
                </select>
              </label>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-2">Appearance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="flex flex-col">
                  Theme:
                  <select
                    name="theme"
                    value={appearance.theme}
                    onChange={handleAppearanceChange}
                    className="border p-2 rounded mt-1"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </label>
                <label className="flex flex-col">
                  Accent Color:
                  <input
                    type="color"
                    name="accentColor"
                    value={appearance.accentColor}
                    onChange={handleAppearanceChange}
                    className="mt-1 h-10 w-16"
                  />
                </label>
                <label className="flex flex-col">
                  Font Size:
                  <select
                    name="fontSize"
                    value={appearance.fontSize}
                    onChange={handleAppearanceChange}
                    className="border p-2 rounded mt-1"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </label>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
