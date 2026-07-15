import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFasilitasById } from "../../services/fasilitasService";

function DetailFasilitas() {
  const { id } = useParams();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getFasilitasById(Number(id));
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Detail Fasilitas</h1>

      <p>
        <strong>Nama :</strong> {data.nama}
      </p>

      <p>
        <strong>Poin :</strong> {data.poin}
      </p>
    </div>
  );
}

export default DetailFasilitas;