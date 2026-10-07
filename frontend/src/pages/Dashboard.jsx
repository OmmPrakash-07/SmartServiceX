import { Link } from "react-router-dom";
import { FileText, PlusCircle, Clock, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome, {user?.name || "User"} 👋
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your complaints and service requests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/complaints/create"
            className="bg-blue-600 text-white rounded-2xl p-6 hover:bg-blue-700 transition"
          >
            <PlusCircle size={32} />

            <h2 className="text-xl font-semibold mt-4">
              Create Complaint
            </h2>

            <p className="text-blue-100 mt-2">
              Submit a new service complaint.
            </p>
          </Link>

          <Link
            to="/complaints"
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <FileText size={32} className="text-blue-600" />

            <h2 className="text-xl font-semibold text-slate-800 mt-4">
              My Complaints
            </h2>

            <p className="text-slate-500 mt-2">
              View and track your complaints.
            </p>
          </Link>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Clock size={32} className="text-orange-500" />

            <h2 className="text-xl font-semibold text-slate-800 mt-4">
              Pending
            </h2>

            <p className="text-slate-500 mt-2">
              Track complaints that are still in progress.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="text-green-600" />

            <h2 className="text-xl font-semibold text-slate-800">
              Service Management
            </h2>
          </div>

          <p className="text-slate-600">
            SmartServiceX automatically classifies complaints,
            determines priority, assigns the appropriate department,
            and tracks the complaint status.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;