import { useState } from "react";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "PENGGUNA",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(form);

      alert("Register berhasil");

      navigate("/login");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Terjadi kesalahan";
      console.error("Error Detail:", error.response?.data);
      alert("Register gagal: " + errorMessage);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#0b0b0f" /* Hitam pekat background */,
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        margin: 0,
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          width: "100%",
          maxWidth: "380px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "#12121a" /* Hitam kontainer sedikit terang */,
          padding: "40px 30px",
          borderRadius: "16px",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(157, 0, 255, 0.15)",
          border: "1px solid #231b36" /* Border ungu sangat gelap */,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <h1
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: "2rem",
              fontWeight: "600",
              letterSpacing: "1px",
            }}
          >
            Create{" "}
            <span
              style={{
                color: "#bc13fe",
                textShadow: "0 0 10px rgba(188, 19, 254, 0.6)",
              }}
            >
              Account
            </span>
          </h1>
          <p
            style={{ color: "#71717a", fontSize: "0.875rem", marginTop: "8px" }}
          >
            Daftarkan akun baru Anda di sini
          </p>
        </div>

        {/* INPUT USERNAME */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label
            style={{ color: "#a1a1aa", fontSize: "0.85rem", fontWeight: "500" }}
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Masukkan username"
            value={form.username}
            onChange={handleChange}
            required
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #2d2d3d",
              backgroundColor: "#1c1c24",
              color: "#ffffff",
              outline: "none",
              fontSize: "0.95rem",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#bc13fe";
              e.target.style.boxShadow = "0 0 8px rgba(188, 19, 254, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#2d2d3d";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* INPUT EMAIL */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label
            style={{ color: "#a1a1aa", fontSize: "0.85rem", fontWeight: "500" }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="nama@email.com"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #2d2d3d",
              backgroundColor: "#1c1c24",
              color: "#ffffff",
              outline: "none",
              fontSize: "0.95rem",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#bc13fe";
              e.target.style.boxShadow = "0 0 8px rgba(188, 19, 254, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#2d2d3d";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* INPUT PASSWORD */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label
            style={{ color: "#a1a1aa", fontSize: "0.85rem", fontWeight: "500" }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #2d2d3d",
              backgroundColor: "#1c1c24",
              color: "#ffffff",
              outline: "none",
              fontSize: "0.95rem",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#bc13fe";
              e.target.style.boxShadow = "0 0 8px rgba(188, 19, 254, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#2d2d3d";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* SELECT ROLE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label
            style={{ color: "#a1a1aa", fontSize: "0.85rem", fontWeight: "500" }}
          >
            Daftar Sebagai
          </label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #2d2d3d",
              backgroundColor: "#1c1c24",
              color: "#ffffff",
              outline: "none",
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#bc13fe";
              e.target.style.boxShadow = "0 0 8px rgba(188, 19, 254, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#2d2d3d";
              e.target.style.boxShadow = "none";
            }}
          >
            <option value="PENGGUNA" style={{ backgroundColor: "#12121a" }}>
              Pengguna
            </option>
            <option value="TENANT_ADMIN" style={{ backgroundColor: "#12121a" }}>
              Tenant Admin
            </option>
          </select>
        </div>

        {/* BUTTON SUBMIT */}
        <button
          type="submit"
          style={{
            padding: "14px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#9d00ff" /* Ungu Neon */,
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "10px",
            boxShadow: "0 0 15px rgba(157, 0, 255, 0.4)",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#bc13fe";
            e.currentTarget.style.boxShadow =
              "0 0 25px rgba(188, 19, 254, 0.8)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#9d00ff";
            e.currentTarget.style.boxShadow = "0 0 15px rgba(157, 0, 255, 0.4)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
