class CalculoFreteCte {
    constructor(tabela,dadosNf) {
        this.tabelaSelecionada = tabela;
        console.log(this.tabelaSelecionada)
        this.listaTabelas = {}; // Supondo que listaTabelas é uma variável global
        this.tabela = null;
        this.vlrColeta = null;
        this.dadosNf = this.dadosNf
    }

    async calculoFreteGeral(event) {
        this.tabelaSelecionada = event.target.value;

        if (this.tabelaSelecionada !== 0) {
            const valores = Object.values(this.listaTabelas);
            const tabelasSelecionadas = valores.find(listaTabelas => listaTabelas.id == this.tabelaSelecionada);
            this.tabela = tabelasSelecionadas || null;

            await this.showSwal();
        }
    }

    async showSwal() {
        const result = await Swal.fire({
            title: 'Deseja adicionar um valor de coleta?',
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
        });

        if (result.isConfirmed) {
            const { value: vlrColeta } = await Swal.fire({
                input: 'text',
                inputLabel: 'Insira o valor em R$',
                inputPlaceholder: 'Exemplo: 25,99'
        });

            this.calculoCotacao(vlrColeta);
        } else if (result.isDenied) {
            this.calculoCotacao();
        }
    }

    calculoCotacao(vlrColeta) {
        let calcula = new CalculaFrete(this.tabela, geraDadosCotacao());
        if (vlrColeta) {
            this.vlrColeta = vlrColeta;
            calcula.setVlrColeta(vlrColeta);
        }
        calcula.calculaFrete();
        $('#pesoFaturadoCotacao').val(calcula.pesoFaturado);
        populaFreteCotacao(calcula.composicaoFrete);
        this.recalculaFreteCotacao();
        if (this.tabela.descricao) {
            this.preencheTabelaEmUso(this.tabela.descricao);
        } else {
            this.preencheTabelaEmUso('Frete informado');
        }
    }

    recalculaFreteCotacao() {
        let listaValores = [
            $('#fretePesoCotacao').val() || 0,
            $('#advalorCotacao').val() || 0,
            $('#vlrColetaCotacao').val() || 0,
            $('#grisCotacao').val() || 0,
            $('#pedagioCotacao').val() || 0,
            $('#despachoCotacao').val() || 0,
            $('#outrosCotacao').val() || 0
        ];
        this.calculaIcmsCotacao(listaValores);
    }

    calculaIcmsCotacao(listaValores) {
        // ... Restante do código da função
    }

    preencheTabelaEmUso(descricaoTabela) {
        let tabelaEmUso = document.getElementById("tabelaEmUso");
        tabelaEmUso.textContent = " | Tabela selecionada : " + descricaoTabela;
    }

}

$('.calculoCotacao').on('change', () => {
    let calculoFrete = new CalculoFrete();
    calculoFrete.recalculaFreteCotacao();
});

const populaCotacao = async(response) => {
    let calculoFrete = new CalculoFrete();
    calculoFrete.populaCotacao(response);
};
