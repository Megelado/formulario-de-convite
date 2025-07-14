const inputArquivo = document.getElementById('arquivo');
const nomeArquivo = document.getElementById('file-name');
const form = document.querySelector('form');

// === ERRO DE ARQUIVO (já existente) ===
let erroArquivo = null;
inputArquivo.addEventListener('change', () => {
  const arquivo = inputArquivo.files[0];
  const fileGroup = inputArquivo.closest('.file-group');

  const corPlaceholder = getComputedStyle(document.documentElement).getPropertyValue('--input-placeholder');
  const corTexto = getComputedStyle(document.documentElement).getPropertyValue('--text-heading');

  const permitidos = ['jpg', 'jpeg', 'pdf', 'svg', 'png'];

  if (arquivo) {
    const extensao = arquivo.name.split('.').pop().toLowerCase();

    if (permitidos.includes(extensao)) {
      nomeArquivo.textContent = arquivo.name;
      nomeArquivo.style.color = corTexto;
      if (erroArquivo) {
        erroArquivo.remove();
        erroArquivo = null;
      }
    } else {
      nomeArquivo.textContent = 'Nenhum arquivo selecionado';
      nomeArquivo.style.color = corPlaceholder;

      if (!erroArquivo) {
        erroArquivo = document.createElement('span');
        erroArquivo.classList.add('error-msg');
        erroArquivo.innerHTML = `<img src="assets/icons/circle-alert.svg" alt=""> Error message`;
        fileGroup.insertAdjacentElement('afterend', erroArquivo);
      }
    }
  } else {
    nomeArquivo.textContent = 'Nenhum arquivo selecionado';
    nomeArquivo.style.color = corPlaceholder;
    if (erroArquivo) {
      erroArquivo.remove();
      erroArquivo = null;
    }
  }
});

// === ERROS GERAIS EM INPUTS ===
const mostrarErro = (campo) => {
  const wrapper = campo.closest('.full-width')
    || campo.closest('.input-fields')
    || campo.closest('.location-wrapper')
    || campo.closest('.desc-wrapper')
    || campo.closest('.input-pair')
    || campo.closest('div')
    || campo.parentElement;

  // Remover erro antigo
  const erroAntigo = wrapper.querySelector('.error-msg');
  if (erroAntigo) erroAntigo.remove();

  // Se inválido, mostrar mensagem
  if (!campo.checkValidity()) {
    campo.classList.add('invalid');

    const erro = document.createElement('div');
    erro.classList.add('error-msg');
    erro.innerHTML = `<img src="assets/icons/circle-alert.svg" alt=""> Error message`;
    wrapper.appendChild(erro);
  } else {
    campo.classList.remove('invalid');
  }
};

// Em tempo real
const campos = form.querySelectorAll('input:required, textarea:required');
campos.forEach(campo => {
  campo.addEventListener('input', () => mostrarErro(campo));
  campo.addEventListener('change', () => mostrarErro(campo));
});

// No envio do formulário
form.addEventListener('submit', (e) => {
  let formValido = true;

  campos.forEach(campo => {
    mostrarErro(campo);
    if (!campo.checkValidity()) formValido = false;
  });

  if (!formValido) {
    e.preventDefault();
    const primeiroErro = form.querySelector('.invalid');
    if (primeiroErro) {
      primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});
const checkbox = document.getElementById('modo-claro');
const labelModo = document.getElementById('modo-label');

function atualizarTextoModo() {
  labelModo.textContent = checkbox.checked ? "Claro" : "Escuro";
}

checkbox.addEventListener('change', atualizarTextoModo);
atualizarTextoModo(); // inicial
