function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div
      style={{
        height: "70px",
        background: "#ffffff",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <h2>Dashboard</h2>

      <div>
        <b>{user?.username}</b>
      </div>
    </div>
  );
}

export default Header;