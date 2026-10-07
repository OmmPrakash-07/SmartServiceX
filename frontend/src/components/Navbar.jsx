import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  FileText,
  PlusCircle,
  BriefcaseBusiness,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-blue-600"
        >
          SmartServiceX
        </Link>

        <div className="flex items-center gap-5">

          {/* User Dashboard */}
          <Link
            to="/dashboard"
            className="hidden md:flex items-center gap-2 text-slate-600 hover:text-blue-600"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {/* Employee Dashboard */}
          {user?.role === "EMPLOYEE" && (
            <Link
              to="/employee-dashboard"
              className="hidden md:flex items-center gap-2 text-slate-600 hover:text-blue-600"
            >
              <BriefcaseBusiness size={18} />
              Employee Dashboard
            </Link>
          )}

          {/* Complaints */}
          <Link
            to="/complaints"
            className="hidden md:flex items-center gap-2 text-slate-600 hover:text-blue-600"
          >
            <FileText size={18} />
            Complaints
          </Link>

          {/* New Complaint */}
          <Link
            to="/complaints/create"
            className="hidden md:flex items-center gap-2 text-slate-600 hover:text-blue-600"
          >
            <PlusCircle size={18} />
            New Complaint
          </Link>

          {/* User Name */}
          <span className="hidden sm:block text-sm font-medium text-slate-700">
            {user?.name || "User"}
          </span>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;