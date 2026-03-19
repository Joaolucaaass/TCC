const faixa      = document.getElementById('carrosselFaixa');
const pontosArea = document.getElementById('pontosCarrossel');
const slides     = faixa.querySelectorAll('.carrossel-slide');
let slideAtual   = 0;
let timerAuto;

slides.forEach((_, i) => {
  const ponto = document.createElement('div');
  ponto.className = 'ponto-item' + (i === 0 ? ' ativo' : '');
  ponto.addEventListener('click', () => irPara(i));
  pontosArea.appendChild(ponto);
});

function irPara(indice) {
  slideAtual = (indice + slides.length) % slides.length;
  faixa.style.transform = `translateX(-${slideAtual * 100}%)`;
  pontosArea.querySelectorAll('.ponto-item').forEach((p, i) => {
    p.classList.toggle('ativo', i === slideAtual);
  });
  reiniciarAuto();
}

document.getElementById('setaAnterior').addEventListener('click', () => irPara(slideAtual - 1));
document.getElementById('setaProxima').addEventListener('click',  () => irPara(slideAtual + 1));

let inicioX = 0;
faixa.addEventListener('touchstart', e => { inicioX = e.touches[0].clientX; }, { passive: true });
faixa.addEventListener('touchend',   e => {
  const diferenca = inicioX - e.changedTouches[0].clientX;
  if (Math.abs(diferenca) > 40) irPara(slideAtual + (diferenca > 0 ? 1 : -1));
});

function reiniciarAuto() {
  clearInterval(timerAuto);
  timerAuto = setInterval(() => irPara(slideAtual + 1), 4000);
}
reiniciarAuto();
// Verifica se há sessão salva e atualiza o chip
const sessao = JSON.parse(localStorage.getItem('usuarioLogado'));

if (sessao) {
  document.getElementById('usuarioNome').textContent = sessao.nome;
  document.getElementById('usuarioAvatar').textContent = sessao.iniciais;
  document.getElementById('usuarioAvatar').style.fontSize = '11px';
  document.getElementById('usuarioAvatar').style.fontWeight = '700';

  // Se já logado, chip leva pro perfil em vez do login
  document.getElementById('usuarioChip').href = 'pages/perfil.html';
}