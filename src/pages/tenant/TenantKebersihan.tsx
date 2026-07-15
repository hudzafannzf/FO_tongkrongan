import { useState, useEffect } from "react";
import { getReviews } from "../../services/reviewService";

const KONVERSI_SPK_KEBERSIHAN: Record<string, { skor: number; label: string }> =
  {
    SANGAT_BERSIH: { skor: 5, label: "Sangat Bersih" },
    BERSIH: { skor: 4, label: "Bersih" },
    STANDAR: { skor: 3, label: "Standar" },
    KOTOR: { skor: 2, label: "Kotor" },
    SANGAT_KOTOR: { skor: 1, label: "Sangat Kotor" },
  };

function TenantReviewKebersihan() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [nilaiC5, setNilaiC5] = useState(0);
  const [rataRataSkor, setRataRataSkor] = useState(0);
  const [loading, setLoading] = useState(true);

  // 2. Ambil data asli dari database saat halaman pertama kali dimuat
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await getReviews();
        setReviews(res.data);
      } catch (err) {
        console.error("Gagal memuat review database:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) {
      setNilaiC5(0);
      setRataRataSkor(0);
      return;
    }

    const totalSkorKebersihan = reviews.reduce((sum, item) => {
      const info = KONVERSI_SPK_KEBERSIHAN[item.kebersihan];
      return sum + (info ? info.skor : 0);
    }, 0);

    // FIX: Sekarang dibagi dengan reviews.length
    const hasilHitungC5 = totalSkorKebersihan / reviews.length;
    setNilaiC5(parseFloat(hasilHitungC5.toFixed(2)));

    // Rata-rata kondisi riil
    setRataRataSkor(
      parseFloat((totalSkorKebersihan / reviews.length).toFixed(1)),
    );
  }, [reviews]);

  if (loading) {
    return (
      <div className="text-center text-xs text-zinc-500 p-8">
        Memuat data review...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      {/* HEADER */}
      <div className="border-b border-zinc-100 pb-4">
        <h1 className="text-xl font-semibold text-zinc-900 m-0">
          Review Kebersihan & Nilai C5
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Akumulasi nilai otomatis dari seluruh rating pengguna untuk patokan
          perhitungan rumus SPK kriteria kebersihan.
        </p>
      </div>

      {/* UTAMA: GRID 2 KOLOM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* KOLOM KIRI: DAFTAR HISTORI REVIEW */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <span className="text-xs font-semibold text-zinc-700 block mb-1">
            Daftar Review Pengunjung:
          </span>

          <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2">
            {reviews.length === 0 ? (
              <div className="p-8 border border-dashed border-zinc-300 rounded-xl text-center bg-zinc-50/50">
                <span className="text-2xl">💬</span>
                <p className="text-zinc-500 text-xs font-medium mt-2 m-0">
                  Belum ada review kebersihan dari pengunjung untuk tenant ini.
                </p>
              </div>
            ) : (
              reviews.map((rev) => {
                const infoKebersihan = KONVERSI_SPK_KEBERSIHAN[rev.kebersihan];
                return (
                  <div
                    key={rev.id}
                    className="p-4 rounded-lg border border-zinc-200 bg-white flex flex-col gap-2 shadow-xs"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        {/* Menampilkan username pengulas jika data relasi user-nya ada */}
                        <span className="font-bold text-zinc-700">
                          {rev.user?.username || "User Anonymous"}
                        </span>
                        <span className="text-zinc-400">|</span>
                        <span className="text-zinc-400">
                          {new Date(rev.createdAt).toLocaleDateString("id-ID")}
                        </span>
                      </div>
                      <span className="bg-zinc-100 text-zinc-700 font-medium px-2 py-0.5 rounded">
                        ⭐ {rev.rating}
                      </span>
                    </div>

                    {rev.komentar && (
                      <p className="text-xs text-zinc-600 m-0 italic">
                        "{rev.komentar}"
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[11px] text-zinc-400">
                        Rating Kebersihan:
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                        {infoKebersihan?.label || rev.kebersihan} (Skor:{" "}
                        {infoKebersihan?.skor || 0})
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* KOLOM KANAN: LIVE AKUMULASI PARAMETER SPK (C5) */}
        <div className="bg-zinc-50/50 p-5 rounded-xl border border-zinc-200 flex flex-col gap-4">
          <h3 className="text-xs font-bold text-zinc-700 m-0 uppercase tracking-wider">
            Kalkulasi Kriteria SPK (C5)
          </h3>

          <div className="flex justify-between items-center border-b border-zinc-200/60 pb-3">
            <span className="text-xs text-zinc-500">Total Review Terbaca:</span>
            <span className="text-sm font-bold text-zinc-800">
              {reviews.length} Ulasan
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-zinc-200/60 pb-3">
            <span className="text-xs text-zinc-500">Rata-rata Kondisi:</span>
            <span className="text-sm font-bold text-zinc-800 flex items-center gap-2">
              {reviews.length === 0
                ? "—"
                : rataRataSkor >= 4
                  ? "✨ Bersih"
                  : rataRataSkor >= 3
                    ? "👍 Standar"
                    : "⚠️ Kurang"}

              {/* Tambahkan baris ini untuk menampilkan angkanya */}
              {reviews.length > 0 && (
                <span className="text-[10px] font-normal text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">
                  {rataRataSkor}
                </span>
              )}
            </span>
          </div>

          {/* LIVE SCORE PENENTU BOBOT SPK (C5) */}
          <div className="text-center py-5 bg-white rounded-lg border border-zinc-200 shadow-xs mt-1">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block tracking-wider">
              Nilai Input SPK (C5)
            </span>
            <span className="text-4xl font-extrabold text-purple-600 block mt-1.5">
              {nilaiC5}
            </span>
            <p className="text-[10px] text-zinc-400 m-0 mt-2 px-4 leading-relaxed">
              Rata rata rating review kebersihan oleh pengguna
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantReviewKebersihan;
