import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateComplaint from "./pages/CreateComplaint";
import Complaints from "./pages/Complaints";
import ComplaintDetails from "./pages/ComplaintDetails";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Employee Dashboard */}
          <Route
            path="/employee-dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          {/* Complaints */}
          <Route
            path="/complaints"
            element={
              <ProtectedRoute>
                <Navbar />
                <Complaints />
              </ProtectedRoute>
            }
          />

          {/* Create Complaint */}
          <Route
            path="/complaints/create"
            element={
              <ProtectedRoute>
                <Navbar />
                <CreateComplaint />
              </ProtectedRoute>
            }
          />

          {/* Complaint Details */}
          <Route
            path="/complaints/:id"
            element={
              <ProtectedRoute>
                <Navbar />
                <ComplaintDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;