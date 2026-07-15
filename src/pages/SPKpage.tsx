import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { Info } from "lucide-react";
import defaultLogo from "../assets/images/default_logo.png";
import FooterPage from "../components/layout/Footer";
import axios from "axios";

const CRITERIA = [
  {
    name: "harga",
    title: " Harga",
    desc: "Tingkat keterjangkauan harga menu.",
  },
  {
    name: "jamOperasional",
    title: " Jam Operasional",
    desc: "Kesesuaian waktu buka dengan jadwal Anda.",
  },
  {
    name: "fasilitas",
    title: " Fasilitas",
    desc: "Parkir, toilet, musholla, dan WiFi.",
  },
  {
    name: "menu",
    title: " Menu",
    desc: "Keragaman pilihan makanan dan minuman.",
  },
  {
    name: "rating",
    title: " Rating",
    desc: "Skor ulasan dari pengunjung lain.",
  },
  {
    name: "kebersihan",
    title: " Kebersihan",
    desc: "Standar sanitasi area makan.",
  },
];

export default function SPKInput() {
  const [bobot, setBobot] = useState({
    harga: 0,
    jamOperasional: 0,
    fasilitas: 0,
    menu: 0,
    rating: 0,
    kebersihan: 0,
  });

  // Hitung total secara otomatis setiap kali bobot berubah
  const total = Object.values(bobot).reduce((acc, curr) => acc + curr, 0);

  // 1. Handle perubahan slider
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBobot((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  const navigate = useNavigate();

  const handleKirimData = async (data: any) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/api/spk/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // BUNGKUS DATA DI SINI
        body: JSON.stringify({ bobot: data }),
      });

      if (response.status === 401) {
        alert(
          "Sesi Anda telah berakhir atau token tidak valid. Silakan login kembali.",
        );
        // Opsional: Hapus token yang salah dan redirect ke login
        // localStorage.removeItem('token');
        // navigate('/login');
        return;
      }

      const result = await response.json();
      console.log("Sukses:", result);
      alert("Data berhasil diproses!");
      navigate("/admin/spk/hasil", { state: { hasilSPK: result.data } });
    } catch (error) {
      console.error("Gagal memproses data:", error);
      alert("Terjadi kesalahan pada server.");
    }
  };

  // 3. Handle Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (total !== 100) return;

    try {
      // 1. Ambil token dari storage (PENTING: Sesuaikan nama key-nya dengan yang kamu pakai saat login, biasanya 'token')
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Sesi habis atau belum login. Silakan Login ulang!");
        // window.location.href = '/login'; // Hapus komentar ini jika mau otomatis ke halaman login
        return;
      }

      // 2. Kirim ke backend berserta Token di Header
      const res = await axios.post(
        "http://localhost:3000/api/spk/calculate",
        { bobot },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // 3. Simpan hasil SPK
      localStorage.setItem("spk_results", JSON.stringify(res.data.data));

      // 4. Pindah ke halaman hasil
      navigate("/admin/spk/hasil");
    } catch (err: any) {
      console.error(err);
      alert(
        err.response?.data?.message || "Gagal memproses data. Cek console.",
      );
    }
  };
  return (
    <div className="min-h-screen font-sans bg-white">
      <Navbar />
      <form onSubmit={handleSubmit} className="max-w-8xl mx-auto px-8 py-25 ">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-30">
          {/* Kolom Kiri: Header */}
          <div className="space-y-6">
            <p className="text-teal-900 font-bold ">
              SISTEM PENDUKUNNG KEPUTUSAN
            </p>
            <h1 className="text-4xl font-bold text-gray-900">
              Tentukan Kriteria Ideal Anda
            </h1>
            <p className="text-gray-600">
              Gunakan metode SPK (Sistem pendukung keputusan) untuk menemukan
              tempat kuliner paling otentik si tegal sesuai dengan prioritas
              yang anda inginkan
            </p>
            <div className="bg-gray-100 px-10 py-5 flex gap-3 rounded-2xl border border-gray-300">
              <div>
                <Info size={20} color="teal" />
              </div>
              <div>
                Sesuaikan bobot untuk setiap kriteria. pastikan total
                keseluruhan 100%
              </div>
            </div>
            <div className="mt-6 w-full h-64 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <img src={defaultLogo} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Kolom Kanan: Slider */}
          <div className="self-start bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {CRITERIA.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <span className="text-teal-700 font-bold">
                      {bobot[item.name as keyof typeof bobot]}%
                    </span>
                  </div>
                  <input
                    type="range"
                    name={item.name}
                    min="0"
                    max="100"
                    step="5"
                    value={bobot[item.name as keyof typeof bobot]}
                    onChange={handleSlider}
                    className="w-full accent-teal-700 h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t flex justify-center item-center gap-40">
              {/* Box Total */}
              <div className="flex gap-8 ">
                <div className="p-6 bg-white border border-gray-200 rounded-2xl">
                  <p className="text-sm text-gray-600">
                    Total: <strong>{total}/100%</strong>
                  </p>
                </div>

                {/* Teks Error - Kita pakai 'invisible' agar ruangnya tetap ada */}
                <p
                  className={`text-sm text-red-500 font-medium max-w-[200px] transition-opacity duration-300 ${total === 100 ? "invisible" : "visible"}`}
                >
                  Total persentase harus 100% untuk melanjutkan rekomendasi.
                </p>
              </div>

              {/* Tombol */}
              <button
                type="submit"
                disabled={total !== 100}
                className="px-10 py-4 bg-teal-700 text-white font-bold rounded-xl disabled:bg-gray-300 transition"
              >
                Lihat Rekomendasi ↗
              </button>
            </div>
          </div>
        </div>
      </form>
      <FooterPage />
    </div>
  );
}
