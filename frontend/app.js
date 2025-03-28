
document.addEventListener('DOMContentLoaded', () => {
  
  // Toggle Dark Mode
 
  const toggleButton = document.getElementById('toggleDarkMode');

  if (!toggleButton) {
    console.warn("No se encontró el botón toggle");
    return;
  }

  function aplicarModo(modo) {
    if (modo === 'enabled') {
      document.body.classList.add('dark-mode');
      toggleButton.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    } else {
      document.body.classList.remove('dark-mode');
      toggleButton.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
    }
  }

  const estadoGuardado = localStorage.getItem('dark-mode') || 'disabled';
  aplicarModo(estadoGuardado);

  toggleButton.addEventListener('click', () => {
    const modoActual = document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled';
    const nuevoModo = modoActual === 'enabled' ? 'disabled' : 'enabled';
    localStorage.setItem('dark-mode', nuevoModo);
    aplicarModo(nuevoModo);
  });

  // Enlace dinámico al Home

  const homeLink = document.getElementById("homeLink");

  if (homeLink) {
    const isInPages = window.location.pathname.includes("/pages/");
    const homePath = isInPages ? "../index.html" : "index.html";
    homeLink.setAttribute("href", homePath);
  }

 
  // Fecha dinámica frontend
 
  const hoy = new Date();
  const fechaFormateada = hoy.toLocaleDateString('es-DO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  document.querySelectorAll(".fecha-loteria").forEach(el => {
    el.textContent = fechaFormateada;
  });
});
