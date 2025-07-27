document.getElementById('selectUfEntradaNfs').addEventListener('change', async function() {
    const apiService = new ApiService();
    const url = "/endereco/readMunicipio/";
    let dados = {uf: pegarTextoSelect('selectUfEntradaNfs')};
    // Enviando dados via POST e armazenando o resultado em uma variável
    const resultadoGet = await apiService.postData(url, dados);
    carregaSelect('selectCidadeEntradaNfs', resultadoGet.municipios, 'uf', 'municipio', 'Selecione a cidade');
});
