const API_URL = 'https://barbertime-api.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  const forgotForm = document.getElementById('forgot-form');
  const resetBtn = document.getElementById('reset-btn');
  const emailInput = document.getElementById('email');
  const errorMsg = document.getElementById('error-msg');
  const successMsg = document.getElementById('success-msg');

  forgotForm.addEventListener('submit', handleResetPassword);

  emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleResetPassword(e);
    }
  });

  async function handleResetPassword(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();

    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
    successMsg.textContent = '';
    successMsg.style.display = 'none';

    if (!email) {
      showError('Digite seu email!');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Email inválido!');
      return;
    }

    resetBtn.disabled = true;
    resetBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';

    try {
      console.log('📧 Enviando email de recuperação...', { email });

      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      console.log('📡 Resposta:', data);

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Erro ao enviar email');
      }

      console.log('✅ Email enviado!');

      resetBtn.innerHTML = '<i class="fas fa-check-circle"></i> EMAIL ENVIADO!';
      resetBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

      showSuccess('✓ Email enviado com sucesso! Verifique sua caixa de entrada e spam.');

      emailInput.value = '';

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 5000);

    } catch (error) {
      console.error('❌ Erro:', error);
      showError(error.message || 'Erro ao enviar email. Verifique se o email está cadastrado.');
      
      resetBtn.disabled = false;
      resetBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ENVIAR LINK DE RECUPERAÇÃO';

      const container = document.querySelector('.auth-container');
      if (container) {
        container.style.animation = 'shake 0.4s';
        setTimeout(() => {
          container.style.animation = '';
        }, 400);
      }
    }
  }

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
  }

  function showSuccess(message) {
    successMsg.textContent = message;
    successMsg.style.display = 'block';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
