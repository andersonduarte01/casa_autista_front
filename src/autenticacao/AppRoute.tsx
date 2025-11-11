// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";

import AdminLayout from "../adm/MainLayoutAdm";
import AdminRoutes from "../adm/RotasAdm";

import FuncionarioLayout from "../funcionario/MainLayoutFuncionario";
import FuncionarioRoutes from "../funcionario/RotasAdm";

// import ProfissionalLayout from "../profissional/ProfissionalLayout";
// import ProfissionalRoutes from "../profissional/ProfissionalRoutes";

// import ResponsavelLayout from "../responsavel/ResponsavelLayout";
// import ResponsavelRoutes from "../responsavel/ResponsavelRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rota de login */}
      <Route path="/login" element={<Login />} />

      {/* Painel do Administrador */}
      <Route
        path="/painel/admin/*"
        element={
          <PrivateRoute tipoUsuario="administrador">
            <AdminLayout>
              <AdminRoutes />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      {/* Painel do Funcionário */}
      <Route
        path="/painel/funcionario/*"
        element={
          <PrivateRoute tipoUsuario="funcionario">
            <FuncionarioLayout>
              <FuncionarioRoutes />
            </FuncionarioLayout>
          </PrivateRoute>
        }
      />

      {/* Painel do Profissional */}
      {/*
      <Route
        path="/painel/profissional/*"
        element={
          <PrivateRoute tipoUsuario="profissional">
            <ProfissionalLayout>
              <ProfissionalRoutes />
            </ProfissionalLayout>
          </PrivateRoute>
        }
      />
      */}

      {/* Painel do Responsável */}
      {/*
      <Route
        path="/painel/responsavel/*"
        element={
          <PrivateRoute tipoUsuario="responsavel">
            <ResponsavelLayout>
              <ResponsavelRoutes />
            </ResponsavelLayout>
          </PrivateRoute>
        }
      />
      */}

      {/* Rota fallback para qualquer outro caminho */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
