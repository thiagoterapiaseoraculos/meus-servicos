// Keep public URLs clean while preserving meaningful section links and campaign tags.
function cleanPageAddress() {
  const url = new URL(window.location.href);
  const reviewParameters = ['v', 'preview', 'revisao', 'analise', 'versao'];
  reviewParameters.forEach(parameter => url.searchParams.delete(parameter));
  if (url.hash === '#inicio') url.hash = '';
  if (url.href !== window.location.href) {
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
  }
}
cleanPageAddress();
window.addEventListener('hashchange', cleanPageAddress);

const dialog = document.querySelector('#art-dialog');
const artImage = document.querySelector('#art-image');
const frame = document.querySelector('.art-frame');
let opener;
document.querySelectorAll('[data-art]').forEach(button => {
  button.addEventListener('click', () => {
    opener = button;
    document.querySelector('#art-title').textContent = button.dataset.title;
    artImage.src = button.dataset.art;
    artImage.alt = `Apresentação de ${button.dataset.title}, na identidade visual de Thiago Terapias & Oráculos`;
    frame.classList.toggle('wide', button.dataset.wide === 'true');
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});
document.querySelector('#close-art').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
}});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus(); });
document.querySelector('#year').textContent = new Date().getFullYear();
let statusTimer;
function report(message) {
  clearTimeout(statusTimer);
  document.querySelector('#share-status').textContent = message;
  statusTimer = setTimeout(() => document.querySelector('#share-status').textContent = '', 5000);
}
document.querySelector('#share').addEventListener('click', async () => {
  const url = new URL(location.href); url.hash = ''; url.search = '';
  const data = { title: 'Thiago Sousa · Terapias & Oráculos', text: 'Conheça os atendimentos de Thiago Sousa.', url: url.href };
  try {
    if (navigator.share) await navigator.share(data);
    else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(data.url); report('Link copiado para compartilhar.'); }
    else report(`Copie o endereço: ${data.url}`);
  } catch (error) { if (error.name !== 'AbortError') report(`Copie o endereço: ${data.url}`); }
});
// Update a previously installed template worker without enabling offline caching on new visits.
if ('serviceWorker' in navigator) navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(registration => {
    const worker = registration.active || registration.waiting || registration.installing;
    if (worker && new URL(worker.scriptURL).pathname === new URL('./sw.js', location.href).pathname) registration.update().catch(() => {});
  });
}).catch(() => {});

// Only contact Instagram after a visitor chooses a publication.
const instagramDialog = document.querySelector('#instagram-dialog');
const instagramPlayer = document.querySelector('#instagram-player');
let instagramOpener;
document.querySelectorAll('[data-instagram]').forEach(button => {
  button.addEventListener('click', () => {
    const original = new URL(button.dataset.instagram);
    if (original.origin !== 'https://www.instagram.com') return;
    instagramOpener = button;
    instagramDialog.classList.remove('youtube-mode');
    document.querySelector('.instagram-notice').textContent = 'Conteúdo carregado do Instagram. Se não aparecer, abra a publicação pelo link abaixo.';
    document.querySelector('#instagram-original').textContent = 'Abrir no Instagram';
    document.querySelector('#instagram-title').textContent = button.dataset.title;
    document.querySelector('#instagram-original').href = original.href;
    const iframe = document.createElement('iframe');
    const shortcode = original.pathname.split("/").filter(Boolean).pop();
    iframe.src = `https://www.instagram.com/p/${encodeURIComponent(shortcode)}/embed/`;
    iframe.title = `${button.dataset.title} — Instagram de Thiago Sousa`;
    iframe.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    instagramPlayer.replaceChildren(iframe);
    instagramDialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});
document.querySelector('#close-instagram').addEventListener('click', () => instagramDialog.close());
instagramDialog.addEventListener('click', event => {
  if (event.target !== instagramDialog) return;
  const rect = instagramDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) instagramDialog.close();
});
instagramDialog.addEventListener('close', () => {
  instagramPlayer.replaceChildren();
  document.body.style.overflow = '';
  instagramOpener?.focus();
});

// No player is loaded until a visitor chooses to watch.
document.querySelectorAll('[data-youtube]').forEach(button => {
  button.addEventListener('click', () => {
    const videoId = button.dataset.youtube;
    if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) return;
    instagramOpener = button;
    instagramDialog.classList.add('youtube-mode');
    document.querySelector('#instagram-title').textContent = button.dataset.title;
    document.querySelector('.instagram-notice').textContent = 'Assista por aqui ou abra o vídeo diretamente no YouTube.';
    const original = document.querySelector('#instagram-original');
    original.href = `https://www.youtube.com/watch?v=${videoId}`;
    original.textContent = 'Abrir no YouTube';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
    iframe.title = `${button.dataset.title} — Thiago Sousa no YouTube`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    instagramPlayer.replaceChildren(iframe);
    instagramDialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});

// Keep contact within reach after the main call to action leaves the screen.
const mobileContact = document.querySelector('.mobile-contact');
const heroActions = document.querySelector('.hero-actions');
const contactSection = document.querySelector('#contato');
if (mobileContact && heroActions && contactSection) {
  let heroContactVisible = false;
  let finalContactVisible = false;
  const updateMobileContact = () => { mobileContact.hidden = heroContactVisible || finalContactVisible; };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === heroActions) heroContactVisible = entry.isIntersecting;
        if (entry.target === contactSection) finalContactVisible = entry.isIntersecting;
      });
      updateMobileContact();
    }, { threshold: 0 });
    observer.observe(heroActions);
    observer.observe(contactSection);
  } else mobileContact.hidden = false;
}

// Reuse the prices displayed on the service cards as the catalog's only source.
const catalog = document.querySelector('#valores');
const servicePanel = document.querySelector('#services-panel');
const serviceTabs = [...document.querySelectorAll('.offerings-tabs [role="tab"]')];
if (catalog && servicePanel && serviceTabs.length === 2) {
  const groups = document.createDocumentFragment();
  servicePanel.querySelectorAll('.service').forEach(card => {
    const group = document.createElement('article');
    group.className = 'catalog-group' + (card.id === 'mentoria' ? ' catalog-package' : '');
    const title = document.createElement('h4');
    title.textContent = card.querySelector('h3').textContent;
    group.append(title);
    const prices = card.querySelector('.price-list');
    if (prices) {
      group.append(prices.cloneNode(true));
      card.querySelectorAll('.price-note').forEach(note => group.append(note.cloneNode(true)));
    } else {
      const note = document.createElement('p');
      note.className = 'catalog-consult';
      note.textContent = 'Valor e modalidades sob consulta. Converse comigo para conhecer a proposta e a disponibilidade.';
      group.append(note);
    }
    const contact = card.querySelector('.service-contact').cloneNode(true);
    contact.className = 'text-link';
    contact.setAttribute('aria-label', 'Consultar agenda: ' + title.textContent);
    group.append(contact);
    groups.append(group);
  });
  catalog.querySelector('.catalog-grid').append(groups);
  document.querySelector('.offerings-tabs').hidden = false;
  const selectServiceTab = (index, updateAddress = false) => {
    serviceTabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    servicePanel.hidden = index === 1;
    catalog.hidden = index === 0;
    if (updateAddress) {
      const address = new URL(location.href);
      address.hash = index === 1 ? 'valores' : 'atendimentos';
      history.replaceState(history.state, '', address.pathname + address.search + address.hash);
    }
  };
  serviceTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectServiceTab(index, true));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = 1 - index;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = 1;
      else return;
      event.preventDefault();
      selectServiceTab(next, true);
      serviceTabs[next].focus();
    });
  });
  const syncServiceHash = () => {
    if (location.hash === '#valores') {
      selectServiceTab(1);
      document.querySelector('.offerings-tabs').scrollIntoView({block:'start'});
    } else if (location.hash === '#atendimentos' || [...servicePanel.querySelectorAll('.service')].some(card => '#' + card.id === location.hash)) {
      selectServiceTab(0);
    }
  };
  document.querySelectorAll('a[href="#valores"]').forEach(link => link.addEventListener('click', () => {
    selectServiceTab(1);
  }));
  window.addEventListener('hashchange', syncServiceHash);
  syncServiceHash();
}
