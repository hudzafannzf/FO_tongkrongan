import { Link } from "react-router-dom";

interface Props {
  id: number;
  nama: string;
  alamat: string;
  rating: number;
  logo?: string;
}

export default function TenantCard({
  id,
  nama,
  alamat,
  rating,
  logo,
}: Props) {
  return (
    <div className="rounded-xl border overflow-hidden shadow-sm">

      <img
        src={logo || "/images/no-image.png"}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">

        <h3 className="font-bold text-xl">

          {nama}

        </h3>

        <p className="text-gray-500">

          {alamat}

        </p>

        <div className="mt-3">

          ⭐ {rating}

        </div>

        <Link
          to={`/tenant/${id}`}
          className="mt-5 inline-block text-teal-700"
        >
          View Detail →
        </Link>

      </div>

    </div>
  );
}