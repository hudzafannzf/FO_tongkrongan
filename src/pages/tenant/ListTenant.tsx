import { useEffect, useState } from "react";
import { getTenants, deleteTenant } from "../../services/tenantService";
import { Link } from "react-router-dom";
import { Eye, Trash2, PlusCircle, Utensils, MapPin, Clock } from "lucide-react";
import defaultLogo from "../../assets/images/default_logo.png";

function TenantList() {
  const [tenants, setTenants] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const loadData = async () => {
    try {
      const data = await getTenants();
      const result = Array.isArray(data) ? data : (data?.data || data?.tenants || []);
      console.log("Data Tenant yang diterima:", result);
      setTenants(result);
    } catch (error) {
      console.error("Gagal mengambil data tenant:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus tenant ini?")) return;
    try {
      await deleteTenant(id);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus tenant");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Tenant</h1>
        {user?.role === "TENANT_ADMIN" && (
          <Link to="/dashboard/admin/tenant/create">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
              <PlusCircle size={18} /> Ajukan Tenant
            </button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow flex flex-col overflow-hidden">
            
            {/* LOGO TENANT */}
            <div className="h-32 bg-gray-100 overflow-hidden">
              <img 
                src={tenant.logo ? `http://localhost:3000/uploads/${tenant.logo}` : defaultLogo} 
                alt={tenant.nama}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = defaultLogo)} // Fallback jika link gambar rusak
              />
            </div>

            <div className="p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-lg truncate">{tenant.nama}</h2>
              <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1">
                <MapPin size={14} />
                <span className="truncate">{tenant.alamat}</span>
              </div>
            </div>

            <div className="p-5 flex-grow space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} className="text-gray-400" />
                <span>{tenant.jamOperasional}</span>
              </div>
              
              {/* FIX MENU: Cek tenant.totalMenu, kalau tidak ada, cek apakah ada tenant.menus array */}
              <div className="flex items-center gap-2 text-sm font-medium text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg w-fit">
                <Utensils size={16} />
                <span>
                  {tenant.totalMenu ?? (tenant.menus ? tenant.menus.length : 0)} Pilihan Menu
                </span>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
              {(user?.role === "TENANT_ADMIN" || user?.role === "PENGGUNA") && (
                <Link to={`/dashboard/admin/tenant/${tenant.id}`}>
                  <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition">
                    <Eye size={18} />
                  </button>
                </Link>
              )}
              
              {user?.role === "SUPER_ADMIN" && (
                <button
                  onClick={() => handleDelete(tenant.id)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TenantList;