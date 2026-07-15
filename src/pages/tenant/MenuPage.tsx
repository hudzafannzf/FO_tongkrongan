import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import api from "../../services/api";

const MenuPage = () => {
  const { id } = useParams();
  const [menus, setMenus] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await api.get(`/public/tenants/${id}`);
        
        if (response.data.success && response.data.data.menus) {
          setMenus(response.data.data.menus);
        }
      } catch (error) {
        console.error("Gagal mengambil data menu:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMenus();
    }
  }, [id]);

  const filteredMenus = menus.filter((m) =>
    m.nama?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Navigation & Header */}
        <div className="mb-8">
          <Link to="/gerai" className="flex items-center text-gray-500 hover:text-teal-700 transition mb-4">
            <ArrowLeft size={20} className="mr-2" /> Kembali ke Daftar Gerai
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Menu Andalan</h1>
          <p className="text-gray-500">Pilih menu favorit Anda dari gerai ini.</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-4 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari nama menu..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none transition shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Memuat daftar menu...</div>
        ) : (
          <>
            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMenus.map((menu) => (
                <div 
                  key={menu.id} 
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <img 
                    // Menampilkan foto dari URL, atau gambar default jika kosong
                    src={menu.foto || "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400"} 
                    alt={menu.nama} 
                    className="w-20 h-20 rounded-xl object-cover bg-gray-100"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{menu.nama}</h3>
                    <p className="text-teal-700 font-bold text-sm mt-1">
                      Rp {Number(menu.harga).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredMenus.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-400">Menu tidak ditemukan.</p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default MenuPage;