import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css"; // seu CSS personalizado


export default function AuthPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Cadastro
  const [registerData, setRegisterData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
    terms: false,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    });
    const data = await res.json();
    console.log("Login:", data);
    localStorage.setItem("token", data.token);

    if (res.ok) {
      // Exemplo de checagem simples de admin (ajuste conforme sua API)
      if (data.isAdmin === true) {
        navigate("/dashboard");
      } else {
        alert("Acesso negado: apenas administradores.");
      }
    } else {
      alert(data.message || "Erro ao fazer login.");
    }


  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Senhas não coincidem.");
      return;
    }

    const res = await fetch("http://localhost:3001/auth/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${registerData.nome} ${registerData.sobrenome}`,
        email: registerData.email,
        password: registerData.password,
        newsletter: registerData.newsletter,
      }),
    });
    const data = await res.json();
    console.log("Cadastro:", data);
  };

  return (
    <>
      <header className="minecraft-header">
        <div className="container">
          <div className="logo">
            <img src="https://res.cloudinary.com/dqewxdbfx/image/upload/v1752085697/minecraftlogo_ewoi8u.png" alt="MineStore Logo" />
            <h1>MineStore</h1>
          </div>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/produtos">Produtos</a></li>
              <li><a href="/carrinho">Carrinho <span id="cart-count">0</span></a></li>
              <li><a href="/login" className="active">Login</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="auth-section">
          <div className="container">
            <div className="auth-tabs">
              <button
                className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
                onClick={() => setActiveTab("register")}
              >
                Cadastro
              </button>
            </div>

            <div className="auth-content">
              {activeTab === "login" && (
                <div className="auth-form active" id="login-form">
                  <h2>Bem-vindo de volta!</h2>
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label htmlFor="login-email">E-mail</label>
                      <input
                        type="email"
                        id="login-email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="login-password">Senha</label>
                      <input
                        type="password"
                        id="login-password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <a href="#" className="forgot-password">Esqueceu sua senha?</a>
                    </div>
                    <button type="submit" className="btn">Entrar</button>

                    <div className="social-login">
                      <p>Ou entre com:</p>
                      <div className="social-buttons">
                        <button type="button" className="btn social-btn google">
                          <img src="images/google-icon.png" alt="Google" /> Google
                        </button>
                        <button type="button" className="btn social-btn facebook">
                          <img src="images/facebook-icon.png" alt="Facebook" /> Facebook
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "register" && (
                <div className="auth-form active" id="register-form">
                  <h2>Crie sua conta</h2>
                  <form onSubmit={handleRegister}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="register-first-name">Nome</label>
                        <input
                          type="text"
                          id="register-first-name"
                          value={registerData.nome}
                          onChange={(e) => setRegisterData({ ...registerData, nome: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="register-last-name">Sobrenome</label>
                        <input
                          type="text"
                          id="register-last-name"
                          value={registerData.sobrenome}
                          onChange={(e) => setRegisterData({ ...registerData, sobrenome: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="register-email">E-mail</label>
                      <input
                        type="email"
                        id="register-email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="register-password">Senha</label>
                      <input
                        type="password"
                        id="register-password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                      />
                      <small>Mínimo de 8 caracteres</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="register-confirm-password">Confirme sua senha</label>
                      <input
                        type="password"
                        id="register-confirm-password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group checkbox-group">
                      <input
                        type="checkbox"
                        id="register-newsletter"
                        checked={registerData.newsletter}
                        onChange={(e) => setRegisterData({ ...registerData, newsletter: e.target.checked })}
                      />
                      <label htmlFor="register-newsletter">Desejo receber ofertas e novidades por e-mail</label>
                    </div>

                    <div className="form-group checkbox-group">
                      <input
                        type="checkbox"
                        id="register-terms"
                        checked={registerData.terms}
                        onChange={(e) => setRegisterData({ ...registerData, terms: e.target.checked })}
                        required
                      />
                      <label htmlFor="register-terms">
                        Li e aceito os <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a>
                      </label>
                    </div>

                    <button type="submit" className="btn">Cadastrar</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

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
    </>
  );
}
