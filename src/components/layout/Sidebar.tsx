import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        background: "#eeeeee",
        minHeight: "100vh",
        padding: 20,
      }}
    >
      <h3>Menu</h3>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        <li><Link to="/dashboard">Dashboard</Link></li>

        <li><Link to="/tenant">Tenant</Link></li>

        <li><Link to="/menu">Menu</Link></li>

        <li><Link to="/kategori">Kategori</Link></li>

        <li><Link to="/spk">SPK</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;