import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="shadow-sm h-16 flex items-center justify-between px-10">

      <Link
        to="/"
        className="text-2xl font-bold text-teal-700"
      >
        Tegal Culinary
      </Link>

      <div className="flex gap-8">

        <Link to="/">
          Home
        </Link>

        <Link to="/directory">
          Directory
        </Link>

        <Link to="/spk">
          SPK Methods
        </Link>

      </div>

      <Link
        to="/login"
        className="bg-teal-700 text-white px-5 py-2 rounded-lg"
      >
        Login
      </Link>

    </nav>
  );
}