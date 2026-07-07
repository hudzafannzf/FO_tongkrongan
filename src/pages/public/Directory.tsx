import { useMemo, useState } from "react";

import SearchBar from "../../components/common/SearchBar";
import TenantCard from "../../components/tenant/TenantCard";
import Loading from "../../components/common/Loading";

import useTenant from "../../hooks/useTenant";

export default function Directory() {
  const { tenants, loading } = useTenant();

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return tenants.filter((tenant) =>
      tenant.nama.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, tenants]);

  return (
    <div>

      <section className="bg-gradient-to-r from-orange-50 to-cyan-50 py-16">

        <div className="container mx-auto">

          <h1 className="text-5xl font-bold text-center">
            Culinary Directory
          </h1>

          <div className="max-w-xl mx-auto mt-8">
            <SearchBar
              value={search}
              onChange={setSearch}
            />
          </div>

        </div>

      </section>

      <section className="container mx-auto py-10">

        {loading && <Loading />}

        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filtered.map((tenant) => (
              <TenantCard
                key={tenant.id}
                id={tenant.id}
                nama={tenant.nama}
                alamat={tenant.alamat}
                rating={tenant.rating}
                logo={tenant.gambar}
              />
            ))}

          </div>
        )}

      </section>

    </div>
  );
}