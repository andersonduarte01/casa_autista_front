import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
  tipoUsuario?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, tipoUsuario }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (tipoUsuario && user.tipo !== tipoUsuario) {
    return <Navigate to={user.painel_url} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
