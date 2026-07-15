import { Shield, Users, Building2, Clock, Settings, Bell } from "lucide-react";

function DashboardSuperAdmin() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Dummy data untuk statistik
  const stats = [
    { label: "Total Tenant", value: "24", icon: <Building2 size={20} />, color: "text-blue-600" },
    { label: "Pending Approval", value: "3", icon: <Clock size={20} />, color: "text-amber-600" },
    { label: "Total User", value: "156", icon: <Users size={20} />, color: "text-teal-600" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Super Admin</h1>
        <p className="text-gray-500">Selamat datang kembali, {user?.username || "Admin"}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Profile & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-teal-600" />
            <h3 className="font-semibold text-lg">Informasi Akun</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Username</span>
              <span className="font-medium">{user?.username}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Hak Akses</span>
              <span className="px-2 py-1 bg-teal-50 text-teal-700 rounded-md text-xs font-bold uppercase">Super Admin</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="text-gray-600" />
            <h3 className="font-semibold text-lg">Aksi Cepat</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-left">
              Manage Users
            </button>
            <button className="p-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-left">
              System Logs
            </button>
            <button className="p-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-left">
              Approve Tenants
            </button>
            <button className="p-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-left">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSuperAdmin;