import DashboardCard from "../../components/dashboard/DashboardCard";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard Admin Tenant
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Menu"
          value={0}
        />

        <DashboardCard
          title="Rating"
          value={0}
        />

        <DashboardCard
          title="Review"
          value={0}
        />

        <DashboardCard
          title="Fasilitas"
          value={0}
        />
      </div>
    </div>
  );
}