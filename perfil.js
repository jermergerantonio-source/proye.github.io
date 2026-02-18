let chartProductos = null;
let chartCategorias = null;

// Configuración centralizada de categorías para los gráficos
const MAPA_CATEGORIAS = {
  refresco: 'Bebidas', lata: 'Bebidas', agua: 'Bebidas', cafe: 'Bebidas', energia: 'Bebidas', cerveza: 'Bebidas',
  cable: 'Electrónica', audifonos: 'Electrónica', cargador: 'Electrónica', powerbank: 'Electrónica',
  celular: 'Electrónica', tablet: 'Electrónica', laptop: 'Electrónica', monitor: 'Electrónica', consola: 'Electrónica',
  lapiz: 'Escolares', pluma: 'Escolares', marcador: 'Escolares', libreta: 'Escolares', cuaderno: 'Escolares',
  hoja: 'Escolares', paquete: 'Escolares', folder: 'Escolares', carpeta: 'Escolares', mochila: 'Escolares',
  calculadora: 'Escolares', cartucho: 'Escolares', toner: 'Escolares', libro: 'Escolares',
  playera: 'Ropa', camisa: 'Ropa', sudadera: 'Ropa', jeans: 'Ropa', vestido: 'Ropa',
  ropaInterior: 'Ropa', calcetines: 'Ropa', tenis: 'Ropa', chamarra: 'Ropa', toalla: 'Ropa',
  sabana: 'Ropa', cobija: 'Ropa', uniforme: 'Ropa', traje: 'Ropa'
};

// Verificar sesión y cargar datos
window.addEventListener('DOMContentLoaded', function() {
  const sesionActiva = localStorage.getItem('usuarioActivo');
  if (!sesionActiva) {
    window.location.href = 'login.html';
    return;
  }
  
  const usuario = JSON.parse(sesionActiva);
  const usuarioData = obtenerDatosUsuario(usuario.username);
  
  // Cargar información del usuario
  document.getElementById('nombreUsuario').textContent = usuario.username;
  document.getElementById('fechaLogin').textContent = 'Sesión iniciada: ' + usuario.fechaLogin;
  document.getElementById('fechaRegistro').textContent = 'Miembro desde: ' + usuarioData.fechaRegistro;
  
  // Cargar foto de perfil
  const fotoGuardada = usuarioData.fotoPerfil;
  if (fotoGuardada) {
    document.getElementById('fotoPerfil').src = fotoGuardada;
  }
  
  // Cargar estadísticas
  actualizarEstadisticas(usuarioData);
  
  // Configurar evento de upload de foto
  document.getElementById('uploadFoto').addEventListener('change', cargarFoto);
});

function obtenerDatosUsuario(username) {
  let usuarioData = JSON.parse(localStorage.getItem('usuarioData_' + username));
  if (!usuarioData) {
    usuarioData = {
      username: username,
      fotoPerfil: null,
      fechaRegistro: new Date().toLocaleString(),
      historial: [],
      estadisticas: {
        totalBusquedas: 0,
        productosConteo: {},
        totalLitros: 0
      }
    };
    localStorage.setItem('usuarioData_' + username, JSON.stringify(usuarioData));
  }
  return usuarioData;
}

function guardarDatosUsuario(username, datos) {
  localStorage.setItem('usuarioData_' + username, JSON.stringify(datos));
}

function cargarFoto() {
  const file = document.getElementById('uploadFoto').files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const fotoBase64 = e.target.result;
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
    const usuarioData = obtenerDatosUsuario(usuario.username);
    
    usuarioData.fotoPerfil = fotoBase64;
    guardarDatosUsuario(usuario.username, usuarioData);
    
    document.getElementById('fotoPerfil').src = fotoBase64;
  };
  reader.readAsDataURL(file);
}

function actualizarEstadisticas(usuarioData) {
  const stats = usuarioData.estadisticas;
  
  // Actualizar números
  document.getElementById('totalBusquedas').textContent = stats.totalBusquedas;
  document.getElementById('totalLitros').textContent = stats.totalLitros.toLocaleString();
  
  const promedio = stats.totalBusquedas > 0 ? (stats.totalLitros / stats.totalBusquedas).toFixed(0) : 0;
  document.getElementById('promediaLitros').textContent = promedio;
  
  // Producto más buscado
  let productoMasBuscado = '-';
  let maxBusquedas = 0;
  for (let [producto, cantidad] of Object.entries(stats.productosConteo)) {
    if (cantidad > maxBusquedas) {
      maxBusquedas = cantidad;
      productoMasBuscado = producto;
    }
  }
  document.getElementById('productoMasBuscado').textContent = productoMasBuscado;
  
  // Dibujar gráficos
  dibujarGraficos(usuarioData);
}

function dibujarGraficos(usuarioData) {
  const stats = usuarioData.estadisticas;
  
  // Gráfico 1: Top 5 productos
  const productosOrdenados = Object.entries(stats.productosConteo)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  const nombresProductos = productosOrdenados.map(p => p[0]);
  const cantidadesProductos = productosOrdenados.map(p => p[1]);
  
  const ctxProductos = document.getElementById('chartProductos').getContext('2d');
  
  if (chartProductos) {
    chartProductos.destroy();
  }
  
  chartProductos = new Chart(ctxProductos, {
    type: 'bar',
    data: {
      labels: nombresProductos.length > 0 ? nombresProductos : ['Sin datos'],
      datasets: [{
        label: 'Búsquedas',
        data: cantidadesProductos.length > 0 ? cantidadesProductos : [0],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(244, 208, 63, 0.8)',
          'rgba(76, 175, 80, 0.8)',
          'rgba(255, 107, 107, 0.8)'
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(118, 75, 162, 1)',
          'rgba(244, 208, 63, 1)',
          'rgba(76, 175, 80, 1)',
          'rgba(255, 107, 107, 1)'
        ],
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
  
  // Gráfico 2: Categorías (simulado)
  const categorias = {
    'Bebidas': 0,
    'Electrónica': 0,
    'Escolares': 0,
    'Ropa': 0
  };
  
  for (let [producto, cantidad] of Object.entries(stats.productosConteo)) {
    const categoria = MAPA_CATEGORIAS[producto] || 'Otros';
    if (categoria in categorias) {
      categorias[categoria] += cantidad;
    }
  }
  
  const ctxCategorias = document.getElementById('chartCategorias').getContext('2d');
  
  if (chartCategorias) {
    chartCategorias.destroy();
  }
  
  chartCategorias = new Chart(ctxCategorias, {
    type: 'doughnut',
    data: {
      labels: Object.keys(categorias),
      datasets: [{
        data: Object.values(categorias),
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(244, 208, 63, 0.8)',
          'rgba(76, 175, 80, 0.8)'
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(118, 75, 162, 1)',
          'rgba(244, 208, 63, 1)',
          'rgba(76, 175, 80, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function limpiarHistorial() {
  if (confirm('¿Estás seguro de que deseas limpiar todo el historial? Esta acción no se puede deshacer.')) {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
    const usuarioData = obtenerDatosUsuario(usuario.username);
    
    usuarioData.estadisticas = {
      totalBusquedas: 0,
      productosConteo: {},
      totalLitros: 0
    };
    usuarioData.historial = [];
    
    guardarDatosUsuario(usuario.username, usuarioData);
    
    // Recargar la página
    window.location.reload();
  }
}

function cerrarSesion() {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    localStorage.removeItem('usuarioActivo');
    window.location.href = 'login.html';
  }
}

function irAlCalculador() {
  window.location.href = 'index.html';
}
