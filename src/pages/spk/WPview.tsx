const WPView = ({ data }: { data: any }) => {
  // SABUK PENGAMAN
if (!data) {
    return <div className="p-4 text-red-600 font-bold text-center">ERROR 1: Data dari API tidak masuk (Kosong/Undefined). Cek terminal Backend!</div>;
  }
  if (!data.steps) {
    return (
      <div className="p-4 text-red-600 text-center">
        <p className="font-bold">ERROR 2: Data masuk, tapi 'steps' tidak ada!</p>
        <p className="text-xs mt-2 text-gray-500">Isi data yang diterima: {JSON.stringify(data)}</p>
      </div>
    );
  }
  if (data.steps.length < 7) {
    return <div className="p-4 text-red-600 font-bold text-center">ERROR 3: Steps perhitungan kurang dari 7! (Saat ini cuma ada {data.steps.length})</div>;
  }

  const [step1, step2, step3, step4, step5, step6, step7] = data.steps;

  // Helper aman untuk format angka (mencegah error .toFixed bukan fungsi)
  const formatNum = (val: any, dec: number = 4) => 
    typeof val === 'number' ? val.toFixed(dec) : val;

  return (
    <div className="space-y-12">
      
      {/* TAHAP 1: KEPENTINGAN */}
      <section>
        <h2 className="text-xl font-bold mb-2">1. Tingkat Kepentingan (Hasil Konversi)</h2>
        <div className="bg-gray-50 p-4 rounded-xl mb-4 border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-1">Sumber & Rumus:</p>
          <p className="text-xs text-gray-700">Setiap nilai bobot awal yang diinputkan user dibagi dengan 5 untuk menyederhanakan skala, kemudian dijumlahkan secara keseluruhan.</p>
          <code className="text-xs block mt-2 text-gray-800 bg-white p-2 rounded border border-gray-200 font-mono">
            Kepentingan = Input Bobot / 5
          </code>
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-center">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">Harga</th><th className="p-4">Jam</th>
                <th className="p-4">Menu</th><th className="p-4">Fasilitas</th>
                <th className="p-4">Rating</th><th className="p-4">Kebersihan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-t">
                {Object.values(step1.data[0]).map((v: any, i: number) => (
                  <td key={i} className="p-4">{formatNum(v)}</td>
                ))}
              </tr>
            </tbody>
          </table>
          <div className="p-4 bg-gray-100 border-t font-bold text-gray-800">
            Total Kepentingan (Σ): {formatNum(step1.total)}
          </div>
        </div>
      </section>

      {/* TAHAP 2: BOBOT KEPENTINGAN (W) */}
      <section>
        <h2 className="text-xl font-bold mb-2">2. Normalisasi Bobot Kepentingan (W)</h2>
        <div className="bg-gray-50 p-4 rounded-xl mb-4 border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-1">Sumber & Rumus:</p>
          <p className="text-xs text-gray-700">Nilai kepentingan dibagi dengan total kepentingan. Kriteria <strong>Cost (Harga)</strong> diberikan pangkat negatif, sedangkan <strong>Benefit</strong> positif.</p>
          <code className="text-xs block mt-2 text-gray-800 bg-white p-2 rounded border border-gray-200 font-mono">
            W_j = Kepentingan_j / Σ Kepentingan
          </code>
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-center">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">Harga (Cost)</th><th className="p-4">Jam</th>
                <th className="p-4">Menu</th><th className="p-4">Fasilitas</th>
                <th className="p-4">Rating</th><th className="p-4">Kebersihan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-t">
                {Object.values(step2.data[0]).map((v: any, i: number) => (
                  <td key={i} className={`p-4 font-mono ${v < 0 ? 'text-red-600 font-bold' : ''}`}>
                    {formatNum(v)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* TAHAP 3: DATA MENTAH */}
      <section>
        <h2 className="text-xl font-bold mb-2">3. Matriks Keputusan (Data Mentah)</h2>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex gap-23 justify-center">
            {/* Harga (C1) */}
            <div>
              <p className="text-sm font-bold text-teal-800 mb-2">Harga</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  <strong>1:</strong> Sangat Murah (&lt; 15.000)
                </li>
                <li>
                  <strong>2:</strong> Murah (15.000 - 25.000)
                </li>
                <li>
                  <strong>3:</strong> Sedang (25.000 - 50.000)
                </li>
                <li>
                  <strong>4:</strong> mahal (50.000 - 100.000)
                </li>
                <li>
                  <strong>5:</strong> Sangat Mahal (&gt; 100.000)
                </li>
              </ul>
            </div>

            {/* Jam (C2) */}
            <div>
              <p className="text-sm font-bold text-teal-800 mb-2">
                Jam Operasional
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  <strong>1:</strong> Sangat Singkat (&lt; 8 jam)
                </li>
                <li>
                  <strong>2:</strong> Singkat (8 - 11 jam)
                </li>
                <li>
                  <strong>3:</strong> Standar (12 - 14 jam)
                </li>
                <li>
                  <strong>4:</strong> Lama (15 - 18 jam)
                </li>
                <li>
                  <strong>5:</strong> Sangat Lama (24 jam)
                </li>
              </ul>
            </div>

            {/* Menu (C3) */}
            <div>
              <p className="text-sm font-bold text-teal-800 mb-2">Menu</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  <strong>1:</strong> Sangat Kurang
                </li>
                <li>
                  <strong>2:</strong> kurang 
                </li>
                <li>
                  <strong>3:</strong> cukup
                </li>
                <li>
                  <strong>4:</strong> Variatif
                </li>
                <li>
                  <strong>5:</strong> Sangat Variatif
                </li>
              </ul>
            </div>

            {/* Fasilitas (C4) */}
            <div>
              <p className="text-sm font-bold text-teal-800 mb-2">
                Fasilitas
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  <strong>1:</strong> Sangat Kurang 
                </li>
                <li>
                  <strong>2:</strong> kurang
                </li>
                <li>
                  <strong>3:</strong> Cukup
                </li>
                <li>
                  <strong>4:</strong> Lengkap
                </li>
                <li>
                  <strong>5:</strong> Sangat Lengkap
                </li>
              </ul>
            </div>

            {/* Rating (C5) */}
            <div>
              <p className="text-sm font-bold text-teal-800 mb-2">
                Rating
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  <strong>1:</strong> 1.0 - 2.0 | <strong>6:</strong> 4.1 - 4.2
                </li>
                <li>
                  <strong>2:</strong> 2.1 - 2.5 | <strong>7:</strong> 4.3 - 4.4
                </li>
                <li>
                  <strong>3:</strong> 2.6 - 3.0 | <strong>8:</strong> 4.5 - 4.6
                </li>
                <li>
                  <strong>4:</strong> 3.1 - 3.5 | <strong>9:</strong> 4.7 - 4.8
                </li>
                <li>
                  <strong>5:</strong> 3.6 - 4.0 | <strong>10:</strong> 4.9 - 5.0
                </li>

              </ul>
            </div>

            {/* Kebersihan (C6) */}
            <div>
              <p className="text-sm font-bold text-teal-800 mb-2">
                Kebersihan
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  <strong>1:</strong> Sangat Kotor 
                </li>
                <li>
                  <strong>2:</strong> Kotor
                </li>
                <li>
                  <strong>3:</strong> Standar
                </li>
                <li>
                  <strong>4:</strong> Bersih
                </li>
                <li>
                  <strong>5:</strong> Sangat Bersih
                </li>
              </ul>
            </div>
          </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr><th className="p-4">Alternatif</th><th className="p-4">Harga</th><th className="p-4">Jam</th><th className="p-4">Menu</th><th className="p-4">Fasilitas</th><th className="p-4">Rating</th><th className="p-4">Kebersihan</th></tr>
            </thead>
            <tbody>
              {step3.data.map((r: any, i: number) => (
                <tr key={i} className="border-t bg-white hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{r.nama}</td><td className="p-4">{r.harga}</td><td className="p-4">{r.jam}</td><td className="p-4">{r.menu}</td><td className="p-4">{r.fas}</td><td className="p-4">{r.rating}</td><td className="p-4">{r.keb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TAHAP 4: NILAI PANGKAT */}
      <section>
        <h2 className="text-xl font-bold mb-2">4. Nilai Pangkat Matriks (X^W)</h2>
        <div className="bg-indigo-50 p-4 rounded-xl mb-4 border border-indigo-100">
          <p className="text-sm font-semibold text-indigo-900 mb-1">Sumber & Rumus:</p>
          <p className="text-xs text-indigo-800">Setiap nilai dari Data Mentah dipangkatkan dengan Bobot Normalisasi (W) sesuai kriterianya masing-masing.</p>
          <code className="text-xs block mt-2 text-indigo-900 bg-white p-2 rounded border border-indigo-200 font-mono">
            Nilai = X_ij ^ W_j
          </code>
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-indigo-700 text-white">
              <tr><th className="p-4">Alternatif</th><th className="p-4">Harga</th><th className="p-4">Jam</th><th className="p-4">Menu</th><th className="p-4">Fasilitas</th><th className="p-4">Rating</th><th className="p-4">Kebersihan</th></tr>
            </thead>
            <tbody>
              {step4.data.map((r: any, i: number) => (
                <tr key={i} className="border-t bg-white">
                  <td className="p-4 font-medium">{r.nama}</td><td className="p-4">{formatNum(r.harga)}</td><td className="p-4">{formatNum(r.jam)}</td><td className="p-4">{formatNum(r.menu)}</td><td className="p-4">{formatNum(r.fas)}</td><td className="p-4">{formatNum(r.rating)}</td><td className="p-4">{formatNum(r.keb)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TAHAP 5: NILAI S */}
      <section>
        <h2 className="text-xl font-bold mb-2">5. Menghitung Vektor S</h2>
        <div className="bg-orange-50 p-4 rounded-xl mb-4 border border-orange-100">
          <p className="text-sm font-semibold text-orange-900 mb-1">Sumber & Rumus:</p>
          <p className="text-xs text-orange-800">Nilai Vektor S didapatkan dari hasil kali (Π) seluruh kriteria yang telah dipangkatkan untuk setiap alternatif.</p>
          <code className="text-xs block mt-2 text-orange-900 bg-white p-2 rounded border border-orange-200 font-mono">
            S_i = Π (X_ij ^ W_j)
          </code>
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr><th className="p-4">Alternatif</th><th className="p-4 text-right">Nilai S</th></tr>
            </thead>
            <tbody>
              {step5.data.map((r: any, i: number) => (
                <tr key={i} className="border-t bg-white">
                  <td className="p-4">{r.nama}</td><td className="p-4 text-right font-mono">{formatNum(r.s, 6)}</td>
                </tr>
              ))}
              <tr className="bg-amber-100 border-t font-bold text-gray-900">
                <td className="p-4">Total S (Σ)</td><td className="p-4 text-right font-mono">{formatNum(step5.totalS, 6)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* TAHAP 6: NILAI V */}
      <section>
        <h2 className="text-xl font-bold mb-2">6. Menghitung Vektor V (Preferensi)</h2>
        <div className="bg-blue-50 p-4 rounded-xl mb-4 border border-blue-100">
          <p className="text-sm font-semibold text-blue-900 mb-1">Sumber & Rumus:</p>
          <p className="text-xs text-blue-800">Nilai V didapatkan dengan membagi nilai Vektor S masing-masing alternatif dengan Total S dari seluruh alternatif.</p>
          <code className="text-xs block mt-2 text-blue-900 bg-white p-2 rounded border border-blue-200 font-mono">
            V_i = S_i / ΣS
          </code>
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr><th className="p-4">Alternatif</th><th className="p-4 text-right">Nilai V</th></tr>
            </thead>
            <tbody>
              {step6.data.map((r: any, i: number) => (
                <tr key={i} className="border-t bg-white">
                  <td className="p-4">{r.nama}</td><td className="p-4 text-right font-mono">{formatNum(r.v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TAHAP 7: PERANGKINGAN */}
      <section>
        <h2 className="text-xl font-bold mb-2">7. Hasil Akhir (Perangkingan)</h2>
        <div className="bg-green-50 p-4 rounded-xl mb-4 border border-green-100">
          <p className="text-sm font-semibold text-green-900 mb-1">Keterangan:</p>
          <p className="text-xs text-green-800">Tabel ini mengurutkan alternatif berdasarkan Nilai Vektor V dari yang tertinggi (terbaik) ke yang terendah.</p>
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-900 text-white">
              <tr><th className="p-4 w-20">Rank</th><th className="p-4">Alternatif</th><th className="p-4 text-right">Skor Akhir (V)</th></tr>
            </thead>
            <tbody>
              {step7.data.map((r: any, i: number) => (
                <tr key={i} className={`border-t ${i === 0 ? "bg-amber-50" : "bg-white"}`}>
                  <td className="p-4 font-bold">{i + 1}</td>
                  <td className="p-4 font-medium">{r.nama}</td>
                  <td className="p-4 text-right font-bold text-blue-700 font-mono">{formatNum(r.skor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

export default WPView;