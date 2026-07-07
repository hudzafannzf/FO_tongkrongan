import { useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../../services/authService";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const response = await authService.login({
        email,
        password,
      });

      const { token, user } = response.data;

      auth.login(token, user);

      if (user.role === "SUPER_ADMIN") {
        navigate("/superadmin");
      } else {
        navigate("/tenantadmin");
      }
    } catch (error) {
      alert("Login gagal");
    }
  };

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button onClick={submit}>Login</button>
    </div>
  );
}