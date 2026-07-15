import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CreateMenu() {
  const navigate = useNavigate();
  const [tenantList, setTenantList] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    tenantId: "", 
    nama: "", 
    deskripsi: "", 
    harga: "", 
    foto: "",
  });

  useEffect(() => {
    // --- FIX: Ubah ke endpoint profile agar hanya mengambil gerai milik admin yang login ---
    api.get("/tenants/profile")
      .then((res) => {
        if (res.data.success && res.data.data) {
          const myTenant = res.data.data;
          
          // Bungkus dalam array agar `.map()` di select element tidak error
          setTenantList([myTenant]);
          
          // Otomatis set tenantId ke formData supaya user tidak perlu memilih lagi
          setFormData((prev) => ({ ...prev, tenantId: myTenant.id.toString() }));
        }
      })
      .catch(err => console.error("Gagal ambil data tenant milik admin", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tenantId) {
      alert("Data gerai belum siap!");
      return;
    }

    try {
      await api.post("/menus", {
        tenantId: Number(formData.tenantId),
        nama: formData.nama,
        deskripsi: formData.deskripsi,
        harga: parseFloat(formData.harga),
        foto: formData.foto,
      });
      alert("Berhasil!");
      navigate("/dashboard/admin/menu");
    } catch (err) {
      console.error(err);
      alert("Gagal simpan");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Tambah Menu</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Dropdown otomatis terisi dan terkunci karena tenant hanya ada satu */}
        <select 
          className="border p-2 rounded bg-gray-100 cursor-not-allowed" 
          value={formData.tenantId}
          onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
          disabled // Dikunci agar tidak bisa diubah ke tenant milik orang lain
          required
        >
          {tenantList.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nama}
            </option>
          ))}
        </select>
        
        <input className="border p-2 rounded" placeholder="Nama Menu" required onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
        <textarea className="border p-2 rounded" placeholder="Deskripsi" onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} />
        <input className="border p-2 rounded" placeholder="Harga" type="number" required onChange={(e) => setFormData({ ...formData, harga: e.target.value })} />
        <input className="border p-2 rounded" placeholder="URL Foto" onChange={(e) => setFormData({ ...formData, foto: e.target.value })} />
        
        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors" type="submit">Simpan Menu</button>
      </form>
    </div>
  );
}

export default CreateMenu;