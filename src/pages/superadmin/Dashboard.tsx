import DashboardCard from "../../components/dashboard/DashboardCard";

export default function Dashboard() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard Super Admin
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <DashboardCard
          title="Total User"
          value={0}
        />

        <DashboardCard
          title="Total Tenant"
          value={0}
        />

        <DashboardCard
          title="Total Menu"
          value={0}
        />

        <DashboardCard
          title="Total Kategori"
          value={6}
        />

        <DashboardCard
          title="Total Review"
          value={0}
        />

      </div>

    </div>
  );
}