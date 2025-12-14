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
  checkAuth();
  loadUserInfo();
  loadAppointments();
  loadBarbers();
  loadServicesForForm();
  setupNavigation();
  setupMobileMenu();
  
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('date');
  if (dateInput) {
    dateInput.setAttribute('min', today);
  }
});

function checkAuth() {
  const token = getToken();
  if (!token) {
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
  
  const userNameEl = document.getElementById('user-name');
  const userEmailEl = document.getElementById('user-email');
  
  if (userNameEl) userNameEl.textContent = userName;
  if (userEmailEl) userEmailEl.textContent = userEmail;
}

async function loadAppointments() {
  const token = getToken();
  const grid = document.getElementById('appointments-grid');
  
  if (!grid) return;
  
  grid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Carregando agendamentos...</div>';
  
  try {
    const response = await fetch(API_URL + '/api/agendamentos', {
      headers: { 
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Erro ' + response.status);
    }
    
    const result = await response.json();
    const appointments = result.data || [];
    
    if (!Array.isArray(appointments) || appointments.length === 0) {
      grid.innerHTML = '<div class="empty-state"><i class="fas fa-calendar-times"></i><h3>Nenhum agendamento</h3><p>Você ainda não possui agendamentos. Clique em "Novo Agendamento" para criar um!</p></div>';
      return;
    }
    
    grid.innerHTML = '';
    appointments.forEach(function(apt) {
      const card = createAppointmentCard(apt);
      grid.appendChild(card);
    });
    
  } catch (error) {
    grid.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Erro ao carregar agendamentos</h3><p>' + error.message + '</p></div>';
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
  
  const formattedTime = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
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
  const serviceId = document.getElementById('service').value;
  const barberId = document.getElementById('barber').value;
  
  if (!date || !time || !serviceId || !barberId) {
    showMessage('Preencha todos os campos!', 'error');
    return;
  }
  
  const submitBtn = document.querySelector('.btn-submit');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CRIANDO...';
  }
  
  try {
    const dataHora = new Date(date + 'T' + time + ':00').toISOString();
    
    const response = await fetch(API_URL + '/api/agendamentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        dataHora: dataHora,
        servicoId: serviceId,
        barbeiroId: barberId
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Erro ao criar agendamento');
    }
    
    showMessage('Agendamento realizado com sucesso!', 'success');
    
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('service').value = '';
    document.getElementById('barber').value = '';
    
    setTimeout(function() {
      loadAppointments();
      const appointmentsNav = document.querySelector('[data-section="appointments"]');
      if (appointmentsNav) appointmentsNav.click();
    }, 2000);
    
  } catch (error) {
    showMessage(error.message, 'error');
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
    const response = await fetch(API_URL + '/api/agendamentos/' + id, {
      method: 'DELETE',
      headers: { 
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Erro ao deletar');
    }
    
    alert('Agendamento cancelado com sucesso!');
    loadAppointments();
    
  } catch (error) {
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

function loadBarbers() {
  const grid = document.getElementById('barbers-grid');
  
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
}