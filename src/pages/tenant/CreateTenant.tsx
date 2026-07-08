import { useState } from "react";
import { createTenant } from "../../services/tenantService";
import { useNavigate } from "react-router-dom";

function TenantCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    jamOperasional: "",
    deskripsi: "",
    email: "",
    telepon: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTenant(form);
      alert("Tenant berhasil ditambahkan");
      navigate("/tenant");
    } catch (err) {
      console.log(err);
      alert("Gagal menambahkan tenant");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tambah Tenant</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="nama"
          placeholder="Nama"
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="alamat"
          placeholder="Alamat"
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="jamOperasional"
          placeholder="Jam Operasional"
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="telepon"
          placeholder="Telepon"
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="deskripsi"
          placeholder="Deskripsi"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
}

export default TenantCreate;