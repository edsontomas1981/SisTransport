class Conexao {
  constructor(url,data){
      this.url=url
      this.data=data
      this.loadingElement = document.getElementById('loading'); // Elemento de loading
  }

  showLoading() {
      this.loadingElement.style.display = 'block'; // Mostra o loading
  }

  hideLoading() {
      this.loadingElement.style.display = 'none'; // Esconde o loading
  }

  getCSRFToken() {
      const cookieValue = document.cookie.match(/(^|;)csrftoken=([^;]*)/)[2];
      return cookieValue;
  }

  async sendPostRequest() {
      this.csrfToken=this.getCSRFToken()
      try {
          this.showLoading(); // Mostra o loading antes de fazer a requisição
          const response = await fetch(this.url, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "X-CSRFToken": this.csrfToken,
              },
              body: JSON.stringify(this.data),
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          return result;
      } catch (error) {
          console.error(error);
          alert("Erro interno!" + error);
      } finally {
          this.hideLoading(); // Esconde o loading após a requisição, mesmo se der erro
      }
  }
}

function conectaBackEnd(dados, callback,...idComponente) {
    let url = dados.url
    let postData = $('form').serialize();
    postData +='&id='+dados.id;
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        beforeSend: function() {
          $('#loader-parceiro').show();
        },
        success: function(response) {
            if (idComponente){
                callback(response,idComponente)
                return response
            }else{
                callback(response)
                return response
            }
        },
        complete: function() {
          $('#loader-parceiro').hide();
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

function capturaDadosNaRowClicada(row) {
  var data = $(row).find("td").map(function() {
      return $(this).text();
  }).get();

  return data

}


$(document).ready(function() {
  capturaDadosNaRowClicada()
});

var abaSemSalvar=(idAbas)=>{
    var conteudoAlterado = false;
  
    // Detectar alterações no conteúdo
    $(idAbas).on("input", function() {
      conteudoAlterado = true;
    });
  
    // Verificar alterações não salvas antes de mudar de aba
    $(".link-aba").on("click", function() {
      if (conteudoAlterado) {
        if (!confirm("Você tem alterações não salvas. Tem certeza de que deseja sair dessa página?")) {
          return false;
        }else{
            alert('Salvar o Conteudo')
        }
      }
    });
}

function validateDocumentNumber(documentNumber) {
  if (documentNumber.length === 11) {
    return validateCPF(documentNumber);
  } else if (documentNumber.length === 14) {
    return validateCNPJ(documentNumber);
  } else {
    return false;
  }
}

function validateCPF(cpf) {
  let sum = 0;
  let rest;

  if (
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(10, 11))) {
    return false;
  }
  return true;
}

function validateCNPJ(cnpj) {
  let sum = 0;
  let rest;
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  rest = sum % 11;
  if (rest === 0 || rest === 1) {
    rest = 0;
  } else {
    rest = 11 - rest;
  }
  if (rest !== parseInt(digits.charAt(0))) {
    return false;
  }

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  rest = sum % 11;
  if (rest === 0 || rest === 1) {
    rest = 0;
  } else {
    rest = 11 - rest;
  }
  if (rest !== parseInt(digits.charAt(1))) {
    return false;
  }
  return true;
}

const geraMensagemCamposFaltando=(campos)=>{
  let msgInicial = 'Os campos '
  let camposFaltando = ''
  for (let i = 0; i < campos.length; i++) {
    eOuVirgula = campos.length == i + 2 ? " e " :
        campos.length == i + 1 ? '' : ', ';
    camposFaltando += campos[i] + eOuVirgula
  }
 msgInicial += camposFaltando + ' precisam ser preenchidos.'
 return msgInicial
}

const formatarTelefone=(input)=> {
  const numeroLimpo = input.value.replace(/\D/g, '');
  const isCelular = numeroLimpo.length === 11; // 11 dígitos para números de celular

  let mascara;
  if (isCelular) {
    mascara = '(XX) XXXXX-XXXX';
  } else {
    mascara = '(XX) XXXX-XXXX';
  }

  let indice = 0;
  let telefoneFormatado = '';

  for (let i = 0; i < mascara.length; i++) {
    if (mascara[i] === 'X') {
      telefoneFormatado += numeroLimpo[indice] || '';
      indice++;
    } else {
      telefoneFormatado += mascara[i];
    }
  }
  input.value = telefoneFormatado;
}

// Função para validar entrada como números inteiros
function validarNumeroInteiroInput(inputElement) {
  inputElement.addEventListener('keydown', function (event) {
    const key = event.key;
    // Permitir teclas especiais como backspace, delete, setas, home, end, etc.
    if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Tab' || key === 'Home' || key === 'End') {
      return;
    }
    // Verificar se a tecla é um número inteiro
    if (!/^[0-9]$/.test(key)) {
      event.preventDefault();
    }
  });
}

$('#numPed').on('keydown', function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    // Seu código aqui para lidar com a tecla Enter
    // Por exemplo, você pode chamar uma função ou executar um código específico.
    // Por exemplo, exibir um alert ou fazer uma busca.
  }
});


const getDadosForm=(formularioId)=>{

  var tabelaHash = {};

  var formulario = document.getElementById(formularioId);

  if (formulario) {
      // Obtém todos os elementos do formulário
      var elementos = formulario.elements;

      // Itera sobre os elementos do formulário
      for (var i = 0; i < elementos.length; i++) {
          var campo = elementos[i];
          // Ignora os campos que não têm nome
          if (campo.name) {
              // Verifica o tipo do campo para determinar como obter o valor
              switch (campo.type) {
                  case 'text':
                  case 'select-one':
                  case 'textarea':
                      tabelaHash[campo.name] = campo.value;
                      break;
                  case 'checkbox':
                      tabelaHash[campo.name] = campo.checked;
                      break;
                  // Adicione mais casos conforme necessário para outros tipos de campo
              }
          }
      }

      return tabelaHash;
  } else {
      console.error("Formulário não encontrado com o ID fornecido: " + formularioId);
      return null;
  }
}

const formataDataPtBr = (dataString)=>{
  
  const dataObj = new Date(dataString);
  // Usando 'pt-BR' para obter o formato brasileiro
  const formatoBrasileiro = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return formatoBrasileiro.format(dataObj);
}

const truncateString=(str, maxLength)=> {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}

const getRotas=async()=>{
  data={}
  let conexao = new Conexao('/rotas/readRotas/', data);
  try {
      const result = await conexao.sendPostRequest();
      return result
          // Imprime a resposta JSON da solicitação POST
  } catch (error) {
      console.error(error); // Imprime a mensagem de erro
  }
}

const populaRotaGeral= (response,idCmbRotas,textoFirstOpt='Selecione')=>{
  data= response.rotas
  var selectbox = $('#'+idCmbRotas);
  selectbox.find('option').remove();
  selectbox.append(`<option value>${textoFirstOpt}</option>`);
  $.each(data, function (i, d) {
      selectbox.append('<option value="' + d.id+ '">' + d.nome + '</option>');
  });
}

const msgConfirmacao = async (msg) => {
  return new Promise(async (resolve) => {
    const result = await Swal.fire({
      title: msg,
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

const msgOk = (msg)=>{
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: msg,
    showConfirmButton: false,
    timer: 1500
  })
}
const msgAlerta = (msg)=>{
  Swal.fire(msg);
}



const msgInfo = (dadosMsg)=>{
  Swal.fire({
    title: dadosMsg.titulo,
    text: dadosMsg.msg,
    icon: "info"
  });
}

const msgErro = (msg)=>{
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: msg,
    showConfirmButton: false,
    timer: 3000
  })
}

const msgAviso = (msg)=>{
  Swal.fire({
    position: "top-end",
    icon: "warning",
    title: msg,
    showConfirmButton: false,
    timer: 3000
  });
}
const obterValorElemento = (elemento) => {
  switch (elemento.tagName.toLowerCase()) {
    case 'input':
      if (elemento.type === 'checkbox') {
        return elemento.checked;
      } else if (elemento.type === 'radio' && elemento.checked) {
        return elemento.value;
      } else if (elemento.type !== 'radio') {
        return elemento.value;
      }
      break;
    case 'select':
      return elemento.value;
    case 'select-one':

      return elemento.value;
    case 'textarea':
      return elemento.value;
    default:
      return null;
  }
};

const validarCamposObrigatorios = (dados, camposObrigatorios) => {

  let camposFaltantes = []

  camposObrigatorios.forEach(element => {
    if (dados[element]=='') {
      camposFaltantes.push(element)
      document.getElementById(element).classList.add('campo-vazio');
    }else{
      document.getElementById(element).classList.remove('campo-vazio');
    }
  });

  return camposFaltantes;

};

const obterDadosDoFormulario = (formularioId, camposObrigatorios=[]) => {
  const formulario = document.getElementById(formularioId);
  let dados = {};

  if (!formulario) {
    console.error("Formulário não encontrado.");
    return null;
  }

  // Loop através de todos os elementos do formulário
  for (let i = 0; i < formulario.elements.length; i++) {
    const elemento = formulario.elements[i];

    // Verificar se o elemento tem um id atribuído
    if (elemento.id) {
      dados[elemento.id] = obterValorElemento(elemento);
    }
  } 

// Verificar se todos os campos obrigatórios foram preenchidos
  const camposPreenchidos = validarCamposObrigatorios(dados, camposObrigatorios);
  
  if (camposPreenchidos.length>0) {
    msgAviso(geraMensagemCamposFaltando(camposPreenchidos))
    return null;
  }

  return dados;
};

function adicionarDadosAoSelect(dados, selectId,id,valor) {
  var select = document.getElementById(selectId);

  
  // Limpar opções existentes
  select.innerHTML = '';
  
  // Adicionar nova opção padrão
  var defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Selecione ...';
  select.appendChild(defaultOption);

  // Adicionar novas opções
  dados.forEach(function(dado) {
    var option = document.createElement('option');
    option.value = dado[id];
    option.textContent = dado[valor];
    select.appendChild(option);
  });
}

const conecta = async (url,dados)=>{
  let conexao = new Conexao(url,dados);
  try {
      const result = await conexao.sendPostRequest();
      return result
  } catch (error) {
      console.error(error); // Imprime a mensagem de erro
  }
}

const formataData=(dataString)=>{
  // Data em formato de string
  var dataString = dataString;

  // Converter a string para um objeto de data
  var data = new Date(dataString);

  // Formatar a data como uma string no formato apropriado para o input date (AAAA-MM-DD)
  var dataFormatada = data.toISOString().split('T')[0];
  return dataFormatada
}


const pegarTextoSelect=(idSelect)=>{
  var selectElement = document.getElementById(idSelect);
  var selectedText = selectElement.options[selectElement.selectedIndex].text;
  return selectedText
}

