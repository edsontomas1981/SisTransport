class CalculaFrete{
    constructor(tabela,volumes,peso,vlrNf,m3){
        this.tabela=tabela
        this.pesoReal=peso
        this.m3=m3
        this.vlrNf=vlrNf
        this.listaFrete=[]
    }

    setPesoCubado=()=>{
        this.pesoCubado=this.m3 > 0 ?  this.m3*this.tabela.fatorCubagem : 0
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
    calculaFretePeso=()=>{
        this.calculaPesoACalcular()
        alert(this.pesoFaturado)
        // this.listaFrete.push()
    }

    calculaPesoACalcular=()=>{
        alert ("Peso Real : " + this.pesoReal + "Peso Cubado : " + this.pesoCubado)
        this.pesoFaturado=this.pesoCubado > this.pesoReal ?  this.pesoCubado : this.pesoReal
    }

    calculaFreteValor=()=>{
    }
    calculaFreteUnidade=()=>{
    }
    calculaIcms=()=>{
    }
    calculaAdvalor=()=>{
    }
    calculaGris=()=>{
    }
    calculaPedagio=()=>{
    }

    adicionaDespacho=()=>{
    }
    adicionaOutros=()=>{
    }
}
