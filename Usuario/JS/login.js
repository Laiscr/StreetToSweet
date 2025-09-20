// Importa as funções necessárias do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Sua configuração do Firebase (cole aqui)
const firebaseConfig = {
  apiKey: "AIzaSyAE34wFaTK91aYLe8ar4V6DvGcEXyxyG3s",
  authDomain: "street-to-sweet-7f126.firebaseapp.com",
  projectId: "street-to-sweet-7f126",
  storageBucket: "street-to-sweet-7f126.firebasestorage.app",
  messagingSenderId: "879182530266",
  appId: "1:879182530266:web:08e5fd3ec431a5c77c87e3",
  measurementId: "G-9D3VNC4QE4",
};

// Inicializa o Firebase e o serviço de Autenticação
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Pega os elementos do HTML
const form = document.getElementById("loginForm");
const emailEl = document.getElementById("email");
const pwdEl = document.getElementById("password");
const errorBox = document.getElementById("errorBox");
const togglePwd = document.getElementById("togglePwd");
const pwdIcon = togglePwd.querySelector(".material-symbols-outlined"); // Pega o elemento do ícone
const forgotLink = document.getElementById("forgotLink");
const loginBtn = form.querySelector(".btn-login"); // Pega o botão de login

// Função para mostrar/esconder a senha
togglePwd.addEventListener("click", () => {
  const isPassword = pwdEl.type === "password";
  pwdEl.type = isPassword ? "text" : "password";
  // Troca o ícone
  pwdIcon.textContent = isPassword ? "visibility_off" : "visibility";
});

// Evento de submit do formulário de login
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Impede o recarregamento da página
  errorBox.style.color = "#b30000";
  errorBox.textContent = "";

  const email = emailEl.value.trim();
  const password = pwdEl.value;

  if (!email || !password) {
    errorBox.textContent = "Preencha e-mail e senha.";
    return;
  }

  // Desabilita o botão para evitar múltiplos cliques e dá feedback ao usuário
  loginBtn.disabled = true;
  loginBtn.textContent = "ENTRANDO...";

  try {
    // Tenta fazer o login com o Firebase
    await signInWithEmailAndPassword(auth, email, password);
    // Se o login for bem-sucedido, redireciona para a página inicial
    window.location.href = "/ADM/HTML/paginaInicial-adm.html";
  } catch (err) {
    // Mapeia os códigos de erro do Firebase para mensagens amigáveis
    const errorMap = {
      "auth/invalid-credential": "E-mail ou senha incorretos.",
      "auth/invalid-email": "O formato do e-mail é inválido.",
      "auth/user-disabled": "Este usuário foi desativado.",
      "auth/user-not-found": "Usuário não encontrado.",
      "auth/wrong-password": "Senha incorreta.",
    };
    // Exibe a mensagem de erro
    errorBox.textContent =
      errorMap[err.code] || "Falha no login. Tente novamente.";
    console.error("Erro de login:", err);
  } finally {
    // Reabilita o botão, independentemente de sucesso ou falha
    loginBtn.disabled = false;
    loginBtn.textContent = "ENTRAR";
  }
});

// Evento para o link "Esqueci minha senha"
forgotLink.addEventListener("click", async (e) => {
  e.preventDefault();
  errorBox.style.color = "#b30000";
  errorBox.textContent = "";

  const email = emailEl.value.trim();
  if (!email) {
    errorBox.textContent = "Digite seu e-mail para recuperar a senha.";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    errorBox.textContent = "E-mail de recuperação enviado com sucesso!";
    errorBox.style.color = "green";
  } catch (err) {
    errorBox.textContent =
      "Não foi possível enviar o e-mail. Verifique o endereço.";
    console.error("Erro ao enviar e-mail de recuperação:", err);
  }
});
