import { Navigate } from "react-router-dom";


import type { JSX } from "react/jsx-runtime";
import { storage } from "../utils/storage";

export default function PrivateRoute({

children

}:{

children:JSX.Element

}){

if(!storage.getToken()){

return <Navigate to="/login"/>;

}

return children;

}