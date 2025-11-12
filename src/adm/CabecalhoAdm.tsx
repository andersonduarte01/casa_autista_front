import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface CabecalhoProps {
  toggleSidebar: () => void;
}

export default function Cabecalho({ toggleSidebar }: CabecalhoProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expand="lg"
      bg="primary"
      variant="dark"
      fixed="top"
      expanded={expanded}
      className="shadow-sm"
    >
      <Container fluid>
        {/* Botão para expandir/recuar sidebar */}
        <Button
          variant="outline-light"
          size="sm"
          className="me-2"
          onClick={toggleSidebar}
        >
          ☰
        </Button>

        {/* Logo */}
        <Navbar.Brand as={Link} to="/painel/admin/">
          Dashboard
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/painel/admin/painel">
              Painel
            </Nav.Link>
            <Nav.Link as={Link} to="/painel/admin/usuarios">
              Usuários
            </Nav.Link>
            <Nav.Link as={Link} to="/painel/admin/sobre">
              Sobre
            </Nav.Link>

            <NavDropdown title="Serviços" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/consultoria">
                Consultoria
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/desenvolvimento">
                Desenvolvimento
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/design">
                Design
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/mais">
                Mais...
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className="d-flex gap-2 mt-2 mt-lg-0">
            <Button variant="outline-light" size="sm">
              Entrar
            </Button>
            <Button variant="outline-light" size="sm">
              Registrar
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
