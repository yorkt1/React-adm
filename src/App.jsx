import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/admin-dashbord.jsx";
import Produtos from "./pages/admin/admin-produtos.jsx";

export default function App() {
  return (
    <Routes>
     
      <Route path="/" element={<Dashboard />} />
      <Route path="/produtos" element={<Produtos />} />
    </Routes>
  );
}
