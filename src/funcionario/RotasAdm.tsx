
import { Routes, Route } from "react-router-dom";
import Home from "../paginas/Home";
import Sobre from "../paginas/Sobre";
import Usuarios from "../paginas/Usuarios";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/usuarios" element={<Usuarios/>}/>
    </Routes>
  );
}
