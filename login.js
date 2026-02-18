//Verificar si el usuario ya tiene sesión activa
window.addEventListener('DOMContentLoaded', function() {
  const sesionActiva = localStorage.getItem('usuarioActivo');
  if (sesionActiva) {
    window.location.href = 'index.html';
  }
});

//Manejar el formulario de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const mensaje = document.getElementById('mensaje');

  //Validaciones básicas
  if (!username || !password) {
    mostrarMensaje('Por favor completa todos los campos', 'error');
    return;
  }

  if (username.length < 3) {
    mostrarMensaje('El nombre debe tener al menos 3 caracteres', 'error');
    return;
  }

  if (password.length < 8) {
    mostrarMensaje('La contraseña debe tener al menos 8 caracteres', 'error');
    return;
  }

  //Obtener usuarios guardados o crear array vacío
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  //Buscar si el usuario ya existe
  const usuarioExistente = usuarios.find(u => u.username === username);

  if (usuarioExistente) {
    // Usuario existe - verificar contraseña
    if (usuarioExistente.password === password) {
      // Contraseña correcta
      localStorage.setItem('usuarioActivo', JSON.stringify({
        username: username,
        fechaLogin: new Date().toLocaleString()
      }));
      mostrarMensaje('Sesión iniciada correctamente', 'exito');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } else {
      //Contraseña incorrecta
      mostrarMensaje('Contraseña incorrecta', 'error');
    }
  } else {
    //Usuario nuevo - crear cuenta
    usuarios.push({
      username: username,
      password: password,
      fechaRegistro: new Date().toLocaleString()
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    //Iniciar sesión automáticamente
    localStorage.setItem('usuarioActivo', JSON.stringify({
      username: username,
      fechaLogin: new Date().toLocaleString()
    }));
    mostrarMensaje('Cuenta creada e sesión iniciada', 'exito');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
});

function mostrarMensaje(texto, tipo) {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = texto;
  mensaje.className = 'mensaje ' + tipo;
  
  if (tipo === 'exito') {
    setTimeout(() => {
      mensaje.textContent = '';
      mensaje.className = 'mensaje';
    }, 2000);
  }
}
