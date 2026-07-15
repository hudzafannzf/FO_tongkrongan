import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function ListMenu() {
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ListMenu.tsx
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        const res = await api.get("/menus");

        console.log("Data menu:", res.data);
        setMenus(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Gagal mengambil data menu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
      try {
        await api.delete(`/menus/${id}`);
        setMenus(menus.filter((menu) => menu.id !== id));
      } catch (err) {
        alert("Gagal menghapus menu");
      }
    }
  };

  if (loading)
    return <div className="p-8 text-center text-zinc-500">Memuat data...</div>;

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-xl font-semibold">Daftar Menu Kuliner</h1>
        <Link
          to="/dashboard/admin/menu/create"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Tambah Menu
        </Link>
      </div>

      {menus.length === 0 ? (
        <div className="text-center p-12 border-2 border-dashed rounded-xl text-zinc-500">
          Belum ada data menu.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menus.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl overflow-hidden shadow-sm"
            >
              <div className="w-full h-40 bg-zinc-100 flex items-center justify-center overflow-hidden">
                {item.foto ? (
                  <img
                    src={
                      item.foto.startsWith("http")
                        ? item.foto
                        : `http://localhost:3000/uploads/${item.foto}`
                    }
                    alt={item.nama}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/150";
                    }}
                  />
                ) : (
                  <span className="text-zinc-400 text-xs">
                    📷 Tidak ada foto
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm">{item.nama}</h3>
                <p className="text-xs text-zinc-500 mt-1">{item.deskripsi}</p>
                <p className="text-sm font-bold text-purple-600 mt-2">
                  Rp {Number(item.harga).toLocaleString("id-ID")}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs bg-rose-50 text-rose-600 px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListMenu;
