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
    document.querySelector('#instagram-title').textContent = button.dataset.title;
    document.querySelector('#instagram-original').href = original.href;
    const iframe = document.createElement('iframe');
    iframe.src = `${original.href}embed/`;
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
