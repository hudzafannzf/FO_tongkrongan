import { Outlet } from "react-router-dom";

function TenantLayout() {
  return (
    <div>
      <h2>Sidebar Tenant</h2>

      <Outlet />
    </div>
  );
}

export default TenantLayout;