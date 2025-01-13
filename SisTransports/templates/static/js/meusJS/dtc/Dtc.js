class Dtc {
	constructor() {
		this.jsonDtc = null;
        this.apiService = new ApiService()
        this.url = ''
        this.dados = {}
        this.resultado  = null
	}

	async getOcorrenciasDtc(idDtc) {
		try {
			this.url = "/operacional/get_ocorrencias_dtc/";
			this.dados = { id_dtc:idDtc};
			this.resultado = await this.apiService.postData(this.url, this.dados);
			return this.resultado
		} catch (error) {
			console.error(error)
		}
	}

	async carregaCtePorDtc(idDtc) {
		try {
			this.url = "/operacional/get_cte_dtc/";
			this.dados = { idDtc:idDtc};
			this.resultadoPost = await this.apiService.postData(this.url, this.dados);
			this.jsonDtc = resultadoPost.cte;
		} catch (error) {
			console.error(error)
		}
	}

    async carregaColetasPorDtc(idDtc){
        try {
          this.url = "/operacional/get_coleta_dtc/";
          this.dados = { idDtc:idDtc };
          this.resultado = await this.apiService.postData(this.url, this.dados);
          this.jsonColeta = resultado.coleta
          } catch (error) {
          console.error(error)
        }
      }
   
}
