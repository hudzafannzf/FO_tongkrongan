import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFasilitas } from "../../services/fasilitasService";

function CreateFasilitas() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    poin: "",
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
      await createFasilitas({
        nama: form.nama,
        poin: Number(form.poin),
      });

      alert("Fasilitas berhasil ditambahkan");
      navigate("/dashboard/superadmin/fasilitas");
    } catch (err) {
      console.log(err);
      alert("Gagal menambahkan fasilitas");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h1>Tambah Fasilitas</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <div>
          <label>Nama Fasilitas</label>
          <br />
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Poin</label>
          <br />
          <input
            type="number"
            name="poin"
            value={form.poin}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
}

export default CreateFasilitas;