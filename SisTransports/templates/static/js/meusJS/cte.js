class Cte {
	constructor() {
		this.jsonCte = null;
	}

	async update_status_cte(idCte,status) {
		try {
			const apiService = new ApiService();
			const url = "/operacional/update_status_cte/";
			const dados = { id_cte:idCte, status:status };
			// Enviando dados via POST e armazenando o resultado em uma variável
			const resultadoPost = await apiService.postData(url, dados);
			return resultadoPost
		} catch (error) {
			console.error(error)
		}
	}

	async carregaCtePorDtc(idDtc) {
		try {
			const apiService = new ApiService();
			const url = "/operacional/get_cte_dtc/";
			const dados = { idDtc:idDtc};
			const resultadoPost = await apiService.postData(url, dados);
			this.jsonCte = resultadoPost.cte;
		} catch (error) {
			console.error(error)
		}
	}
   
}

