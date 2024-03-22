const getDadosEmissor = async()=>{
    let dadosEmissores = await connEndpoint('/operacional/get_emissores/', {});
    return dadosEmissores.emissores
}

const carregaEmissoresPorId = (idDesejado) => {
    // Obtém os dados do emissor usando a função dadosEmissor
    var emissores = getDadosEmissor();
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

const popularSelectEmissor = async (idSelect) => {
    const selectBox = document.getElementById(idSelect);
    const dados = await getDadosEmissor();
    dados.forEach(dado => {
        const option = document.createElement('option');
        option.value = dado.id;
        option.text = `${dado.siglaFilial} - ${dado.razao}`;
        selectBox.appendChild(option);
    });
};
