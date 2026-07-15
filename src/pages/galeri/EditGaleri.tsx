import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getGaleriById,
  updateGaleri,
} from "../../services/galeriService";

function EditGaleri() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    gambar: "",
    caption: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getGaleriById(Number(id));

    setForm({
      gambar: res.data.gambar,
      caption: res.data.caption || "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("gambar", form.gambar);
    formData.append("caption", form.caption);

    await updateGaleri(Number(id), formData);

    alert("Berhasil");

    navigate("/dashboard/admin/galeri");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit Galeri</h1>

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
          name="gambar"
          value={form.gambar}
          onChange={handleChange}
        />

        <input
          name="caption"
          value={form.caption}
          onChange={handleChange}
        />

        <button>Simpan</button>
      </form>
    </div>
  );
}

export default EditGaleri;