import { Link } from "react-router-dom";
import { Search, Utensils } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";



export default function Navbar() {
  const auth = useContext(AuthContext);
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/30 backdrop-blur-md border-b border-purple-400/30 shadow-sm px-6 py-4 flex items-center justify-between">
      
      {/* 1. KIRI: Logo & Brand */}
      <div className="flex-1 flex justify-start">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-purple-500 to-purple-800 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-md shadow-purple-200">
            <Utensils size={20} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-500 tracking-tight hidden sm:block">
            Tegal Culinary
          </span>
        </Link>
      </div>

      {/* 2. TENGAH: Search Bar */}
      <div className="flex-1 hidden md:flex justify-center">
        <div className="flex items-center bg-white px-5 py-2.5 rounded-full border border-zinc-200 focus-within:ring-2 focus-within:ring-purple-500 transition-all w-full max-w-md shadow-inner">
          <Search size={18} className="text-zinc-400 mr-3" />
          <input 
            type="text" 
            placeholder="Cari kuliner, warung, sate..." 
            className="bg-transparent outline-none text-sm w-full text-zinc-700 placeholder:text-zinc-400" 
          />
        </div>
      </div>

      {/* 3. KANAN: Navigasi & Tombol Sign In */}
      <div className="flex-1 flex items-center justify-end gap-8">
        
        {/* Navigasi dengan Animasi */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold">
          <Link 
            to="/" 
            className="relative text-purple-900/70 hover:text-purple-700 transition-all duration-300 hover:-translate-y-0.5 group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
          </Link>

          <Link 
            to="/gerai" 
            className="relative text-purple-900/70 hover:text-purple-700 transition-all duration-300 hover:-translate-y-0.5 group"
          >
            Gerai
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
          </Link>
          
          <Link 
            to="/rekomendasi/Sub" 
            className="relative text-purple-900/70 hover:text-purple-700 transition-all duration-300 hover:-translate-y-0.5 group"
          >
            Rekomendasi
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
          </Link>
        </div>
        
        {auth?.user ? (
          <button 
          className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-full hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-200/50 hover:shadow-purple-300/50 hover:-translate-y-0.5"
          onClick={auth.logout}>Keluar</button>
        ) : (
          <Link 
          className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-full hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-200/50 hover:shadow-purple-300/50 hover:-translate-y-0.5"
        to="/login">Masuk</Link>
      )}
      </div>

    </nav>
  );
}