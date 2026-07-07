import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import tenantService from "../../services/tenantService";
import type { Tenant } from "../../types/tenant";


export default function DetailTenant() {
  const { id } = useParams();

  const [tenant, setTenant] = useState<Tenant>();

  useEffect(() => {
    if (id) {
      tenantService.getById(Number(id)).then((response) => setTenant(response.data));
    }
  }, [id]);

  if (!tenant) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <div className="container mx-auto py-10">

      <img
        src={tenant.gambar || "/images/no-image.png"}
        className="rounded-xl h-96 w-full object-cover"
      />

      <h1 className="text-4xl font-bold mt-8">
        {tenant.nama}
      </h1>

      <p className="mt-4 text-gray-600">
        {tenant.deskripsi}
      </p>

      <div className="mt-6">
        ⭐ {tenant.rating}
      </div>

      <div className="mt-2">
        📍 {tenant.alamat}
      </div>

      <div className="mt-2">
        🕒 {tenant.jamOperasional}
      </div>

    </div>
  );
}