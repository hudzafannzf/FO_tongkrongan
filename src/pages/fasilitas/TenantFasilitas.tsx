import { useState, useEffect } from "react";

// Data fasilitas disesuaikan persis dengan ID & Poin di phpMyAdmin kamu
const LIST_FASILITAS = [
  { id: 1, nama: "Toilet", poin: 5 },
  { id: 2, nama: "Parkir", poin: 5 },
  { id: 3, nama: "Stop Kontak", poin: 5 },
  { id: 4, nama: "Outdoor", poin: 5 },
  { id: 5, nama: "Indoor", poin: 5 },
  { id: 6, nama: "WiFi", poin: 10 },
  { id: 7, nama: "AC", poin: 10 },
  { id: 8, nama: "Mushola", poin: 10 },
  { id: 9, nama: "Smoking Area", poin: 10 },
  { id: 10, nama: "Live Music", poin: 10 },
  { id: 11, nama: "Ruang Meeting", poin: 10 },
  { id: 12, nama: "Drive Thru", poin: 15 },
];

function TenantFasilitas() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [totalPoin, setTotalPoin] = useState(0);
  const [bobotSPK, setBobotSPK] = useState(1);
  const [statusFasilitas, setStatusFasilitas] = useState("Sangat Kurang");

  // Otomatis menghitung akumulasi skor C4 berdasarkan Excel kamu
  useEffect(() => {
    const total = LIST_FASILITAS.reduce((sum, item) => {
      return selectedIds.includes(item.id) ? sum + item.poin : sum;
    }, 0);
    
    setTotalPoin(total);

    // Penentuan Parameter Nilai SPK C4 sesuai gambar Excel:
    if (total <= 20) {
      setBobotSPK(1);
      setStatusFasilitas("Sangat Kurang");
    } else if (total <= 40) {
      setBobotSPK(2);
      setStatusFasilitas("Kurang");
    } else if (total <= 60) {
      setBobotSPK(3);
      setStatusFasilitas("Cukup");
    } else if (total <= 80) {
      setBobotSPK(4);
      setStatusFasilitas("Lengkap");
    } else {
      setBobotSPK(5);
      setStatusFasilitas("Sangat Lengkap");
    }
  }, [selectedIds]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
  };

  const handleSimpan = (e: React.FormEvent) => {
    e.preventDefault();
    // Di sini nanti kamu panggil service axios/fetch untuk simpan array `selectedIds` ke backend
    alert(`Berhasil menyimpan!\nTotal Skor: ${totalPoin}\nNilai Input SPK C4: ${bobotSPK}`);
  };

  return (
    <div className="p-6 bg-zinc-50 min-h-screen font-sans">
      <div className="w-full max-w-[950px] mx-auto bg-white p-8 rounded-xl border border-zinc-200 shadow-sm">
        
        {/* HEADER */}
        <div className="border-b border-zinc-100 pb-4 mb-6">
          <h1 className="text-xl font-semibold text-zinc-900 m-0">Review & Kelengkapan Fasilitas</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Pilih fasilitas yang tersedia untuk menghitung total akumulasi parameter nilai SPK Kriteria C4.
          </p>
        </div>

        {/* INTERFACE GRID: 2 KOLOM BERSISIAN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* SEKTOR KIRI: LIST CHECKBOX FASILITAS */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-semibold text-zinc-700 block mb-1">Daftar Opsi Fasilitas:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LIST_FASILITAS.map((item) => (
                <label 
                  key={item.id} 
                  className={`flex items-center justify-between p-3.5 rounded-lg border text-sm transition-all cursor-pointer select-none
                    ${selectedIds.includes(item.id) 
                      ? "border-purple-300 bg-purple-50/40 text-purple-900" 
                      : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                    <span className="font-medium">{item.nama}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full 
                    ${selectedIds.includes(item.id) ? "bg-purple-200 text-purple-800" : "bg-zinc-100 text-zinc-500"}`}>
                    +{item.poin} Poin
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* SEKTOR KANAN: LIVE MONITORING PARAMETER RUMUS SPK */}
          <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-200 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-zinc-700 m-0 uppercase tracking-wider">
              Kalkulasi Kriteria (C4)
            </h3>
            
            <div className="flex justify-between items-center border-b border-zinc-200/60 pb-3">
              <span className="text-xs text-zinc-500">Skor Akumulasi:</span>
              <span className="text-sm font-bold text-zinc-800">{totalPoin} / 100</span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-200/60 pb-3">
              <span className="text-xs text-zinc-500">Status Kelengkapan:</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                bobotSPK >= 4 ? "bg-emerald-50 text-emerald-700" : bobotSPK === 3 ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
              }`}>
                {statusFasilitas}
              </span>
            </div>

            {/* PARAMETER AKHIR YANG AKAN DI-INPUT KE SPK */}
            <div className="text-center py-5 bg-white rounded-lg border border-zinc-200 shadow-2xs mt-1">
              <span className="text-[10px] text-zinc-400 font-bold uppercase block tracking-wider">
                Nilai Parameter SPK
              </span>
              <span className="text-4xl font-extrabold text-purple-600 block mt-1.5">
                {bobotSPK}
              </span>
            </div>
          </div>

        </div>

        {/* TOMBOL AJUKAN / SIMPAN DI TENGAH BAWAH */}
        <div className="border-t border-zinc-100 pt-5 mt-6 flex justify-center">
          <button
            type="button"
            onClick={handleSimpan}
            className="w-full max-w-[200px] py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium cursor-pointer transition-colors shadow-2xs"
          >
            Simpan Perubahan
          </button>
        </div>

      </div>
    </div>
  );
}

export default TenantFasilitas;