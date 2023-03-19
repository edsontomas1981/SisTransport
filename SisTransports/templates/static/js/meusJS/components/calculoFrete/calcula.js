class CalculaFrete{
    constructor(tabela,volumes,peso,vlrNf,m3){
        this.tabela=tabela
        this.pesoReal=peso
        this.m3=m3
        this.vlrNf=vlrNf
        this.listaFrete= {}
    }
 
    setPesoCubado=()=>{
        this.pesoCubado=this.m3 > 0 ?  this.m3*this.tabela.fatorCubagem : 0
    }

    setVlrColeta=(vlrColeta)=>{
        this.vlrColeta=vlrColeta
        this.listaFrete['vlrColeta']=parseFloat(this.vlrColeta)
    }

    // verifica se peso real e maior que a cubagem
    calculaPesoACalcular=()=>{
        this.setPesoCubado();
        this.pesoFaturado=this.pesoCubado > this.pesoReal ?  this.pesoCubado : this.pesoReal
    }

    calculaFretePeso= async ()=>{
        this.calculaPesoACalcular();
        if(this.pesoEstaNaFaixa()){
            alert('peso esta na faixa')
            this.listaFrete['fretePeso']=this.vlrFreteFaixa
            return this.listaFrete
        }else{
                alert('tem faixa mas peso nao esta na faixa')
                this.calculaAdvalor();
                this.calculaGris();
                this.adicionaDespacho();
                this.adicionaOutros();
                this.calculaPedagio();
                this.listaFrete['fretePeso']=this.pesoFaturado*this.tabela.frete
                this.calculaTotal()
                console.log(this.subTotal)
        }
    }

    calculaTotal=()=>{
        this.subTotal=0
        for (const i in this.listaFrete) {
            this.subTotal+=this.listaFrete[i]
        }
    }

    calculaAdvalor=()=>{
        let percentual = (this.tabela.adValor/1000)
        let advalor = this.vlrNf*percentual
        this.listaFrete['advalor']=advalor
    }

    calculaGris=()=>{
        let percentual = (this.tabela.gris/100)
        let gris = this.vlrNf*percentual
        this.listaFrete['gris']=gris
    }
    adicionaDespacho=()=>{
        this.listaFrete['despacho']=parseFloat(this.tabela.despacho)
    }
    adicionaOutros=()=>{
        this.listaFrete['outros']=parseFloat(this.tabela.outros)
    }

    calculaPedagio=()=>{
        let peso =this.calculaPesoPedagio()
        if(this.tabela.tipoPedagio==1) {
            this.listaFrete['vlrPedagio']=parseFloat(this.tabela.pedagio)
        }else if (this.tabela.tipoPedagio==2){
            this.listaFrete['vlrPedagio'] = peso * this.tabela.pedagio
        }
    }
    calculaPesoPedagio=()=>{
        let pesoPedagio=Math.ceil(this.pesoFaturado/100)
        return pesoPedagio
    }

    pesoEstaNaFaixa=()=>{
        for (let i = 0; i < this.tabela.faixas.length; i++) {
            if (this.between(this.pesoFaturado,this.tabela.faixas[i].faixaInicial,this.tabela.faixas[i].faixaFinal)){
                this.vlrFreteFaixa=this.tabela.faixas[i].vlrFaixa
                return true
                break
            }
        }
    }

    between=(value, min, max)=> {
        return value >= min && value <= max;
    }
    aliquotaIcms=()=>{
        this.aliquota=(100-this.tabela.aliquotaIcms)/100;
    }
    calculaFrete=()=>{
        switch (this.tabela['tipoCalculo']) {
            case 1:
                alert('fretePeso')
                this.calculaFretePeso()
                break
            case 2:
                this.aliquotaIcms()
                alert('frete Valor')
                break
            case 3:
                this.aliquotaIcms()
                alert('frete Unidade')
                break
            default:
                break
        }
    }


}
