import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/admin-dashbord.jsx";
import Produtos from "./pages/admin/admin-produtos.jsx";
import Registro from "./pages/ecommece/registro.jsx";
import Inicial from "./pages/ecommece/inicial.jsx";
export default function App() {
  return (
    <Routes>
     
      <Route path="/" element={<Inicial />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/registro" element={<Registro />} />
    </Routes>
  );
}
