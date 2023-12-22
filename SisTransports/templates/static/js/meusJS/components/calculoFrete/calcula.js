class CalculaFrete{
    constructor(tabela,dados){
        this.tabela=tabela
        this.pesoReal=dados['peso']
        this.m3=dados['m3']
        this.vlrNf=dados['vlrNf']
        this.volumes=dados['volumes']
        // this.icmsSimNao=dados['icmsSimNao']
        this.composicaoFrete= {}

    }
    setPesoCubado=()=>{
        this.pesoCubado=this.m3 > 0 ?  this.m3*this.tabela.fatorCubagem : 0
    }

    setVlrColeta=(vlrColeta)=>{
        this.vlrColeta=vlrColeta
        this.composicaoFrete['vlrColeta']=parseFloat(this.vlrColeta)
    }
    calculaPesoACalcular=()=>{
        this.setPesoCubado();
        this.pesoFaturado=this.pesoCubado > this.pesoReal ?  this.pesoCubado : this.pesoReal
    }
    calculaFretePeso=()=>{
        this.calculaPesoACalcular();
        if(this.pesoEstaNaFaixa()){
            this.composicaoFrete['fretePeso']=this.vlrFreteFaixa
            this.calculaTotal()
            return this.composicaoFrete
        }else{
                this.calculaAdvalor();
                this.calculaGris();
                this.adicionaDespacho();
                this.adicionaOutros();
                this.calculaPedagio();
                this.composicaoFrete['fretePeso']=this.pesoFaturado*this.tabela.frete
                this.calculaTotal()
        }
    }
    calculaFreteValor=()=>{
        this.calculaPesoACalcular();
        if(this.pesoEstaNaFaixa()){
            this.composicaoFrete['fretePeso']=this.vlrFreteFaixa
            this.calculaTotal()
            return this.composicaoFrete
        }else{
            this.calculaAdvalor();
            this.calculaGris();
            this.adicionaDespacho();
            this.adicionaOutros();
            this.calculaPedagio();
            this.composicaoFrete['fretePeso']=(this.vlrNf*this.tabela.frete)/100
            this.calculaTotal()
        }
    }
    calculaFreteVolume= ()=>{
        this.calculaPesoACalcular();
        if(this.pesoEstaNaFaixa()){
            this.composicaoFrete['fretePeso']=this.vlrFreteFaixa
            this.calculaTotal()
            return this.composicaoFrete
        }else{
            this.calculaAdvalor();
            this.calculaGris();
            this.adicionaDespacho();
            this.adicionaOutros();
            this.calculaPedagio();
            this.composicaoFrete['fretePeso']=this.volumes*this.tabela.frete
            this.calculaTotal()

        }
    }
    calculaTotal=async()=>{
        this.aliquotaIcms()
        this.tabela.icmsIncluso
        this.composicaoFrete['vlrColeta']=this.vlrColeta ? this.vlrColeta : 0
        this.subtotal=0
        for (const i in this.composicaoFrete) {
            this.subtotal+=parseFloat(this.composicaoFrete[i])
        }
        if(this.tabela.icmsIncluso){
            this.freteTotal = parseFloat(this.subtotal)/parseFloat(this.aliquota)
            this.icms=parseFloat(this.freteTotal)-parseFloat(this.subtotal)
            this.baseDeCalculo=this.freteTotal
        }else{
            this.freteTotal = parseFloat(this.subtotal)
            this.icms=(this.subtotal*parseFloat(this.tabela.aliquotaIcms))/100
            this.baseDeCalculo=this.freteTotal
        }
        this.composicaoFrete['baseDeCalculo']=this.baseDeCalculo
        this.composicaoFrete['freteTotal']=this.freteTotal
        this.composicaoFrete['icms']=this.icms
        this.composicaoFrete['aliquota']=this.tabela.aliquotaIcms
    }

    calculaAdvalor=()=>{
        let percentual = (this.tabela.adValor/1000)
        let advalor = this.vlrNf*percentual
        this.composicaoFrete['advalor']=advalor
    }

    calculaGris=()=>{
        let percentual = (this.tabela.gris/100)
        let gris = this.vlrNf*percentual
        this.composicaoFrete['gris']=gris
    }
    adicionaDespacho=()=>{
        this.composicaoFrete['despacho']=parseFloat(this.tabela.despacho)
    }
    adicionaOutros=()=>{
        this.composicaoFrete['outros']=parseFloat(this.tabela.outros)
    }
    calculaPedagio=()=>{
        let peso =this.calculaPesoPedagio()
        if(this.tabela.tipoPedagio==1) {
            this.composicaoFrete['vlrPedagio']=parseFloat(this.tabela.pedagio)
        }else if (this.tabela.tipoPedagio==2){
            this.composicaoFrete['vlrPedagio'] = peso * this.tabela.pedagio
        }
    }
    calculaPesoPedagio=()=>{
        let pesoPedagio=Math.ceil(this.pesoFaturado/100)
        return pesoPedagio
    }

    pesoEstaNaFaixa=()=>{
        if (this.tabela.faixas){
            for (let i = 0; i < this.tabela.faixas.length; i++) {
                if (this.between(this.pesoFaturado,this.tabela.faixas[i].faixaInicial,this.tabela.faixas[i].faixaFinal)){
                    this.vlrFreteFaixa=this.tabela.faixas[i].vlrFaixa
                    return true
                }
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
                this.calculaFreteVolume()
                break
            default:
                break
        }
    }
}
