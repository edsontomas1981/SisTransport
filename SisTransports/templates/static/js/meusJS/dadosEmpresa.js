const dadosEmissor = ()=>{
    return [{'id':1,
            'siglaFilial':'São Paulo(SAO)',
            'cnpj':'23926683000299',
            'razao':'Serafim Sao Paulo',
            'endereco':'Rua Nova Veneza , 172',
            'aliquota':12
             },{'id':2,
             'siglaFilial':'Teresina(THE)',
             'cnpj':'23926683000108',
             'razao':'Serafim Teresina',
             'endereco':'Rua Nova Veneza , 172',
             'aliquota':7
              }]
}

const carregaEmissoresPorId = (idDesejado) => {
    // Obtém os dados do emissor usando a função dadosEmissor
    var emissores = dadosEmissor();
    let filialEmissora = {}
    // Itera sobre os dados do emissor e adiciona opções ao select
    emissores.forEach((element) => {
        // Verifica se o ID do emissor corresponde ao ID desejado
        if (element.id == idDesejado) {
            filialEmissora = element
        }
    });

    return filialEmissora

}

const popularSelectEmissor = (idSelect) => {
    const selectBox = document.getElementById(idSelect);
    const dados = dadosEmissor();
    
    dados.forEach(dado => {
        const option = document.createElement('option');
        option.value = dado.id;
        option.text = `${dado.siglaFilial} - ${dado.razao}`;
        selectBox.appendChild(option);
    });
};
