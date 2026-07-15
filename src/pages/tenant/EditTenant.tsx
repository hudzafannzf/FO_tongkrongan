import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

function EditTenant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({
    nama: "",
    alamat: "",
    jamOperasional: "",
    harga: "",
    ratingMaps: "",
    email: "",
    deskripsi: "",
    telepon: "",
    mapsUrl: "",
  });
  const [semuaFasilitas, setSemuaFasilitas] = useState<any[]>([]);
  const [fasilitasTerpilih, setFasilitasTerpilih] = useState<number[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [t, f, k] = await Promise.all([
          api.get(`/tenants/${id}`),
          api.get("/fasilitas"),
          api
            .get(`/kepemilikan/tenant/${id}`)
            .catch(() => ({ data: { data: [] } })),
        ]);
        setFormData(t.data.data);
        console.log("ISI DATA FASILITAS:", f.data); // Ini akan muncul di Console Inspect Element
        setSemuaFasilitas(Array.isArray(f.data) ? f.data : f.data.data || []);
        setFasilitasTerpilih(k.data.data.map((x: any) => x.fasilitasId) || []);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mengirim semua data form + ID fasilitas yang dicentang
      await api.put(`/tenants/${id}`, {
        ...formData,
        fasilitasIds: fasilitasTerpilih,
      });

      alert("Profil berhasil diperbarui!");
      navigate("/dashboard/admin"); // Arahkan ke halaman admin
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Profil Gerai</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Kolom Kiri */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold">NAMA GERAI</label>
            <input
              className="w-full border p-2 rounded"
              value={formData.nama || ""}
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs font-bold">ALAMAT</label>
            <input
              className="w-full border p-2 rounded"
              value={formData.alamat || ""}
              onChange={(e) =>
                setFormData({ ...formData, alamat: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs font-bold">JAM OPERASIONAL</label>
            <input
              className="w-full border p-2 rounded"
              value={formData.jamOperasional || ""}
              onChange={(e) =>
                setFormData({ ...formData, jamOperasional: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs font-bold">SKALA HARGA</label>
            <input
              className="w-full border p-2 rounded"
              value={formData.harga || ""}
              onChange={(e) =>
                setFormData({ ...formData, harga: e.target.value })
              }
            />
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold">RATING MAPS</label>
            <input
              className="w-full border p-2 rounded"
              value={formData.ratingMaps || ""}
              onChange={(e) =>
                setFormData({ ...formData, ratingMaps: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs font-bold">TELEPON</label>
            <input
              className="w-full border p-2 rounded"
              value={formData.telepon || ""}
              onChange={(e) =>
                setFormData({ ...formData, telepon: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs font-bold">MAPS URL</label>
            <input
              className="w-full border p-2 rounded"
              value={formData.mapsUrl || ""}
              onChange={(e) =>
                setFormData({ ...formData, mapsUrl: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs font-bold">EMAIL</label>
            <input
              className="w-full border p-2 rounded"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        {/* Deskripsi & Fasilitas - Full Width */}
        <div className="col-span-2 space-y-4">
          <div>
            <label className="text-xs font-bold">DESKRIPSI</label>
            <textarea
              className="w-full border p-2 rounded h-24"
              value={formData.deskripsi || ""}
              onChange={(e) =>
                setFormData({ ...formData, deskripsi: e.target.value })
              }
            />
          </div>

          <div className="col-span-2">
            <label className="text-xs font-bold block mb-2">
              FASILITAS GERAI
            </label>
            <div className="grid grid-cols-4 gap-2">
              {/* Tambahkan pengecekan array di sini */}
              {Array.isArray(semuaFasilitas) && semuaFasilitas.length > 0 ? (
                semuaFasilitas.map((f) => (
                  <label
                    key={f.id}
                    className="border p-2 rounded flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={fasilitasTerpilih.includes(f.id)}
                      onChange={() =>
                        setFasilitasTerpilih((prev) =>
                          prev.includes(f.id)
                            ? prev.filter((i) => i !== f.id)
                            : [...prev, f.id],
                        )
                      }
                    />
                    {f.nama}
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-400 col-span-4">
                  Tidak ada data fasilitas ditemukan.
                </p>
              )}
            </div>
          </div>
        </div>
        <button className="col-span-2 bg-purple-600 text-white p-3 rounded-lg font-bold">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
export default EditTenant;
