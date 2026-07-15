const SAWView = ({ data }: { data: any }) => {
  if (!data || !data.steps) {
    return <div className="p-4 text-gray-500">Memuat data perhitungan...</div>;
  }

  // Mengambil bobot dan 4 tahap dari backend
  const bobot = data.bobot || {};
  const step1 = data.steps[0]; // Matriks Mentah
  const step2 = data.steps[1]; // Normalisasi
  const step3 = data.steps[2]; // Preferensi (Baru)
  const step4 = data.steps[3]; // Perangkingan

  return (
    <div className="space-y-12">
      {/* 0. BOBOT KRITERIA PENGGUNA */}
      <section>
        <h2 className="text-xl font-bold mb-4">Bobot Preferensi Anda</h2>
        <p className="text-sm text-gray-600 mb-4">
          Berikut adalah persentase bobot tingkat kepentingan yang Anda masukkan
          sebelumnya. Total bobot = 100%.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(bobot).map(([key, value], index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-center"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </p>
              <p className="text-lg font-bold text-teal-700">
                {String(value)}%
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* 1. MATRIKS KEPUTUSAN */}
      <section>
        <h2 className="text-xl font-bold mb-2 ">
          1. Matriks Keputusan (Data Mentah)
        </h2>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 ">
          <p className="text-sm font-bold text-gray-900 mb-6">
            Penjelasan Sumber Nilai Mentah:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-y-6 gap-x-8">
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
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {step1?.headers?.map((h: string, i: number) => (
                  <th key={i} className="p-4 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {step1?.data?.map((row: any, i: number) => (
                <tr
                  key={i}
                  className="border-t bg-white hover:bg-gray-50 transition"
                >
                  {Object.values(row).map((val: any, j: number) => (
                    <td
                      key={j}
                      className={`p-4 ${j === 0 ? "font-medium text-gray-900" : "text-gray-600"}`}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. NORMALISASI */}
      <section>
        <h2 className="text-xl font-bold mb-2">2. Normalisasi Matriks (R)</h2>
        <div className="bg-teal-50 p-5 rounded-xl mb-4 border border-teal-100">
          <p className="text-sm font-semibold text-teal-900 mb-2">
            Penjelasan & Rumus Normalisasi:
          </p>
          <p className="text-xs text-teal-800 mb-3 leading-relaxed">
            Tahap ini bertujuan menyamakan skala semua nilai mentah menjadi
            rentang <strong>0 hingga 1</strong>. Karena sifat kriteria berbeda,
            sistem menggunakan dua rumus yang berbeda:
            <br />
            <br />- <strong>Harga (Cost/Biaya):</strong> Semakin murah semakin
            baik. Nilai setiap sel dibagi dengan nilai minimum (terkecil) di
            kolomnya.
            <br />- <strong>Kriteria Lainnya (Benefit/Keuntungan):</strong>{" "}
            Semakin besar semakin baik. Nilai setiap sel dibagi dengan nilai
            maksimum (terbesar) di kolomnya.
          </p>
          <code className="text-xs block bg-white p-3 rounded border border-teal-200 text-teal-900 font-mono shadow-sm">
            Rumus Cost: R_ij = Min(X_ij) / X_ij
            <br />
            Rumus Benefit: R_ij = X_ij / Max(X_ij)
          </code>
        </div>

        {/* ... sisa tabel normalisasi tidak perlu diubah ... */}
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-teal-700 text-white">
              <tr>
                {step2?.headers?.map((h: string, i: number) => (
                  <th key={i} className="p-4 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {step2?.data?.map((row: any, i: number) => (
                <tr
                  key={i}
                  className="border-t bg-white hover:bg-teal-50/30 transition"
                >
                  {Object.values(row).map((val: any, j: number) => (
                    <td
                      key={j}
                      className={`p-4 ${j === 0 ? "font-medium text-gray-900" : "text-gray-600"}`}
                    >
                      {typeof val === "number" ? val.toFixed(3) : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. PREFERENSI (BARU) */}
      <section>
        <h2 className="text-xl font-bold mb-2">3. Matriks Preferensi (V)</h2>
        <div className="bg-purple-50 p-5 rounded-xl mb-4 border border-purple-100">
          <p className="text-sm font-semibold text-purple-900 mb-2">
            Penjelasan & Rumus Preferensi:
          </p>
          <p className="text-xs text-purple-800 mb-3 leading-relaxed">
            Pada tahap ini, nilai yang sudah dinormalisasi dikalikan dengan{" "}
            <strong>Bobot Kriteria</strong> yang Anda masukkan di awal. Hasil
            perhitungan pada tabel ini menunjukkan seberapa kuat nilai setiap
            kriteria menyumbang ke skor akhir gerai tersebut.
          </p>
          <code className="text-xs block bg-white p-3 rounded border border-purple-200 text-purple-900 font-mono shadow-sm">
            Rumus: V_ij = W_j * R_ij
          </code>
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-purple-700 text-white">
              <tr>
                {step3?.headers?.map((h: string, i: number) => (
                  <th key={i} className="p-4 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {step3?.data?.map((row: any, i: number) => (
                <tr
                  key={i}
                  className="border-t bg-white hover:bg-purple-50/30 transition"
                >
                  {Object.values(row).map((val: any, j: number) => (
                    <td
                      key={j}
                      className={`p-4 ${j === 0 ? "font-medium text-gray-900" : "text-gray-600"}`}
                    >
                      {typeof val === "number" ? val.toFixed(4) : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. PERANGKINGAN */}
      <section>
        <h2 className="text-xl font-bold mb-2">4. Hasil Perangkingan Akhir</h2>
        <div className="bg-blue-50 p-5 rounded-xl mb-4 border border-blue-100">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            Penjelasan Penentuan Peringkat:
          </p>
          <p className="text-xs text-blue-800 mb-3 leading-relaxed">
            Skor akhir didapatkan dengan menjumlahkan seluruh nilai pada matriks
            preferensi (Tahap 3) secara horizontal untuk masing-masing gerai.
            Gerai dengan skor tertinggi menempati peringkat pertama dan
            merupakan pilihan yang paling direkomendasikan sistem.
          </p>
          <code className="text-xs block bg-white p-3 rounded border border-blue-200 text-blue-900 font-mono shadow-sm">
            Rumus: Skor Akhir = Σ V_ij
          </code>
        </div>
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-4 w-16 text-center">Rank</th>
                <th className="p-4">Alternatif Gerai</th>
                <th className="p-4 text-right">Skor Akhir</th>
              </tr>
            </thead>
            <tbody>
              {step4?.data?.map((row: any, index: number) => {
                const values = Object.values(row);
                const name = values[0];
                const score = values[values.length - 1];

                return (
                  <tr
                    key={index}
                    className={`border-t ${index === 0 ? "bg-amber-50" : "bg-white"} hover:bg-gray-50 transition`}
                  >
                    <td className="p-4 font-black text-center text-gray-700">
                      {index === 0 ? "🏆 1" : index + 1}
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      {String(name)}
                    </td>
                    <td className="p-4 font-bold text-blue-700 text-right text-lg">
                      {typeof score === "number"
                        ? score.toFixed(4)
                        : String(score)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SAWView;
