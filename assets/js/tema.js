(() => {
  'use strict';

  const root = document.documentElement;
  const key = 'thiago-theme';
  const legacyKey = 'thiago-links-theme';
  const themes = ['escuro', 'claro'];
  let currentTheme = 'escuro';

  function readPreference() {
    try {
      const saved = localStorage.getItem(key);
      const legacy = localStorage.getItem(legacyKey);
      return themes.includes(saved) ? saved : themes.includes(legacy) ? legacy : 'escuro';
    } catch {
      return 'escuro';
    }
  }

  function updateControls() {
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      const selected = button.dataset.themeChoice === currentTheme;
      button.setAttribute('aria-checked', String(selected));
      button.setAttribute('aria-label', button.dataset.themeChoice === 'claro' ? 'Tema claro' : 'Tema escuro');
      button.tabIndex = selected ? 0 : -1;
    });
  }

  function applyTheme(value, persist = false) {
    currentTheme = themes.includes(value) ? value : 'escuro';
    root.dataset.theme = currentTheme;
    root.style.colorScheme = currentTheme === 'claro' ? 'light' : 'dark';
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content', currentTheme === 'claro' ? '#f3edde' : '#121225'
    );
    updateControls();

    if (persist) {
      try {
        localStorage.setItem(key, currentTheme);
        // Mantém a preferência também ao visitar uma versão antiga da página Links.
        localStorage.setItem(legacyKey, currentTheme);
      } catch {
        // A aparência permanece funcional nesta página com armazenamento bloqueado.
      }
    }
  }

  // Executado no head, antes das folhas de estilo, para evitar a troca de cor na abertura.
  applyTheme(readPreference());

  function connectControls() {
    applyTheme(currentTheme);
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      button.addEventListener('click', () => applyTheme(button.dataset.themeChoice, true));
      button.addEventListener('keydown', event => {
        if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
        const group = button.closest('[role="radiogroup"]') || document;
        const options = [...group.querySelectorAll('[data-theme-choice]')];
        const index = options.indexOf(button);
        const direction = ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1;
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 :
          (index + direction + options.length) % options.length;
        event.preventDefault();
        applyTheme(options[next].dataset.themeChoice, true);
        options[next].focus();
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', connectControls, {once: true});
  else connectControls();

  window.addEventListener('storage', event => {
    if (event.key === key || event.key === legacyKey || event.key === null) applyTheme(readPreference());
  });
})();
