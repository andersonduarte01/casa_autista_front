import { Routes, Route, Navigate } from "react-router-dom";
import Painel from "./paginas/Painel";
import Sobre from "./Sobre";
import Usuarios from "./Usuarios";
import AdicionarFuncionario from "./paginas/AdicionarFuncionario";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Painel />} />
      <Route path="painel" element={<Painel />} />
      <Route path="usuarios" element={<Usuarios />} />
      <Route path="sobre" element={<Sobre />} />
      <Route path="usuarios/adicionar" element={<AdicionarFuncionario />} /> 
    </Routes>
  );
}
