import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultLogo from "../../assets/images/default_logo.png";
import axios from "axios";

const CRITERIA = [
  {
    name: "harga",
    title: "Harga (Prioritas)",
    desc: "Pilih rentang harga yang Anda inginkan.",
    options: [
      { label: "< 15.000", value: 5 },
      { label: "15.000 - 25.000", value: 4 },
      { label: "25.000 - 50.000", value: 3 },
      { label: "50.000 - 100.000", value: 2 },
      { label: "> 100.000", value: 1 },
    ],
  },
  {
    name: "jamOperasional",
    title: "Jam Operasional (Prioritas)",
    desc: "Pilih jam operasional yang Anda harapkan.",
    options: [
      { label: "< 8 jam/hari", value: 1 },
      { label: "8 - 11 jam/hari", value: 2 },
      { label: "12 - 14 jam/hari", value: 3 },
      { label: "15 - 18 jam/hari", value: 4 },
      { label: "24 jam", value: 5 },
    ],
  },
  {
    name: "rating",
    title: "Rating (Prioritas)",
    desc: "Pilih target rating tempat.",
    options: [
      { label: "Rating 1-2", value: 1 },
      { label: "Rating 2.1-2.5", value: 2 },
      { label: "Rating 2.6-3.0", value: 3 },
      { label: "Rating 3.1-3.5", value: 4 },
      { label: "Rating 3.6-4.0", value: 5 },
      { label: "Rating 4.1-4.2", value: 6 },
      { label: "Rating 4.3-4.4", value: 7 },
      { label: "Rating 4.5-4.6", value: 8 },
      { label: "Rating 4.7-4.8", value: 9 },
      { label: "Rating 4.9-5.0", value: 10 },
    ],
  },
  {
    name: "fasilitas",
    title: "Fasilitas (Pendukung)",
    desc: "Pilih tingkat kelengkapan fasilitas.",
    options: [
      { label: "Sangat Kurang", value: 1 },
      { label: "Kurang", value: 2 },
      { label: "Cukup", value: 3 },
      { label: "Lengkap", value: 4 },
      { label: "Sangat Lengkap", value: 5 },
    ],
  },
  {
    name: "menu",
    title: "Menu (Pendukung)",
    desc: "Pilih jumlah pilihan menu.",
    options: [
      { label: "<= 10 menu", value: 1 },
      { label: "11 - 20 menu", value: 2 },
      { label: "21 - 30 menu", value: 3 },
      { label: "31 - 40 menu", value: 4 },
      { label: ">= 41 menu", value: 5 },
    ],
  },
  {
    name: "kebersihan",
    title: "Kebersihan (Pendukung)",
    desc: "Pilih tingkat kebersihan.",
    options: [
      { label: "Sangat kotor", value: 1 },
      { label: "Kotor", value: 2 },
      { label: "standar", value: 3 },
      { label: "bersih", value: 4 },
      { label: "Sangat bersih", value: 5 },
    ],
  },
];

export default function SPKInput() {
  const [bobot, setBobot] = useState({
    harga: 3,
    jamOperasional: 3,
    fasilitas: 3,
    menu: 3,
    rating: 5,
    kebersihan: 3,
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBobot((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Sesi habis atau belum login!");
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:3000/api/tenants", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const tenants = res.data.data;

      const getHargaLevel = (hargaStr: string) => {
        if (!hargaStr) return 3;
        const h = hargaStr.toLowerCase();
        if (h.includes("< 15") || h.includes("sangat murah")) return 5;
        if (h.includes("15.000 - 25.000") || h.includes("murah")) return 4;
        if (h.includes("25.000 - 50.000") || h.includes("sedang")) return 3;
        if ((h.includes("50.000 - 100.000") || h.includes("mahal")) && !h.includes("sangat mahal")) return 2;
        if (h.includes("> 100") || h.includes("sangat mahal")) return 1;
        return 3;
      };

      const getRatingLevel = (rating: number) => {
        if (!rating || rating <= 2) return 1;
        if (rating <= 2.5) return 2;
        if (rating <= 3.0) return 3;
        if (rating <= 3.5) return 4;
        if (rating <= 4.0) return 5;
        if (rating <= 4.2) return 6;
        if (rating <= 4.4) return 7;
        if (rating <= 4.6) return 8;
        if (rating <= 4.8) return 9;
        return 10;
      };

      const getMenuLevel = (totalMenu: number | undefined) => {
        if (!totalMenu) return 1;
        if (totalMenu <= 10) return 1;
        if (totalMenu <= 20) return 2;
        if (totalMenu <= 30) return 3;
        if (totalMenu <= 40) return 4;
        return 5;
      };

      const getJamLevel = (jamTeks: string | undefined) => {
        if (!jamTeks) return 1;
        if (jamTeks.includes("24.00") || jamTeks.includes("23.59")) return 5;
        try {
          const [buka, tutup] = jamTeks.split("-").map(j => parseInt(j.trim()));
          let durasi = tutup - buka;
          if (durasi < 0) durasi += 24;
          if (durasi < 8) return 1;
          if (durasi <= 11) return 2;
          if (durasi <= 14) return 3;
          if (durasi <= 18) return 4;
          return 5;
        } catch { return 3; }
      };

      const evaluatedTenants = tenants.map((tenant: any) => {
        const levelHarga = getHargaLevel(tenant.harga);
        const levelRating = getRatingLevel(tenant.ratingMaps);
        const levelJam = getJamLevel(tenant.jamOperasional);
        const levelMenu = getMenuLevel(tenant.totalMenu);
        const levelFasilitas = tenant.fasilitasLevel || 3; // Asumsi ada konversi fasilitas
        const levelKebersihan = tenant.kebersihanLevel || 3; // Asumsi ada konversi kebersihan

        // 1. CORE FACTOR GAP (Faktor Prioritas)
        const gapHarga = Math.abs(levelHarga - bobot.harga);
        const gapJam = Math.abs(levelJam - bobot.jamOperasional);
        const gapRating = Math.abs(levelRating - bobot.rating);
        const coreGap = gapHarga + gapJam + gapRating;

        // 2. SECONDARY FACTOR GAP (Faktor Pendukung)
        const gapFasilitas = Math.abs(levelFasilitas - bobot.fasilitas);
        const gapMenu = Math.abs(levelMenu - bobot.menu);
        const gapKebersihan = Math.abs(levelKebersihan - bobot.kebersihan);
        const secGap = gapFasilitas + gapMenu + gapKebersihan;

        // 3. PEMBOBOTAN SKOR (Misal: max poin 100. Core penalti 15x lipat, Sec penalti 2x lipat)
        const totalGap = coreGap + secGap;
        const finalScore = 100 - ((coreGap * 15) + (secGap * 2)); 

        return { 
          ...tenant, 
          score: finalScore, 
          coreGap: coreGap, 
          secGap: secGap, 
          totalGap: totalGap 
        };
      });

      // PISAHKAN BERDASARKAN PRIORITAS MUTLAK (CORE GAP)
      // perfect: Jika harga, jam, dan rating 100% cocok (coreGap === 0)
      const perfectMatches = evaluatedTenants.filter((t: any) => t.coreGap === 0);
      
      // close: Jika ada selisih di prioritas, tapi kita cari yang selisihnya paling sedikit
      const closeMatches = evaluatedTenants.filter((t: any) => t.coreGap > 0);

      // PENGURUTAN MULTI-LEVEL LOGIC
      // Urutkan yang mutlak berdasarkan kriteria pendukung terbaik
      perfectMatches.sort((a: any, b: any) => a.secGap - b.secGap);
      
      // Urutkan yang "close" berdasarkan coreGap terkecil dulu. 
      // Jika coreGap-nya sama (misal sama-sama selisih 1 tingkat), urutkan dari secGap terkecil.
      closeMatches.sort((a: any, b: any) => {
        if (a.coreGap !== b.coreGap) {
          return a.coreGap - b.coreGap; // Prioritas 1
        }
        return a.secGap - b.secGap;     // Prioritas 2
      });

      const resultData = {
        KATEGORI: {
          perfect: perfectMatches,
          close: closeMatches
        }
      };

      localStorage.setItem("spk_results", JSON.stringify(resultData));
      navigate("/rekomendasi/subhasil");

    } catch (err: any) {
      console.error(err);
      alert("Gagal memproses rekomendasi.");
    }
  };

  return (
    <div className="font-sans bg-white p-8 lg:p-12 w-full">
      <form onSubmit={handleSubmit} className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-20">
          <div className="space-y-6">
            <p className="text-teal-900 font-bold uppercase tracking-wider text-sm">
              Sistem Rekomendasi
            </p>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              Pilih Kriteria Harapan Anda
            </h1>
            <p className="text-gray-600">
              Pilih spesifikasi yang paling Anda inginkan. Sistem akan memprioritaskan
              secara mutlak <strong>Harga, Jam Operasional, dan Rating</strong>.
              Jika tidak ada yang sama persis, sistem akan merekomendasikan tempat
              yang nilainya paling mendekati dari ketiga kriteria prioritas tersebut.
            </p>
            <div className="mt-6 w-full h-64 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img
                src={defaultLogo}
                className="w-full h-full object-cover"
                alt="Ilustrasi Kriteria"
              />
            </div>
          </div>

          <div className="self-start rounded-3xl">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {CRITERIA.map((item) => (
                <div key={item.name} className="flex flex-col">
                  <h3 className="font-bold text-gray-800 mb-1 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">{item.desc}</p>
                  <select
                    name={item.name}
                    value={bobot[item.name as keyof typeof bobot]}
                    onChange={handleSelectChange}
                    className={`w-full bg-gray-50 border text-gray-700 rounded-xl px-4 py-3 outline-none cursor-pointer focus:ring-2 
                      ${item.title.includes("Prioritas") ? "border-gray-200 focus:ring-teal-600" : "border-gray-200 focus:ring-teal-600"}`}
                  >
                    {item.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="w-full md:w-auto px-10 py-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-md transition-transform transform hover:-translate-y-1"
              >
                Cari Tempat Pas ↗
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}