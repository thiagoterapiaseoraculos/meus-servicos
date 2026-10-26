// Aparência local: sem chamadas externas e sem alterar o restante do site.
const choices = [...document.querySelectorAll('[data-theme-choice]')];
function setTheme(value, persist = false) {
  const theme = value === 'claro' ? 'claro' : 'escuro';
  document.documentElement.dataset.theme = theme;
  choices.forEach(button => {
    const selected = button.dataset.themeChoice === theme;
    button.setAttribute('aria-checked', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  if (persist) { try { localStorage.setItem('thiago-links-theme', theme); } catch {} }
}
let savedTheme = 'escuro';
try { savedTheme = localStorage.getItem('thiago-links-theme') || 'escuro'; } catch {}
setTheme(savedTheme);
choices.forEach((button,index) => {
  button.addEventListener('click', () => setTheme(button.dataset.themeChoice, true));
  button.addEventListener('keydown', event => {
    if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? choices.length - 1 : 1-index;
    setTheme(choices[next].dataset.themeChoice, true);
    choices[next].focus();
  });
});
const video = document.querySelector('#video');
video.addEventListener('toggle', () => {
  const player = document.querySelector('#player');
  if (!video.open) { player.replaceChildren(); return; }
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.instagram.com/p/Dez1kHcpO6o/embed/';
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
