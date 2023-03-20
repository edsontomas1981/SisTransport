class CalculaFrete{
    constructor(tabela,dados){
        this.tabela=tabela
        this.pesoReal=dados['peso']
        this.m3=dados['m3']
        this.vlrNf=dados['vlrNf']
        this.volumes=dados['volumes']
        this.icmsSimNao=dados['icmsSimNao']
        this.listaFrete= {}

    }
    setPesoCubado=()=>{
        this.pesoCubado=this.m3 > 0 ?  this.m3*this.tabela.fatorCubagem : 0
    }
    setVlrColeta=(vlrColeta)=>{
        this.vlrColeta=vlrColeta
        this.listaFrete['vlrColeta']=parseFloat(this.vlrColeta)
    }
    calculaPesoACalcular=()=>{
        this.setPesoCubado();
        this.pesoFaturado=this.pesoCubado > this.pesoReal ?  this.pesoCubado : this.pesoReal
    }
    calculaFretePeso=()=>{
        this.calculaPesoACalcular();
        if(this.pesoEstaNaFaixa()){
            this.listaFrete['fretePeso']=this.vlrFreteFaixa
            this.calculaTotal()
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
    calculaFreteValor=()=>{
        this.calculaPesoACalcular();
        if(this.pesoEstaNaFaixa()){
            this.listaFrete['fretePeso']=this.vlrFreteFaixa
            this.calculaTotal()
            return this.listaFrete
        }else{
            this.calculaAdvalor();
            this.calculaGris();
            this.adicionaDespacho();
            this.adicionaOutros();
            this.calculaPedagio();
            this.listaFrete['fretePeso']=(this.vlrNf*this.tabela.frete)/100
            this.calculaTotal()
            console.log(this.subTotal)
        }
    }
    calculaFreteVolume= ()=>{
        this.calculaPesoACalcular();
        if(this.pesoEstaNaFaixa()){
            this.listaFrete['fretePeso']=this.vlrFreteFaixa
            this.calculaTotal()
            return this.listaFrete
        }else{
            this.calculaAdvalor();
            this.calculaGris();
            this.adicionaDespacho();
            this.adicionaOutros();
            this.calculaPedagio();
            this.listaFrete['fretePeso']=this.volumes*this.tabela.frete
            this.calculaTotal()
            alert(this.freteTotal)
            alert(this.icms)
        }
    }
    calculaTotal=()=>{
        this.aliquotaIcms()
        this.subTotal=0
        for (const i in this.listaFrete) {
            this.subTotal+=this.listaFrete[i]
        }

        if(this.icmsSimNao){

            this.freteTotal = parseFloat(this.subTotal)/parseFloat(this.aliquota)
            this.icms=parseFloat(this.freteTotal)-parseFloat(this.subTotal)
        }else{
            this.subTotal = parseFloat(this.subTotal) < parseFloat(this.tabela.freteMinimo) ? parseFloat(this.tabela.freteMinimo) : parseFloat(this.subTotal);
            this.icms=parseFloat((this.subtotal*parseFloat(this.tabela.aliquotaIcms))/100)
            this.freteTotal=parseFloat(this.subtotal)
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
                this.calculaFretePeso()
                break
            case 2:
                this.calculaFreteValor()
                break
            case 3:
                alert('frete Unidade')
                this.calculaFreteVolume()
                break
            default:
                break
        }
    }


}
