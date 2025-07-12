import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/admin-dashbord.jsx";
import ProdutosAdm from "./pages/admin/admin-produtos.jsx";
import Produtos from "./pages/ecommece/produtos.jsx";
import Registro from "./pages/ecommece/registro.jsx";
import Inicial from "./pages/ecommece/inicial.jsx";
export default function App() {
  return (
  <Routes>
  {/* E-commerce */}
  <Route path="/" element={<Inicial />} />
  <Route path="/registro" element={<Registro />} />
  <Route path="/produtos" element={<Produtos />} />

  {/* Admin */}
  <Route path="/admin/dashboard" element={<Dashboard />} />
  <Route path="/admin/produtos" element={<ProdutosAdm />} />
</Routes>
  );
}
