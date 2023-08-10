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
    let result = await loadNfs($('#numDtc').val())
    if (result){
    preencherTabelaNf(result.nfs)
    }
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
const preencherTabelaNf=(dados)=> {
    const tbody = document.querySelector('.table tbody');
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

const preencherFormularioNf= async (row)=> {
    const cells = row.getElementsByTagName('td');
    let chave = cells[0].textContent
    let idDtc = $('#numDtc').val()
    let nota =await buscaNf(idDtc,chave)
    populaFormNf(nota)
    console.log(nota)
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



// Função para capturar o clique nos botões Excluir e Alterar
function capturarClique(event) {
    const button = event.target;
    const row = button.closest('tr');

    if (button.classList.contains('btn-danger')) {
        // Clique no botão Excluir
        row.remove(); // Remover a linha da tabela
    } else if (button.classList.contains('btn-primary')) {
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




