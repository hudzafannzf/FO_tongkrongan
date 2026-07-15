import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Droplets,
  Car,
  Wifi,
  Sparkles,
  Plug,
  Music,
  Armchair,
  Sun,
  Baby,
  Utensils,
  Cigarette,
} from "lucide-react";
import api from "../../services/api";
import Navbar from "../../components/common/Navbar";
import defaultLogo from "../../assets/images/default_logo.png";
import { TbAirConditioning } from "react-icons/tb";
import { PiMosque } from "react-icons/pi";

// Fasilitas Icon Mapping
const FACILITY_ICONS: any = {
  toilet: <Droplets size={20} />,
  parkir: <Car size={20} />,
  "stop kontak": <Plug size={20} />,
  outdoor: <Sun size={20} />,
  indoor: <Armchair size={20} />,
  wifi: <Wifi size={20} />,
  ac: <TbAirConditioning size={20} />,
  mushola: <PiMosque size={20} />,
  "smoking area": <Cigarette size={20} />,
  "live music": <Music size={20} />,
  "baby chair": <Baby size={20} />,
  wastafel: <Utensils size={20} />,
};

const KEBERSIHAN_OPTIONS = [
  { label: "Sangat Bersih", value: 5, enum: "SANGAT_BERSIH" },
  { label: "Bersih", value: 4, enum: "BERSIH" },
  { label: "Standar", value: 3, enum: "STANDAR" },
  { label: "Kotor", value: 2, enum: "KOTOR" },
  { label: "Sangat Kotor", value: 1, enum: "SANGAT_KOTOR" },
];

export default function DetailTenant() {
  const { id } = useParams();
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedKebersihan, setSelectedKebersihan] = useState<any>(null);
  const [komentar, setKomentar] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/public/tenants/${id}`);
        setTenant(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (tenant && tenant.reviews) {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (user) {
        const myReview = tenant.reviews.find((r: any) => r.userId === user.id);
        if (myReview) {
          const savedOption = KEBERSIHAN_OPTIONS.find(
            (opt) => opt.enum === myReview.kebersihan,
          );
          setSelectedKebersihan(savedOption || null);
          setKomentar(myReview.komentar || "");
        }
      }
    }
  }, [tenant]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token) return alert("Login dulu!");
    if (!selectedKebersihan) return alert("Pilih kondisi!");

    const existingReview = tenant.reviews?.find(
      (r: any) => r.userId === user.id,
    );

    try {
      if (existingReview) {
        await api.put(
          `/reviews/${existingReview.id}`,
          {
            rating: selectedKebersihan.value,
            kebersihan: selectedKebersihan.enum,
            komentar: komentar,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Review berhasil diupdate!");
      } else {
        await api.post(
          `/reviews`,
          {
            tenantId: parseInt(id!),
            rating: selectedKebersihan.value,
            kebersihan: selectedKebersihan.enum,
            komentar: komentar,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Review berhasil dikirim!");
      }
      window.location.reload();
    } catch (err: any) {
      alert("Gagal memproses review.");
    }
  };

  if (loading) return <div className="p-20 text-center">Memuat...</div>;
  if (!tenant) return <div className="p-20 text-center">Data tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-zinc-50 pb-12 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-24">
        <Link
          to="/"
          className="inline-flex items-center text-zinc-500 mb-6 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Kembali
        </Link>

        {/* HEADER SIMETRIS */}
        <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm border border-zinc-100 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-black text-zinc-900">{tenant.nama}</h1>
            <p className="flex items-center text-zinc-500 mt-3">
              <MapPin size={18} className="mr-2" /> {tenant.alamat}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Operasional</p>
              <p className="font-semibold text-zinc-800 mt-1 flex items-center gap-2">
                <Clock size={16} /> {tenant.jamOperasional}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Rating Maps</p>
              <p className="font-black text-zinc-900 mt-1 flex items-center gap-2">
                <Star size={16} className="text-amber-500 fill-amber-500" />{" "}
                {tenant.ratingMaps || "0.0"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* KOLOM KIRI */}
          <div className="lg:col-span-2 space-y-6">
            <img
              src={tenant.logo || defaultLogo}
              alt={tenant.nama}
              className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-sm"
            />

            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
              <h2 className="font-bold text-xl mb-6">Fasilitas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tenant.kepemilikan?.map((k: any) => (
                  <div
                    key={k.fasilitas.id}
                    className="flex items-center gap-3 p-3 bg-zinc-50 rounded-2xl border border-zinc-100"
                  >
                    <div className="text-purple-600">
                      {FACILITY_ICONS[k.fasilitas.nama.toLowerCase()] || <Sparkles size={18} />}
                    </div>
                    <span className="text-sm font-medium">{k.fasilitas.nama}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm text-center">
              <h3 className="font-bold text-zinc-500">Skala Kebersihan</h3>
              <div className="text-6xl font-black text-purple-700 my-2">
                {tenant.reviews?.length > 0
                  ? (tenant.reviews.reduce((a: any, b: any) => a + b.rating, 0) / tenant.reviews.length).toFixed(1)
                  : "0.0"}
              </div>
              <p className="text-sm text-zinc-400">Rata-rata rating user</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xs uppercase text-zinc-400">Menu Andalan</h3>
                {tenant.menus && tenant.menus.length > 0 && (
                  <Link
                    to={`/detail/menu/${tenant.id}`}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    Lihat Semua
                  </Link>
                )}
              </div>
              
              <div className="space-y-4">
                {tenant.menus?.slice(0, 3).map((m: any) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <img
                      src={m.foto || defaultLogo}
                      className="w-12 h-12 rounded-xl object-cover bg-zinc-100"
                    />
                    <div>
                      <p className="text-sm font-semibold">{m.nama}</p>
                      <p className="text-xs text-purple-600 font-bold">
                        Rp {Number(m.harga).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM REVIEW */}
            <form onSubmit={handleSubmitReview} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
              <h3 className="font-bold mb-4 text-xs uppercase text-zinc-400">Pilih Kondisi</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {KEBERSIHAN_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedKebersihan(selectedKebersihan?.value === opt.value ? null : opt)}
                    className={`px-2 py-3 rounded-xl border text-xs font-medium transition-all duration-200 
                    ${selectedKebersihan?.value === opt.value
                        ? "bg-purple-700 text-white border-purple-700"
                        : "bg-zinc-50 border-zinc-100 hover:bg-purple-200"
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <textarea
                value={komentar}
                className="w-full border border-zinc-200 p-3 rounded-xl mb-3 text-sm focus:ring-2 ring-purple-200 outline-none"
                placeholder="Komentar..."
                onChange={(e) => setKomentar(e.target.value)}
              />
              <button className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-colors">
                {tenant.reviews?.find((r: any) => r.userId === JSON.parse(localStorage.getItem("user") || "null")?.id)
                  ? "Update Review"
                  : "Kirim Review"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}