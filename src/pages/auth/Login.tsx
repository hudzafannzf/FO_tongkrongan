import { useState, useContext } from "react";
import { login } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login(email, password);
      console.log(result);

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      auth?.setUser(result.data.user);

      if (auth) {
        auth.setUser(result.data.user);
      }

      if (result.data.user.role === "SUPER_ADMIN") {
        navigate("/dashboard/superadmin");
      } else if (result.data.user.role === "TENANT_ADMIN") {
        navigate("/dashboard/admin");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0b0b0f] font-sans m-0 p-5">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-[380px] flex flex-col gap-5 bg-[#12121a] p-[40px_30px] rounded-2xl border border-[#231b36] shadow-[0_8px_32px_rgba(0,0,0,0.5),_0_0_15px_rgba(157,0,255,0.15)]"
      >
        <div className="text-center mb-2.5">
          <h1 className="m-0 text-white text-3xl font-semibold tracking-wide">
            Welcome{" "}
            <span className="text-[#bc13fe] [text-shadow:0_0_10px_rgba(188,19,254,0.6)]">
              Back
            </span>
          </h1>
          <p className="text-[#71717a] text-sm mt-2">
            Silakan masuk ke akun Anda
          </p>
        </div>

        {/* INPUT EMAIL */}
        <div className="flex flex-col gap-1.25">
          <label className="text-[#a1a1aa] text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-[12px_16px] rounded-lg border border-[#2d2d3d] bg-[#1c1c24] text-white outline-none text-base transition-all duration-300 focus:border-[#bc13fe] focus:shadow-[0_0_8px_rgba(188,19,254,0.3)]"
          />
        </div>

        {/* INPUT PASSWORD */}
        <div className="flex flex-col gap-1.25">
          <label className="text-[#a1a1aa] text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-[12px_16px] rounded-lg border border-[#2d2d3d] bg-[#1c1c24] text-white outline-none text-base transition-all duration-300 focus:border-[#bc13fe] focus:shadow-[0_0_8px_rgba(188,19,254,0.3)]"
          />
        </div>

        {/* BUTTON SUBMIT */}
        <button
          type="submit"
          className="p-3.5 rounded-lg border-none bg-[#9d00ff] text-white text-base font-semibold cursor-pointer mt-2.5 shadow-[0_0_15px_rgba(157,0,255,0.4)] transition-all duration-200 ease-in-out hover:bg-[#bc13fe] hover:shadow-[0_0_25px_rgba(188,19,254,0.8)] hover:-translate-y-0.5 active:translate-y-0"
        >
          Masuk
        </button>

        {/* REGISTER LINK */}
        <div className="flex justify-center gap-1.5 mt-4 text-sm">
          <span className="text-[#71717a]">Tidak punya akun?</span>
          <Link
            to="/register"
            className="text-[#bc13fe] no-underline font-semibold transition-all duration-200 hover:[text-shadow:0_0_8px_rgba(188,19,254,0.6)]"
          >
            Daftar di sini
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
