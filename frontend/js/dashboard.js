<<<<<<< HEAD
const API_URL = 'http://localhost:3000';

const BARBERS_DATA = [
  {
    id: 1,
    name: 'Lucas Alberto de Santana Santos',
    specialty: 'Cortes Modernos e Degradês',
    experience: '8 anos de experiência',
    rating: 4.9,
    image: 'images/team/lucas.jpg',
    description: 'Especialista em cortes modernos, degradês e barbas clássicas.'
  },
  {
    id: 2,
    name: 'Evely Sena dos Santos',
    specialty: 'Cortes Femininos e Escovas',
    experience: '10 anos de experiência',
    rating: 5.0,
    image: 'images/team/evely.jpg',
    description: 'Especializada em cortes femininos modernos e escovas profissionais.'
  },
  {
    id: 3,
    name: 'Guilhermy Deveza da Silva',
    specialty: 'Cortes Tradicionais e Design Capilar',
    experience: '6 anos de experiência',
    rating: 4.9,
    image: 'images/team/guilhermy.jpg',
    description: 'Expert em cortes clássicos e design capilar artístico.'
  },
  {
    id: 4,
    name: 'Samuel da Silva Sales',
    specialty: 'Combo Corte + Barba',
    experience: '7 anos de experiência',
    rating: 4.8,
    image: 'images/team/samuel.jpg',
    description: 'Especializado em combos completos e barbas estilizadas.'
  },
  {
    id: 5,
    name: 'Ingrid Sanuto Aguiar',
    specialty: 'Coloração e Platinados',
    experience: '9 anos de experiência',
    rating: 5.0,
    image: 'images/team/ingrid.jpg',
    description: 'Referência em coloração personalizada e platinados.'
  },
  {
    id: 6,
    name: 'Lettícia Sabino da Conceição Eugenio',
    specialty: 'Hidratação e Cortes Infantis',
    experience: '5 anos de experiência',
    rating: 4.9,
    image: 'images/team/letticia.jpg',
    description: 'Especialista em tratamentos capilares e cortes infantis.'
  }
];

document.addEventListener('DOMContentLoaded', function() {
=======
// frontend/js/dashboard.js - VERSÃO 100% FUNCIONAL

const API_URL = 'http://localhost:3000';

// ===================================
// DADOS DOS BARBEIROS COM FOTOS
// ===================================
const BARBERS_DATA = [
  {
    id: 1,
    name: 'João Silva',
    specialty: 'Cortes Modernos e Degradês',
    experience: '8 anos de experiência',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    description: 'Especialista em cortes modernos, degradês e estilos contemporâneos. Atualizado com as últimas tendências internacionais.'
  },
  {
    id: 2,
    name: 'Pedro Costa',
    specialty: 'Barbas Clássicas e Tradicionais',
    experience: '10 anos de experiência',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    description: 'Mestre em barbas tradicionais, navalha e cortes clássicos. Referência em técnicas tradicionais de barbearia.'
  },
  {
    id: 3,
    name: 'Lucas Ferreira',
    specialty: 'Design Capilar e Estilo Livre',
    experience: '6 anos de experiência',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    description: 'Expert em design capilar personalizado, desenhos e cortes criativos. Especializado em estilos únicos e ousados.'
  }
];

// ===================================
// INICIALIZAÇÃO
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Dashboard inicializando...');
  
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
  checkAuth();
  loadUserInfo();
  loadAppointments();
  loadBarbers();
  loadServicesForForm();
  setupNavigation();
  setupMobileMenu();
  
  const today = new Date().toISOString().split('T')[0];
<<<<<<< HEAD
  const dateInput = document.getElementById('date');
  if (dateInput) {
    dateInput.setAttribute('min', today);
  }
});

function checkAuth() {
  const token = getToken();
  if (!token) {
=======
  document.getElementById('date').setAttribute('min', today);
  
  console.log('✅ Dashboard pronto!');
});

// ===================================
// AUTENTICAÇÃO
// ===================================
function checkAuth() {
  const token = getToken();
  if (!token) {
    console.log('❌ Não autenticado, redirecionando...');
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
    window.location.href = 'index.html';
  }
}

function getToken() {
  return localStorage.getItem('token');
}

function logout() {
  if (confirm('Deseja realmente sair?')) {
    localStorage.clear();
    window.location.href = 'index.html';
  }
}

<<<<<<< HEAD
=======
// ===================================
// NAVEGAÇÃO
// ===================================
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.content-section');
  
  navItems.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      navItems.forEach(function(nav) {
        nav.classList.remove('active');
      });
      
      sections.forEach(function(section) {
        section.classList.remove('active');
      });
      
      item.classList.add('active');
      const sectionId = item.getAttribute('data-section');
      const targetSection = document.getElementById(sectionId + '-section');
      if (targetSection) {
        targetSection.classList.add('active');
      }
      
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        sidebar.classList.remove('active');
      }
    });
  });
}

function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  
  if (!menuBtn || !sidebar) return;
  
  menuBtn.addEventListener('click', function() {
    sidebar.classList.toggle('active');
  });
  
  document.addEventListener('click', function(e) {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  });
}

function loadUserInfo() {
  const userName = localStorage.getItem('userName') || 'Usuário';
  const userEmail = localStorage.getItem('userEmail') || 'usuario@email.com';
  
<<<<<<< HEAD
  const userNameEl = document.getElementById('user-name');
  const userEmailEl = document.getElementById('user-email');
  
  if (userNameEl) userNameEl.textContent = userName;
  if (userEmailEl) userEmailEl.textContent = userEmail;
=======
  document.getElementById('user-name').textContent = userName;
  document.getElementById('user-email').textContent = userEmail;
  
  console.log('👤 Usuário carregado:', userName);
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
}

async function loadAppointments() {
  const token = getToken();
  const grid = document.getElementById('appointments-grid');
  
<<<<<<< HEAD
  if (!grid) return;
  
  grid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando agendamentos...</div>';
  
  try {
    const response = await fetch(API_URL + '/api/agendamentos', {
      headers: { 
        'Authorization': 'Bearer ' + token,
=======
  grid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando agendamentos...</div>';
  
  try {
    console.log('📅 Buscando agendamentos...');
    
    const response = await fetch(`${API_URL}/appointments`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
        'Content-Type': 'application/json'
      }
    });
    
<<<<<<< HEAD
    if (!response.ok) {
      throw new Error('Erro ' + response.status);
    }
    
    const result = await response.json();
    const appointments = result.data || [];
    
    if (!Array.isArray(appointments) || appointments.length === 0) {
      grid.innerHTML = '<div class="empty-state"><i class="fas fa-calendar-times"></i><h3>Nenhum agendamento</h3><p>Você ainda não possui agendamentos. Clique em "Novo Agendamento" para criar um!</p></div>';
=======
    console.log('📡 Status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    
    const appointments = await response.json();
    console.log('📦 Agendamentos recebidos:', appointments);
    
    if (!Array.isArray(appointments) || appointments.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-calendar-times"></i>
          <h3>Nenhum agendamento</h3>
          <p>Você ainda não possui agendamentos. Clique em "Novo Agendamento" para criar um!</p>
        </div>
      `;
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
      return;
    }
    
    grid.innerHTML = '';
    appointments.forEach(function(apt) {
      const card = createAppointmentCard(apt);
      grid.appendChild(card);
    });
    
    console.log(`✅ ${appointments.length} agendamento(s) carregado(s)`);
    
  } catch (error) {
<<<<<<< HEAD
    grid.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Erro ao carregar agendamentos</h3><p>' + error.message + '</p></div>';
=======
    console.error('❌ Erro ao carregar agendamentos:', error);
    grid.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Erro ao carregar agendamentos</h3>
        <p>${error.message}</p>
        <p style="margin-top: 10px; font-size: 14px;">Verifique se o backend está rodando em ${API_URL}</p>
      </div>
    `;
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
  }
}

function createAppointmentCard(apt) {
  const card = document.createElement('div');
  card.className = 'appointment-card';
  
  const date = new Date(apt.dataHora);
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  
<<<<<<< HEAD
  const formattedTime = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
=======
  card.innerHTML = `
    <div class="appointment-status">${apt.status || 'Agendado'}</div>
    <div class="appointment-info">
      <p><i class="fas fa-calendar-day"></i> <strong>${formattedDate}</strong></p>
      <p><i class="fas fa-clock"></i> <strong>${apt.time}</strong></p>
      <p><i class="fas fa-cut"></i> ${apt.service}</p>
      ${apt.barber ? `<p><i class="fas fa-user-tie"></i> ${apt.barber.name || apt.barber}</p>` : ''}
    </div>
    <div class="appointment-actions">
      <button class="btn-delete" onclick="deleteAppointment(${apt.id})">
        <i class="fas fa-trash-alt"></i>
        Cancelar Agendamento
      </button>
    </div>
  `;
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
  
  const statusMap = {
    'PENDENTE': 'Pendente',
    'CONFIRMADO': 'Confirmado',
    'CANCELADO': 'Cancelado',
    'CONCLUIDO': 'Concluído'
  };
  
  let html = '<div class="appointment-status">' + (statusMap[apt.status] || apt.status) + '</div>';
  html += '<div class="appointment-info">';
  html += '<p><i class="fas fa-calendar-day"></i> <strong>' + formattedDate + '</strong></p>';
  html += '<p><i class="fas fa-clock"></i> <strong>' + formattedTime + '</strong></p>';
  html += '<p><i class="fas fa-cut"></i> ' + (apt.servico?.nome || 'Serviço') + '</p>';
  if (apt.barbeiro) {
    html += '<p><i class="fas fa-user-tie"></i> ' + apt.barbeiro.nome + '</p>';
  }
  if (apt.observacao) {
    html += '<p><i class="fas fa-comment"></i> ' + apt.observacao + '</p>';
  }
  html += '</div>';
  html += '<div class="appointment-actions">';
  html += '<button class="btn-delete" onclick="deleteAppointment(\'' + apt.id + '\')">';
  html += '<i class="fas fa-trash-alt"></i> Cancelar Agendamento';
  html += '</button></div>';
  
  card.innerHTML = html;
  return card;
}

async function loadServicesForForm() {
  const token = getToken();
  const serviceSelect = document.getElementById('service');
  const barberSelect = document.getElementById('barber');
  
  if (!serviceSelect || !barberSelect) return;
  
  try {
    const servicesResponse = await fetch(API_URL + '/api/servicos', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    
    const servicesData = await servicesResponse.json();
    const services = servicesData.data || [];
    
    serviceSelect.innerHTML = '<option value="">Escolha o serviço</option>';
    services.forEach(function(service) {
      const option = document.createElement('option');
      option.value = service.id;
      option.textContent = service.nome + ' - R$ ' + Number(service.preco).toFixed(2);
      option.dataset.barberId = service.barbeiroId;
      serviceSelect.appendChild(option);
    });
    
    const usersResponse = await fetch(API_URL + '/api/usuarios', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    
    const usersData = await usersResponse.json();
    const users = usersData.data || [];
    const barbers = users.filter(function(u) {
      return u.tipo === 'BARBEIRO';
    });
    
    barberSelect.innerHTML = '<option value="">Barbeiro será selecionado automaticamente</option>';
    barbers.forEach(function(barber) {
      const option = document.createElement('option');
      option.value = barber.id;
      option.textContent = barber.nome;
      barberSelect.appendChild(option);
    });
    
    serviceSelect.addEventListener('change', function(e) {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const barberId = selectedOption.dataset.barberId;
      
      if (barberId) {
        barberSelect.value = barberId;
      }
    });
    
  } catch (error) {
    console.error('Erro ao carregar serviços:', error);
  }
}

async function createAppointment() {
  const token = getToken();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
<<<<<<< HEAD
  const serviceId = document.getElementById('service').value;
  const barberId = document.getElementById('barber').value;
  
  if (!date || !time || !serviceId || !barberId) {
    showMessage('Preencha todos os campos!', 'error');
=======
  const service = document.getElementById('service').value;
  const barberId = document.getElementById('barber').value;
  const messageEl = document.getElementById('form-message');
  
  if (!date || !time || !service) {
    showMessage('Preencha data, horário e serviço!', 'error');
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
    return;
  }
  
  const submitBtn = document.querySelector('.btn-submit');
<<<<<<< HEAD
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CRIANDO...';
  }
  
  try {
    const dataHora = new Date(date + 'T' + time + ':00').toISOString();
    
    const response = await fetch(API_URL + '/api/agendamentos', {
=======
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CRIANDO...';
  
  try {
    console.log('📅 Criando agendamento...', { date, time, service, barberId });
    
    const body = { 
      date, 
      time, 
      service
    };
    
    // Adicionar barberId apenas se selecionado
    if (barberId) {
      body.barberId = parseInt(barberId);
    }
    
    const response = await fetch(`${API_URL}/appointments`, {
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
<<<<<<< HEAD
      body: JSON.stringify({
        dataHora: dataHora,
        servicoId: serviceId,
        barbeiroId: barberId
      })
    });
    
    const data = await response.json();
=======
      body: JSON.stringify(body)
    });
    
    console.log('📡 Status:', response.status);
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Erro ao criar agendamento');
    }
    
    console.log('✅ Agendamento criado:', data);
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
    
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Erro ao criar agendamento');
    }
    
    showMessage('Agendamento realizado com sucesso!', 'success');
    
    // Limpar form
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('service').value = '';
    document.getElementById('barber').value = '';
    
<<<<<<< HEAD
    setTimeout(function() {
=======
    // Recarregar e voltar
    setTimeout(() => {
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
      loadAppointments();
      const appointmentsNav = document.querySelector('[data-section="appointments"]');
      if (appointmentsNav) appointmentsNav.click();
    }, 2000);
    
  } catch (error) {
<<<<<<< HEAD
    showMessage(error.message, 'error');
=======
    console.error('❌ Erro:', error);
    showMessage(`✗ ${error.message}`, 'error');
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> CONFIRMAR AGENDAMENTO';
    }
  }
}

async function deleteAppointment(id) {
  if (!confirm('Deseja realmente cancelar este agendamento?')) return;
  
  const token = getToken();
  
  try {
<<<<<<< HEAD
    const response = await fetch(API_URL + '/api/agendamentos/' + id, {
      method: 'DELETE',
      headers: { 
        'Authorization': 'Bearer ' + token,
=======
    console.log('🗑️ Deletando agendamento:', id);
    
    const response = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Erro ao deletar');
    }
    
<<<<<<< HEAD
=======
    console.log('✅ Agendamento deletado');
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
    alert('Agendamento cancelado com sucesso!');
    loadAppointments();
    
  } catch (error) {
<<<<<<< HEAD
=======
    console.error('❌ Erro:', error);
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
    alert('Erro ao cancelar: ' + error.message);
  }
}

function showMessage(text, type) {
  const messageEl = document.getElementById('form-message');
  if (!messageEl) return;
  
  messageEl.textContent = text;
  messageEl.className = 'form-message ' + type;
  messageEl.style.display = 'block';
  
  setTimeout(function() {
    messageEl.style.display = 'none';
  }, 5000);
}

<<<<<<< HEAD
=======
// ===================================
// BARBEIROS COM FOTOS
// ===================================
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
function loadBarbers() {
  const grid = document.getElementById('barbers-grid');
  
<<<<<<< HEAD
  if (!grid) {
    console.error('Elemento barbers-grid não encontrado!');
    return;
  }
  
  grid.innerHTML = '';
  
  BARBERS_DATA.forEach(function(barber) {
    const card = document.createElement('div');
    card.className = 'barber-card';
    
    const img = document.createElement('img');
    img.src = barber.image;
    img.alt = barber.name;
    img.className = 'barber-image';
    img.onerror = function() {
      this.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(barber.name) + '&background=D4AF37&color=0A0A0A&size=200&font-size=0.35';
    };
    
    const h3 = document.createElement('h3');
    h3.textContent = barber.name;
    
    const pSpecialty = document.createElement('p');
    pSpecialty.className = 'barber-specialty';
    pSpecialty.textContent = barber.specialty;
    
    const pExperience = document.createElement('p');
    pExperience.className = 'barber-experience';
    pExperience.textContent = barber.experience;
    
    const divRating = document.createElement('div');
    divRating.className = 'barber-rating';
    divRating.innerHTML = '<i class="fas fa-star"></i><span>' + barber.rating + '</span>';
    
    const pDescription = document.createElement('p');
    pDescription.className = 'barber-description';
    pDescription.textContent = barber.description;
    
    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(pSpecialty);
    card.appendChild(pExperience);
    card.appendChild(divRating);
    card.appendChild(pDescription);
    
    grid.appendChild(card);
  });
=======
  console.log('💈 Carregando barbeiros...');
  
  // Preencher grid com fotos
  grid.innerHTML = '';
  BARBERS_DATA.forEach(barber => {
    const card = document.createElement('div');
    card.className = 'barber-card';
    
    card.innerHTML = `
      <img 
        src="${barber.image}" 
        alt="${barber.name}" 
        class="barber-image"
        onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(barber.name)}&background=D4AF37&color=0A0A0A&size=200'"
      >
      <h3>${barber.name}</h3>
      <p class="barber-specialty">${barber.specialty}</p>
      <p class="barber-experience">${barber.experience}</p>
      <div class="barber-rating">
        <i class="fas fa-star"></i>
        <span>${barber.rating}</span>
      </div>
      <p class="barber-description">${barber.description}</p>
    `;
    
    grid.appendChild(card);
  });
  
  // Preencher select
  BARBERS_DATA.forEach(barber => {
    const option = document.createElement('option');
    option.value = barber.id;
    option.textContent = `${barber.name} - ${barber.specialty}`;
    selectBarber.appendChild(option);
  });
  
  console.log(`✅ ${BARBERS_DATA.length} barbeiros carregados`);
>>>>>>> 361e8daa50c65efae7838f4726476b34156605f5
}