import React, { useEffect, useState } from "react";
import "./admin.css"; // seu CSS personalizado
export default function MineStore() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Troca a URL aqui para a sua API real
    fetch("https://seu-backend.com/api/produtos")
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar produtos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div>
      {/* Header */}
      <header className="minecraft-header">
        <div className="container">
          <div className="logo">
            <img src="https://res.cloudinary.com/dqewxdbfx/image/upload/v1752085697/minecraftlogo_ewoi8u.png" alt="MineStore Logo" />
            <h1>MineStore</h1>
          </div>
          <nav>
            <ul>
              <li><a href="/" className="active">Home</a></li>
              <li><a href="/produtos">Produtos</a></li>
              <li><a href="/carrinho">Carrinho <span id="cart-count">0</span></a></li>
              <li><a href="/registro">Login</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="container">
          <h2>Novidades no Mundo de Minecraft!</h2>
          <p>Descubra as últimas atualizações, pacotes de textura e muito mais</p>
          <a href="/produtos" className="btn">Compre Agora</a>
        </div>
      </section>

      {/* Promoções fixas */}
      <section className="promo-section">
        <div className="container">
          <h2>Promoções Especiais</h2>
          <div className="promo-grid">
            <div className="promo-item">
              <img src="images/promo1.jpg" alt="Promoção 1" />
              <h3>Pacote de Texturas HD</h3>
              <p className="old-price">R$ 49,90</p>
              <p className="new-price">R$ 29,90</p>
              <button className="btn">Adicionar ao Carrinho</button>
            </div>
            <div className="promo-item">
              <img src="images/promo2.jpg" alt="Promoção 2" />
              <h3>Edição Colecionador</h3>
              <p className="old-price">R$ 99,90</p>
              <p className="new-price">R$ 69,90</p>
              <button className="btn">Adicionar ao Carrinho</button>
            </div>
            <div className="promo-item">
              <img src="images/promo3.jpg" alt="Promoção 3" />
              <h3>Skin Exclusiva</h3>
              <p className="old-price">R$ 19,90</p>
              <p className="new-price">R$ 9,90</p>
              <button className="btn">Adicionar ao Carrinho</button>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos dinâmicos */}
      <section className="featured-products">
        <div className="container">
          <h2>Produtos em Destaque</h2>
          <div className="product-grid">
            {produtos.length === 0 && <p>Nenhum produto encontrado.</p>}
            {produtos.map((produto) => (
              <div key={produto.id} className="product-card">
                <img src={produto.imagem} alt={produto.nome} />
                <h3>{produto.nome}</h3>
                <p className="price">{produto.preco}</p>
                <button className="btn">Comprar</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="minecraft-footer">
        <div className="container">
          <div className="footer-logo">
            <img src="images/minecraft-logo.png" alt="MineStore Logo" />
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
