import { useState } from "react";
import { Nav } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaList,
  FaAngleDown,
  FaAngleRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../autenticacao/AuthContext";

interface MenulateralProps {
  collapsed: boolean;
}

export default function Menulateral({ collapsed }: MenulateralProps) {
  const { logout } = useAuth();
  const [openUsuarios, setOpenUsuarios] = useState(false);

  return (
    <div
      className="d-flex flex-column bg-primary text-light"
      style={{
        width: collapsed ? "60px" : "220px",
        transition: "width 0.3s",
        minHeight: "calc(100vh - 56px)",
      }}
    >
      <Nav className="flex-column flex-grow-1">
        {/* DASHBOARD */}
        <Nav.Link
          as={Link}
          to="/painel/admin/painel"
          className="text-light mb-2 d-flex align-items-center"
        >
          <FaTachometerAlt size={20} className="me-2" />
          {!collapsed && "Dashboard"}
        </Nav.Link>

        {/* USUÁRIOS */}
        <div>
          <Nav.Link
            onClick={() => setOpenUsuarios(!openUsuarios)}
            className="text-light mb-2 d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center">
              <FaUsers size={20} className="me-2" />
              {!collapsed && "Usuários"}
            </div>
            {!collapsed && (openUsuarios ? <FaAngleDown /> : <FaAngleRight />)}
          </Nav.Link>

          {/* Submenu */}
          {!collapsed && openUsuarios && (
            <div className="ms-4">
              <Nav.Link
                as={Link}
                to="/painel/admin/usuarios"
                className="text-light mb-1 d-flex align-items-center"
              >
                <FaList size={16} className="me-2" /> Funcionários
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/painel/admin/usuarios/adicionar"
                className="text-light mb-1 d-flex align-items-center"
              >
                <FaPlus size={16} className="me-2" /> Adicionar
              </Nav.Link>
            </div>
          )}
        </div>

        {/* RELATÓRIOS */}
        <Nav.Link
          href="#"
          className="text-light mb-2 d-flex align-items-center"
        >
          <FaFileAlt size={20} className="me-2" />
          {!collapsed && "Relatórios"}
        </Nav.Link>

        {/* CONFIGURAÇÕES */}
        <Nav.Link
          href="#"
          className="text-light mb-2 d-flex align-items-center"
        >
          <FaCog size={20} className="me-2" />
          {!collapsed && "Configurações"}
        </Nav.Link>
      </Nav>

      {/* SAIR */}
      <div className="mt-auto p-3">
        <hr className="border-light" />
        <Nav.Link
          href="#"
          onClick={logout}
          className="text-light d-flex align-items-center"
        >
          <FaSignOutAlt size={20} className="me-2" />
          {!collapsed && "Sair"}
        </Nav.Link>
      </div>
    </div>
  );
}
