import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Plus } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Complaints() {
  const { user } = useAuth();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await api.get(
          `/complaints/user/${user.id}`
        );

        setComplaints(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Failed to load complaints"
        );
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchComplaints();
    }
  }, [user]);

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

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              My Complaints
            </h1>

            <p className="text-slate-500 mt-2">
              View and track your service complaints.
            </p>
          </div>

          <Link
            to="/complaints/create"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            <Plus size={20} />
            New Complaint
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 text-red-600 px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-slate-500">
              Loading complaints...
            </p>
          </div>
        ) : complaints.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-800">
              No complaints yet
            </h2>

            <p className="text-slate-500 mt-2">
              Create your first complaint to get started.
            </p>

            <Link
              to="/complaints/create"
              className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Create Complaint
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Title
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Category
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Priority
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {complaints.map((complaint) => (
                    <tr
                      key={complaint.id}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">
                          {complaint.title}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {complaint.category || "—"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {complaint.priority || "—"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                            complaint.status
                          )}`}
                        >
                          {complaint.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          to={`/complaints/${complaint.id}`}
                          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                        >
                          <Eye size={18} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Complaints;