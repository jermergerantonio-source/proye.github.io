/**
 * SISTEMA DE CLASIFICACIÓN AUTOMÁTICA DE OBJETOS
 * Clasificador ambiental basado en huella hídrica y necesidad
 * 
 * Objetivo: Evaluar objetos por su impacto ambiental y necesidad
 * para proporcionar educación sobre consumo responsable



// 1. TABLA DE NECESIDAD DE OBJETOS

/**
 * Niveles de necesidad:
 * 1 = No esencial (consumo por gusto,impulso,etc)
 * 2 = Útil (funcional pero reemplazable o cambiable)
 * 3 = Necesario (esencial para vivir,estudiar,trabajar,etc)
 */
const tblNecesidad = {
  refresco: 1,
  lata: 1,
  agua: 3,
  cafe: 1,
  energia: 1,
  cerveza: 1,
  cable: 2,
  audifonos: 2,
  cargador: 2,
  powerbank: 2,
  celular: 3,
  tablet: 2,
  laptop: 3,
  monitor: 2,
  consola: 1,
  lapiz: 3,
  pluma: 3,
  marcador: 2,
  libreta: 3,
  cuaderno: 3,
  hoja: 3,
  paquete: 3,
  folder: 2,
  carpeta: 2,
  mochila: 3,
  calculadora: 2,
  cartucho: 2,
  toner: 2,
  libro: 3,
  playera: 3,
  camisa: 3,
  sudadera: 3,
  jeans: 3,
  vestido: 3,
  ropaInterior: 3,
  calcetines: 3,
  tenis: 3,
  chamarra: 3,
  toalla: 3,
  sabana: 3,
  cobija: 3,
  uniforme: 3,
  traje: 2
};


// 2. CONFIGURACIÓN DE REGLAS DE CLASIFICACIÓN

/**
 * Tabla de decisión que combina:
 * - Impacto hídrico (bajo, medio, alto)
 * - Nivel de necesidad (no esencial, útil, necesario)
 * 
 * Retorna: { categoria, prioridad }
 */
const reglasCsaificacion = {
  // Impacto alto + Necesidad baja = Consumo innecesario
  'alto-1': {
    categoria: 'consumo innecesario',
    prioridad: 'crítica'
  },
  'alto-2': {
    categoria: 'consumo innecesario',
    prioridad: 'alta'
  },

  // Impacto medio + Necesidad baja = Uso moderado
  'medio-1': {
    categoria: 'uso moderado',
    prioridad: 'alta'
  },

  // Impacto bajo + Necesidad baja = Uso moderado
  'bajo-1': {
    categoria: 'uso moderado',
    prioridad: 'media'
  },

  // Impacto medio + Necesidad media = Uso moderado
  'medio-2': {
    categoria: 'uso moderado',
    prioridad: 'media'
  },

  // Impacto bajo + Necesidad media = Uso moderado
  'bajo-2': {
    categoria: 'uso moderado',
    prioridad: 'media'
  },

  // Impacto alto + Necesidad media = Uso responsable
  'alto-3': {
    categoria: 'uso responsable',
    prioridad: 'media'
  },

  // Impacto medio + Necesidad alta = Uso responsable
  'medio-3': {
    categoria: 'uso responsable',
    prioridad: 'media'
  },

  // Impacto bajo + Necesidad alta = Uso responsable
  'bajo-3': {
    categoria: 'uso responsable',
    prioridad: 'baja'
  },

  // Impacto alto + Necesidad alta = Uso responsable
  'alto-3-especial': {
    categoria: 'uso responsable',
    prioridad: 'crítica'
  }
};


// 3. COMPARATIVAS Y EQUIVALENCIAS

/**
 * Equivalencias para hacer el mensaje más educativo
 * Compara litros de agua con objetos conocidos
 */
const equivalencias = {
  5: 'media taza de café',
  10: 'una taza de café',
  50: 'una botella de refresco',
  100: 'una manguera de 10 minutos',
  250: 'un refresco grande',
  500: 'una manguera de 50 minutos',
  1000: 'una tina de baño llena',
  3000: 'tres tinas de baño',
  5000: 'cinco tinas de baño',
  10000: 'diez tinas de baño',
  20000: 'veinte tinas de baño'
};


// 3.1. ALTERNATIVAS ECOLÓGICAS Y SUGERENCIAS DE CONSUMO
/**
 * Sugerencias directas para sustituir o mejorar el consumo
 */
const alternativasEco = {
  refresco: 'agua natural con frutas o infusiones caseras',
  lata: 'envases retornables o vidrio',
  agua: 'un filtro en casa y llevar tu propio termo',
  cafe: 'prepararlo en casa y usar taza reutilizable',
  energia: 'bebidas naturales o dormir mejor para recuperar energía real',
  cerveza: 'cerveza de barril o envases retornables',
  cable: 'cuidar los conectores y enrollarlos suavemente',
  audifonos: 'limpiarlos regularmente y guardarlos en estuche',
  cargador: 'desconectarlo cuando no esté en uso',
  powerbank: 'baterías recargables de alta calidad',
  celular: 'reparar tu equipo actual o cambiar solo la batería',
  tablet: 'usarla para lectura en lugar de imprimir documentos',
  laptop: 'realizar mantenimiento preventivo y limpieza de ventiladores',
  monitor: 'ajustar el brillo para ahorrar energía',
  consola: 'apagarla completamente en lugar de dejarla en reposo',
  lapiz: 'lápices de madera certificada o portaminas recargable',
  pluma: 'plumas recargables o de material reciclado',
  marcador: 'marcadores recargables',
  libreta: 'usar el reverso de hojas usadas',
  cuaderno: 'cuadernos de papel reciclado o digitalizar notas',
  hoja: 'usar papel reciclado y digitalizar notas',
  paquete: 'comprar a granel para reducir empaques',
  folder: 'reutilizar carpetas viejas con nuevas etiquetas',
  carpeta: 'organizadores digitales en la nube',
  mochila: 'reparar cierres y costuras antes de comprar una nueva',
  calculadora: 'usar la app del celular o solar',
  cartucho: 'rellenar cartuchos de tinta',
  toner: 'usar modo borrador y tipografías ecológicas',
  libro: 'bibliotecas, libros digitales o intercambio',
  playera: 'algodón orgánico o comprar de segunda mano',
  camisa: 'lavar con agua fría y secar al aire',
  sudadera: 'fibras recicladas y lavado poco frecuente',
  jeans: 'lavarlos con menos frecuencia (cada 5-10 usos)',
  vestido: 'intercambio de ropa o moda circular',
  ropaInterior: 'materiales naturales como bambú o algodón',
  calcetines: 'zurcir agujeros pequeños en lugar de tirar',
  tenis: 'limpiarlos a mano y reparar suelas',
  chamarra: 'donar si ya no la usas o reparar cierres',
  toalla: 'secarla al sol para usarla más veces',
  sabana: 'lavar con carga completa en la lavadora',
  cobija: 'usar ropa abrigadora en casa para bajar la calefacción',
  uniforme: 'heredar a hermanos menores o donar a la escuela',
  traje: 'limpieza en seco solo cuando sea estrictamente necesario',
  botella: 'un termo de acero inoxidable',
  carne: 'opciones vegetales un par de días a la semana'
};

// 4. FUNCIONES AUXILIARES
/**
 * Calcula el nivel de impacto basado en litros
 * @param {number} litros - Cantidad de agua en litros
 * @returns {string} - 'bajo', 'medio' o 'alto'
 */
function calcularImpacto(litros) {
  if (litros <= 100) return 'bajo';
  if (litros <= 1000) return 'medio';
  return 'alto';
}

/**
 * Obtiene el nivel de necesidad de un objeto
 * @param {string} objeto - Nombre del objeto
 * @returns {number} - Nivel de necesidad (1, 2 o 3)
 */
function obtenerNecesidad(objeto) {
  return tblNecesidad[objeto] || 2; // Default: útil
}

/**
 * Convierte número de necesidad a texto legible
 * @param {number} nivel - Nivel de necesidad (1, 2 o 3)
 * @returns {string} - Descripción legible
 */
function nivelATexto(nivel) {
  const textos = {
    1: 'no esencial',
    2: 'útil',
    3: 'necesario'
  };
  return textos[nivel] || 'desconocido';
}

/**
 * Encuentra la equivalencia más cercana
 * @param {number} litros - Cantidad de litros
 * @returns {string} - Equivalencia descriptiva
 */
function encontrarEquivalencia(litros) {
  const claves = Object.keys(equivalencias)
    .map(Number)
    .sort((a, b) => Math.abs(a - litros) - Math.abs(b - litros));
  
  return equivalencias[claves[0]] || 'cierta cantidad de agua';
}

/**
 * Clasifica un objeto según impacto y necesidad
 * @param {string} objeto - Nombre del objeto
 * @param {number} litros - Litros de agua
 * @returns {object} - Objeto con categoria y prioridad
 */
function aplicarRegla(objeto, litros) {
  const necesidad = obtenerNecesidad(objeto);
  const impacto = calcularImpacto(litros);
  
  // Caso especial: alto impacto con alta necesidad
  if (impacto === 'alto' && necesidad === 3 && litros > 10000) {
    return reglasCsaificacion['alto-3-especial'];
  }
  
  const clave = `${impacto}-${necesidad}`;
  return reglasCsaificacion[clave] || {
    categoria: 'uso moderado',
    prioridad: 'media'
  };
}

// 5. GENERADOR DE MENSAJES EDUCATIVOS


/**
 * Genera un mensaje explicativo según la categoría
 * @param {object} datos - Objeto con información de clasificación
 * @returns {string} - Mensaje educativo
 */
function generarMensaje(datos) {
  const {
    nombre,
    litros,
    impacto,
    necesidad,
    categoria
  } = datos;

  const equivalencia = encontrarEquivalencia(litros);
  const nivelTxt = nivelATexto(necesidad);
  let mensaje = '';


  const recomendaciones = {
    'consumo innecesario': 
      `Este producto no es esencial. Considera reducir su consumo o buscar alternativas más sostenibles.\nCada compra evitada ahorraría agua significativamente.`,
    'uso moderado': 
      `Úsalo de forma consciente y responsable. Intenta alargar su vida útil al máximo.\nCuida el producto para evitar reemplazos innecesarios.`,
    'uso responsable': 
      `Es un producto necesario para tu vida diaria. Cuídalo bien y úsalo frecuentemente.\nExtender su vida útil es la mejor forma de reducir el impacto ambiental.`
  };

  // Construcción del mensaje unificado
  const titulo = categoria.toUpperCase();
  const infoProducto = `${nombre.charAt(0).toUpperCase() + nombre.slice(1)} requiere ${litros.toLocaleString()} litros de agua para producirse.`;
  const infoEquivalencia = `Equivalente a ${equivalencia}.`;
  const recomendacion = recomendaciones[categoria] || 'Considera el impacto hídrico de este objeto.';
  
  // Agregar tip ecológico si existe para este producto
  const tip = alternativasEco[nombre];
  const textoTip = tip ? `\n\n TIP INTELIGENTE:\nPrueba cambiarlo por ${tip} para reducir tu huella.` : '';

  return `${titulo}\n\n${infoProducto}\n${infoEquivalencia}\n\nRECOMENDACION:\n${recomendacion}${textoTip}`;
}


// 6. FUNCIÓN PRINCIPAL DE CLASIFICACIÓN

/**
 * Clasifica automáticamente un objeto completo
 * @param {string} nombreObjeto - Nombre del objeto (clave en datos)
 * @param {number} litros - Litros de agua necesarios
 * @returns {object} - Estructura de clasificación completa
 */
function clasificarObjeto(nombreObjeto, litros) {
  // Validar entrada
  if (!nombreObjeto || typeof litros !== 'number' || litros < 0) {
    return {
      error: 'Datos inválidos',
      nombre: nombreObjeto,
      litros: litros
    };
  }

  // Calcular componentes
  const necesidad = obtenerNecesidad(nombreObjeto);
  const impacto = calcularImpacto(litros);
  const regla = aplicarRegla(nombreObjeto, litros);

  // Construir resultado
  const resultado = {
    nombre: nombreObjeto,
    litros: litros,
    impacto: impacto,
    necesidad: nivelATexto(necesidad),
    categoria: regla.categoria,
    prioridad: regla.prioridad,
    explicacion: generarMensaje({
      nombre: nombreObjeto,
      litros: litros,
      impacto: impacto,
      necesidad: necesidad,
      categoria: regla.categoria
    })
  };

  return resultado;
}

/**
 * Clasifica múltiples objetos
 * @param {object} listaObjetos - { nombre: litros }
 * @returns {array} - Array de clasificaciones
 */
function clasificarMultiples(listaObjetos) {
  return Object.entries(listaObjetos).map(([nombre, litros]) => 
    clasificarObjeto(nombre, litros)
  );
}

/**
 * Obtiene estadísticas de categorías
 * @param {array} clasificaciones - Array de resultados de clasificación
 * @returns {object} - Conteo por categoría
 */
function obtenerEstadisticas(clasificaciones) {
  const stats = {
    'consumo innecesario': 0,
    'uso moderado': 0,
    'uso responsable': 0
  };

  clasificaciones.forEach(item => {
    if (item.categoria) {
      stats[item.categoria]++;
    }
  });

  return stats;
}
