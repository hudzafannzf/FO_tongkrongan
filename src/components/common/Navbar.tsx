import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const auth = useContext(AuthContext);

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link to="/">Home</Link>

      <Link to="/tenant">Tenant</Link>

      {!auth?.user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <span>
            Halo, {auth.user.username}
          </span>
        </>
      )}
    </nav>
  );
}

export default Navbar;