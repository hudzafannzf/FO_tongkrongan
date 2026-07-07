import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  label: string;
}

export default function SidebarItem({ to, label }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-lg transition ${
          isActive
            ? "bg-teal-600 text-white"
            : "hover:bg-gray-100 text-gray-700"
        }`
      }
    >
      {label}
    </NavLink>
  );
}