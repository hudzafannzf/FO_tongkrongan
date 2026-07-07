import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function DashboardLayout() {
  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1 min-h-screen">

        <Topbar />

        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}