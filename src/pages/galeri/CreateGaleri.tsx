import { useState, useRef } from "react";
import { createGaleri } from "../../services/galeriService";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CreateGaleri() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref untuk memicu klik

  const [form, setForm] = useState<{ gambar: File | null; caption: string }>({
    gambar: null,
    caption: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "gambar") {
      const file = e.target.files && e.target.files[0];
      setForm({ ...form, gambar: file || null });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/galeris", {
        gambar: form.gambar,
        caption: form.caption,
        tipe: "UMUM", // Contoh tipe
        // tenantId tidak perlu dikirim jika ini foto umum
      });
      alert("Berhasil!");
      navigate("/dashboard/admin/galeri");
    } catch (err) {
      console.error(err);
      alert("Gagal simpan");
    }
  };

  const inputClass =
    "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer";

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6">Tambah Galeri</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-sm font-medium text-gray-700">
          Pilih File Gambar
        </label>

        {/* Input file disembunyikan */}
        <input
          type="file"
          name="gambar"
          ref={fileInputRef}
          className="hidden"
          onChange={handleChange}
        />

        {/* Input tiruan yang terlihat seperti kolom input biasa */}
        <div
          className={inputClass}
          onClick={() => fileInputRef.current?.click()}
        >
          {form.gambar ? (
            form.gambar.name
          ) : (
            <span className="text-gray-400">Pilih file...</span>
          )}
        </div>

        <label className="text-sm font-medium text-gray-700">Caption</label>
        <input
          name="caption"
          placeholder="Masukkan caption..."
          className={inputClass.replace("cursor-pointer", "")}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mt-2"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

export default CreateGaleri;
