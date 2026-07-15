import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


function DashboardLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
          background: "#f5f5f5",
          overflow: "auto",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
console.log("DashboardLayout Render");

export default DashboardLayout;