import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-5">

      <h1 className="text-2xl font-bold text-teal-700 mb-8">
        Tongkrongan
      </h1>

      <div className="space-y-2">

        <SidebarItem
          to="/superadmin"
          label="Dashboard"
        />

        <SidebarItem
          to="/superadmin/user"
          label="User"
        />

        <SidebarItem
          to="/superadmin/tenant"
          label="Tenant"
        />

        <SidebarItem
          to="/superadmin/menu"
          label="Menu"
        />

        <SidebarItem
          to="/superadmin/kategori"
          label="Kategori"
        />

        <SidebarItem
          to="/superadmin/nilai"
          label="Nilai Kategori"
        />

      </div>

    </aside>
  );
}