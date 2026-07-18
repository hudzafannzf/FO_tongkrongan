import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import FooterPage from "../components/layout/Footer";
import { MapPin, Star, Clock } from "lucide-react";
import defaultLogo from "../assets/images/default_logo.png";

export default function SubHasil() {
  const navigate = useNavigate();
  const [rankingData, setRankingData] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("spk_results");
    if (!stored) {
      navigate("/rekomendasi");
      return;
    }

    const parsed = JSON.parse(stored);
    let allData: any[] = [];

    if (parsed.KATEGORI) {
      if (parsed.KATEGORI.perfect || parsed.KATEGORI.close) {
        allData = [
          ...(parsed.KATEGORI.perfect || []),
          ...(parsed.KATEGORI.close || []),
        ];
      } else if (parsed.KATEGORI.steps && parsed.KATEGORI.steps[0].data) {
        allData = parsed.KATEGORI.steps[0].data;
      }
    }

    if (allData.length > 0) {
      allData.sort((a: any, b: any) => b.score - a.score);
      setRankingData(allData);
    } else {
      navigate("/rekomendasi/bobothasil");
    }
  }, [navigate]);

  const displayData = rankingData.slice(0, 10);

  const top3 = displayData.slice(0, 3);
  const otherRanks = displayData.slice(3, 10);

  const getImageUrl = (logoStr: string | undefined | null) => {
    if (!logoStr) return defaultLogo;
    if (logoStr.startsWith("http")) return logoStr;
    return `http://localhost:3000/${logoStr}`;
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 pt-28 ">
        <div className="mb-5 text-center md:text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rekomendasi Tempat Terbaik
          </h1>
          <p className="text-gray-600">
            Berikut adalah deretan gerai yang paling sesuai dengan preferensi
            Anda.
          </p>
        </div>


        {top3.length > 0 && (
          <div className="flex flex-col md:flex-row justify-center items-end gap-6 md:gap-4 lg:gap-8 mb-16 pt-6">
            {top3.map((item, index) => {
              // Menentukan juara 1, 2, dan 3
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
                <div
                  key={item.id}
                  className={`relative flex flex-col rounded-3xl p-5 border transition-all duration-300 w-full md:w-1/3 ${rankOrder} ${cardStyle}`}
                >

                  <div
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full text-2xl font-black shadow-lg border-4 border-white ${badgeColor}`}
                  >
                    {index + 1}
                  </div>

                  <img
                    src={getImageUrl(item.logo)}
                    alt={item.nama}
                    className="w-full h-44 object-cover rounded-2xl mb-4 border border-gray-100"
                    onError={(e) => (e.currentTarget.src = defaultLogo)}
                  />

                  <div className="flex flex-col items-center text-center flex-grow">
                    <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                      {item.nama}
                    </h2>


                    <div className="flex items-center gap-1 bg-gray-100/80 px-3 py-1 rounded-full text-gray-700 text-xs font-bold mb-4 border border-gray-200">
                      <Star
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
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
                      <Link
                        to={`/detail/${item.id}`}
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
        )}

        {otherRanks.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Rekomendasi Alternatif (Top 4 - 10)
            </h3>

            {otherRanks.map((item, index) => {
              const actualRank = index + 4;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-5 items-center md:items-start transition-all hover:shadow-md"
                >
                  <div className="flex flex-col items-center min-w-[120px] shrink-0 w-full md:w-auto">
                    <img
                      src={getImageUrl(item.logo)}
                      alt={item.nama}
                      className="w-full md:w-32 h-32 md:h-24 object-cover rounded-xl shadow-sm mb-2"
                      onError={(e) => (e.currentTarget.src = defaultLogo)}
                    />
                    <div className="text-xl font-black text-gray-400 mb-1">
                      #{actualRank}
                    </div>
                  </div>

                  <div className="flex-grow w-full">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {item.nama}
                        </h2>
                      </div>
                      {item.ratingMaps !== undefined && (
                        <div className="flex items-center gap-1 bg-teal-50 px-2 py-1 rounded-full text-teal-800 font-semibold text-xs border border-teal-100">
                          <Star
                            size={12}
                            className="fill-teal-600 text-teal-600"
                          />
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
                          <MapPin
                            size={14}
                            className="text-gray-400 shrink-0 mt-0.5"
                          />
                          <span className="line-clamp-1 text-sm">
                            {item.alamat}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-auto shrink-0 md:self-center mt-3 md:mt-0">
                    <Link
                      to={`/detail/${item.id}`}
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
      </main>

      <FooterPage />
    </div>
  );
}