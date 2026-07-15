import { useState, type JSX } from "react";
import Navbar from "../components/common/Navbar";
import FooterPage from "../components/layout/Footer";
import SAWView from "./spk/SAWview";
import WPView from "./spk/WPview";
import TOPSISView from "./spk/TOPSISview";

const HasilSPKPage = () => {
  // 1. Ambil data dari localStorage
  const rawData = localStorage.getItem("spk_results");
  const data = rawData ? JSON.parse(rawData) : null;
  
  const [activeMethod, setActiveMethod] = useState("SAW");

  // 2. Jika data kosong, tampilkan pesan ini
  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Data tidak ditemukan. Silakan isi bobot kembali.</p>
          <button 
            onClick={() => window.location.href = '/admin/spk'} 
            className="bg-teal-700 text-white px-6 py-2 rounded-lg"
          >
            Kembali ke Input
          </button>
        </div>
      </div>
    );
  }

  // 3. FIX: Gunakan Record<string, JSX.Element> agar TypeScript tidak error "never"
  const views: Record<string, JSX.Element> = {
    SAW: <SAWView data={data.SAW} />,
    WP: <WPView data={data.WP} />,
    TOPSIS: <TOPSISView data={data.TOPSIS} />,
  };

  return (
    <div className="min-h-screen font-sans bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 py-25">
        <h1 className="text-3xl font-bold mb-8 text-center">Hasil Analisis Keputusan</h1>
        
        {/* Tabs */}
        <div className="flex gap-20 border-b border-gray-200 mb-8 justify-center">
          {["SAW", "WP", "TOPSIS"].map((method) => (
            <button
              key={method}
              onClick={() => setActiveMethod(method)}
              className={`pb-3 font-semibold transition ${
                activeMethod === method 
                  ? "text-teal-700 border-b-2 border-teal-700" 
                  : "text-gray-500 hover:text-teal-600"
              }`}
            >
              Metode {method}
            </button>
          ))}
        </div>

        {/* Dynamic View */}
        <div className="mt-6">
           {views[activeMethod]}
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default HasilSPKPage;