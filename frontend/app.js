<<<<<<< HEAD
// ===============================
// CARGAR RESULTADOS DESDE API
// ===============================
/*fetch('/api/loteria')
    .then(response => response.json())
    .then(data => {
        console.log(data.resultados); // Puedes mostrarlo dinámicamente más adelante
        // Aquí podrías hacer render dinámico en el DOM
    })
    .catch(error => console.error('Error:', error));

*/

// ===============================
// LÓGICA DE MODO OSCURO
// ===============================
const toggleButton = document.getElementById('toggleDarkMode');

if (toggleButton) {
    // Verificar modo guardado
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleButton.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    } else {
        document.body.classList.remove('dark-mode');
        toggleButton.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
    }

    // Evento click
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        const isDark = document.body.classList.contains('dark-mode');

        toggleButton.innerHTML = isDark
            ? '<i class="fas fa-sun"></i> Modo Claro'
            : '<i class="fas fa-moon"></i> Modo Oscuro';

        localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
    });
}

console.log("Cargando toggle...");

if (toggleButton) {
  console.log("Botón encontrado");
  toggleButton.addEventListener("click", () => {
    console.log("Toggle clickeado");
    // resto del código...
  });
} else {
  console.warn("No se encontró el botón toggle");
}

=======



fetch('/api/loteria')
    .then(response => response.json())
    .then(data => {
        console.log(data.resultados); // Mostrar los resultados en la consola
        // Aquí puedes actualizar el DOM con los datos
    })
    .catch(error => console.error('Error:', error));



// Selecciona el botón de alternar modo oscuro
const toggleButton = document.getElementById('toggle-dark-mode');

// Verifica si el usuario ya tiene una preferencia guardada
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    toggleButton.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
} else {
    document.body.classList.remove('dark-mode');
    toggleButton.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
}

// Alternar modo oscuro/claro
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Cambiar el texto del botón y guardar la preferencia
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        toggleButton.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
        localStorage.setItem('dark-mode', 'disabled');
    }
});
>>>>>>> b50d5c47afec51bef442eb14bfd865a0f8a0093c
