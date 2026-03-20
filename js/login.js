// ═══════════════════════════════════════════
// ABAS — alterna entre Login e Cadastro
// ═══════════════════════════════════════════

function trocarAba(aba) {
  const blocoEntrar   = document.getElementById('blocoEntrar');
  const blocoCadastro = document.getElementById('blocoCadastro');
  const abaEntrar     = document.getElementById('abaEntrar');
  const abaCadastro   = document.getElementById('abaCadastro');

  if (aba === 'entrar') {
    blocoEntrar.classList.remove('oculto');
    blocoCadastro.classList.add('oculto');
    abaEntrar.classList.add('aba--ativa');
    abaCadastro.classList.remove('aba--ativa');
  } else {
    blocoCadastro.classList.remove('oculto');
    blocoEntrar.classList.add('oculto');
    abaCadastro.classList.add('aba--ativa');
    abaEntrar.classList.remove('aba--ativa');
  }
}


// ═══════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════

function fazerLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;
  const erro  = document.getElementById('erroLogin');

  if (!email || !senha) {
    erro.textContent = 'Preencha todos os campos.';
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario  = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    erro.textContent = 'E-mail ou senha incorretos.';
    return;
  }

  // Salva a sessão e redireciona
  localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  window.location.href = 'index.html';
}

// Enter no campo de senha faz login
document.getElementById('loginSenha').addEventListener('keydown', e => {
  if (e.key === 'Enter') fazerLogin();
});


// ═══════════════════════════════════════════
// CADASTRO
// ═══════════════════════════════════════════

function fazerCadastro() {
  const nome  = document.getElementById('cadastroNome').value.trim();
  const cpf   = document.getElementById('cadastroCpf').value.trim();
  const email = document.getElementById('cadastroEmail').value.trim();
  const senha = document.getElementById('cadastroSenha').value;
  const erro  = document.getElementById('erroCadastro');

  if (!nome || !cpf || !email || !senha) {
    erro.textContent = 'Preencha todos os campos.';
    return;
  }

  if (cpf.length < 14) {
    erro.textContent = 'CPF inválido.';
    return;
  }

  if (senha.length < 6) {
    erro.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const existe   = usuarios.find(u => u.email === email);

  if (existe) {
    erro.textContent = 'Este e-mail já está cadastrado.';
    return;
  }

  // Gera as iniciais para o chip do cabeçalho
  const palavras = nome.split(' ');
  const iniciais = palavras.length >= 2
    ? palavras[0][0] + palavras[palavras.length - 1][0]
    : palavras[0].substring(0, 2);

  const novoUsuario = {
    nome,
    cpf,
    email,
    senha,
    iniciais: iniciais.toUpperCase()
  };

  // Salva o novo usuário e faz login automático
  usuarios.push(novoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));

  window.location.href = 'index.html';
}

// Enter no campo de senha faz cadastro
document.getElementById('cadastroSenha').addEventListener('keydown', e => {
  if (e.key === 'Enter') fazerCadastro();
});


// ═══════════════════════════════════════════
// MÁSCARA DE CPF
// ═══════════════════════════════════════════

function mascaraCpf(campo) {
  // Remove tudo que não for número
  let valor = campo.value.replace(/\D/g, '');

  // Aplica a máscara 000.000.000-00
  if (valor.length <= 3) {
    campo.value = valor;
  } else if (valor.length <= 6) {
    campo.value = valor.slice(0,3) + '.' + valor.slice(3);
  } else if (valor.length <= 9) {
    campo.value = valor.slice(0,3) + '.' + valor.slice(3,6) + '.' + valor.slice(6);
  } else {
    campo.value = valor.slice(0,3) + '.' + valor.slice(3,6) + '.' + valor.slice(6,9) + '-' + valor.slice(9,11);
  }
}


// ═══════════════════════════════════════════
// MOSTRAR / OCULTAR SENHA
// ═══════════════════════════════════════════

function toggleSenha(campoId, botao) {
  const campo = document.getElementById(campoId);

  if (campo.type === 'password') {
    campo.type = 'text';
    botao.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>`;
  } else {
    campo.type = 'password';
    botao.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>`;
  }
}