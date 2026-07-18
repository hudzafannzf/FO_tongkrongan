import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info, Wand2 } from "lucide-react";
import defaultLogo from "../../assets/images/default_logo.png";
import axios from "axios";
import { TiTick } from "react-icons/ti";

const CRITERIA = [
  {
    name: "harga",
    title: "Harga",
    desc: "Semakin tinggi presentase semakin murah harga yg di rekomendasikan",
  },
  {
    name: "jamOperasional",
    title: "Jam Operasional",
    desc: "Semakin tinggi presentase semakin lama jam operasional yang di rekomendasikan",
  },
  {
    name: "fasilitas",
    title: "Fasilitas",
    desc: "Semakin tinggi presentase semakin lengkap fasilitas dari tenant yang direkomendasikan",
  },
  {
    name: "menu",
    title: "Menu",
    desc: "Semakin tinggi presentase semakin Bervariasi Menu dari tenant yang direkomendasikan",
  },
  {
    name: "rating",
    title: "Rating",
    desc: "Semakin tinggi presentase semakin tinggi rating dari tenant yang direkomendasikan",
  },
  {
    name: "kebersihan",
    title: "Kebersihan",
    desc: "Semakin tinggi presentase semakin tinggi tingkat kebersihan tenant yang direkomendasikan",
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

  const total = Object.values(bobot).reduce((acc, curr) => acc + curr, 0);
  const navigate = useNavigate();

  // Slider dengan angka bulat untuk menghindari glitch React
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBobot((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  // FUNGSI NORMALISASI (Khusus Kelipatan 5)
  const handleNormalize = () => {
    if (total === 100) return;

    // Jika user belum mengisi sama sekali, bagi rata dalam kelipatan 5
    if (total === 0) {
      setBobot({
        harga: 20,
        jamOperasional: 20,
        fasilitas: 20,
        menu: 15,
        rating: 15,
        kebersihan: 10,
      });
      return;
    }

    // Algoritma Proporsional khusus Step 5
    // Kita butuh 20 unit (karena 20 unit x 5 = 100%)
    const targetUnits = 20; 
    
    const items = Object.keys(bobot).map((key) => {
      // Hitung jatah unit secara desimal
      const exactUnits = (bobot[key as keyof typeof bobot] / total) * targetUnits;
      return {
        key,
        int: Math.floor(exactUnits), // Ambil angka bulatnya
        remainder: exactUnits - Math.floor(exactUnits), // Ambil sisa desimalnya
      };
    });

    let sumInts = items.reduce((sum, item) => sum + item.int, 0);
    let diff = targetUnits - sumInts;

    // Urutkan berdasarkan sisa desimal terbesar (Largest Remainder)
    items.sort((a, b) => b.remainder - a.remainder);

    // Tambahkan 1 unit ke kriteria dengan sisa terbesar agar pas 20 unit
    for (let i = 0; i < diff; i++) {
      items[i].int += 1;
    }

    // Kembalikan menjadi format kelipatan 5 (dikali 5)
    const newBobot: any = {};
    items.forEach((item) => {
      newBobot[item.key] = item.int * 5;
    });

    setBobot(newBobot);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (total !== 100) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Sesi habis atau belum login. Silakan Login ulang!");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/spk/calculate",
        { bobot },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem("spk_results", JSON.stringify(res.data.data));
      navigate("/rekomendasi/bobothasil"); 
    } catch (err: any) {
      console.error(err);
      alert(
        err.response?.data?.message || "Gagal memproses data. Cek console."
      );
    }
  };

  return (
    <div className="p-8 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-20">
        
        {/* Kolom Kiri: Header */}
        <div className="space-y-6">
          <p className="text-teal-900 font-bold uppercase tracking-wider text-sm">
            Sistem Pendukung Keputusan
          </p>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            "Atur Seberapa Penting Kriteria Ini Bagi Anda"
          </h1>
          <div>
            <p className="text-gray-600 mb-2">
              Untuk mendapatkan hasil yang paling tepat, bantu kami mengatur
              prioritas Anda. Bagaimana cara kerjanya?
            </p>
            <p className="text-gray-600">
              Berikan nilai persentase untuk setiap kriteria berdasarkan
              seberapa penting hal itu bagi Anda.
            </p>
          </div>
          <div className="bg-teal-50 px-6 py-5 flex gap-4 rounded-2xl border border-gray-200 text-sm text-gray-700">
            <Info size={24} className="text-teal-600 flex-shrink-0" />
            <div>
              <p className="mb-1">
                <strong>Aturan:</strong>
              </p>
              <div>
                <p className="flex items-center font-medium text-gray-900">
                  <TiTick className="text-teal-600 text-xl mr-1" /> Pastikan total seluruh persentase tepat 100%.
                </p>
                <p className="text-teal-800 ml-6 mt-1 text-xs">
                  Contoh: Jika bagi Anda 'Harga' adalah segalanya, berikan bobot yang lebih besar di 'Harga' dibanding kriteria lain.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full h-64 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={defaultLogo}
              alt="Ilustrasi"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Kolom Kanan: Slider */}
        <div className="bg-white">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {CRITERIA.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {item.title}
                  </h3>
                  <span className="text-teal-700 font-bold text-lg bg-teal-50 px-3 py-1 rounded-lg min-w-[3rem] text-center">
                    {bobot[item.name as keyof typeof bobot]}%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4 h-10">{item.desc}</p>
                <input
                  type="range"
                  name={item.name}
                  min="0"
                  max="100"
                  step={5} // <-- Dikembalikan ke step 5 (dalam format Number agar React tidak glitch)
                  value={bobot[item.name as keyof typeof bobot]}
                  onChange={handleSlider}
                  // touch-none mencegah browser melakukan scroll saat user sedang menarik slider
                  className="w-full accent-teal-600 h-2.5 bg-gray-200 rounded-lg cursor-grab active:cursor-grabbing touch-none"
                />
              </div>
            ))}
          </div>

          {/* Area Bawah: Total & Tombol-Tombol */}
          <div className="mt-14 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="flex flex-col w-full md:w-auto">
              <div className={`p-4 border rounded-xl text-center md:text-left transition-colors ${total === 100 ? 'bg-teal-50 border-teal-200' : 'bg-gray-50 border-gray-200'}`}>
                <p className="text-gray-600">
                  Total Persentase:{" "}
                  <strong
                    className={`text-2xl ml-2 ${total === 100 ? "text-teal-600" : "text-red-500"}`}
                  >
                    {total}%
                  </strong>{" "}
                  <span className="text-sm text-gray-400">/ 100%</span>
                </p>
              </div>
              <p
                className={`text-sm text-red-500 font-medium mt-2 transition-opacity duration-300 ${total === 100 ? "opacity-0 h-0" : "opacity-100"}`}
              >
                Total persentase harus tepat 100%.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* TOMBOL NORMALISASI (Auto 100%) */}
              <button
                type="button"
                onClick={handleNormalize}
                disabled={total === 100}
                className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-teal-600 text-teal-700 font-bold rounded-xl disabled:border-gray-200 disabled:text-gray-400 hover:bg-teal-50 transition transform active:scale-95"
              >
                <Wand2 size={18} /> Normalisasi 100%
              </button>

              <button
                onClick={handleSubmit}
                disabled={total !== 100}
                className="px-8 py-4 bg-teal-700 text-white font-bold rounded-xl disabled:bg-gray-300 hover:bg-teal-800 transition transform active:scale-95"
              >
                Lihat Rekomendasi ↗
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}