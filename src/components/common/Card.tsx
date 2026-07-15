interface CardProps {
  nama: string;
  alamat: string;
  foto: string;
}

export default function KulinerCard({ nama, alamat, foto }: CardProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <img src={foto} alt={nama} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-zinc-900 text-lg truncate">{nama}</h3>
        <p className="text-zinc-500 text-sm mt-1 line-clamp-2">{alamat}</p>
      </div>
    </div>
  );
}