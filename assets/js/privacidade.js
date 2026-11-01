(() => {
  const script = document.currentScript;
  const privacyUrl = new URL('../../informacoes/#privacidade', script.src).href;
  const termsUrl = new URL('../../informacoes/#termos', script.src).href;
  const storageKey = 'thiago-media-consent';
  const validChoice = value => value === 'allow' || value === 'deny' ? value : null;
  let choice = null;
  try { choice = validChoice(localStorage.getItem(storageKey)); } catch {}

  const links = `<nav class="privacy-links" aria-label="Informações de privacidade"><a href="${privacyUrl}">Política de privacidade</a><a href="${termsUrl}">Termos de uso</a></nav>`;
  const actions = '<div class="privacy-actions"><button type="button" data-choice="allow">Permitir mídias</button><button type="button" data-choice="deny">Continuar sem mídias</button></div>';
  const closeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';

  const banner = document.createElement('aside');
  banner.className = 'privacy-banner';
  banner.setAttribute('aria-labelledby', 'privacy-banner-title');
  banner.hidden = choice !== null;
  banner.innerHTML = `<button class="privacy-close" type="button" data-close aria-label="Fechar aviso de privacidade">${closeIcon}</button><h2 id="privacy-banner-title">Sua privacidade</h2><p>YouTube e Instagram só carregam com sua permissão. Você pode navegar normalmente sem essas mídias e mudar sua escolha depois.</p>${actions}${links}`;

  const preferences = document.createElement('dialog');
  preferences.className = 'privacy-dialog';
  preferences.id = 'privacy-preferences';
  preferences.setAttribute('aria-labelledby', 'privacy-dialog-title');
  preferences.setAttribute('aria-describedby', 'privacy-dialog-description');
  preferences.innerHTML = `<button class="privacy-close" type="button" data-close aria-label="Fechar preferências de privacidade" autofocus>${closeIcon}</button><p class="privacy-eyebrow">MÍDIAS EXTERNAS</p><h2 id="privacy-dialog-title">Sua privacidade</h2><p id="privacy-dialog-description">Você escolhe se deseja carregar vídeos e publicações do YouTube e Instagram neste site. Ao permitir, seu navegador se conecta a essas plataformas, que podem receber dados como seu endereço IP.</p><p>Sem permissão, os conteúdos ficam bloqueados e você continua navegando normalmente. Sua escolha fica salva neste navegador e pode ser alterada a qualquer momento.</p><p class="privacy-current" role="status"></p>${actions}${links}`;
  document.body.append(banner, preferences);

  let preferencesTrigger = null;
  let requestedFrame = null;
  let parentDialog = null;
  const loads = new WeakMap();

  function platform(frame) {
    try {
      const url = new URL(frame.dataset.mediaSrc);
      if (url.hostname === 'www.youtube-nocookie.com' || url.hostname === 'www.youtube.com') {
        const id = url.pathname.split('/').filter(Boolean).pop();
        return {name: 'YouTube', label: 'Vídeo do YouTube', url: `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`};
      }
      if (url.hostname === 'www.instagram.com') {
        url.pathname = url.pathname.replace(/\/embed\/?$/, '/');
        url.search = '';
        return {name: 'Instagram', label: 'Conteúdo do Instagram', url: url.href};
      }
    } catch {}
    return {name: 'plataforma', label: 'Conteúdo externo', url: null};
  }

  function stopLoading(frame) {
    const load = loads.get(frame);
    if (!load) return;
    clearTimeout(load.timer);
    frame.removeEventListener('load', load.loaded);
    frame.removeEventListener('error', load.failed);
    load.feedback.remove();
    loads.delete(frame);
  }

  function loadFrame(frame) {
    stopLoading(frame);
    const host = frame.parentElement;
    if (!host || choice !== 'allow') return;
    const service = platform(frame);
    const feedback = document.createElement('div');
    feedback.className = 'media-feedback';
    const message = document.createElement('p');
    message.className = 'media-load-status';
    message.setAttribute('role', 'status');
    message.textContent = 'Carregando conteúdo externo…';
    feedback.append(message);
    host.append(feedback);

    const recover = failed => {
      if (!frame.isConnected || choice !== 'allow' || feedback.classList.contains('media-recovery')) return;
      feedback.classList.add('media-recovery');
      message.textContent = failed ? 'Não foi possível carregar este conteúdo.' : 'O conteúdo está demorando para responder.';
      const controls = document.createElement('div');
      controls.className = 'media-recovery-actions';
      const retry = document.createElement('button');
      retry.type = 'button';
      retry.textContent = 'Tentar novamente';
      retry.addEventListener('click', () => {
        loadFrame(frame);
        const modal = frame.closest('dialog[open]');
        if (modal) modal.querySelector('button, a[href], [tabindex="0"]')?.focus({preventScroll: true});
        else frame.focus({preventScroll: true});
      });
      controls.append(retry);
      if (service.url) {
        const original = document.createElement('a');
        original.href = service.url;
        original.target = '_blank';
        original.rel = 'noopener noreferrer';
        original.textContent = `Abrir no ${service.name}`;
        controls.append(original);
      }
      feedback.append(controls);
    };

    // An iframe load event does not establish that the third-party player works.
    const loaded = () => stopLoading(frame);
    const failed = () => recover(true);
    frame.addEventListener('load', loaded, {once: true});
    frame.addEventListener('error', failed, {once: true});
    loads.set(frame, {feedback, loaded, failed, timer: setTimeout(() => recover(false), 12000)});
    frame.src = frame.dataset.mediaSrc;
  }

  function updateCurrentChoice() {
    preferences.querySelector('.privacy-current').textContent = choice === 'allow'
      ? 'Sua escolha atual: mídias permitidas.'
      : choice === 'deny' ? 'Sua escolha atual: mídias bloqueadas.' : 'Você ainda não escolheu uma preferência.';
  }

  function openPreferences(trigger, frame = null) {
    preferencesTrigger = trigger;
    requestedFrame = frame;
    parentDialog = trigger?.closest('dialog[open]') || null;
    updateCurrentChoice();
    if (!preferences.open) {
      // Native dialogs enter the top layer, including above an existing video modal.
      preferences.showModal();
      document.documentElement.classList.add('privacy-dialog-open');
    }
  }

  function restoreFocus() {
    if (preferencesTrigger?.isConnected && preferencesTrigger.getClientRects().length) {
      preferencesTrigger.focus({preventScroll: true});
    } else if (parentDialog?.open) {
      parentDialog.querySelector('button, a[href], [tabindex="0"]')?.focus({preventScroll: true});
    } else if (requestedFrame?.isConnected && choice === 'allow') {
      requestedFrame.focus({preventScroll: true});
    }
    preferencesTrigger = null;
    requestedFrame = null;
    parentDialog = null;
  }

  function configure(frame) {
    if (!frame.dataset.mediaSrc || !frame.parentElement) return;
    const host = frame.parentElement;
    let placeholder = host.querySelector(':scope > .media-placeholder');
    if (choice === 'allow') {
      frame.classList.remove('media-blocked');
      placeholder?.remove();
      host.classList.remove('media-placeholder-host');
      if (frame.getAttribute('src') !== frame.dataset.mediaSrc) loadFrame(frame);
      return;
    }

    stopLoading(frame);
    frame.removeAttribute('src');
    frame.classList.add('media-blocked');
    host.classList.add('media-placeholder-host');
    if (placeholder) return;
    const service = platform(frame);
    placeholder = document.createElement('div');
    placeholder.className = 'media-placeholder';
    const label = document.createElement('p');
    label.className = 'media-placeholder-title';
    label.textContent = service.label;
    const description = document.createElement('p');
    description.textContent = 'Para ver este conteúdo aqui, permita mídias externas.';
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Gerenciar permissão';
    button.addEventListener('click', () => openPreferences(button, frame));
    placeholder.append(label, description, button);
    if (service.url) {
      const original = document.createElement('a');
      original.href = service.url;
      original.target = '_blank';
      original.rel = 'noopener noreferrer';
      original.textContent = `Abrir no ${service.name}`;
      placeholder.append(original);
    }
    host.append(placeholder);
  }

  function sync() {
    document.querySelectorAll('iframe[data-media-src]').forEach(configure);
    updateCurrentChoice();
  }

  function applyChoice(value) {
    choice = value;
    try { localStorage.setItem(storageKey, value); } catch {}
    banner.hidden = true;
    sync();
    if (preferences.open) preferences.close();
  }

  function handleChoice(event) {
    const button = event.target.closest('button');
    if (!button) return;
    const value = validChoice(button.dataset.choice);
    if (value) applyChoice(value);
    else if (button.hasAttribute('data-close')) {
      if (event.currentTarget === preferences) preferences.close();
      else banner.hidden = true;
    }
  }
  banner.addEventListener('click', handleChoice);
  preferences.addEventListener('click', handleChoice);
  preferences.addEventListener('close', () => {
    document.documentElement.classList.remove('privacy-dialog-open');
    restoreFocus();
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-media-preferences]');
    if (button) openPreferences(button);
  });

  window.thiagoSetMediaFrame = (frame, url) => {
    frame.dataset.mediaSrc = url;
    frame.removeAttribute('src');
    frame.classList.add('media-blocked');
    if (frame.isConnected) configure(frame);
  };

  new MutationObserver(changes => {
    let addedFrame = false;
    changes.forEach(change => {
      [...change.removedNodes].forEach(node => {
        if (node.nodeType !== 1) return;
        if (node.matches('iframe[data-media-src]') && !node.isConnected) stopLoading(node);
        node.querySelectorAll('iframe[data-media-src]').forEach(frame => { if (!frame.isConnected) stopLoading(frame); });
      });
      if ([...change.addedNodes].some(node => node.nodeType === 1 && (node.matches('iframe[data-media-src]') || node.querySelector('iframe[data-media-src]')))) addedFrame = true;
    });
    if (addedFrame) sync();
  }).observe(document.body, {childList: true, subtree: true});

  window.addEventListener('storage', event => {
    if (event.key !== storageKey) return;
    choice = validChoice(event.newValue);
    banner.hidden = choice !== null;
    sync();
  });
  sync();
})();
