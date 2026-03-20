// CARROSSEL


// Pega os elementos do HTML
const faixa      = document.getElementById('carrosselFaixa');
const pontosArea = document.getElementById('pontosCarrossel');
const slides     = faixa.querySelectorAll('.carrossel-slide');

// Controla qual slide está visível e o timer do avanço automático
let slideAtual = 0;
let timerAuto;

// ── Cria os pontinhos de navegação dinamicamente ──
// Para cada slide, cria um ponto na tela
slides.forEach((_, i) => {
  const ponto = document.createElement('div');

  // O primeiro ponto começa como ativo (selecionado)
  ponto.className = 'ponto-item' + (i === 0 ? ' ativo' : '');

  // Ao clicar no ponto, vai direto para aquele slide
  ponto.addEventListener('click', () => irPara(i));

  pontosArea.appendChild(ponto);
});

// ── Vai para um slide específico pelo índice ──
function irPara(indice) {
  // Se passar do último slide, volta pro primeiro e vice-versa
  slideAtual = (indice + slides.length) % slides.length;

  // Move a faixa horizontalmente para mostrar o slide correto
  faixa.style.transform = `translateX(-${slideAtual * 100}%)`;

  // Atualiza qual ponto está ativo
  pontosArea.querySelectorAll('.ponto-item').forEach((p, i) => {
    p.classList.toggle('ativo', i === slideAtual);
  });

  // Reinicia o timer para não pular logo depois de clicar
  reiniciarAuto();
}

// ── Botões de seta (anterior e próximo) ──
document.getElementById('setaAnterior').addEventListener('click', () => irPara(slideAtual - 1));
document.getElementById('setaProxima').addEventListener('click',  () => irPara(slideAtual + 1));

// ── Suporte a swipe (arrastar com o dedo no celular) ──
let inicioX = 0;

// Salva a posição inicial do toque
faixa.addEventListener('touchstart', e => {
  inicioX = e.touches[0].clientX;
}, { passive: true });

// Ao soltar o dedo, calcula se arrastou mais de 40px para decidir a direção
faixa.addEventListener('touchend', e => {
  const diferenca = inicioX - e.changedTouches[0].clientX;

  // Só muda o slide se o arraste foi significativo (mais de 40px)
  if (Math.abs(diferenca) > 40) {
    irPara(slideAtual + (diferenca > 0 ? 1 : -1));
    // diferenca > 0 = arrastou pra esquerda = próximo slide
    // diferenca < 0 = arrastou pra direita  = slide anterior
  }
});

// ── Avanço automático ──
// Reinicia o intervalo sempre que o usuário interage manualmente
function reiniciarAuto() {
  clearInterval(timerAuto); // Cancela o timer atual

  // Cria um novo timer que avança um slide a cada 4 segundos
  timerAuto = setInterval(() => irPara(slideAtual + 1), 4000);
}

// Inicia o avanço automático quando a página carrega
reiniciarAuto();



// LOGIN — atualiza o chip do cabeçalho


// Verifica se o usuário já fez login em uma visita anterior
// localStorage guarda os dados mesmo depois de fechar o navegador
const sessao = JSON.parse(localStorage.getItem('usuarioLogado'));

if (sessao) {
  // Atualiza o chip com os dados do usuário
  document.getElementById('usuarioNome').textContent = sessao.nome;
  document.getElementById('usuarioAvatar').textContent = sessao.iniciais;
  document.getElementById('usuarioAvatar').style.fontSize   = '11px';
  document.getElementById('usuarioAvatar').style.fontWeight = '700';

  // Chip leva para o perfil
  document.getElementById('usuarioChip').href = 'perfil.html';

  // Mostra o botão sair
  document.getElementById('botaoSair').style.display = 'block';
}

// Clique no botão sair
document.getElementById('botaoSair').addEventListener('click', () => {
  localStorage.removeItem('usuarioLogado');
  window.location.reload();
});
