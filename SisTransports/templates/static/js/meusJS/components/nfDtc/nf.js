const gereDadosNf = () => {
    let dados = {};
    $('#formNf :input').each(function() {
        const id = $(this).attr('id');
        if ($(this).prop('required') && $(this).val() === '') {
            msgVazioNf($(this).data('nome'))
            dados=false
            return dados; // ou trate o erro de outra forma
        }
        dados[id] = $(this).val();
    });
    return dados;
}

const limpaNf = async ()=>{
    $('#chaveAcessoNf').val('')
    $('#numNf').val('')
    $('#dataEmissaoNf').val('')
    $('#volumeCotacao').val('')
    $('#natureza').val('')
    $('#especieNf').val('')
    $('#tipoDocumento').val('')
    $('#qtdeNf').val('')
    $('#pesoNf').val('')
    $('#resultM3Peso').val('')
    $('#valorNf').val('')    
}

const msgVazioNf = (campo) => {
    Swal.fire({
        icon: 'error',
        title: 'Campo Obrigatório',
        text: `O campo ${campo} é obrigatório e precisa ser preenchido.`,
        showConfirmButton: true
    });
}

const dataEmissaoNfInput = document.getElementById('dataEmissaoNf');
dataEmissaoNfInput.addEventListener('blur', function() {
    const valor = dataEmissaoNfInput.value;
    if (valor === '') {
        const dataAtual = new Date();
        dataEmissaoNfInput.value = dataAtual.toISOString().split('T')[0];
    }
});

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value).replace('R$', '').trim();
}

const valorNfInput = document.getElementById('valorNf');
valorNfInput.addEventListener('input', function() {
    let valor = valorNfInput.value;
    valor = valor.replace(/\D/g, '');
    valor = formatCurrency(parseFloat(valor) / 100);
    valorNfInput.value = valor;
});


// Função para preencher a tabela com os dados
const preencherTabelaNf = (dados) => {
    limparTabelaNf()
    const tbody = document.querySelector('#tabelaNfs tbody');
    if (!dados || dados.length === 0) {
        // Caso não haja dados informados, você pode tomar alguma ação aqui
        console.log('Não há dados para preencher a tabela.');
        
        return;
    }

    dados.forEach(nf => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nf.chave_acesso}</td>
            <td>${nf.num_nf}</td>
            <td>${nf.volume}</td>
            <td>${nf.peso}</td>
            <td>${nf.m3}</td>
            <td>R$ ${nf.valor_nf}</td>
            <td>${nf.natureza}</td>
            <td>${nf.tipo_documento}</td>
            <td><label class="badge badge-danger btn btn-danger">Excluir</label></td>
            <td><label class="badge badge-primary btn btn-primary">Alterar</label></td>
        `;
        tbody.appendChild(row);
    });
}

const preencherFormularioNf= async (chaveAcesso)=> {
    
    let idDtc = $('#numDtc').val()
    let nota =await buscaNf(idDtc,chaveAcesso)
    populaFormNf(nota)
}

const populaFormNf = (nota)=>{
    $('#chaveAcessoNf').val(nota.nota_fiscal.chave_acesso)
    $('#numNf').val(nota.nota_fiscal.num_nf)
    $('#dataEmissaoNf').val(nota.nota_fiscal.data_emissao)
    $('#natureza').val(nota.nota_fiscal.natureza)
    $('#especieNf').val(nota.nota_fiscal.especie)
    $('#tipoDocumento').val(nota.nota_fiscal.tipo_documento)
    $('#qtdeNf').val(nota.nota_fiscal.volume)
    $('#pesoNf').val(nota.nota_fiscal.peso)
    $('#resultM3Peso').val(nota.nota_fiscal.m3)
    $('#valorNf').val(nota.nota_fiscal.valor_nf)
}



// // Função para capturar o clique nos botões Excluir e Alterar
 function capturarClique(event) {

     const button = event.target;
     const row = button.closest('tr');
       if (button.classList.contains('btn-primary')) {
         // Clique no botão Alterar
         preencherFormularioNf(row); // Preencher o formulário com os dados da linha
     }
 }

// Adicionar os manipuladores de evento aos botões Excluir e Alterar
const table = document.querySelector('.table');
table.addEventListener('click', capturarClique);

function limparTabelaNf() {
    let tabela = document.getElementById('tabelaNfs'); // Seleciona a tabela pela classe
    let tbody = tabela.querySelector('tbody'); // Seleciona o corpo da tabela
    // Remove todos os elementos <tr> (linhas) do corpo da tabela
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

document.getElementById("resultM3Peso").addEventListener('keydown',(e)=>{
    if (e.shiftKey && e.key === "F1") {
        textResultadoM3 = 'resultM3Peso';
        $("#modalCalcM3").modal("show");
        document.getElementById('altura').focus();
    }
});


let chaveAcesso = document.getElementById('chaveAcessoNf')
chaveAcesso.addEventListener('blur',()=>{
    let nf = getNfChaveAcesso(chaveAcesso.value)
    document.getElementById('numNf').value = nf
});

const getNfChaveAcesso = (chaveAcesso) => {
    if (typeof chaveAcesso !== 'string' || chaveAcesso.length !== 44) {
      throw new Error('Chave de acesso inválida.');
    }
    const numeroNf = chaveAcesso.substring(25, 34).replace(/^0+/, '');
    return numeroNf;
  };

const getCnpjChaveAcesso = (chaveAcesso) => {
    if (typeof chaveAcesso !== 'string' || chaveAcesso.length !== 44) {
        throw new Error('Chave de acesso inválida.');
    }

    const cnpj = chaveAcesso.substring(6, 20);
    return cnpj;
};

const checaChaveAcessoCnpjRem = (chaveAcesso)=>{
    let checkCnpjRem = document.getElementById('cnpjRem')
    let cnpjNf = getCnpjChaveAcesso(chaveAcesso)

    switch (checkCnpjRem.value == cnpjNf) {
        case true:
            return true
        case false:
            return false
    
        default:
            break;
    }
}

// // Aplicar validação ao campo de entrada "qtdeNf"
// const qtdeNfInput = document.getElementById('qtdeNf');
// validarNumeroInteiroInput(qtdeNfInput);

// // Aplicar validação ao campo de entrada "pesoNf"
// const pesoNfInput = document.getElementById('pesoNf');
// validarNumeroInteiroInput(pesoNfInput);





