export default function KulinerCard({ nama, alamat, foto, rating }: any) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-zinc-100">
      <img src={foto || "https://via.placeholder.com/400"} alt={nama} className="w-full h-56 object-cover" />
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
           <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded">★ {rating || "4.5"}</span>
        </div>
        <h3 className="text-lg font-bold text-zinc-900">{nama}</h3>
        <p className="text-sm text-zinc-500 mt-1">{alamat}</p>
        <button className="w-full mt-4 py-2 border border-emerald-700 text-emerald-700 rounded-lg hover:bg-emerald-50 transition">
          View Detail →
        </button>
      </div>
    </div>
  );
}