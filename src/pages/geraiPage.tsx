import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // <-- 1. IMPORT LINK DITAMBAHKAN
import { Search, MapPin, ExternalLink, Filter } from "lucide-react";
import api from "../services/api";
import Navbar from "../components/common/Navbar";
import FooterPage from "../components/layout/Footer";

const GeraiPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await api.get("/tenants");
        if (response.data.success) {
          setTenants(response.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data gerai:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  const filteredTenants = tenants.filter((t) =>
    t.nama?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 ">
      <Navbar />
      <div className="max-w-7xl mx-auto py-15">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Daftar Gerai Kuliner
          </h1>
          <p className="text-gray-500">
            Temukan tempat makan favorit di sekitar anda.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari nama gerai..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none transition"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition">
            <Filter size={20} /> Filter
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Memuat data gerai...
          </div>
        ) : (
          /* Grid List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTenants.map((tenant) => (
              <div
                key={tenant.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden">
                  <img
                    src={
                      tenant.logo
                        ? `http://localhost:5000/${tenant.logo}`
                        : `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80`
                    }
                    alt={tenant.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>


                <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1">
                  {tenant.nama}
                </h3>

                <div className="flex items-center gap-1 text-gray-500 text-sm mb-4 line-clamp-1">
                  <MapPin size={16} className="min-w-[16px]" />
                  <span className="truncate">{tenant.alamat}</span>
                </div>
                
                <Link
                  to={`/detail/${tenant.id}`}
                  className="w-full py-2.5 rounded-lg border border-teal-600 text-teal-700 font-medium hover:bg-teal-600 hover:text-white transition flex items-center justify-center gap-2"
                >
                  Lihat Detail <ExternalLink size={16} />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTenants.length === 0 && (
          <div className="col-span-3 text-center py-20 text-zinc-400 bg-white rounded-3xl border border-zinc-200 border-dashed mt-6">
            Belum ada data gerai tersedia.
          </div>
        )}
      </div>
      <FooterPage />
    </div>
  );
};

export default GeraiPage;