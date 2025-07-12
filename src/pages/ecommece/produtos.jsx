import React, { useEffect, useState } from "react";
import "./admin.css";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Exemplo de fetch para pegar produtos do backend
    fetch("https://minestore.onrender.com/produto")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  }, []);

  return (
    <div>
      <header className="minecraft-header">
        <div className="container">
          <div className="logo">
            <img src="/images/minecraft-logo.png" alt="MineStore Logo" />
            <h1>MineStore</h1>
          </div>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/produtos" className="active">Produtos</a></li>
              <li><a href="/carrinho">Carrinho <span id="cart-count">0</span></a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="products-section">
          <div className="container">
            <div className="products-header">
              <h2>Todos os Produtos</h2>
              <div className="filter-controls">
                <select id="category-filter">
                  <option value="all">Todas Categorias</option>
                  <option value="games">Jogos</option>
                  <option value="skins">Skins</option>
                  <option value="textures">Texturas</option>
                  <option value="merch">Merchandising</option>
                </select>
                <select id="price-filter">
                  <option value="all">Qualquer Preço</option>
                  <option value="0-50">Até R$ 50</option>
                  <option value="50-100">R$ 50 - R$ 100</option>
                  <option value="100-150">R$ 100 - R$ 150</option>
                  <option value="150+">Acima de R$ 150</option>
                </select>
                <select id="sort-by">
                  <option value="default">Ordenar por</option>
                  <option value="price-asc">Preço: Menor para Maior</option>
                  <option value="price-desc">Preço: Maior para Menor</option>
                  <option value="name-asc">Nome: A-Z</option>
                  <option value="name-desc">Nome: Z-A</option>
                </select>
              </div>
            </div>

            <div className="product-grid">
              {produtos.map((produto, index) => (
                <div
                  className="product-card"
                  key={index}
                  data-category={produto.categoria}
                  data-price={produto.preco}
                >
                  <img src={produto.imagem} alt={produto.nome} />
                  <h3>{produto.nome}</h3>
                  <p className="price">R$ {produto.preco.toFixed(2)}</p>
                  <button className="btn">Comprar</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="minecraft-footer">
        <div className="container">
          <div className="footer-logo">
            <img src="/images/minecraft-logo.png" alt="MineStore Logo" />
            <h3>MineStore</h3>
          </div>
          <div className="footer-links">
            <div className="links-column">
              <h4>Loja</h4>
              <ul>
                <li><a href="/produtos">Todos os Produtos</a></li>
                <li><a href="#">Novidades</a></li>
                <li><a href="#">Promoções</a></li>
              </ul>
            </div>
            <div className="links-column">
              <h4>Sobre</h4>
              <ul>
                <li><a href="#">Sobre Nós</a></li>
                <li><a href="#">Contato</a></li>
                <li><a href="#">Política de Privacidade</a></li>
              </ul>
            </div>
            <div className="links-column">
              <h4>Ajuda</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Entregas</a></li>
                <li><a href="#">Devoluções</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 MineStore. Não afiliado à Mojang ou Microsoft.</p>
        </div>
      </footer>
    </div>
  );
}
