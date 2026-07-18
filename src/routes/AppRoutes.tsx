import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";

import DashboardAdmin from "../pages/dashboard/adminDashboard";
import DashboardSuperAdmin from "../pages/dashboard/SuperAdminDashboard";

import TenantList from "../pages/tenant/ListTenant";
import TenantCreate from "../pages/tenant/CreateTenant";
import TenantEdit from "../pages/tenant/EditTenant";
import TenantDetail from "../pages/tenant/DetailTenant";
import PendingTenant from "../pages/tenant/PendingTenant";
import DashboardLayout from "../components/layout/DashboardLayout";
import MenuList from "../pages/menu/ListMenu";
import MenuCreate from "../pages/menu/CreateMenu";
import MenuEdit from "../pages/menu/EditMenu";
import MenuDetail from "../pages/menu/DetailMenu";
import ListGaleri from "../pages/galeri/ListGaleri";
import CreateGaleri from "../pages/galeri/CreateGaleri";
import EditGaleri from "../pages/galeri/EditGaleri";
import DetailGaleri from "../pages/galeri/DetailGaleri";
import ListFasilitas from "../pages/fasilitas/ListFasilitas";
import CreateFasilitas from "../pages/fasilitas/CreateFasilitas";
import EditFasilitas from "../pages/fasilitas/EditFasilitas";
import DetailFasilitas from "../pages/fasilitas/DetailFasilitas";

// Halaman Kriteria SPK
import TenantFasilitas from "../pages/fasilitas/TenantFasilitas";
import TenantReviewKebersihan from "../pages/tenant/TenantKebersihan";
import DetailTenant from "../pages/tenant/DetailTenant";
import Bobothasil from "../pages/Bobothasil";
import GeraiPage from "../pages/geraiPage";
import MenuPage from "../pages/tenant/MenuPage";
import Bobot from "../pages/Rekomendasi/Bobotpage";
import Sub from "../pages/Rekomendasi/Subpage";
import Subhasil from "../pages/Subhasil";
import Rekomendasi from "../pages/rekomendasi";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:id" element={<DetailTenant />} />
        <Route path="/detail/menu/:id" element={<MenuPage />} />
        <Route path="/rekomendasi" element={<Rekomendasi />}>
          <Route index element={<Navigate to="bobot" replace />} />

          <Route path="Sub" element={<Sub />} />
          <Route path="Bobot" element={<Bobot />} />
        </Route>
        <Route path="/rekomendasi/subhasil" element={<Subhasil />} />
        <Route path="/rekomendasi/bobothasil" element={<Bobothasil />} />
        <Route path="/gerai" element={<GeraiPage />} />

        {/* TENANT ADMIN DASHBOARD GROUP */}
        <Route path="/dashboard/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardAdmin />} />

          <Route path="tenant" element={<TenantList />} />
          <Route path="menu/:id" element={<MenuDetail />} />
          <Route path="tenant/create" element={<TenantCreate />} />
          <Route path="tenant/edit/:id" element={<TenantEdit />} />
          <Route path="tenant/:id" element={<TenantDetail />} />

          <Route path="menu" element={<MenuList />} />
          <Route path="menu/create" element={<MenuCreate />} />
          <Route path="menu/edit/:id" element={<MenuEdit />} />

          <Route path="galeri" element={<ListGaleri />} />
          <Route path="galeri/create" element={<CreateGaleri />} />
          <Route path="galeri/edit/:id" element={<EditGaleri />} />
          <Route path="galeri/:id" element={<DetailGaleri />} />
          <Route path="tenant/fasilitas" element={<TenantReviewKebersihan />} />

          {/* MANAJEMEN KRITERIA SPK TENANT */}
          <Route path="tenant/fasilitas" element={<TenantFasilitas />} />

          {/* 2. SELIPKAN RUTE REVIEW KEBERSIHAN (C5) DI SINI */}
          <Route
            path="tenant/kebersihan"
            element={<TenantReviewKebersihan />}
          />
        </Route>

        {/* SUPER ADMIN DASHBOARD GROUP */}
        <Route path="/dashboard/superadmin" element={<DashboardLayout />}>
          <Route index element={<DashboardSuperAdmin />} />

          <Route path="tenant" element={<TenantList />} />
          <Route path="tenant/pending" element={<PendingTenant />} />
          <Route path="tenant/edit/:id" element={<TenantEdit />} />
          <Route path="tenant/:id" element={<TenantDetail />} />
          <Route path="fasilitas" element={<ListFasilitas />} />
          <Route path="fasilitas/create" element={<CreateFasilitas />} />
          <Route path="fasilitas/edit/:id" element={<EditFasilitas />} />
          <Route path="fasilitas/:id" element={<DetailFasilitas />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
