import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Tag, 
  Utensils, 
  Clock, 
  LayoutGrid,
  ArrowRight
} from "lucide-react";
import api from "../../services/api";

function AdminDashboard() {
  const navigate = useNavigate();
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [totalMenu, setTotalMenu] = useState(0);
  const [nilaiKebersihan, setNilaiKebersihan] = useState(0);
  const [totalFasilitas, setTotalFasilitas] = useState(0);
  const [ratingMaps, setRatingMaps] = useState(0);
  const [textHarga, setTextHarga] = useState("Belum Diatur");
  const [jamOperasi, setJamOperasi] = useState("Belum Diatur");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/tenants/profile");
        const data = res.data.data || res.data;
        setTenant(data);
        if (data) {
          setRatingMaps(data.ratingMaps || 0);
          setTextHarga(data.harga || "Belum Diatur");
          setJamOperasi(data.jamOperasional || "Belum Diatur");
          const [menuRes, fasRes, revRes] = await Promise.all([
            api.get("/menus").catch(() => ({ data: [] })),
            api.get(`/kepemilikan/tenant/${data.id}`).catch(() => ({ data: [] })),
            api.get(`/reviews/tenant/${data.id}`).catch(() => ({ data: [] }))
          ]);
          setTotalMenu((menuRes.data?.data || []).filter((m: any) => m.tenantId === data.id).length);
          setTotalFasilitas((fasRes.data?.data || []).length);
          const revs = revRes.data?.data || [];
          if (revs.length > 0) {
            const skor: any = { SANGAT_BERSIH: 5, BERSIH: 4, STANDAR: 3, KOTOR: 2, SANGAT_KOTOR: 1 };
            const total = revs.reduce((sum: number, item: any) => sum + (skor[item.kebersihan] || 0), 0);
            setNilaiKebersihan(parseFloat((total / revs.length).toFixed(1)));
          }
        }
      } catch (err) { setTenant(null); } finally { setLoading(false); }
    };
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="flex h-screen w-full items-center justify-center text-slate-400">
      <div className="animate-pulse">Memuat data dashboard...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* --- Header Section --- */}
        {tenant && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 p-4 rounded-2xl text-white">
                <Building2 size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{tenant.nama}</h1>
                <div className="flex items-center text-slate-500 text-sm mt-1">
                  <MapPin size={14} className="mr-1" /> {tenant.alamat}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                tenant.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {tenant.status}
              </span>
              <button 
                onClick={() => navigate(`/dashboard/admin/tenant/edit/${tenant.id}`)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all"
              >
                Edit Profil <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* --- Stats Grid --- */}
        {tenant?.status === 'APPROVED' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI Cards (Large) */}
            <div className="md:col-span-2 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
              <div className="flex items-center gap-2 mb-3 opacity-90">
                <Star size={18} />
                <span className="text-xs font-medium uppercase tracking-wider">Rating Maps</span>
              </div>
              <div className="text-4xl font-bold">{ratingMaps} <span className="text-xl font-normal opacity-70">/ 5.0</span></div>
            </div>

            <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-emerald-600">
                <ShieldCheck size={18} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Indeks Kebersihan</span>
              </div>
              <div className="text-4xl font-bold text-slate-900">{nilaiKebersihan}</div>
            </div>

            {/* Sub Stats (Small) */}
            {[
              { label: "Harga", value: textHarga, icon: <Tag size={20} /> },
              { label: "Menu", value: totalMenu, icon: <Utensils size={20} /> },
              { label: "Operasional", value: jamOperasi, icon: <Clock size={20} /> },
              { label: "Fasilitas", value: totalFasilitas, icon: <LayoutGrid size={20} /> },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-200 transition-colors">
                <div className="text-slate-400 mb-4">{stat.icon}</div>
                <div>
                  <div className="text-slate-500 text-xs font-medium mb-1">{stat.label}</div>
                  <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center shadow-sm">
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Menunggu Verifikasi</h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto">
              Profil gerai Anda sedang dalam proses peninjauan oleh admin. Anda belum dapat melihat metrik kinerja saat ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;