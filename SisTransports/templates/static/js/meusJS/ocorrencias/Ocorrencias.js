class OcorrenciasManifesto {
    constructor() {
        this.jsonOcorrencias = null;
    }

    async getOcorrencias(){
        try {
            let apiService = new ApiService();
            let url = "/operacional/get_all_ocorrencias/"
            let response = await apiService.getData(url);
            this.jsonOcorrencias = response;

        } catch (error) {
            console.error(error)            
        }
    }

    async getOcorrenciasPorDtc(idDtc){
        try {
            let apiService = new ApiService();
            let url = "/operacional/get_ocorrencias_por_dtc/"
            let data = {
                'idDtc': idDtc
            }
            let response = await apiService.postData(url,data);
            this.jsonOcorrencias = response;

        } catch (error) {
            console.error(error)
        }
    }
}