import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface Props {
    role: "SUPER_ADMIN" | "TENANT_ADMIN";
    children: React.ReactNode;
}

export default function RoleRoute({
    role,
    children,
}: Props) {

    const { user } = useAuth();

    if (user?.role !== role) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}