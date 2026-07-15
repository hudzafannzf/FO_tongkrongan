import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMenuById, updateMenu } from "../../services/menuService";

function EditMenu() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tenantId: "",
    kategoriId: "",
    nama: "",
    deskripsi: "",
    harga: "",
    foto: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const menu = await getMenuById(Number(id));

      setForm({
        tenantId: menu.tenantId?.toString() || "",
        kategoriId: menu.kategoriId?.toString() || "",
        nama: menu.nama || "",
        deskripsi: menu.deskripsi || "",
        harga: menu.harga?.toString() || "",
        foto: menu.foto || "",
      });
    } catch (err) {
      console.log(err);
      alert("Gagal mengambil data menu");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateMenu(Number(id), form);

      alert("Menu berhasil diperbarui");
      navigate("/dashboard/admin/menu");
    } catch (err) {
      console.log(err);
      alert("Gagal mengubah menu");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit Menu</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          maxWidth: 500,
        }}
      >
        <input
          name="tenantId"
          value={form.tenantId}
          onChange={handleChange}
          placeholder="Tenant ID"
        />

        <input
          name="kategoriId"
          value={form.kategoriId}
          onChange={handleChange}
          placeholder="Kategori ID"
        />

        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama Menu"
        />

        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          placeholder="Deskripsi"
        />

        <input
          type="number"
          name="harga"
          value={form.harga}
          onChange={handleChange}
          placeholder="Harga"
        />

        <input
          name="foto"
          value={form.foto}
          onChange={handleChange}
          placeholder="Foto"
        />

        <button type="submit">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}

export default EditMenu;