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

  // Mapeo de rutas correctas según backend Flask
  const rutasLoterias = {
    nacional: '/nacional',
    leidsa: '/leidsa',
    loteka: '/loteria-loteka', // esta es la ruta en Flask
    real: '/real',
    suerte: '/loteria-la-suerte' // esta es la ruta en Flask
  };

  // Función para obtener los resultados desde el backend
  const obtenerResultados = async (ruta, loteria) => {
    try {
      const response = await fetch(`http://localhost:3000${ruta}`);
      const data = await response.json();
      mostrarResultados(data, loteria);
    } catch (error) {
      console.error(`Error al obtener los datos de ${loteria}:`, error);
    }
  };

  // Función para mostrar los resultados en las tarjetas
  const mostrarResultados = (data, loteria) => {
    const fechaElemento = document.getElementById(`fecha-${loteria}`);
    const resultadosElemento = document.getElementById(`resultados-${loteria}`);
    if (data && data.resultados && data.resultados.length > 0) {
      const { fecha, resultados } = data;
      if (fechaElemento) fechaElemento.textContent = fecha;

      resultados.forEach((item, index) => {
        if (index === 0) document.getElementById(`primer-${loteria}`).textContent = item;
        else if (index === 1) document.getElementById(`segundo-${loteria}`).textContent = item;
        else if (index === 2) document.getElementById(`tercer-${loteria}`).textContent = item;
      });
    } else {
      console.warn(`No se encontraron resultados para ${loteria}`);
    }
  };

  // Obtener resultados para cada lotería
  for (const [loteria, ruta] of Object.entries(rutasLoterias)) {
    obtenerResultados(ruta, loteria);
  }
});

