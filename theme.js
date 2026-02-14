// theme.js — Añade un botón flotante que alterna el tema gótico y lo persiste en localStorage
(function() {
  const KEY = 'modo_tema_activo'; // Cambiamos la key para soportar 3 estados
  const GOTHIC_HREF = 'gothic.css';
  const BTN_ID = 'theme-toggle-button';

  // Modos disponibles: 'normal', 'gothic'
  function getMode() {
    // Migración de compatibilidad para no perder tu configuración anterior
    if (localStorage.getItem('tema_gotico_activo') === '1') {
      localStorage.removeItem('tema_gotico_activo');
      localStorage.setItem(KEY, 'gothic');
      return 'gothic';
    }
    const mode = localStorage.getItem(KEY);
    // Si estaba en custom, volver a normal
    return (mode === 'custom' || !mode) ? 'normal' : mode;
  }

  function setMode(mode) {
    localStorage.setItem(KEY, mode);
  }

  function addLink() {
    if (document.getElementById('gothic-stylesheet')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = GOTHIC_HREF;
    link.id = 'gothic-stylesheet';
    document.head.appendChild(link);
  }

  function removeLink() {
    const existing = document.getElementById('gothic-stylesheet');
    if (existing) existing.remove();
  }

  function applyTheme(mode) {
    // 1. Tema Gótico
    if (mode === 'gothic') addLink();
    else removeLink();

    // Limpieza de elementos de la versión personalizada (si existen)
    const customStyle = document.getElementById('custom-theme-style');
    if (customStyle) customStyle.remove();
    const editBtn = document.getElementById('theme-edit-button');
    if (editBtn) editBtn.remove();
  }

  function createButton() {
    if (document.getElementById(BTN_ID)) return document.getElementById(BTN_ID);
    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.title = 'Activar tema gótico';
    btn.setAttribute('aria-label', 'Toggle tema gótico');
    btn.innerText = 'Tema Normal';
    
    // Intentar encontrar el header para colocar el botón
    const headerContainer = document.querySelector('.header-app .container');
    
    // Estilos base
    Object.assign(btn.style, {
      cursor: 'pointer',
      fontSize: '20px',
      borderRadius: '6px', /* Bordes redondeados de botón normal */
      padding: '5px 12px',
      width: 'auto',
      height: 'auto',
      border: 'none',
      background: 'transparent'
    });

    if (headerContainer) {
      // Si existe el header, lo integramos en el flujo normal (no sobrepuesto)
      Object.assign(btn.style, {
        float: 'right',       // Alinear a la derecha
        position: 'static',   // Posición normal en el flujo
        marginTop: '15px',    // Ajuste vertical aproximado
        background: 'rgba(0, 0, 0, 0.2)', // Fondo sutil
        border: '1px solid rgba(139, 22, 34, 0.4)',
        transform: 'none'
      });
      // Insertar al principio para que el float funcione bien
      headerContainer.insertBefore(btn, headerContainer.firstChild);
    } else {
      // Fallback: Si no encuentra el header, lo pone flotante abajo
      Object.assign(btn.style, {
        position: 'fixed',
        right: '18px',
        bottom: '18px',
        zIndex: 9999,
        background: '#1b0a0d',
        border: '1px solid #8b1622',
        color: '#e6dcdc'
      });
      document.body.appendChild(btn);
    }

    btn.addEventListener('click', function() {
      // Ciclo de 2 pasos: Normal <-> Gótico
      const current = getMode();
      const next = current === 'gothic' ? 'normal' : 'gothic';
      
      setMode(next);
      applyTheme(next);
      updateButtonState(next);
    });

    return btn;
  }

  function updateButtonState(mode) {
    const btn = document.getElementById(BTN_ID);
    if (!btn) return;
    
    if (mode === 'normal') {
      btn.innerText = 'Tema Normal';
    } else if (mode === 'gothic') {
      btn.innerText = 'Tema Oscuro';
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    const mode = getMode();
    applyTheme(mode);
    createButton();
    updateButtonState(mode);
  });
})();
