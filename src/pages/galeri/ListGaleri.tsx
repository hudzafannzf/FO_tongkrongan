import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api"; // Sesuaikan path menuju instance axios kamu

function ListGaleri() {
  const [galeris, setGaleris] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil data gambar galeri asli dari database MySQL backend
  useEffect(() => {
    const fetchGaleris = async () => {
      try {
        setLoading(true);
        const res = await api.get("/galeri"); // Sesuaikan rute endpoint backend galeri kamu
        setGaleris(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Gagal mengambil data galeri:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGaleris();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Hapus foto dari galeri tenant?")) {
      try {
        await api.delete(`/galeri/${id}`);
        setGaleris(galeris.filter((g) => g.id !== id));
      } catch (err) {
        alert("Gagal menghapus gambar galeri");
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="text-center text-xs text-zinc-500 p-8">Memuat data galeri...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900 m-0">Galeri Foto Tempat</h1>
          <p className="text-xs text-zinc-500 mt-1">Unggah foto suasana gerai atau fasilitas untuk memikat ketertarikan calon pengunjung.</p>
        </div>
        <Link 
          to="/dashboard/admin/galeri/create" 
          className="text-xs font-medium bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg transition-colors shadow-2xs"
        >
          + Unggah Foto
        </Link>
      </div>

      {/* CONDITIONAL RENDER: DATABASE KOSONG VS ADA ISI */}
      {galeris.length === 0 ? (
        <div className="p-12 border border-dashed border-zinc-300 rounded-xl text-center bg-zinc-50/50">
          <span className="text-3xl">🖼️</span>
          <p className="text-zinc-500 text-xs font-medium mt-3 m-0">Belum ada foto galeri di database phpMyAdmin kamu.</p>
          <p className="text-zinc-400 text-[11px] mt-1 m-0">Silakan unggah foto dekorasi atau suasana tenant untuk memulai.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galeris.map((item) => (
            <div key={item.id} className="group relative bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-2xs aspect-square flex flex-col justify-between hover:border-zinc-300 transition-all">
              
              <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-xs font-medium">
                {item.gambar ? (
                  <img src={item.gambar} alt="Galeri" className="w-full h-full object-cover" />
                ) : (
                  "🖼️ Preview Foto Gerai"
                )}
              </div>

              {/* Overlay Keterangan / Caption saat Hover */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/50 to-transparent p-3 pt-8 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                <p className="text-[11px] text-zinc-200 m-0 line-clamp-2 leading-normal">
                  {item.caption || "Tidak ada keterangan foto."}
                </p>
                
                <div className="flex gap-2 mt-1">
                  <Link
                    to={`/dashboard/admin/galeri/edit/${item.id}`}
                    className="text-[10px] font-medium bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded text-center flex-1 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="text-[10px] font-medium bg-rose-600 hover:bg-rose-700 text-white px-2 py-1 rounded flex-1 transition-colors cursor-pointer"
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

export default ListGaleri;