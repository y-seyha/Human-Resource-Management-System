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

  // Notification state
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    frequency: "daily",
  });

  // Appearance state
  const [appearance, setAppearance] = useState({
    theme: "light",
    accentColor: "#4F46E5",
    fontSize: "medium",
  });

  // Security state
  const [security, setSecurity] = useState({
    twoFA: false,
    recentLogins: ["Chrome - Feb 4", "Firefox - Feb 3"],
  });

  // Admin/system settings
  const [system, setSystem] = useState({
    departments: ["IT", "HR", "Sales", "Marketing", "Finance"],
    leavePolicy: {
      annual: 12,
      sick: 10,
      unpaid: 5,
    },
    payrollFrequency: "Monthly",
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    const { name, type, checked, value } = e.target;
    setNotifications({
      ...notifications,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAppearanceChange = (e) => {
    setAppearance({ ...appearance, [e.target.name]: e.target.value });
  };

  return (
    <MainLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["account", "notifications", "appearance", "security", "system"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 shadow"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ),
          )}
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded shadow">
          {/* Account Settings */}
          {activeTab === "account" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-2">Profile Information</h2>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                placeholder="Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                placeholder="Phone"
                className="w-full p-2 border rounded"
              />

              <h2 className="text-xl font-bold mt-4 mb-2">Change Password</h2>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleProfileChange}
                placeholder="Current Password"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                name="newPassword"
                value={profile.newPassword}
                onChange={handleProfileChange}
                placeholder="New Password"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                name="confirmPassword"
                value={profile.confirmPassword}
                onChange={handleProfileChange}
                placeholder="Confirm New Password"
                className="w-full p-2 border rounded"
              />

              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-2">
                Notification Preferences
              </h2>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="email"
                  checked={notifications.email}
                  onChange={handleNotificationChange}
                  className="form-checkbox"
                />
                Email Notifications
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="sms"
                  checked={notifications.sms}
                  onChange={handleNotificationChange}
                  className="form-checkbox"
                />
                SMS Notifications
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="push"
                  checked={notifications.push}
                  onChange={handleNotificationChange}
                  className="form-checkbox"
                />
                Push Notifications
              </label>
              <label className="flex items-center gap-2">
                Frequency:
                <select
                  name="frequency"
                  value={notifications.frequency}
                  onChange={handleNotificationChange}
                  className="border p-2 rounded"
                >
                  <option value="immediate">Immediate</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </label>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-2">Appearance</h2>
              <label className="flex items-center gap-2">
                Theme:
                <select
                  name="theme"
                  value={appearance.theme}
                  onChange={handleAppearanceChange}
                  className="border p-2 rounded"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </label>
              <label className="flex items-center gap-2">
                Accent Color:
                <input
                  type="color"
                  name="accentColor"
                  value={appearance.accentColor}
                  onChange={handleAppearanceChange}
                />
              </label>
              <label className="flex items-center gap-2">
                Font Size:
                <select
                  name="fontSize"
                  value={appearance.fontSize}
                  onChange={handleAppearanceChange}
                  className="border p-2 rounded"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </label>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-2">Security</h2>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={security.twoFA}
                  onChange={() =>
                    setSecurity({ ...security, twoFA: !security.twoFA })
                  }
                  className="form-checkbox"
                />
                Enable Two-Factor Authentication (2FA)
              </label>
              <div>
                <h3 className="font-semibold mt-2">Recent Logins:</h3>
                <ul className="list-disc list-inside">
                  {security.recentLogins.map((login, idx) => (
                    <li key={idx}>{login}</li>
                  ))}
                </ul>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          )}

          {/* System/Admin Settings */}
          {activeTab === "system" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-2">
                System / Admin Settings
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
              <label className="flex flex-col gap-1">
                Leave Policy:
                <input
                  type="text"
                  value={`Annual: ${system.leavePolicy.annual}, Sick: ${system.leavePolicy.sick}, Unpaid: ${system.leavePolicy.unpaid}`}
                  readOnly
                  className="border p-2 rounded bg-gray-100 cursor-not-allowed"
                />
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
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
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
