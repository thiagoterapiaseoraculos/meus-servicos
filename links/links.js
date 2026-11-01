// A preferência de aparência é compartilhada por assets/js/tema.js.
const video = document.querySelector('#video');
video.addEventListener('toggle', () => {
  const player = document.querySelector('#player');
  if (!video.open) { player.replaceChildren(); return; }
  const iframe = document.createElement('iframe');
  window.thiagoSetMediaFrame(iframe, 'https://www.instagram.com/p/Dez1kHcpO6o/embed/');
  iframe.title = 'Água Flórida — Thiago Sousa';
  iframe.allow = 'encrypted-media; fullscreen; picture-in-picture';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  player.replaceChildren(iframe);
});
document.querySelector('#share').addEventListener('click', async () => {
  const url = 'https://thiagoterapiaseoraculos.github.io/meus-servicos/links/';
  try {
    if (navigator.share) await navigator.share({title:'Thiago Sousa · Terapias & Oráculos',url});
    else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      document.querySelector('#status').textContent = 'Link copiado para compartilhar.';
    } else document.querySelector('#status').textContent = 'Compartilhe o endereço desta página.';
  } catch (error) {
    if (error.name !== 'AbortError') document.querySelector('#status').textContent = 'Compartilhe o endereço desta página.';
  }
});
