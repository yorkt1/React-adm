import React, { useState, useEffect } from "react";
import "./admin.css";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Adicionar Novo Produto");
  const [formData, setFormData] = useState({
    id: null,
    nome: "",
    categoria: "",
    preco: "",
    estoque: "",
    descricao: "",
    status: "active",
    imagemUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);

  // Buscar produtos e categorias do backend ao montar o componente
  useEffect(() => {
    carregarProdutos();
    carregarCategorias();
  }, []);

  async function carregarCategorias() {
    try {
      const res = await fetch("/api/categorias");
      if (!res.ok) throw new Error("Erro ao buscar categorias");
      const data = await res.json();
      setCategorias(data);
    } catch (err) {
      console.error("Erro ao carregar categorias:", err);
    }
  }

  async function carregarProdutos() {
    setLoading(true);
    try {
      const res = await fetch("/produto");
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      const data = await res.json();
      
      // Adapta a estrutura dos dados para o que seu front espera
      const produtosFormatados = data.map(produto => ({
        ...produto,
        categoria: produto.categoria?.nome || 'Sem categoria',
        status: produto.status || 'active'
      }));
      
      setProdutos(produtosFormatados);
    } catch (err) {
      console.error("Erro detalhado:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  function abrirModalNovo() {
    setModalTitle("Adicionar Novo Produto");
    setFormData({
      id: null,
      nome: "",
      categoria: "",
      preco: "",
      estoque: "",
      descricao: "",
      status: "active",
      imagemUrl: "",
    });
    setModalOpen(true);
  }

  function abrirModalEditar(produto) {
    setModalTitle("Editar Produto");
    setFormData({
      id: produto.id,
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco,
      estoque: produto.estoque,
      descricao: produto.descricao || "",
      status: produto.status,
      imagemUrl: produto.imagemUrl || "",
    });
    setModalOpen(true);
  }

  function fecharModal() {
    setModalOpen(false);
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((old) => ({ ...old, [id]: value }));
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData((old) => ({ ...old, imagemUrl: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  async function salvarProduto(e) {
    e.preventDefault();

    // Validação básica
    if (!formData.nome || !formData.categoria || !formData.preco) {
      alert("Preencha nome, categoria e preço");
      return;
    }

    try {
      // Encontra o ID da categoria selecionada
      const categoriaSelecionada = categorias.find(cat => cat.nome === formData.categoria);
      const categoriaId = categoriaSelecionada ? categoriaSelecionada.id : null;

      const dadosParaEnviar = {
        nome: formData.nome,
        descricao: formData.descricao,
        preco: parseFloat(formData.preco),
        estoque: parseInt(formData.estoque) || 0,
        imagemUrl: formData.imagemUrl,
        status: formData.status,
        categoriaId: categoriaId
      };

      let res;
      if (formData.id) {
        // Atualizar
        res = await fetch(`/api/produtos/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosParaEnviar),
        });
      } else {
        // Criar
        res = await fetch("/api/produtos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosParaEnviar),
        });
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao salvar produto");
      }

      await carregarProdutos();
      fecharModal();
      alert("Produto salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert(err.message);
    }
  }

  async function excluirProduto(id) {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      const res = await fetch(`/api/produtos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir produto");
      await carregarProdutos();
      alert("Produto excluído com sucesso!");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="admin-body">
      <div className="admin-container">
        <aside className="admin-sidebar">
          <div className="admin-logo">
            <img
              src="https://res.cloudinary.com/dqewxdbfx/image/upload/v1752085697/minecraftlogo_ewoi8u.png"
              alt=""
            />
            <h2>Admin</h2>
          </div>
          <nav className="admin-nav">
            <ul>
              <li>
                <a href="/">
                  <i className="icon-dashboard"></i> Dashboard
                </a>
              </li>
              <li className="active">
                <a href="/produtos">
                  <i className="icon-products"></i> Produtos
                </a>
              </li>
              <li>
                <a href="/categorias">
                  <i className="icon-categories"></i> Categorias
                </a>
              </li>
              <li>
                <a href="/pedidos">
                  <i className="icon-orders"></i> Pedidos
                </a>
              </li>
              <li>
                <a href="/clientes">
                  <i className="icon-clients"></i> Clientes
                </a>
              </li>
            </ul>
          </nav>
          <div className="admin-user">
            <img
              src="https://res.cloudinary.com/dqewxdbfx/image/upload/v1752085696/avatar_azs6ab.jpg"
              alt="Admin Avatar"
            />
            <div className="user-info">
              <strong>Admin</strong>
              <small>Guilherme@minestore.com</small>
            </div>
            <a href="/login" className="logout">
              <i className="icon-logout"></i>
            </a>
          </div>
        </aside>

        <main className="admin-main">
          <header className="admin-header">
            <h1>Gerenciamento de Produtos</h1>
            <div className="admin-actions">
              <div className="search-box">
                <input type="text" placeholder="Buscar produtos..." />
                <button className="btn-search">
                  <i className="icon-search"></i>
                </button>
              </div>
            </div>
          </header>

          <div className="admin-content">
            <div className="admin-toolbar">
              <button className="btn btn-primary" onClick={abrirModalNovo}>
                <i className="icon-plus"></i> Adicionar Produto
              </button>
            </div>

            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Carregando produtos...</p>
              </div>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Produto</th>
                      <th>Categoria</th>
                      <th>Estoque</th>
                      <th>Preço</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtos.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="empty-table">
                          Nenhum produto encontrado
                        </td>
                      </tr>
                    ) : (
                      produtos.map((p) => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>
                            <div className="product-info-cell">
                              {p.imagemUrl && (
                                <img
                                  src={p.imagemUrl}
                                  alt={p.nome}
                                  className="product-thumb"
                                />
                              )}
                              <span>{p.nome}</span>
                            </div>
                          </td>
                          <td>{p.categoria}</td>
                          <td>{p.estoque}</td>
                          <td>
                            {Number(p.preco).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>
                            <span className={`status ${p.status}`}>
                              {p.status === "active"
                                ? "Ativo"
                                : p.status === "inactive"
                                ? "Inativo"
                                : "Rascunho"}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn-action edit"
                              onClick={() => abrirModalEditar(p)}
                            >
                              <i className="icon-edit"></i>
                            </button>
                            <button
                              className="btn-action delete"
                              onClick={() => excluirProduto(p.id)}
                            >
                              <i className="icon-delete"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal do produto */}
      {modalOpen && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>{modalTitle}</h3>
              <button className="btn-close-modal" onClick={fecharModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={salvarProduto}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nome">Nome do Produto</label>
                    <input
                      type="text"
                      id="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                      id="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione...</option>
                      {categorias.map((cat) => (
                        <option key={cat.id} value={cat.nome}>
                          {cat.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preco">Preço (R$)</label>
                    <input
                      type="number"
                      id="preco"
                      step="0.01"
                      min="0"
                      value={formData.preco}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="estoque">Estoque</label>
                    <input
                      type="number"
                      id="estoque"
                      min="0"
                      value={formData.estoque}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="descricao">Descrição</label>
                  <textarea
                    id="descricao"
                    rows="4"
                    value={formData.descricao}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Imagem do Produto</label>
                  <div className="image-upload-container">
                    <div className="image-upload-preview">
                      {formData.imagemUrl && (
                        <img
                          src={formData.imagemUrl}
                          alt="Pré-visualização"
                          style={{ maxWidth: "100px" }}
                        />
                      )}
                    </div>
                    <div className="image-upload-controls">
                      <input
                        type="file"
                        id="product-image"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                      <button
                        type="button"
                        className="btn btn-upload"
                        onClick={() =>
                          document.getElementById("product-image").click()
                        }
                      >
                        Selecionar Imagem
                      </button>
                      <small>Formatos suportados: JPG, PNG (Máx. 2MB)</small>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                    <option value="draft">Rascunho</option>
                  </select>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-cancel"
                    onClick={fecharModal}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-save">
                    Salvar Produto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}