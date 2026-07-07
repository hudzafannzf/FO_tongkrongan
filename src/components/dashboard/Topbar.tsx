import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Topbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between">
      <h2 className="font-semibold text-xl">
        Dashboard
      </h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
}