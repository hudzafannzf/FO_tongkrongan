import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMenuById } from "../../services/menuService";

function DetailMenu() {
  const { id } = useParams();
  const [menu, setMenu] = useState<any>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getMenuById(Number(id));
      setMenu(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!menu) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Detail Menu</h1>

      <table cellPadding={10}>
        <tbody>
          <tr>
            <td><b>Nama</b></td>
            <td>{menu.nama}</td>
          </tr>

          <tr>
            <td><b>Kategori</b></td>
            <td>{menu.kategori?.nama}</td>
          </tr>

          <tr>
            <td><b>Tenant</b></td>
            <td>{menu.tenant?.nama}</td>
          </tr>

          <tr>
            <td><b>Harga</b></td>
            <td>Rp {menu.harga}</td>
          </tr>

          <tr>
            <td><b>Deskripsi</b></td>
            <td>{menu.deskripsi}</td>
          </tr>

          <tr>
            <td><b>Foto</b></td>
            <td>
              {menu.foto && (
                <img
                  src={menu.foto}
                  alt={menu.nama}
                  width={200}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      <Link to="/dashboard/admin/menu">
        <button>Kembali</button>
      </Link>
    </div>
  );
}

export default DetailMenu;