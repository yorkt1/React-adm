import { useEffect, useState } from "react";
import axios from "axios";
import "./produtos.css";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Adicionar Novo Produto");
  const [formData, setFormData] = useState({
    id: null, // aqui guardamos o id sequencial do produto
    nome: "",
    categoria: "",
    preco: "",
    estoque: "",
    descricao: "",
    status: "active",
    imagem: "../images/placeholder-image.jpg",
  });

  const API_BASE_URL = "https://minestore.onrender.com";

  // Carregar produtos do backend
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await axios.get(`${API_BASE_URL}/produto`);
        // Garantir que o campo id sequencial esteja presente e consistente
        const produtosComId = response.data.map((p) => ({
          ...p,
          id: p.id !== undefined ? p.id : p._id,
        }));
        setProdutos(produtosComId);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    }
    carregarProdutos();
  }, []);

  // Abrir modal para novo produto
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
      imagem: "../images/placeholder-image.jpg",
    });
    setModalOpen(true);
  }

  // Abrir modal para editar produto
  function abrirModalEditar(produto) {
    setModalTitle("Editar Produto");
    setFormData({
      id: produto.id,
      nome: produto.nome,
      categoria: produto.categoria || "",
      preco: produto.preco,
      estoque: produto.estoque,
      descricao: produto.descricao || "",
      status: produto.status,
      imagem: produto.imagem || "../images/placeholder-image.jpg",
    });
    setModalOpen(true);
  }

  // Fechar modal
  function fecharModal() {
    setModalOpen(false);
  }

  // Atualizar dados do formulário
  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((old) => ({ ...old, [id]: value }));
  }

  // Upload da imagem (converte em base64)
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Arquivo muito grande! Máximo 2MB.");
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Formato inválido! Use JPG ou PNG.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData((old) => ({ ...old, imagem: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  // Salvar produto (POST ou PUT)
  async function salvarProduto(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Se usar token, senão pode remover

      if (formData.id) {
        // Editar produto
        await axios.put(
          `${API_BASE_URL}/produto/${formData.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProdutos((old) =>
          old.map((p) => (p.id === formData.id ? { ...formData } : p))
        );
        alert("Produto atualizado com sucesso!");
      } else {
        // Adicionar produto
        const response = await axios.post(
          `${API_BASE_URL}/produto`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Garantir que o produto retornado tem o campo id sequencial
        const novoProduto = {
          ...response.data,
          id: response.data.id !== undefined ? response.data.id : response.data._id,
        };

        setProdutos((old) => [...old, novoProduto]);
        alert("Produto adicionado com sucesso!");
      }
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto.");
    }
  }

  // Excluir produto
  async function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_BASE_URL}/produto/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProdutos((old) => old.filter((p) => p.id !== id));
        alert("Produto excluído com sucesso!");
      } catch (err) {
        console.error("Erro ao excluir produto:", err);
        alert("Erro ao excluir o produto.");
      }
    }
  }

  return (
    <div className="admin-body">
      <div className="admin-container">
        <aside className="admin-sidebar">
          <div className="admin-logo">
            <img
              src="https://res.cloudinary.com/dqewxdbfx/image/upload/v1752085697/minecraftlogo_ewoi8u.png"
              alt="Logo"
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
                <a href="/pedidos">
                  <i className="icon-orders"></i> Pedidos
                </a>
              </li>
              <li>
                <a href="/clientes">
                  <i className="icon-customers"></i> Clientes
                </a>
              </li>
              <li>
                <a href="/relatorios">
                  <i className="icon-reports"></i> Relatórios
                </a>
              </li>
              <li>
                <a href="/configuracoes">
                  <i className="icon-settings"></i> Configurações
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
              <button className="btn btn-notification">
                <i className="icon-notification"></i>
                <span className="notification-badge">3</span>
              </button>
              <button className="btn btn-help">
                <i className="icon-help"></i> Ajuda
              </button>
            </div>
          </header>

          <div className="admin-content">
            <div className="admin-toolbar">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Pesquisar produtos..."
                  onChange={() => {}}
                />
                <button className="btn-search">
                  <i className="icon-search"></i>
                </button>
              </div>
              <button
                className="btn btn-primary"
                id="add-product-btn"
                onClick={abrirModalNovo}
              >
                <i className="icon-plus"></i> Adicionar Produto
              </button>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th width="50px">ID</th>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th>Estoque</th>
                    <th>Preço</th>
                    <th>Status</th>
                    <th width="120px">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>
                        <div className="product-info-cell">
                          <img
                            src={p.imagem || ""}
                            alt={p.nome}
                            className="product-thumb"
                          />
                          <span>{p.nome}</span>
                        </div>
                      </td>
                      <td>{p.categoria || "Sem categoria"}</td>
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
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button className="btn-pagination">
                <i className="icon-chevron-left"></i>
              </button>
              <button className="btn-pagination active">1</button>
              <button className="btn-pagination">2</button>
              <button className="btn-pagination">3</button>
              <button className="btn-pagination">
                <i className="icon-chevron-right"></i>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Modal do produto */}
      {modalOpen && (
        <div className="modal" id="product-modal" style={{ display: "block" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3 id="modal-title">{modalTitle}</h3>
              <button className="btn-close-modal" onClick={fecharModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form id="product-form" onSubmit={salvarProduto}>
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
                      <option value="Jogos">Jogos</option>
                      <option value="Skins">Skins</option>
                      <option value="Texturas">Texturas</option>
                      <option value="Merchandising">Merchandising</option>
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
                    required
                  ></textarea>
                </div>

                
<div className="form-group">
  <label htmlFor="imagem">Link da Imagem do Produto</label>
  <input
    type="text"
    id="imagem"
    value={formData.imagem}
    onChange={handleChange}
    placeholder="Cole o link da imagem aqui"
  />
  <div className="image-upload-preview" style={{ marginTop: "10px" }}>
    <img
      id="preview-image"
      src={formData.imagem}
      alt="Pré-visualização"
      style={{     width: "200px",       // define largura fixa do quadrado
    height: "150px",      // define altura fixa do quadrado
    objectFit: "cover",   // cobre todo o quadrado cortando o excesso
    borderRadius: "8px", }}
      onError={(e) => (e.target.src = "sem img")}
    />
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
