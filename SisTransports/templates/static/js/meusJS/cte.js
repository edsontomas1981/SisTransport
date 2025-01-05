class Cte {
    async update_status_cte(idCte,status) {
        const apiService = new ApiService();
        const url = "/operacional/update_status_cte/";
        const dados = { id_cte:idCte, status:status };
        // Enviando dados via POST e armazenando o resultado em uma variável
        const resultadoPost = await apiService.postData(url, dados);
        console.log(resultadoPost);
    }
}

