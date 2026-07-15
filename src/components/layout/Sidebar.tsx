import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CheckCircle,
  Building2,
  BarChart3,
  UtensilsCrossed,
  Warehouse,
  LogOut,
  PlusCircle,
} from "lucide-react";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div
      style={{
        width: "250px",
        background: "#1f2937",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* ================= SUPER ADMIN ================= */}

      {user?.role === "SUPER_ADMIN" && (
        <>
          <h2 style={{ marginBottom: 20 }}>SUPER ADMIN</h2>

          <hr />

          <Link style={linkStyle} to="/dashboard/superadmin">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link style={linkStyle} to="/dashboard/superadmin/tenant/pending">
            <CheckCircle size={20} />
            Approval Tenant
          </Link>

          <Link style={linkStyle} to="/dashboard/superadmin/tenant">
            <Building2 size={20} />
            Daftar Tenant
          </Link>

          <Link style={linkStyle} to="/dashboard/superadmin/fasilitas">
            <Warehouse size={20} />
            Master Fasilitas
          </Link>

          <Link style={linkStyle} to="/dashboard/superadmin/spk">
            <BarChart3 size={20} />
            SPK
          </Link>
        </>
      )}

      {/* ================= TENANT ADMIN ================= */}

      {user?.role === "TENANT_ADMIN" && (
        <>
          <h2 style={{ marginBottom: 20 }}>TENANT ADMIN</h2>

          <hr />

          <Link style={linkStyle} to="/dashboard/admin">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link style={linkStyle} to="/dashboard/admin/tenant/create">
            <PlusCircle size={20} />
            Ajukan Tenant
          </Link>

          <Link style={linkStyle} to="/dashboard/admin/menu">
            <UtensilsCrossed size={20} />
            Menu
          </Link>

          <Link style={linkStyle} to="/dashboard/admin/tenant/fasilitas">
            <Warehouse size={20} />
            Review Kebersihan
          </Link>
        </>
      )}
      <hr style={{ margin: "20px 0" }} />

      <button
        style={logoutStyle}
        onClick={() => {
          // Kombinasi ini sudah sangat ampuh untuk mencegah data nyangkut
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "white",
  textDecoration: "none",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "8px",
};

const logoutStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  background: "#dc2626",
  color: "white",
  cursor: "pointer",
};

export default Sidebar;