import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Directory from "../pages/public/Directory";
import DetailTenant from "../pages/public/DetailTenant";
import SpkMethod from "../pages/public/SpkMethod";
import Recommendation from "../pages/public/Recommendation";
import Login from "../pages/auth/Login";
import NilaiKategori from "../pages/superadmin/NilaiKategori";
import Kategori from "../pages/superadmin/Kategori";
import Menu from "../pages/superadmin/Menu";
import Tenant from "../pages/superadmin/Tenant";
import User from "../pages/superadmin/User";
import Dashboard from "../pages/superadmin/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";

import DashboardTenant from "../pages/tenantadmin/Dashboard";
import TenantAdmin from "../pages/tenantadmin/Tenant";
import MenuTenant from "../pages/tenantadmin/Menu";
import NilaiKategoriTenant from "../pages/tenantadmin/NilaiKategori";


const router = createBrowserRouter([
  // PUBLIC
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "directory",
        element: <Directory />,
      },
      {
        path: "tenant/:id",
        element: <DetailTenant />,
      },
      {
        path: "spk",
        element: <SpkMethod />,
      },
      {
        path: "recommendation",
        element: <Recommendation />,
      },
    ],
  },

  // SUPER ADMIN
  {
    path: "/superadmin",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "tenant",
        element: <Tenant />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "kategori",
        element: <Kategori />,
      },
      {
        path: "nilai",
        element: <NilaiKategori />,
      },
    ],
  },

  // TENANT ADMIN
  {
  path: "/tenantadmin",
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      element: <DashboardTenant />,
    },
    {
      path: "tenant",
      element: <TenantAdmin />,
    },
    {
      path: "menu",
      element: <MenuTenant />,
    },
    {
      path: "nilai",
      element: <NilaiKategoriTenant />,
    },
  ],
},

  // LOGIN
  {
    path: "/login",
    element: <Login />,
  },
  // compatibility route: some links use /auth/login
  {
    path: "/auth/login",
    element: <Login />,
  },
]);

export default router;