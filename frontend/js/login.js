// frontend/js/login.js - VERSÃO CORRIGIDA

const API_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado!');
  
  const emailInput = document.getElementById('email');
<<<<<<< HEAD
  const senhaInput = document.getElementById('password');
  const loginBtn = document.getElementById('login-btn');
  const errorDiv = document.getElementById('error-msg');
  
  if (!emailInput || !senhaInput || !loginBtn) {
    console.error('Elementos não encontrados!');
    return;
  }
  
  console.log('Elementos encontrados com sucesso!');
  
  // Função de login
  async function realizarLogin() {
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    
    if (!email || !senha) {
      if (errorDiv) {
        errorDiv.textContent = 'Preencha email e senha!';
        errorDiv.style.display = 'block';
      }
      return;
    }
    
    if (errorDiv) {
      errorDiv.style.display = 'none';
    }
    
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENTRANDO...';
    
    try {
      console.log('Tentando login com:', email);
      
      const response = await fetch(`${API_URL}/api/auth/login`, {
=======
  const passwordInput = document.getElementById('password');
  const errorMsg = document.getElementById('error-msg');

  // Se já está logado, redirecionar
  if (localStorage.getItem('token')) {
    window.location.href = 'dashboard.html';
    return;
  }

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
    const password = passwordInput.value.trim();

    errorMsg.textContent = '';
    errorMsg.style.display = 'none';

    if (!email || !password) {
      showError('Preencha todos os campos!');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Email inválido!');
      return;
    }

    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENTRANDO...';

    try {
      console.log('🔄 Tentando login...', { email });

      const response = await fetch(`${API_URL}/login`, {
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });
<<<<<<< HEAD
      
      const data = await response.json();
      console.log('Resposta do servidor:', data);
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Erro ao fazer login');
      }
      
      // Salvar token e dados do usuário
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.usuario.id);
      localStorage.setItem('userName', data.usuario.nome);
      localStorage.setItem('userEmail', data.usuario.email);
      localStorage.setItem('userType', data.usuario.tipo);
      
      console.log('Login realizado com sucesso!');
      
      // Redirecionar para dashboard
      window.location.href = 'dashboard.html';
      
    } catch (error) {
      console.error('Erro no login:', error);
      
      if (errorDiv) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
      } else {
        alert('Erro: ' + error.message);
      }
      
      loginBtn.disabled = false;
      loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> ENTRAR';
    }
  }
  
  // Click no botão
  loginBtn.addEventListener('click', realizarLogin);
  
  // Enter nos campos
  emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') realizarLogin();
  });
  
  senhaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') realizarLogin();
  });
});
=======

      console.log('📡 Status da resposta:', response.status);

      const data = await response.json();
      console.log('📦 Dados recebidos:', data);

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Email ou senha incorretos!');
      }

      // Salvar dados do usuário
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.user?.name || data.name || 'Usuário');
      localStorage.setItem('userEmail', data.user?.email || email);
      localStorage.setItem('userId', data.user?.id || data.id || '1');

      console.log('✅ Login realizado com sucesso!');

      loginBtn.innerHTML = '<i class="fas fa-check-circle"></i> SUCESSO!';
      loginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 500);

    } catch (error) {
      console.error('❌ Erro no login:', error);
      showError(error.message || 'Erro ao conectar ao servidor. Verifique se o backend está rodando.');
      
      loginBtn.disabled = false;
      loginBtn.innerHTML = 'ENTRAR';

      // Shake animation
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

// CSS para shake (adicionar se não tiver)
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(style);
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
