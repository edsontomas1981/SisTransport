class Parceiro{
    constructor(cnpj,sufixo) {
        this.cnpj=cnpj
        this.sufixo=sufixo
    }

    carregaDadosParceiro(response){
        this.id=response.dados[0].id
        this.raz_soc=response.dados[0].raz_soc
        this.fantasia=response.dados[0].insc
        this.endereco=response.dados[0].endereco_fk
    }
    getRazao(){
        return this.raz_soc
    }

    getParceiro(){
        let url = '/busca_parceiro/'
        let postData = $('form').serialize();
        postData += '&cnpj_cpf=' + this.cnpj;
        dados = {'url':url,'id':postData}
        conectaBackEnd(dados,this.carregaDadosParceiro.bind(this))
    }

  }


