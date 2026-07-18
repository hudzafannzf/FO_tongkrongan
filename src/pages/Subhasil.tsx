import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import FooterPage from "../components/layout/Footer";
import { MapPin, Star, Clock, Utensils, AlertTriangle } from "lucide-react";

export default function SubHasil() {
  const navigate = useNavigate();
  const [perfectData, setPerfectData] = useState<any[]>([]);
  const [closeData, setCloseData] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("spk_results");
    if (!stored) {
      navigate("/rekomendasi");
      return;
    }
    
    const parsed = JSON.parse(stored);
    
    // Pastikan ini adalah data KATEGORI baru yang kita modifikasi
    if (parsed.KATEGORI && (parsed.KATEGORI.perfect || parsed.KATEGORI.close)) {
      setPerfectData(parsed.KATEGORI.perfect || []);
      setCloseData(parsed.KATEGORI.close || []);
    } else {
      navigate("/rekomendasi/bobothasil"); 
    }
  }, [navigate]);

  // Cek apakah ada yang 100% cocok
  const hasPerfectMatch = perfectData.length > 0;
  // Jika ada perfect match tampilkan itu, jika tidak tampilkan close match (diambil 5 teratas saja)
  const displayData = hasPerfectMatch ? perfectData : closeData.slice(0, 5);

  return (
    <div className="min-h-screen font-sans bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 pt-28">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hasil Pencocokan Kategori</h1>
        </div>

        {/* NOTIFIKASI PINTAR (Muncul jika tidak ada yang 100% cocok) */}
        {!hasPerfectMatch ? (
          <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl mb-8 flex items-start gap-4 shadow-sm">
            <AlertTriangle className="text-amber-500 mt-1 flex-shrink-0" size={28} />
            <div>
              <h3 className="text-amber-900 font-bold text-lg">Tidak ada gerai yang 100% cocok.</h3>
              <p className="text-amber-800 text-sm mt-1">
                Kombinasi kriteria yang Anda pilih tidak ditemukan pada gerai manapun. Namun jangan khawatir, di bawah ini adalah <strong>Top 5 gerai yang paling mendekati</strong> dengan preferensi Anda.
              </p>
            </div>
          </div>
        ) : (
           <p className="text-teal-700 font-medium mb-8 bg-teal-50 p-4 rounded-xl border border-teal-100">
             ✨ Yeay! Berikut adalah gerai yang <strong>benar-benar sesuai 100%</strong> dengan pilihan Anda.
           </p>
        )}

        {/* List Card Rekomendasi */}
        <div className="space-y-6">
          {displayData.length > 0 ? (
            displayData.map((item, index) => (
              <div 
                key={item.id || index} 
                className={`bg-white rounded-2xl p-6 shadow-sm border flex flex-col md:flex-row gap-6 items-center md:items-start transition-all hover:shadow-md
                ${index === 0 ? 'border-amber-300 ring-2 ring-amber-100 bg-amber-50/10' : 'border-gray-100'}`}
              >
                {/* Ranking Badge */}
                <div className="flex flex-col items-center justify-center min-w-[100px]">
                  <div className={`text-4xl font-black ${index === 0 ? 'text-amber-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-amber-700' : 'text-teal-900'}`}>
                    #{index + 1}
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-medium text-center bg-white border px-2 py-1 rounded-lg">
                    {hasPerfectMatch ? "Cocok 100%" : "Kecocokan:"} <br/>
                    {!hasPerfectMatch && <span className="text-sm font-bold text-gray-900">{item.score} / 35 Poin</span>}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow w-full">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 gap-2">
                    <h2 className="text-2xl font-bold text-gray-900">{item.nama}</h2>
                    {item.ratingMaps !== undefined && (
                      <div className="flex items-center gap-1 bg-teal-50 px-3 py-1 rounded-full text-teal-800 font-semibold text-sm border border-teal-100">
                        <Star size={16} className="fill-teal-600 text-teal-600" />
                        {item.ratingMaps} Rating
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-600 mb-4">
                    {item.jamOperasional && (
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <span>{item.jamOperasional}</span>
                      </div>
                    )}
                    {item.totalMenu !== undefined && (
                      <div className="flex items-center gap-2">
                        <Utensils size={16} className="text-gray-400" />
                        <span>{item.totalMenu} Pilihan Menu</span>
                      </div>
                    )}
                    {item.harga && (
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs border border-green-100">$$$</div>
                        <span>{item.harga}</span>
                      </div>
                    )}
                    {item.alamat && (
                      <div className="flex items-start gap-2 md:col-span-2">
                        <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{item.alamat}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="w-full md:w-auto flex shrink-0 md:self-center">
                  <Link 
                    to={item.id ? `/detail/${item.id}` : '#'}
                    className="w-full text-center px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500">Tidak ada data rekomendasi yang bisa ditampilkan.</p>
            </div>
          )}
        </div>
      </main>
      
      <FooterPage />
    </div>
  );
}