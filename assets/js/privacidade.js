(() => {
  const script = document.currentScript;
  const notice = new URL('../../informacoes/#privacidade', script.src).href;
  const key = 'thiago-media-consent';
  let choice = null;
  try { choice = localStorage.getItem(key); } catch {}
  const banner = document.createElement('aside');
  banner.className = 'privacy-banner';
  banner.setAttribute('aria-label', 'Privacidade e mídias externas');
  banner.innerHTML = '<h2>Você escolhe o que carregar</h2><p>Vídeos e publicações conectam seu navegador ao YouTube e Instagram. Permita essas mídias para ver os players e suas miniaturas. Sua escolha fica salva neste navegador.</p><a href="'+notice+'">Privacidade e uso de dados</a><div><button type="button" data-choice="allow">Permitir mídias externas</button><button type="button" data-choice="deny">Recusar mídias externas</button><button type="button" data-close>Fechar aviso</button></div>';
  document.body.append(banner);
  const pending = new WeakSet();
  function configure(frame) {
    if (!frame.dataset.mediaSrc) return;
    const host = frame.parentElement;
    if (!host) return;
    let placeholder = host.querySelector(':scope > .media-placeholder');
    if (choice === 'allow') {
      frame.classList.remove('media-blocked');
      if (frame.getAttribute('src') !== frame.dataset.mediaSrc) frame.src = frame.dataset.mediaSrc;
      placeholder?.remove();
      host.classList.remove('media-placeholder-host');
      if (!pending.has(frame)) {
        pending.add(frame);
        const status = document.createElement('p');
        status.className = 'media-load-status';
        status.setAttribute('role','status');
        status.textContent = 'Carregando conteúdo externo…';
        host.append(status);
        frame.addEventListener('load', () => status.remove(), {once:true});
        setTimeout(() => { if (status.isConnected) status.textContent = 'Se não aparecer, use o link da plataforma.'; }, 12000);
      }
    } else {
      frame.removeAttribute('src');
      frame.classList.add('media-blocked');
      host.classList.add('media-placeholder-host');
      if (!placeholder) {
        placeholder = document.createElement('div');
        placeholder.className = 'media-placeholder';
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = frame.dataset.mediaSrc.includes('youtube') ? 'Permitir vídeo do YouTube' : 'Permitir conteúdo do Instagram';
        button.addEventListener('click', () => { banner.hidden = false; banner.querySelector('button').focus(); });
        placeholder.append(button);
        host.append(placeholder);
      }
    }
  }
  window.thiagoSetMediaFrame = (frame, url) => { frame.dataset.mediaSrc = url; if (choice === 'allow') frame.src = url; else frame.classList.add('media-blocked'); };
  function sync() { document.querySelectorAll('iframe[data-media-src]').forEach(configure); }
  banner.addEventListener('click', event => {
    const value = event.target.dataset.choice;
    if (value) { choice = value; try { localStorage.setItem(key, value); } catch {} sync(); banner.hidden = true; }
    if (event.target.hasAttribute('data-close')) banner.hidden = true;
  });
  document.querySelectorAll('[data-media-preferences]').forEach(button => button.addEventListener('click', () => { banner.hidden = false; banner.querySelector('button').focus(); }));
  new MutationObserver(changes => { if (changes.some(c => [...c.addedNodes].some(n => n.nodeType === 1 && (n.matches?.('iframe[data-media-src]') || n.querySelector?.('iframe[data-media-src]'))))) sync(); }).observe(document.body,{childList:true,subtree:true});
  banner.hidden = choice === 'allow' || choice === 'deny';
  sync();
})();
