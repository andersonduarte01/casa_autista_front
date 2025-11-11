// MainLayout.tsx
import React, { useState, useEffect } from "react";
import Cabecalho from "./CabecalhoFuncionario";
import Menulateral from "./MenulateralFuncionario";
import Rodape from "./RodapeFuncionario";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSidebar = () => setCollapsed(!collapsed);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Recolher automaticamente em telas pequenas
    if (window.innerWidth < 768) setCollapsed(true);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      {/* Topbar */}
      <Cabecalho toggleSidebar={toggleSidebar} />

      {/* Corpo principal: sidebar + conteúdo */}
      <div className="d-flex flex-grow-1" style={{ marginTop: "56px" }}>
        {/* Sidebar */}
        <Menulateral collapsed={collapsed} />

        {/* Conteúdo principal */}
        <div
          className="flex-grow-1 d-flex flex-column"
          style={{
            minHeight: "calc(100vh - 112px)", // 56px topbar + 56px footer
            backgroundColor: "#f8f9fa",
          }}
        >
          {/* Conteúdo */}
          <div className="flex-grow-1 p-0">{children}</div>

          {/* Rodapé */}
          <Rodape />
        </div>
      </div>
    </div>

  );
};

export default MainLayout;