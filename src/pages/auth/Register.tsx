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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    } catch (error) {
      console.log(error);
      alert("Register gagal");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Register</h1>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <br />
      <br />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
      >
        <option value="PENGGUNA">Pengguna</option>
        <option value="TENANT_ADMIN">Tenant Admin</option>
      </select>

      <br />
      <br />

      <button type="submit">
        Register
      </button>
    </form>
  );
}

export default Register;