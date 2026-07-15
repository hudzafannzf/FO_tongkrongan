import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGaleriById } from "../../services/galeriService";

function DetailGaleri() {
  const { id } = useParams();

  const [galeri, setGaleri] = useState<any>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getGaleriById(Number(id));
    setGaleri(res.data);
  };

  if (!galeri) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Detail Galeri</h1>

      <img
        src={galeri.gambar}
        width={300}
        alt=""
      />

      <h3>{galeri.caption}</h3>
    </div>
  );
}

export default DetailGaleri;