import { useState } from "react";
import { createTenant } from "../../services/tenantService";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const LIST_FASILITAS = [
  { id: 1, nama: "Toilet" },
  { id: 2, nama: "Parkir" },
  { id: 3, nama: "Stop Kontak" },
  { id: 4, nama: "Outdoor" },
  { id: 5, nama: "Indoor" },
  { id: 6, nama: "WiFi" },
  { id: 7, nama: "AC" },
  { id: 8, nama: "Mushola" },
  { id: 9, nama: "Smoking Area" },
  { id: 10, nama: "Live Music" },
  { id: 11, nama: "Ruang Meeting" },
  { id: 12, nama: "Drive Thru" },
];

function TenantCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    ratingMaps: "",
    email: "",
    deskripsi: "",
    jamOperasional: "",
    telepon: "",
    mapsUrl: "",
    logo: null as File | null,
  });

  const [selectedFasilitasIds, setSelectedFasilitasIds] = useState<number[]>(
    [],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedFasilitasIds([...selectedFasilitasIds, id]);
    } else {
      setSelectedFasilitasIds(
        selectedFasilitasIds.filter((item) => item !== id),
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, logo: e.target.files[0] });
    } else {
      setForm({ ...form, logo: null });
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const formData = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value as any);
    }
  });

  formData.append("fasilitasIds", JSON.stringify(selectedFasilitasIds));

  try {
    // HAPUS headers 'Content-Type' di sini
    await api.post("/tenants", formData); 

    alert("Tenant berhasil diajukan!");
    navigate("/dashboard/admin");
  } catch (err: any) {
    console.error("Error detail:", err.response?.data);
    alert("Gagal menyimpan: " + (err.response?.data?.message || "Terjadi kesalahan"));
  }
};

  return (
    <div className="flex justify-center items-start min-h-screen bg-zinc-50 font-sans p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[1000px] flex flex-col gap-6 bg-white p-8 rounded-xl border border-zinc-200 shadow-sm"
      >
        {/* HEADER FORM */}
        <div className="border-b border-zinc-100 pb-3">
          <h1 className="m-0 text-zinc-900 text-xl font-semibold tracking-wide">
            Tambah Tenant Baru
          </h1>
          <p className="text-zinc-500 text-xs mt-1">
            Silakan lengkapi formulir di bawah ini dengan data yang valid.
          </p>
        </div>

        {/* LAYOUT CONTAINER: BAGI 2 KOLOM PADA LAYAR UTAMA (md:) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* KOLOM KIRI: DATA UTAMA TENANT */}
          <div className="flex flex-col gap-4">
            {/* NAMA TENANT */}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-700 text-xs font-semibold">
                Nama Tenant *
              </label>
              <input
                type="text"
                name="nama"
                placeholder="Masukkan nama tenant"
                onChange={handleChange}
                required
                className="p-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 outline-none text-sm focus:border-purple-500"
              />
            </div>

            {/* ALAMAT */}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-700 text-xs font-semibold">
                Alamat Lengkap *
              </label>
              <input
                type="text"
                name="alamat"
                placeholder="Alamat lengkap lokasi"
                onChange={handleChange}
                required
                className="p-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 outline-none text-sm focus:border-purple-500"
              />
            </div>

            {/* JAM OPERASIONAL */}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-700 text-xs font-semibold">
                Jam Operasional *
              </label>
              <input
                type="text"
                name="jamOperasional"
                placeholder="Contoh: 08:00 - 22:00"
                onChange={handleChange}
                required
                className="p-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 outline-none text-sm focus:border-purple-500"
              />
            </div>

            {/* RATING GOOGLE MAPS */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-zinc-700 text-xs font-semibold">
                  Rating Maps
                </label>
                <input
                  type="number"
                  name="ratingMaps"
                  placeholder="Contoh: 4.5"
                  min="0"
                  max="5"
                  step="0.1"
                  onChange={handleChange}
                  className="p-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 outline-none text-sm focus:border-purple-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-zinc-700 text-xs font-semibold">
                  Telepon
                </label>
                <input
                  type="tel"
                  name="telepon"
                  placeholder="08xxxxxxxxxx"
                  onChange={handleChange}
                  className="p-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 outline-none text-sm focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 font-sans">
              <label className="text-xs font-semibold text-zinc-750">
                Estimasi Skala Harga Menu:
              </label>
              <select
                name="harga"
                onChange={(e) => {
                  handleChange(e as any);
                }}
                className="w-full p-2.5 text-xs bg-white border border-zinc-300 rounded-lg text-zinc-850 focus:outline-purple-500 cursor-pointer"
                required
              >
                <option value="">-- Pilih Rentang Harga --</option>
                <option value="Sangat Murah">
                   &lt; Rp 15.000 
                </option>
                <option value="Murah"> Rp 15.000 - Rp 25.000 </option>
                <option value="Sedang"> Rp 25.000 - Rp 50.000 </option>
                <option value="Mahal"> Rp 50.000 - Rp 100.000 </option>
                <option value="Sangat Mahal">
                   &gt; Rp 100.000 
                </option>
              </select>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-700 text-xs font-semibold">
                Email (Opsional)
              </label>
              <input
                type="email"
                name="email"
                placeholder="tenant@email.com"
                onChange={handleChange}
                className="p-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 outline-none text-sm focus:border-purple-500"
              />
            </div>

            {/* URL GOOGLE MAPS */}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-700 text-xs font-semibold">
                URL Google Maps (Opsional)
              </label>
              <input
                type="url"
                name="mapsUrl"
                placeholder="http://maps.google.com/..."
                onChange={handleChange}
                className="p-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 outline-none text-sm focus:border-purple-500"
              />
            </div>

            {/* LOGO TENANT */}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-700 text-xs font-semibold">
                Logo Tenant (Opsional)
              </label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleFileChange}
                className="text-xs text-zinc-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer"
              />
            </div>
          </div>

          {/* KOLOM KANAN: KHUSUS FASILITAS & DESKRIPSI PANJANG */}
          <div className="flex flex-col gap-5">
            {/* DESKRIPSI (Dipindah ke kanan agar seimbang tingginya) */}
            <div className="flex flex-col gap-1">
              <label className="text-zinc-700 text-xs font-semibold">
                Deskripsi Tenant (Opsional)
              </label>
              <textarea
                name="deskripsi"
                placeholder="Deskripsi singkat mengenai profil atau menu andalan tenant..."
                rows={4}
                onChange={handleChange}
                className="p-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 outline-none text-sm resize-none focus:border-purple-500"
              />
            </div>

            {/* BOX FASILITAS CHECKBOX */}
            <div className="flex flex-col gap-2 flex-grow">
              <label className="text-zinc-700 text-xs font-semibold">
                Fasilitas Tersedia
              </label>
              <div className="grid grid-cols-2 gap-3 p-4 bg-zinc-50 border border-zinc-200 rounded-lg h-full max-md:min-h-[200px]">
                {LIST_FASILITAS.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2.5 text-xs text-zinc-600 cursor-pointer select-none hover:text-zinc-900 transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={item.id}
                      checked={selectedFasilitasIds.includes(item.id)}
                      onChange={(e) =>
                        handleCheckboxChange(item.id, e.target.checked)
                      }
                      className="w-4 h-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                    {item.nama}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN BAWAH: TOMBOL SUBMIT BERDIRI SENDIRI DI TENAH */}
        <div className="border-t border-zinc-100 pt-4 flex justify-center w-full">
          <button
            type="submit"
            className="w-full max-w-[250px] p-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium cursor-pointer transition-colors duration-150 shadow-sm"
          >
            Simpan Tenant
          </button>
        </div>
      </form>
    </div>
  );
}

export default TenantCreate;
