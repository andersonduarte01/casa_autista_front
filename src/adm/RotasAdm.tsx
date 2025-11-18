import { Routes, Route } from "react-router-dom";
import Painel from "./paginas/Painel";
import Sobre from "./Sobre";
import Usuarios from "./paginas/Usuarios";
import AdicionarFuncionario from "./paginas/AdicionarFuncionario";
import EditarFuncionario from "./paginas/EditarFuncionario";
import AdicionarProfissional from "./profissionais/AdicionarProfissional";
import EditarProfissional from "./profissionais/EditarFuncionario";
import Profissionais from "./profissionais/Profissionais";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Painel />} />
      <Route path="painel" element={<Painel />} />
      <Route path="funcionarios" element={<Usuarios />} />
      <Route path="sobre" element={<Sobre />} />
      <Route path="funcionario/adicionar" element={<AdicionarFuncionario />} />
      <Route path="funcionario/editar/:id" element={<EditarFuncionario />} />
      <Route path="profissional/adicionar" element={<AdicionarProfissional />} />
      <Route path="profissional/editar/:id" element={<EditarProfissional />} />
      <Route path="profissionais" element={<Profissionais />} />
    </Routes>
  );
}
