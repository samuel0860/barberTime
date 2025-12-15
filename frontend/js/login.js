// frontend/js/login.js - VERSÃO FINAL CORRIGIDA

const API_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM carregado!');
  
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('login-btn');
  const errorMsg = document.getElementById('error-msg');

  // Se já está logado, redirecionar
  if (localStorage.getItem('token')) {
    window.location.href = 'dashboard.html';
    return;
  }

  if (!emailInput || !passwordInput || !loginBtn) {
    console.error('❌ Elementos do formulário não encontrados!');
    return;
  }

  console.log('✅ Elementos encontrados com sucesso!');

  // Login ao pressionar Enter
  emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });

  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });

  loginBtn.addEventListener('click', handleLogin);

  async function handleLogin() {
    const email = emailInput.value.trim();
    const senha = passwordInput.value.trim();

    // Limpar mensagens anteriores
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';

    // Validações básicas
    if (!email || !senha) {
      showError('Preencha todos os campos!');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Email inválido!');
      return;
    }

    // Desabilitar botão durante requisição
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENTRANDO...';

    try {
      console.log('🔄 Tentando login...', { email });

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      console.log('📡 Status da resposta:', response.status);

      const data = await response.json();
      console.log('📦 Dados recebidos:', data);

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Email ou senha incorretos!');
      }

      // Salvar dados do usuário no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.usuario?.nome || 'Usuário');
      localStorage.setItem('userEmail', data.usuario?.email || email);
      localStorage.setItem('userId', data.usuario?.id || '');
      localStorage.setItem('userType', data.usuario?.tipo || 'CLIENTE');

      console.log('✅ Login realizado com sucesso!');

      // Feedback visual de sucesso
      loginBtn.innerHTML = '<i class="fas fa-check-circle"></i> SUCESSO!';
      loginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

      // Redirecionar após breve delay
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 500);

    } catch (error) {
      console.error('❌ Erro no login:', error);
      showError(error.message || 'Erro ao conectar ao servidor. Verifique se o backend está rodando na porta 3000.');
      
      loginBtn.disabled = false;
      loginBtn.innerHTML = 'ENTRAR';

      // Animação de shake no erro
      document.querySelector('.auth-container').style.animation = 'shake 0.4s';
      setTimeout(() => {
        document.querySelector('.auth-container').style.animation = '';
      }, 400);
    }
  }

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

// CSS para animação de shake (se não existir)
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(style);