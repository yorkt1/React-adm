import React from "react";
import "./admin-style/admin.css";
const produtosExemplo = [
  {
    id: "10025",
    cliente: "João Silva",
    data: "15/03/2023",
    valor: "R$ 189,60",
    status: "Enviado",
  },
  {
    id: "10024",
    cliente: "Maria Oliveira",
    data: "14/03/2023",
    valor: "R$ 89,90",
    status: "Entregue",
  },
];

export default function Dashboard() {
  return (
    <div className="admin-body">
      <div className="admin-container">
        <aside className="admin-sidebar">
          <div className="admin-logo">
            <img src="minecraftlogo.png" alt="MineStore Admin" />
            <h2> Admin</h2>
          </div>
          <nav className="admin-nav">
            <ul>
              <li className="active">
                <a href="#dashboard">
                  <i className="icon-dashboard"></i> Dashboard
                </a>
              </li>
              <li>
                <a href="/produtos">
                  <i className="icon-products"></i> Produtos
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-orders"></i> Pedidos
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-customers"></i> Clientes
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-reports"></i> Relatórios
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-settings"></i> Configurações
                </a>
              </li>
            </ul>
          </nav>
          <div className="admin-user">
            <img src="avatar.jpeg" alt="Admin Avatar" />
            <div className="user-info">
              <strong>Admin</strong>
              <small>Guilherme@minestore.com</small>
            </div>
            <a href="#" className="logout">
              <i className="icon-logout"></i>
            </a>
          </div>
        </aside>

        <main className="admin-main">
          <header className="admin-header">
            <h1>Dashboard</h1>
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
            <div className="stats-grid">
              {/* Cards de estatística */}
              <div className="stat-card">
                <div className="stat-icon sales">
                  <i className="icon-sales"></i>
                </div>
                <div className="stat-info">
                  <h3>Vendas Hoje</h3>
                  <p className="stat-value">R$ 1.450,80</p>
                  <p className="stat-change up">+12% em relação a ontem</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon orders">
                  <i className="icon-orders"></i>
                </div>
                <div className="stat-info">
                  <h3>Pedidos Hoje</h3>
                  <p className="stat-value">18</p>
                  <p className="stat-change up">+2% em relação a ontem</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon customers">
                  <i className="icon-customers"></i>
                </div>
                <div className="stat-info">
                  <h3>Novos Clientes</h3>
                  <p className="stat-value">7</p>
                  <p className="stat-change down">-3% em relação a ontem</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon products">
                  <i className="icon-products"></i>
                </div>
                <div className="stat-info">
                  <h3>Produtos em Estoque</h3>
                  <p className="stat-value">42</p>
                  <p className="stat-change">5 com estoque baixo</p>
                </div>
              </div>
            </div>

            <div className="charts-row">
              <div className="chart-card">
                <h3>Vendas dos Últimos 7 Dias</h3>
                <div className="chart-container">
                  <img
                    src="images/sales-chart.png"
                    alt="Gráfico de Vendas"
                    className="chart-placeholder"
                  />
                </div>
              </div>
              <div className="chart-card">
                <h3>Produtos Mais Vendidos</h3>
                <div className="chart-container">
                  <img
                    src="quadro.jpg"
                    alt="Produtos Mais Vendidos"
                    className="chart-placeholder"
                  />
                </div>
              </div>
            </div>

            <div className="recent-orders">
              <div className="section-header">
                <h3>Pedidos Recentes</h3>
                <a href="admin-orders.html" className="view-all">
                  Ver Todos
                </a>
              </div>
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtosExemplo.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>#{pedido.id}</td>
                      <td>{pedido.cliente}</td>
                      <td>{pedido.data}</td>
                      <td>{pedido.valor}</td>
                      <td>
                        <span className={`status ${pedido.status.toLowerCase()}`}>
                          {pedido.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-action view">
                          <i className="icon-view"></i>
                        </button>
                        <button className="btn-action edit">
                          <i className="icon-edit"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
