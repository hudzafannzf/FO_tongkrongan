import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import FooterPage from "../components/layout/Footer";
import { Sliders, List } from "lucide-react";

export default function Rekomendasi() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Konten Utama */}
      <main className="flex-grow max-w-8xl mx-auto w-full px-4 sm:px-8 py-25">
        {/* Tombol Navigasi (Tabs) */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-center mt-8">
            <div className="bg-white p-1.5 gap-5 rounded-2xl shadow-sm border border-gray-200 flex">
              <Link
                to="/rekomendasi/Sub"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  location.pathname.includes("/Sub")
                    ? "bg-teal-700 text-white shadow-md"
                    : "text-gray-500 hover:text-black hover:bg-purple-200"
                }`}
              >
                <Sliders size={18} />
                Atur Kategori
              </Link>
              <Link
                to="/rekomendasi/Bobot"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  location.pathname.includes("/Bobot")
                    ? "bg-teal-700 text-white shadow-md"
                    : "text-gray-500 hover:text-black hover:bg-purple-200"
                }`}
              >
                <List size={18} />
                Atur Bobot
              </Link>
            </div>
          </div>

          {/* Lubang untuk SPKInput.tsx atau Subpage.tsx */}
          <Outlet />
        </div>
      </main>

      <FooterPage />
    </div>
  );
}