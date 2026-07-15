import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Database, ShieldCheck } from 'lucide-react';

const FooterPage = () => {
  const [index, setIndex] = useState(0);
  const kulinerKhas = [
    {
      nama: "Tahu Aci",
      img: "https://img-global.cpcdn.com/recipes/489c4bd9cefaff4e/1200x630cq80/photo.jpg",
    },
    {
      nama: "Kupat Glabed",
      img: "https://otokuliner.com/wp-content/uploads/2024/04/Kupat-Glabed.jpg",
    },
    {
      nama: "Nasi Lengko",
      img: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/720x0/webp/photo/2023/01/15/418340283.jpg",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % kulinerKhas.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [kulinerKhas.length]);

  return (
    <>
      {/* BAGIAN FEATURE SECTION */}
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
    </>
  );
}; // <--- Jangan lupa kurung kurawal penutup fungsi di sini

export default FooterPage;