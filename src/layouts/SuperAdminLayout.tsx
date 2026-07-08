import { Outlet } from "react-router-dom";

function SuperAdminLayout() {
  return (
    <div>
      <h2>Sidebar Super Admin</h2>

      <Outlet />
    </div>
  );
}

export default SuperAdminLayout;