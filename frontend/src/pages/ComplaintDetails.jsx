import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  User,
  Building2,
} from "lucide-react";
import api from "../services/api";

function ComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        // Get complaint details from Java backend
        const complaintResponse = await api.get(
          `/complaints/${id}`
        );

        setComplaint(complaintResponse.data);

        try {
          // Get assignment through Java backend gateway
          const assignmentResponse = await api.get(
            `/complaints/${id}/assignment`
          );

          setAssignment(assignmentResponse.data);
        } catch (assignmentError) {
          console.error(
            "Assignment API Error:",
            assignmentError.response?.status,
            assignmentError.response?.data ||
              assignmentError.message
          );

          // Assignment may not exist yet
          setAssignment(null);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load complaint details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintDetails();
  }, [id]);

  const getStatusClass = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-blue-100 text-blue-700";

      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-700";

      case "RESOLVED":
        return "bg-green-100 text-green-700";

      case "CLOSED":
        return "bg-slate-200 text-slate-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getAssignmentStatusClass = (status) => {
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
          Loading complaint...
        </p>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 text-center">
          <p className="text-red-600">
            {error || "Complaint not found"}
          </p>

          <Link
            to="/complaints"
            className="inline-flex items-center gap-2 mt-6 text-blue-600 font-semibold"
          >
            <ArrowLeft size={18} />
            Back to Complaints
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <Link
          to="/complaints"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Complaints
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm text-slate-500 mb-2">
                Complaint #{complaint.id}
              </p>

              <h1 className="text-3xl font-bold text-slate-800">
                {complaint.title}
              </h1>
            </div>

            <span
              className={`self-start px-4 py-2 rounded-full text-sm font-semibold ${getStatusClass(
                complaint.status
              )}`}
            >
              {complaint.status}
            </span>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              Description
            </h2>

            <p className="text-slate-600 leading-7">
              {complaint.description}
            </p>
          </div>

          {/* Complaint Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

            <div className="bg-slate-50 rounded-xl p-5">
              <p className="text-sm text-slate-500">
                Category
              </p>

              <p className="font-semibold text-slate-800 mt-1">
                {complaint.category || "Not classified"}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5">
              <p className="text-sm text-slate-500">
                Priority
              </p>

              <p className="font-semibold text-slate-800 mt-1">
                {complaint.priority || "Not assigned"}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5">
              <p className="text-sm text-slate-500">
                Department
              </p>

              <p className="font-semibold text-slate-800 mt-1">
                {assignment?.employee?.department ||
                  "Not assigned"}
              </p>
            </div>

          </div>

          {/* Assignment Information */}
          {assignment && (
            <div className="border-t pt-8 mb-8">

              <h2 className="text-lg font-semibold text-slate-800 mb-5">
                Assignment Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Employee */}
                <div className="bg-blue-50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <User
                      size={18}
                      className="text-blue-600"
                    />

                    <p className="text-sm text-slate-500">
                      Assigned Employee
                    </p>
                  </div>

                  <p className="font-semibold text-slate-800">
                    {assignment.employee?.name ||
                      "Not assigned"}
                  </p>
                </div>

                {/* Department */}
                <div className="bg-purple-50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2
                      size={18}
                      className="text-purple-600"
                    />

                    <p className="text-sm text-slate-500">
                      Department
                    </p>
                  </div>

                  <p className="font-semibold text-slate-800">
                    {assignment.employee?.department ||
                      "Not assigned"}
                  </p>
                </div>

                {/* Assignment Status */}
                <div className="bg-green-50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle
                      size={18}
                      className="text-green-600"
                    />

                    <p className="text-sm text-slate-500">
                      Assignment Status
                    </p>
                  </div>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getAssignmentStatusClass(
                      assignment.status
                    )}`}
                  >
                    {assignment.status}
                  </span>
                </div>

              </div>
            </div>
          )}

          {/* Status Timeline */}
          <div className="border-t pt-8">

            <h2 className="text-lg font-semibold text-slate-800 mb-6">
              Complaint Status
            </h2>

            <div className="space-y-5">

              {/* Submitted */}
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                  <Clock size={20} />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    Complaint Submitted
                  </p>

                  <p className="text-sm text-slate-500">
                    Your complaint has been registered.
                  </p>
                </div>
              </div>

              {/* Assigned */}
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 text-yellow-600 rounded-full p-2">
                  <User size={20} />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    Complaint Assigned
                  </p>

                  <p className="text-sm text-slate-500">
                    {assignment
                      ? `Assigned to ${assignment.employee?.name} (${assignment.employee?.department}).`
                      : "Your complaint is waiting for assignment."}
                  </p>
                </div>
              </div>

              {/* Resolution */}
              <div className="flex items-center gap-4">
                <div className="bg-green-100 text-green-600 rounded-full p-2">
                  <CheckCircle size={20} />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    Resolution
                  </p>

                  <p className="text-sm text-slate-500">
                    The complaint will be resolved and closed.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;