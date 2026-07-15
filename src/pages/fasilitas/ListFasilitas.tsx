import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Edit2, Trash2 } from "lucide-react";
import { getFasilitas, deleteFasilitas } from "../../services/fasilitasService";

function ListFasilitas() {
  const [list, setList] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const data = await getFasilitas();
      if (Array.isArray(data)) {
        setList(data);
      } else if (data && data.data) {
        setList(data.data);
      }
    } catch (err) {
      console.error("Gagal memuat data fasilitas:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus fasilitas?")) return;
    try {
      await deleteFasilitas(id);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus fasilitas");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Master Fasilitas</h1>
        <Link
          to="/dashboard/superadmin/fasilitas/create"
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <Plus size={16} /> Tambah Fasilitas
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
              <th className="px-6 py-4 font-semibold">Nama</th>
              <th className="px-6 py-4 font-semibold">Poin</th>
              <th className="px-6 py-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {list.length > 0 ? (
              list.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-800">{item.nama}</td>
                  <td className="px-6 py-4 text-gray-600">{item.poin}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <Link
                      to={`/dashboard/superadmin/fasilitas/${item.id}`}
                      className="text-sky-600 hover:text-sky-800 p-1"
                      title="Lihat"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      to={`/dashboard/superadmin/fasilitas/edit/${item.id}`}
                      className="text-amber-600 hover:text-amber-800 p-1"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-rose-600 hover:text-rose-800 p-1"
                      title="Hapus"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-10 text-center text-gray-400 text-sm italic">
                  Belum ada fasilitas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListFasilitas;