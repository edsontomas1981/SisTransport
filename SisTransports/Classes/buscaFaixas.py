from comercial.classes.tblFaixa import TabelaFaixa

def carreregaFaixas(idTabela):
    faixas=TabelaFaixa()
    faixas.readFaixas(idTabela)
