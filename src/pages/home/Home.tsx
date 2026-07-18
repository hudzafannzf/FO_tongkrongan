import { useEffect, useState } from "react";
import { ChevronDown, Database, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/common/Navbar";

export default function Home() {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/public/tenants");
        setTenants(res.data.data);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    };
    fetchData();
  }, []);

  const scrollToTenant = () => {
    document
      .getElementById("tenant-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Tambahkan data ini di dalam komponen Home.tsx kamu
  const kulinerKhas = [
    {
      nama: "Tahu Aci",
      img: "https://img-global.cpcdn.com/recipes/489c4bd9cefaff4e/1200x630cq80/photo.jpg",
    },
    {
      nama: "Kupat Glabed",
      img: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=800",
    },
    {
      nama: "Nasi Lengko",
      img: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/720x0/webp/photo/2023/01/15/418340283.jpg",
    },
  ];

  // Dan tambahkan state ini di atas return
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % kulinerKhas.length);
    }, 3000); // Ganti gambar setiap 3 detik
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white">
      <Navbar />

      {/* === HERO SECTION === */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden z-20">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000')] bg-cover bg-center bg-no-repeat"></div>

        <div className="absolute inset-0 z-10 bg-black/60"></div>

        <div className="relative z-20 px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white drop-shadow-lg leading-tight">
            Jelajahi Cita Rasa <br className="hidden md:block" />
            <span className="text-purple-400 drop-shadow-md">
              Otentik Tegal
            </span>
          </h1>

          <p className="text-zinc-200 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium drop-shadow">
            Temukan rekomendasi kuliner terbaik di kota Tegal dengan sistem
            analisis data yang terpercaya.
          </p>

          <button
            onClick={scrollToTenant}
            className="group flex flex-col items-center gap-3 text-zinc-300 hover:text-purple-400 transition-colors mx-auto mt-4"
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase drop-shadow-sm">
              Lihat Kuliner Tegal
            </span>
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-md shadow-lg border border-white/20 group-hover:bg-purple-600/50 transition-all">
              <ChevronDown size={20} className="text-white animate-bounce" />
            </div>
          </button>
        </div>

        {/* WAVE CURVE */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px] md:h-[100px]"
          >
            <path
              d="M0,0 C150,100 450,100 600,60 C750,20 1050,20 1200,80 L1200,120 L0,120 Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </section>

      

      {/* === GERAI SECTION === */}
      <section
        id="tenant-section"
        className="relative z-10 w-full bg-white pt-10 pb-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900">Gerai</h2>
              <p className="text-zinc-500 mt-2">
                Daftar lengkap gerai dan warung makan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tenants.length > 0 ? (
              tenants.map((t: any) => (
                <div
                  key={t.id}
                  className="group bg-white border border-zinc-200/80 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-purple-100"
                >
                  <img
                    src={
                      t.logo ||
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000"
                    }
                    alt={t.nama}
                    className="w-full h-56 object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000";
                    }}
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-zinc-900 line-clamp-1">
                      {t.nama}
                    </h3>
                    <p className="text-zinc-500 text-sm mt-2 mb-6 line-clamp-2">
                      {t.alamat || "Alamat belum tersedia"}
                    </p>
                    <Link
                      to={`/detail/${t.id}`}
                      className="w-full py-3 border border-purple-200 text-purple-600 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-colors block text-center"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-20 text-zinc-400 bg-white rounded-3xl border border-zinc-200 border-dashed">
                Belum ada data gerai tersedia.
              </div>
            )}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              to="/gerai"
              className="px-8 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold rounded-full transition-all flex items-center gap-2"
            >
              Lihat Lebih Banyak Gerai
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* BAGIAN TEKS TETAP */}
          <div>
            <h2 className="text-4xl font-extrabold mb-6">
              Seleksi Cerdas dengan Metode SPK
            </h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Kami menggunakan algoritma pengambilan keputusan multi-kriteria
              canggih (SAW, WP, dan TOPSIS) untuk membantu Anda memilih
              pengalaman makan terbaik berdasarkan harga, rating, fasilitas, dan
              keaslian rasa.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-zinc-800 rounded-2xl border border-zinc-700">
                <Database className="text-purple-400 mb-3" />
                <h4 className="font-bold mb-2">Berbasis Data</h4>
                <p className="text-xs text-zinc-400">
                  Ulasan nyata dan pemrosesan data terverifikasi.
                </p>
              </div>
              <div className="p-6 bg-zinc-800 rounded-2xl border border-zinc-700">
                <ShieldCheck className="text-purple-400 mb-3" />
                <h4 className="font-bold mb-2">Terpersonalisasi</h4>
                <p className="text-xs text-zinc-400">
                  Hasil yang disesuaikan dengan prioritas Anda.
                </p>
              </div>
            </div>
          </div>

          {/* BAGIAN GAMBAR ANIMASI */}
          <div className="relative h-[350px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {kulinerKhas.map((item, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
              >
                <img
                  src={item.img}
                  alt={item.nama}
                  className="w-full h-full object-cover"
                />
                {/* Overlay teks di atas gambar */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white">{item.nama}</h3>
                  <p className="text-purple-300 font-medium tracking-wider uppercase text-sm">
                    Kuliner Ikonik Tegal
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="bg-zinc-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-bold text-lg text-zinc-900 mb-4">
              Portal Kuliner Tegal
            </h3>
            <p className="text-sm text-zinc-600 mb-4">
              © 2026 Portal Kuliner Tegal. Menjaga warisan kekayaan kuliner khas
              Tegal.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <Link to="/gerai" className="hover:text-purple-600">
                  Direktori
                </Link>
              </li>
              <li>
                <Link to="/spk" className="hover:text-purple-600">
                  Metode SPK
                </Link>
              </li>
              <li>
                <Link to="/tourism" className="hover:text-purple-600">
                  Dinas Pariwisata
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-4">Dibuat oleh beberapa mahasiswa</h4>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <Link to="/privacy" className="hover:text-purple-600">
                  Muhammad irhash syahid
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-purple-600">
                  Muhammad Huzaifah annazif
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-600">
                  Moh. fauzi hasan bix
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
