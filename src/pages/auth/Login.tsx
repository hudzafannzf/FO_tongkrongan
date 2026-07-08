import { useState, useContext } from "react";
import { login } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

      switch (result.data.user.role) {
        case "SUPER_ADMIN":
          navigate("/superadmin");
          break;

        case "TENANT_ADMIN":
          navigate("/tenant-admin");
          break;

        default:
          if (result.data.user.role === "SUPER_ADMIN") {
            navigate("/superadmin");
          } else if (result.data.user.role === "TENANT_ADMIN") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
      }
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "80px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
