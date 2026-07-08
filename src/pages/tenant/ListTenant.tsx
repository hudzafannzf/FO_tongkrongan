import { useEffect, useState } from "react";
import { getTenants, deleteTenant } from "../../services/tenantService";
import { Link } from "react-router-dom";

function TenantList() {
  const [tenants, setTenants] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const result = await getTenants();
      setTenants(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus tenant?")) return;

    await deleteTenant(id);
    loadData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daftar Tenant</h1>

      <Link to="/tenant/create">
        <button>Tambah Tenant</button>
      </Link>

      <br />
      <br />

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
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
                <Link to={`/tenant/edit/${tenant.id}`}>
                  <button>Edit</button>
                </Link>

                {" "}

                <button
                  onClick={() => handleDelete(tenant.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TenantList;