import { Link } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#1976d2",
        color: "white",
      }}
    >
      <h2>SPK Tongkrongan</h2>

      <div>
        <span style={{ marginRight: 20 }}>
          {user?.username}
        </span>

        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Home
        </Link>
      </div>
    </header>
  );
}

export default Header;