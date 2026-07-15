const TOPSISView = ({ data }: { data: any }) => {
  if (!data?.steps || data.steps.length < 6) {
    return <div className="p-6 text-center text-gray-500">Memuat data perhitungan...</div>;
  }

  const bobot = data.bobot || {};
  const s0 = data.steps[0]; // Data Mentah
  const s1 = data.steps[1]; // Pembagi
  const s2 = data.steps[2]; // Normalisasi
  const s3 = data.steps[3]; // Terbobot
  const s4 = data.steps[4]; // Ideal
  const s5 = data.steps[5]; // Ranking

  return (
    <div className="space-y-12">
      
      {/* 0. BOBOT */}
      <section>
        <h2 className="text-xl font-bold mb-4">Bobot Kriteria (TOPSIS)</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {Object.entries(bobot).map(([k, v]: any, i) => (
            <div key={i} className="bg-white border p-4 rounded-xl shadow-sm text-center">
              <p className="text-xs font-semibold uppercase">{k}</p>
              <p className="text-lg font-bold text-teal-700">{v.toFixed(0)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 1. DATA MENTAH */}
      <section>
        <h2 className="text-xl font-bold mb-2">1. Matriks Keputusan (Data Mentah)</h2>
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
            <thead className="bg-gray-100"><tr>{s0.headers.map((h:any,i:any) => <th key={i} className="p-4">{h}</th>)}</tr></thead>
            <tbody>{s0.data.map((r:any,i:any) => <tr key={i} className="border-t bg-white hover:bg-gray-50 transition">{Object.values(r).map((v:any,j:any) => <td key={j} className="p-4">{v}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      {/* 2. NILAI PEMBAGI */}
      <section>
        <h2 className="text-xl font-bold mb-2">2. Nilai Pembagi (Akar Kuadrat)</h2>
        <div className="bg-orange-50 p-5 rounded-xl mb-4 border border-orange-100">
          <p className="text-sm font-semibold text-orange-900 mb-1">Penjelasan & Rumus:</p>
          <p className="text-xs text-orange-800">
            Nilai pembagi didapatkan dengan mengkuadratkan setiap nilai pada suatu kriteria, menjumlahkannya, lalu ditarik nilai akar kuadratnya.
          </p>
          <code className="text-xs block mt-3 text-orange-900 bg-white p-2 rounded border border-orange-200 font-mono">
            Pembagi_j = √ (Σ X_ij²)
          </code>
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-center">
            <thead className="bg-orange-100"><tr>{Object.keys(s1.data[0]).map((h,i) => <th key={i} className="p-4">{h}</th>)}</tr></thead>
            <tbody><tr className="bg-white">{Object.values(s1.data[0]).map((v:any,i:any) => <td key={i} className="p-4 font-mono">{v.toFixed(4)}</td>)}</tr></tbody>
          </table>
        </div>
      </section>

      {/* 3. NORMALISASI */}
      <section>
        <h2 className="text-xl font-bold mb-2">3. Matriks Ternormalisasi (R)</h2>
        <div className="bg-blue-50 p-5 rounded-xl mb-4 border border-blue-100">
          <p className="text-sm font-semibold text-blue-900 mb-1">Penjelasan & Rumus:</p>
          <p className="text-xs text-blue-800">
            Setiap elemen pada Matriks Keputusan (Data Mentah) dibagi dengan Nilai Pembagi dari kolom kriteria yang bersesuaian.
          </p>
          <code className="text-xs block mt-3 text-blue-900 bg-white p-2 rounded border border-blue-200 font-mono">
            R_ij = X_ij / Pembagi_j
          </code>
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100"><tr>{s2.headers.map((h:any,i:any) => <th key={i} className="p-4">{h}</th>)}</tr></thead>
            <tbody>{s2.data.map((r:any,i:any) => <tr key={i} className="border-t bg-white">{Object.values(r).map((v:any,j:any) => <td key={j} className="p-4">{typeof v==='number'?v.toFixed(4):v}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      {/* 4. TERBOBOT */}
      <section>
        <h2 className="text-xl font-bold mb-2">4. Matriks Terbobot (V)</h2>
        <div className="bg-indigo-50 p-5 rounded-xl mb-4 border border-indigo-100">
          <p className="text-sm font-semibold text-indigo-900 mb-1">Penjelasan & Rumus:</p>
          <p className="text-xs text-indigo-800">
            Matriks Ternormalisasi (R) dikalikan dengan bobot preferensi kriteria awal (W) yang telah ditentukan oleh pengguna.
          </p>
          <code className="text-xs block mt-3 text-indigo-900 bg-white p-2 rounded border border-indigo-200 font-mono">
            V_ij = R_ij * W_j
          </code>
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-teal-700 text-white"><tr>{s3.headers.map((h:any,i:any) => <th key={i} className="p-4">{h}</th>)}</tr></thead>
            <tbody>{s3.data.map((r:any,i:any) => <tr key={i} className="border-t bg-white">{Object.values(r).map((v:any,j:any) => <td key={j} className="p-4">{typeof v==='number'?v.toFixed(4):v}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      {/* 5. SOLUSI IDEAL */}
      <section>
        <h2 className="text-xl font-bold mb-2">5. Solusi Ideal (A+ & A-)</h2>
        <div className="bg-teal-50 p-5 rounded-xl mb-4 border border-teal-100">
          <p className="text-sm font-semibold text-teal-900 mb-1">Penjelasan & Rumus:</p>
          <p className="text-xs text-teal-800">
            Mencari nilai ekstrem dari Matriks Terbobot. Untuk kriteria <strong>Benefit</strong>, A+ adalah nilai Maximum dan A- adalah Minimum. Untuk kriteria <strong>Cost</strong>, berlaku kebalikannya.
          </p>
          <code className="text-xs block mt-3 text-teal-900 bg-white p-2 rounded border border-teal-200 font-mono">
            A+ = Max(V_ij) [Benefit] | Min(V_ij) [Cost] <br />
            A- = Min(V_ij) [Benefit] | Max(V_ij) [Cost]
          </code>
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-center">
            <thead className="bg-gray-100"><tr><th className="p-4 text-left">Ideal</th>{Object.keys(s4.data.apos).map((h,i) => <th key={i} className="p-4">{h}</th>)}</tr></thead>
            <tbody>
              <tr className="bg-green-50 border-t"><td className="p-4 font-bold text-left">A+</td>{Object.values(s4.data.apos).map((v:any, i:any) => <td key={i} className="p-4">{v.toFixed(4)}</td>)}</tr>
              <tr className="bg-red-50 border-t"><td className="p-4 font-bold text-left">A-</td>{Object.values(s4.data.aneg).map((v:any, i:any) => <td key={i} className="p-4">{v.toFixed(4)}</td>)}</tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. PERANGKINGAN */}
      <section>
        <h2 className="text-xl font-bold mb-2">6. Jarak Solusi & Perangkingan</h2>
        <div className="bg-green-50 p-5 rounded-xl mb-4 border border-green-100">
          <p className="text-sm font-semibold text-green-900 mb-1">Penjelasan & Rumus:</p>
          <p className="text-xs text-green-800">
            Menghitung jarak setiap alternatif terhadap solusi ideal positif (D+) dan ideal negatif (D-). Skor preferensi (V) menentukan ranking akhir, semakin besar nilainya semakin baik.
          </p>
          <code className="text-xs block mt-3 text-green-900 bg-white p-2 rounded border border-green-200 font-mono">
            D+ = √ (Σ (V_ij - A+)²)<br />
            D- = √ (Σ (V_ij - A-)²)<br />
            Skor (V) = D- / (D+ + D-)
          </code>
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-center">
            <thead className="bg-blue-900 text-white"><tr><th className="p-4">Rank</th><th className="p-4 text-left">Alternatif</th><th className="p-4">D+</th><th className="p-4">D-</th><th className="p-4">Skor Akhir (V)</th></tr></thead>
            <tbody>{s5.data.map((r:any, i:number) => <tr key={i} className={`border-t ${i===0?'bg-amber-100':'bg-white'}`}><td className="p-4 font-bold">{i+1}</td><td className="p-4 text-left font-medium">{r.nama}</td><td className="p-4">{r.dPlus.toFixed(4)}</td><td className="p-4">{r.dMinus.toFixed(4)}</td><td className="p-4 font-bold text-blue-700 font-mono">{r.score.toFixed(4)}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
      
    </div>
  );
};

export default TOPSISView;