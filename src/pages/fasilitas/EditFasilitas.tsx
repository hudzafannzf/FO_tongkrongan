import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getFasilitasById,
  updateFasilitas,
} from "../../services/fasilitasService";

function EditFasilitas() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    poin: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getFasilitasById(Number(id));

      setForm({
        nama: res.data.nama,
        poin: res.data.poin.toString(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateFasilitas(Number(id), {
        nama: form.nama,
        poin: Number(form.poin),
      });

      alert("Berhasil diubah");
      navigate("/dashboard/superadmin/fasilitas");
    } catch (err) {
      console.log(err);
      alert("Gagal mengubah");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h1>Edit Fasilitas</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
        />

        <input
          type="number"
          name="poin"
          value={form.poin}
          onChange={handleChange}
        />

        <button type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
}

export default EditFasilitas;