import { useEffect, useState } from "react";
import { getTenants, deleteTenant } from "../../services/tenantService";
import { Link } from "react-router-dom";

function TenantList() {
  const [tenants, setTenants] = useState<any[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const loadData = async () => {
    try {
      const data = await getTenants();
      
      // Proteksi agar .map() tidak bikin layar putih total
      if (Array.isArray(data)) {
        setTenants(data);
      } else if (data && Array.isArray(data.data)) {
        setTenants(data.data);
      } else if (data && data.tenants && Array.isArray(data.tenants)) {
        setTenants(data.tenants);
      }
    } catch (error) {
      console.error("Gagal mengambil data tenant:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus tenant?")) return;

    try {
      await deleteTenant(id);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus tenant");
    }
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <h1>Daftar Tenant</h1>

        {/* Tombol Ajukan Tenant */}
        {user?.role === "TENANT_ADMIN" && (
          <>
            <Link to="/dashboard/admin/tenant/create">
              <button style={{ cursor: "pointer", padding: "6px 12px" }}>Ajukan Tenant</button>
            </Link>

            <br />
            <br />
          </>
        )}

        <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Jam Operasional</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id}>
                <td>{tenant.nama}</td>
                <td>{tenant.alamat}</td>
                <td>{tenant.jamOperasional}</td>

                <td>
                  {/* SUPER ADMIN */}
                  {user?.role === "SUPER_ADMIN" && (
                    <>
                      <Link to={`/dashboard/superadmin/tenant/${tenant.id}`}>
                        <button style={{ cursor: "pointer" }}>Lihat</button>
                      </Link>

                      {" "}

                      <Link to={`/dashboard/superadmin/tenant/edit/${tenant.id}`}>
                        <button style={{ cursor: "pointer" }}>Edit</button>
                      </Link>

                      {" "}

                      <button
                        onClick={() => handleDelete(tenant.id)}
                        style={{ cursor: "pointer", color: "red" }}
                      >
                        Hapus
                      </button>
                    </>
                  )}

                  {/* TENANT ADMIN */}
                  {user?.role === "TENANT_ADMIN" && (
                    <>
                      <Link to={`/dashboard/admin/tenant/${tenant.id}`}>
                        <button style={{ cursor: "pointer" }}>Lihat</button>
                      </Link>
                    </>
                  )}

                  {/* PENGGUNA */}
                  {user?.role === "PENGGUNA" && (
                    <>
                      <Link to={`/dashboard/admin/tenant/${tenant.id}`}>
                        <button style={{ cursor: "pointer" }}>Lihat</button>
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {tenants.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Belum ada data tenant
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TenantList;