var cotacoes

const exibirCotacoes = async ()=> {

    cotacoes = await carregaCotacoes()

    // Criar tabela HTML
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-sm'); // Adicione mais de uma classe à tabela
  
    table.innerHTML = `
      <thead>
        <tr>
          <th>Cotação</th>
          <th>Volumes</th>
          <th>Peso</th>
          <th>Valor Nf</th>
          <th>Valor Cotação</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${cotacoes.data.map((cotacao, index) => `
          <tr>
            <td>${cotacao.id}</td>
            <td>${cotacao.info.qtde}</td>
            <td>${cotacao.info.pesoFaturado}</td>
            <td>${cotacao.info.vlrNf}</td>
            <td>${cotacao.info.totalFrete}</td>
            <td><button class="btn btn-primary text-white form-control-sm" onclick="selecionarCotacao(${index})">Add</button></td>
          </tr>
        `).join('')}
      </tbody>
    `;

    if (cotacoes.data.length>0){
        // Opções do alerta
        const options = {
        title: 'Selecione uma Cotação',
        html: table,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        showConfirmButton: false, // Oculta o botão de confirmação
        footer: '' // Remove o rodapé que contém os botões padrão
      };
    
        // Exibe o alerta
        Swal.fire(options).then((result) => {
        if (result.isConfirmed) {
            const selectedCotacao = cotacoes[result.value];
            Swal.fire(`Você selecionou a Cotação ${selectedCotacao.cotacao} - Valor: ${selectedCotacao.valorCotacao}`);
        }
        });
    }
  }

  const carregaCotacoes = async()=>{
    let cnpjTomador = document.getElementById('cnpjTomador')
    let data = {'cnpjTomador':cnpjTomador.value}
    let conexao = new Conexao('/comercial/cotacao/readCotacaoCnpj/', data);
    try {
        const cotacoes = await conexao.sendPostRequest();
            return cotacoes
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
  }


// Função para lidar com a seleção da cotação
const selecionarCotacao=(index)=> {
    const selectedCotacao = cotacoes.data[index];
    // Feche o Swal após a seleção
    Swal.close();
    let cotacaoSelecionada = document.getElementById('cotacaoSelecionada')
    let valorCotacaoSelecionada = document.getElementById('vlrCotacaoSelecionada')

    valorCotacaoSelecionada.value=cotacoes.data[index].info.totalFrete;
    cotacaoSelecionada.value=cotacoes.data[index].id;
    populaFreteCotacaoCte(selectedCotacao);
}

const populaFreteCotacaoCte=(cotacao)=>{
    document.getElementById('tabelaFreteCte').value = "Cotação nº : " + cotacao.id;
    document.getElementById('freteCalculadoCte').value = parseFloat(cotacao.info.freteValor).toFixed(2);
    document.getElementById('grisCte').value = parseFloat(cotacao.info.gris).toFixed(2);
    document.getElementById('advalorCte').value = parseFloat(cotacao.info.adValor).toFixed(2);
    document.getElementById('despachoCte').value = parseFloat(cotacao.info.despacho).toFixed(2);
    document.getElementById('pedagioCte').value = parseFloat(cotacao.info.pedagio).toFixed(2);
    document.getElementById('outrosCte').value = parseFloat(cotacao.info.outros).toFixed(2);
    document.getElementById('baseCalculoCte').value = parseFloat(cotacao.info.baseDeCalculo).toFixed(2);
    document.getElementById('aliquotaCte').value = parseFloat(cotacao.info.aliquota);
    document.getElementById('icmsCte').value = parseFloat(cotacao.info.icmsRS).toFixed(2);
    document.getElementById('freteTotalCte').value = parseFloat(cotacao.info.totalFrete).toFixed(2);
    document.getElementById('observacaoCte').value = `Cotação Nº ${cotacao.id} por ${cotacao.info.usuario}`;
    document.getElementById('coletaCte').value = parseFloat(cotacao.info.vlrColeta).toFixed(2);
}