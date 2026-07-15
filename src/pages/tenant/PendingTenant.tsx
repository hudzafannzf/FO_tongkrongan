import { useEffect, useState } from "react";
import { getPendingTenants, approveTenant } from "../../services/tenantService";
import { Check, Loader2 } from "lucide-react"; // Pastikan sudah install lucide-react

function PendingTenant() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await getPendingTenants();
      setTenants(result.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id: number) => {
    if (!window.confirm("Approve tenant ini?")) return;

    try {
      await approveTenant(id);
      alert("Tenant berhasil diapprove");
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal approve");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pengajuan Tenant</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
              <th className="px-6 py-4 font-semibold">Nama</th>
              <th className="px-6 py-4 font-semibold">Alamat</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Pemilik</th>
              <th className="px-6 py-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                </td>
              </tr>
            ) : tenants.length > 0 ? (
              tenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{tenant.nama}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{tenant.alamat}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded-md text-xs font-medium border border-yellow-100">
                      {tenant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{tenant.admin?.username || '-'}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleApprove(tenant.id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm"
                    >
                      <Check size={16} />
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500 text-sm">
                  Belum ada pengajuan tenant.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PendingTenant;