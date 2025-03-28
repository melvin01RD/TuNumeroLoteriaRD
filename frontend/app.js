


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