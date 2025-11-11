import { Nav } from "react-bootstrap";
import { FaTachometerAlt, FaUsers, FaFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";

interface MenulateralProps {
  collapsed: boolean;
}

export default function Menulateral({ collapsed }: MenulateralProps) {
  return (
    <div
      className="d-flex flex-column bg-primary text-light"
      style={{
        width: collapsed ? "60px" : "220px",
        transition: "width 0.3s",
        minHeight: "calc(100vh - 56px)",
      }}
    >
      <h4 className="text-center mt-3 mb-4"></h4>


      {/* Links do menu */}
      <Nav className="flex-column flex-grow-1">
        <Nav.Link href="#" className="text-light mb-2 d-flex align-items-center">
          <FaTachometerAlt size={20} className="me-2" />
          {!collapsed && "Dashboard"}
        </Nav.Link>
        <Nav.Link href="#" className="text-light mb-2 d-flex align-items-center">
          <FaUsers size={20} className="me-2" />
          {!collapsed && "Usuários"}
        </Nav.Link>
        <Nav.Link href="#" className="text-light mb-2 d-flex align-items-center">
          <FaFileAlt size={20} className="me-2" />
          {!collapsed && "Relatórios"}
        </Nav.Link>
        <Nav.Link href="#" className="text-light mb-2 d-flex align-items-center">
          <FaCog size={20} className="me-2" />
          {!collapsed && "Configurações"}
        </Nav.Link>
      </Nav>

      {/* Rodapé do menu */}
      <div className="mt-auto p-3">
        <hr className="border-light" />
        <Nav.Link href="#" className="text-light d-flex align-items-center">
          <FaSignOutAlt size={20} className="me-2" />
          {!collapsed && "Sair"}
        </Nav.Link>
      </div>
    </div>
  );
}
