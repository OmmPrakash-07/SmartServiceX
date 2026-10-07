import { useEffect, useState } from "react";
import {
  ClipboardList,
  User,
  Clock,
  CheckCircle,
} from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function EmployeeDashboard() {
  const { user } = useAuth();

  const [assignments, setAssignments] = useState([]);
  const [complaints, setComplaints] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setError("");

        const assignmentResponse =
          await api.get("/assignments");

        const allAssignments =
          assignmentResponse.data || [];

        const myAssignments = allAssignments.filter(
          (assignment) =>
            assignment.employee?.email?.toLowerCase() ===
            user?.email?.toLowerCase()
        );

        setAssignments(myAssignments);

        const complaintData = {};

        await Promise.all(
          myAssignments.map(async (assignment) => {
            try {
              const response = await api.get(
                `/complaints/${assignment.complaintId}`
              );

              complaintData[assignment.complaintId] =
                response.data;
            } catch (err) {
              console.error(
                `Failed to load complaint ${assignment.complaintId}`,
                err
              );
            }
          })
        );

        setComplaints(complaintData);
      } catch (err) {
        console.error(
          "Employee Dashboard Error:",
          err
        );

        console.error(
          "Server response:",
          err.response?.data
        );

        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load employee assignments"
        );
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchAssignments();
    }
  }, [user]);

  /*
   * Update assignment status through
   * Java → C# Assignment Service.
   */
  const updateAssignmentStatus = async (
    assignmentId,
    status
  ) => {
    try {
      setError("");

      await api.put(
        `/assignments/${assignmentId}/status`,
        {
          status,
        }
      );

      /*
       * Update the UI immediately.
       */
      setAssignments((currentAssignments) =>
        currentAssignments.map((assignment) =>
          assignment.id === assignmentId
            ? {
                ...assignment,
                status,
              }
            : assignment
        )
      );
    } catch (err) {
      console.error(
        "Failed to update assignment status:",
        err
      );

      console.error(
        "Server response:",
        err.response?.data
      );

      setError(
        err.response?.data?.message ||
          "Failed to update assignment status"
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "ASSIGNED":
        return "bg-blue-100 text-blue-700";

      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-700";

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "CLOSED":
        return "bg-slate-200 text-slate-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500">
          Loading employee dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Employee Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome, {user?.name || "Employee"}
          </p>
        </div>

        {/* Employee Information */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

          <div className="flex items-center gap-3 mb-5">
            <User className="text-blue-600" />

            <h2 className="text-xl font-semibold text-slate-800">
              Employee Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Name
              </p>

              <p className="font-semibold text-slate-800 mt-1">
                {user?.name}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="font-semibold text-slate-800 mt-1">
                {user?.email}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Role
              </p>

              <p className="font-semibold text-slate-800 mt-1">
                {user?.role}
              </p>
            </div>

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 text-red-600 px-4 py-3">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Total */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <ClipboardList
              className="text-blue-600"
              size={30}
            />

            <p className="text-3xl font-bold text-slate-800 mt-4">
              {assignments.length}
            </p>

            <p className="text-slate-500 mt-1">
              Total Assignments
            </p>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Clock
              className="text-yellow-500"
              size={30}
            />

            <p className="text-3xl font-bold text-slate-800 mt-4">
              {
                assignments.filter(
                  (a) =>
                    a.status === "ASSIGNED" ||
                    a.status === "IN_PROGRESS"
                ).length
              }
            </p>

            <p className="text-slate-500 mt-1">
              Pending
            </p>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <CheckCircle
              className="text-green-600"
              size={30}
            />

            <p className="text-3xl font-bold text-slate-800 mt-4">
              {
                assignments.filter(
                  (a) =>
                    a.status === "COMPLETED" ||
                    a.status === "CLOSED"
                ).length
              }
            </p>

            <p className="text-slate-500 mt-1">
              Completed
            </p>
          </div>

        </div>

        {/* Assigned Complaints */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-slate-800">
              My Assigned Complaints
            </h2>

            <p className="text-slate-500 mt-1">
              Complaints assigned to you.
            </p>
          </div>

          {assignments.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-slate-500">
                No complaints assigned to you.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">

                <thead className="bg-slate-50 border-b">
                  <tr>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Complaint
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Category
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Priority
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Complaint Status
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Assignment Status
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y">

                  {assignments.map((assignment) => {
                    const complaint =
                      complaints[assignment.complaintId];

                    return (
                      <tr
                        key={assignment.id}
                        className="hover:bg-slate-50"
                      >

                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">
                            {complaint?.title ||
                              `Complaint #${assignment.complaintId}`}
                          </p>

                          <p className="text-sm text-slate-500 mt-1">
                            #{assignment.complaintId}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {complaint?.category || "—"}
                        </td>

                        <td className="px-6 py-4">
                          <span className="font-semibold text-slate-700">
                            {complaint?.priority || "—"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                              complaint?.status
                            )}`}
                          >
                            {complaint?.status || "—"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">

                            <span
                              className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                                assignment.status
                              )}`}
                            >
                              {assignment.status}
                            </span>

                            {assignment.status === "ASSIGNED" && (
                              <button
                                onClick={() =>
                                  updateAssignmentStatus(
                                    assignment.id,
                                    "IN_PROGRESS"
                                  )
                                }
                                className="w-fit rounded-lg bg-yellow-500 px-3 py-2 text-xs font-semibold text-white hover:bg-yellow-600"
                              >
                                Start Work
                              </button>
                            )}

                            {assignment.status === "IN_PROGRESS" && (
                              <button
                                onClick={() =>
                                  updateAssignmentStatus(
                                    assignment.id,
                                    "COMPLETED"
                                  )
                                }
                                className="w-fit rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700"
                              >
                                Complete
                              </button>
                            )}

                          </div>
                        </td>

                      </tr>
                    );
                  })}

                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default EmployeeDashboard;