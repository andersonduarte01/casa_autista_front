import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
  tipoUsuario?: string; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, tipoUsuario }) => {
  const { usuario } = useContext(AuthContext);

  // Se não estiver logado, redireciona para login
  if (!usuario) return <Navigate to="/login" />;

  // Se tiver um tipo de usuário definido, verifica
  if (tipoUsuario && usuario.tipo !== tipoUsuario) {
    // Redireciona para o painel correto
    switch (usuario.tipo) {
      case "administrador":
        return <Navigate to="/painel/admin" />;
      case "funcionario":
        return <Navigate to="/painel/funcionario" />;
      case "profissional":
        return <Navigate to="/painel/profissional" />;
      case "responsavel":
        return <Navigate to="/painel/responsavel" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
