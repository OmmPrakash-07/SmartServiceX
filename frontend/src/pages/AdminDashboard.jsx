import axios from "axios";
import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  UserCheck,
  Clock,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import api from "../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [report, setReport] = useState(null);
  const [phpStatus, setPhpStatus] = useState("Checking...");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setError("");
      setLoading(true);

      const [
        usersResponse,
        complaintsResponse,
        assignmentsResponse,
        employeesResponse,
        reportResponse,
      ] = await Promise.all([
        api.get("/users"),
        api.get("/complaints"),
        api.get("/assignments"),
        api.get("/assignments/employees"),
        axios.get("http://localhost:8081/reports.php"),
      ]);

      setUsers(usersResponse.data || []);
      setComplaints(complaintsResponse.data || []);
      setAssignments(assignmentsResponse.data || []);
      setEmployees(employeesResponse.data || []);
      setReport(reportResponse.data || null);

      setPhpStatus("Online");
    } catch (err) {
      console.error("Failed to load admin dashboard:", err);

      setPhpStatus("Offline");

      setError(
        err.response?.data?.message ||
          "Failed to load admin dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const pendingAssignments = assignments.filter(
    (assignment) =>
      assignment.status === "ASSIGNED" ||
      assignment.status === "IN_PROGRESS"
  );

  const resolvedComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "RESOLVED" ||
      complaint.status === "CLOSED"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-600">
          Loading admin dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Admin Dashboard
              </h1>

              <p className="text-slate-500 mt-2">
                Monitor SmartServiceX users, complaints, employees and assignments.
              </p>

              {/* PHP Service Status */}
              <div className="mt-3">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    phpStatus === "Online"
                      ? "bg-green-100 text-green-700"
                      : phpStatus === "Offline"
                      ? "bg-red-100 text-red-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      phpStatus === "Online"
                        ? "bg-green-500"
                        : phpStatus === "Offline"
                        ? "bg-red-500"
                        : "bg-slate-400"
                    }`}
                  />

                  PHP Reporting Service: {phpStatus}
                </span>
              </div>
            </div>

            <button
              onClick={loadDashboard}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw
                size={18}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 text-red-600 px-4 py-3">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

          {/* Total Users */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <Users
              className="text-blue-600 mb-3"
              size={28}
            />

            <p className="text-sm text-slate-500">
              Total Users
            </p>

            <p className="text-3xl font-bold text-slate-800">
              {users.length}
            </p>
          </div>

          {/* Total Complaints */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <FileText
              className="text-purple-600 mb-3"
              size={28}
            />

            <p className="text-sm text-slate-500">
              Total Complaints
            </p>

            <p className="text-3xl font-bold text-slate-800">
              {complaints.length}
            </p>
          </div>

          {/* Employees */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <UserCheck
              className="text-green-600 mb-3"
              size={28}
            />

            <p className="text-sm text-slate-500">
              Employees
            </p>

            <p className="text-3xl font-bold text-slate-800">
              {employees.length}
            </p>
          </div>

          {/* Pending Assignments */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <Clock
              className="text-orange-600 mb-3"
              size={28}
            />

            <p className="text-sm text-slate-500">
              Pending Assignments
            </p>

            <p className="text-3xl font-bold text-slate-800">
              {pendingAssignments.length}
            </p>
          </div>

          {/* Resolved */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <CheckCircle
              className="text-emerald-600 mb-3"
              size={28}
            />

            <p className="text-sm text-slate-500">
              Resolved
            </p>

            <p className="text-3xl font-bold text-slate-800">
              {resolvedComplaints.length}
            </p>
          </div>

        </div>

        {/* PHP Complaint Report */}
        {report && (
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">

            <div className="mb-5">
              <h2 className="text-xl font-semibold text-slate-800">
                Complaint Report
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Live statistics from the PHP reporting service.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

              {/* Open */}
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  Open
                </p>

                <p className="text-2xl font-bold text-slate-800">
                  {report.openComplaints}
                </p>
              </div>

              {/* In Progress */}
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  In Progress
                </p>

                <p className="text-2xl font-bold text-blue-700">
                  {report.inProgressComplaints}
                </p>
              </div>

              {/* Resolved */}
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  Resolved
                </p>

                <p className="text-2xl font-bold text-green-700">
                  {report.resolvedComplaints}
                </p>
              </div>

              {/* Closed */}
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  Closed
                </p>

                <p className="text-2xl font-bold text-purple-700">
                  {report.closedComplaints}
                </p>
              </div>

              {/* Total */}
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  Total
                </p>

                <p className="text-2xl font-bold text-orange-700">
                  {report.totalComplaints}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Recent Complaints */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">

          <h2 className="text-xl font-semibold text-slate-800 mb-5">
            Recent Complaints
          </h2>

          {complaints.length === 0 ? (
            <p className="text-slate-500">
              No complaints found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">

                <thead>
                  <tr className="border-b border-slate-200">

                    <th className="py-3 px-3 text-sm text-slate-500">
                      ID
                    </th>

                    <th className="py-3 px-3 text-sm text-slate-500">
                      Title
                    </th>

                    <th className="py-3 px-3 text-sm text-slate-500">
                      Category
                    </th>

                    <th className="py-3 px-3 text-sm text-slate-500">
                      Priority
                    </th>

                    <th className="py-3 px-3 text-sm text-slate-500">
                      Status
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {complaints
                    .slice(-10)
                    .reverse()
                    .map((complaint) => (
                      <tr
                        key={complaint.id}
                        className="border-b border-slate-100"
                      >

                        <td className="py-3 px-3">
                          #{complaint.id}
                        </td>

                        <td className="py-3 px-3 font-medium text-slate-800">
                          {complaint.title}
                        </td>

                        <td className="py-3 px-3">
                          {complaint.category}
                        </td>

                        {/* Priority */}
                        <td className="py-3 px-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              complaint.priority === "CRITICAL"
                                ? "bg-red-100 text-red-700"
                                : complaint.priority === "HIGH"
                                ? "bg-orange-100 text-orange-700"
                                : complaint.priority === "MEDIUM"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {complaint.priority}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              complaint.status === "RESOLVED" ||
                              complaint.status === "CLOSED"
                                ? "bg-green-100 text-green-700"
                                : complaint.status === "IN_PROGRESS"
                                ? "bg-blue-100 text-blue-700"
                                : complaint.status === "ASSIGNED"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {complaint.status}
                          </span>
                        </td>

                      </tr>
                    ))}
                </tbody>

              </table>
            </div>
          )}

        </div>

        {/* Quick Navigation */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Manage Complaints */}
          <a
            href="/complaints"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <FileText
              className="text-purple-600 mb-3"
              size={28}
            />

            <h3 className="text-lg font-semibold text-slate-800">
              Manage Complaints
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              View and monitor all customer complaints.
            </p>
          </a>

          {/* User Management */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Users
              className="text-blue-600 mb-3"
              size={28}
            />

            <h3 className="text-lg font-semibold text-slate-800">
              User Management
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Monitor registered users and employees.
            </p>
          </div>

          {/* Employee Assignments */}
          <a
            href="/employee-dashboard"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <UserCheck
              className="text-green-600 mb-3"
              size={28}
            />

            <h3 className="text-lg font-semibold text-slate-800">
              Employee Assignments
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Monitor employee assignment activity.
            </p>
          </a>

        </div>

        {/* Employee Management */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Employee Management
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Monitor employee departments and availability.
              </p>
            </div>

            <span className="text-sm font-medium text-slate-600">
              {employees.length} Employees
            </span>
          </div>

          {employees.length === 0 ? (
            <p className="text-slate-500">
              No employees found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">

                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 px-3 text-sm text-slate-500">
                      Employee
                    </th>

                    <th className="py-3 px-3 text-sm text-slate-500">
                      Department
                    </th>

                    <th className="py-3 px-3 text-sm text-slate-500">
                      Designation
                    </th>

                    <th className="py-3 px-3 text-sm text-slate-500">
                      Availability
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="border-b border-slate-100"
                    >
                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-800">
                          {employee.name}
                        </div>

                        <div className="text-sm text-slate-500">
                          {employee.email}
                        </div>
                      </td>

                      <td className="py-3 px-3 text-slate-700">
                        {employee.department}
                      </td>

                      <td className="py-3 px-3 text-slate-700">
                        {employee.designation}
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            employee.isAvailable
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {employee.isAvailable
                            ? "Available"
                            : "Busy"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;