import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ListTenant from "../pages/tenant/ListTenant";
import DetailTenant from "../pages/tenant/DetailTenant";

import Dashboard from "../pages/dashboard/Dashboard";
import DashboardSuperAdmin from "../pages/dashboard/SuperAdminDashboard";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

import NotFound from "../pages/NotFound";
import TenantCreate from "../pages/tenant/CreateTenant";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tenant" element={<ListTenant />} />
        <Route path="/tenant/:id" element={<DetailTenant />} />

        {/* Tenant Admin */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <RoleRoute role="TENANT_ADMIN">
                <Dashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/tenant/create"
          element={
            <PrivateRoute>
              <TenantCreate />
            </PrivateRoute>
          }
        />

        {/* Super Admin */}
        <Route
          path="/superadmin"
          element={
            <PrivateRoute>
              <RoleRoute role="SUPER_ADMIN">
                <DashboardSuperAdmin />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
