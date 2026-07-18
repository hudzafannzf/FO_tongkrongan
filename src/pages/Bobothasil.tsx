import { useState, useEffect, type JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import FooterPage from "../components/layout/Footer";
import { MapPin, Star, Clock, ChevronDown, ChevronUp } from "lucide-react";
import defaultLogo from "../assets/images/default_logo.png";
import { getTenants } from "../services/tenantService";

import SAWView from "./spk/SAWview";
import WPView from "./spk/WPview";
import TOPSISView from "./spk/TOPSISview";

const HasilSPKPage = () => {
  const navigate = useNavigate();
  const rawData = localStorage.getItem("spk_results");
  const data = rawData ? JSON.parse(rawData) : null;
  
  const [activeMethod, setActiveMethod] = useState("SAW");
  const [showDetail, setShowDetail] = useState(false);
  const [fullTenants, setFullTenants] = useState<any[]>([]); // State buat nyimpen data tenant lengkap

  // 1. Ambil data tenant utuh (yang ada logonya) saat halaman dimuat
  useEffect(() => {
    const fetchFullData = async () => {
      try {
        const res = await getTenants();
        const result = Array.isArray(res) ? res : (res?.data || res?.tenants || []);
        setFullTenants(result);
      } catch (error) {
        console.error("Gagal mengambil data lengkap tenant:", error);
      }
    };
    fetchFullData();
  }, []);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <p className="mb-4 text-gray-600">Data tidak ditemukan. Silakan isi bobot kembali.</p>
          <button 
            onClick={() => navigate('/rekomendasi')} 
            className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded-xl transition"
          >
            Kembali ke Input
          </button>
        </div>
      </div>
    );
  }

  const views: Record<string, JSX.Element> = {
    SAW: <SAWView data={data.SAW} />,
    WP: <WPView data={data.WP} />,
    TOPSIS: <TOPSISView data={data.TOPSIS} />,
  };

  // Helper untuk ambil array akhir dari SPK
  const getFinalData = (methodData: any) => {
    if (!methodData) return [];
    if (methodData.steps && Array.isArray(methodData.steps)) {
      const lastStep = methodData.steps[methodData.steps.length - 1];
      return lastStep.data || [];
    }
    if (Array.isArray(methodData)) return methodData;
    return [];
  };

  const currentFinalData = getFinalData(data[activeMethod]);
  
  // 2. GABUNGKAN DATA: Skor dari SPK + Detail dari Tenant Asli
  const mergedData = currentFinalData.map((spkItem: any) => {
    // Cocokkan data SPK dengan data tenant asli berdasarkan ID atau Nama
    const originalData = fullTenants.find(
      (t) => t.id === spkItem.id || t.nama?.toLowerCase() === spkItem.nama?.toLowerCase()
    ) || {};

    return {
      ...originalData, // Masukkan gambar, jam, alamat, dll
      ...spkItem,      // Timpa namanya dengan format SPK (dan pastikan skor masuk)
      score: spkItem.score
    };
  });
  
  // 3. Urutkan & Potong Cuma Jadi 5
  const sortedData = [...mergedData].sort((a: any, b: any) => b.score - a.score);
  const top5Data = sortedData.slice(0, 5); 
  
  const top3 = top5Data.slice(0, 3);
  const otherRanks = top5Data.slice(3, 5);

  const getImageUrl = (logoStr: string | undefined | null) => {
    if (!logoStr) return defaultLogo;
    if (logoStr.startsWith("http")) return logoStr;
    return `http://localhost:3000/${logoStr}`;
  };

  const formatScore = (score: any) => {
    const num = Number(score);
    return isNaN(num) ? "0.000" : num.toFixed(4);
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 pt-28">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 text-gray-900">Hasil Analisis Keputusan</h1>
          <p className="text-gray-600">
            Sistem merekomendasikan 5 gerai terbaik berdasarkan pembobotan kriteria Anda.
          </p>
        </div>
        
        {/* TABS METODE */}
        <div className="flex gap-4 md:gap-12 border-b border-gray-200 mb-12 justify-center overflow-x-auto">
          {["SAW", "WP", "TOPSIS"].map((method) => (
            <button
              key={method}
              onClick={() => setActiveMethod(method)}
              className={`pb-3 font-semibold transition whitespace-nowrap px-2 ${
                activeMethod === method 
                  ? "text-teal-700 border-b-[3px] border-teal-700" 
                  : "text-gray-400 hover:text-teal-600"
              }`}
            >
              Metode {method}
            </button>
          ))}
        </div>

        {/* SECTION 1: PODIUM (TOP 1, 2, 3) */}
        {top3.length > 0 ? (
          <>
            <div className="flex flex-col md:flex-row justify-center items-end gap-6 md:gap-4 lg:gap-8 mb-16 pt-6">
              {top3.map((item, index) => {
                const isRank1 = index === 0;
                const isRank2 = index === 1;
                const isRank3 = index === 2;

                const rankOrder = isRank1
                  ? "order-1 md:order-2 z-10"
                  : isRank2
                    ? "order-2 md:order-1"
                    : isRank3 ? "order-3 md:order-3" : "";

                const cardStyle = isRank1
                  ? "md:-mt-10 border-amber-300 ring-4 ring-amber-100 shadow-xl bg-gradient-to-b from-amber-50 to-white"
                  : isRank2
                    ? "md:mt-10 border-slate-200 shadow-md bg-white opacity-95 hover:opacity-100"
                    : isRank3 ? "md:mt-10 border-orange-200 shadow-md bg-white opacity-95 hover:opacity-100" : "";

                const badgeColor = isRank1
                  ? "bg-amber-500 text-white"
                  : isRank2
                    ? "bg-slate-300 text-slate-700"
                    : isRank3 ? "bg-orange-700 text-white" : "";

                return (
                  // FIX ERROR "Unique Key": Gunakan item.id atau item.nama atau index sebagai fallback
                  <div
                    key={item.id || item.nama || `rank-${index}`}
                    className={`relative flex flex-col rounded-3xl p-5 border transition-all duration-300 w-full md:w-1/3 ${rankOrder} ${cardStyle}`}
                  >
                    <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full text-2xl font-black shadow-lg border-4 border-white ${badgeColor}`}>
                      {index + 1}
                    </div>

                    <img
                      src={getImageUrl(item.logo)}
                      alt={item.nama}
                      className="w-full h-44 object-cover rounded-2xl mb-4 border border-gray-100"
                      onError={(e) => (e.currentTarget.src = defaultLogo)}
                    />

                    <div className="flex flex-col items-center text-center flex-grow">
                      <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{item.nama}</h2>
                      <span className="text-xs font-semibold text-gray-500 mb-3">
                        Skor Akhir: <span className="text-gray-900">{formatScore(item.score)}</span>
                      </span>

                      <div className="flex items-center gap-1 bg-gray-100/80 px-3 py-1 rounded-full text-gray-700 text-xs font-bold mb-4 border border-gray-200">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        {item.ratingMaps || "0"} Rating
                      </div>

                      <div className="flex flex-col gap-1.5 w-full text-xs text-gray-600 mb-5 border-t border-gray-100 pt-4">
                        {item.jamOperasional && (
                          <div className="flex items-center justify-center gap-1.5">
                            <Clock size={13} className="text-gray-400 shrink-0" />
                            <span className="truncate">{item.jamOperasional}</span>
                          </div>
                        )}
                        {item.alamat && (
                          <div className="flex items-center justify-center gap-1.5">
                            <MapPin size={13} className="text-gray-400 shrink-0" />
                            <span className="line-clamp-1">{item.alamat}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-auto w-full">
                        {/* PASTIKAN item.id ADA, JIKA TIDAK ARAHKAN KE '#' */}
                        <Link
                          to={item.id ? `/detail/${item.id}` : '#'}
                          className={`block w-full py-3 text-sm font-bold rounded-xl transition shadow-sm
                          ${isRank1 ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-teal-700 hover:bg-teal-800 text-white"}`}
                        >
                          Lihat Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SECTION 2: LIST (RANK 4 & 5) */}
            {otherRanks.length > 0 && (
              <div className="space-y-4 mb-16 max-w-4xl mx-auto">
                {otherRanks.map((item, index) => {
                  const actualRank = index + 4;
                  return (
                    // FIX ERROR "Unique Key"
                    <div
                      key={item.id || item.nama || `list-${index}`}
                      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-5 items-center md:items-start transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col items-center min-w-[120px] shrink-0 w-full md:w-auto">
                        <img
                          src={getImageUrl(item.logo)}
                          alt={item.nama}
                          className="w-full md:w-32 h-32 md:h-24 object-cover rounded-xl shadow-sm mb-2"
                          onError={(e) => (e.currentTarget.src = defaultLogo)}
                        />
                        <div className="text-xl font-black text-gray-400 mb-1">#{actualRank}</div>
                      </div>

                      <div className="flex-grow w-full">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">{item.nama}</h2>
                            <span className="text-xs font-semibold text-gray-500">
                              Skor Akhir: {formatScore(item.score)}
                            </span>
                          </div>
                          {item.ratingMaps !== undefined && (
                            <div className="flex items-center gap-1 bg-teal-50 px-2 py-1 rounded-full text-teal-800 font-semibold text-xs border border-teal-100">
                              <Star size={12} className="fill-teal-600 text-teal-600" />
                              {item.ratingMaps}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mt-3">
                          {item.jamOperasional && (
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-gray-400" />
                              <span>{item.jamOperasional}</span>
                            </div>
                          )}
                          {item.alamat && (
                            <div className="flex items-start gap-2 w-full mt-1">
                              <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1 text-sm">{item.alamat}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="w-full md:w-auto shrink-0 md:self-center mt-3 md:mt-0">
                        <Link
                          to={item.id ? `/detail/${item.id}` : '#'}
                          className="block w-full text-center px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-all"
                        >
                          Detail
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* SECTION 3: DETAIL TABEL PERHITUNGAN (TOGGLE) */}
            <div className="mt-8 border-t border-gray-200 pt-10">
              <div className="text-center mb-6">
                <button 
                  onClick={() => setShowDetail(!showDetail)}
                  className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-6 rounded-full transition-all shadow-sm"
                >
                  {showDetail ? (
                    <>Tutup Detail Perhitungan <ChevronUp size={18} /></>
                  ) : (
                    <>Lihat Detail Perhitungan (Matrix & Normalisasi) <ChevronDown size={18} /></>
                  )}
                </button>
              </div>

              {showDetail && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
                   {views[activeMethod]}
                </div>
              )}
            </div>

          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500">Gagal memproses data hasil akhir.</p>
          </div>
        )}

      </main>
      <FooterPage />
    </div>
  );
};

export default HasilSPKPage;