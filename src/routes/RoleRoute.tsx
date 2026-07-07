import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import type { JSX } from "react/jsx-runtime";

export default function RoleRoute({

children,

role

}:{

children:JSX.Element;

role:string;

}){

const {user}=useAuth();

if(user?.role!==role){

return <Navigate to="/"/>;

}

return children;

}