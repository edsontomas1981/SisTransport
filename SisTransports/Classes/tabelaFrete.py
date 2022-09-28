from comercial.models.tabelaFrete import TabelaFrete as TblFrete


class TabelaFrete:
    def __init__(self):
        self.tabela=None

    def createTabela(self, parceiro=None, rota=None, descricao=None, frete=None, tipoCalculo=None
                     , adValor=None, gris=None, despacho=None, outros=None, pedagio=None, tipoPedagio=None
                     , cubagem=None, fatorCubagem=None, icmsIncluso=True, bloqueada=False):

        self.tabela = TblFrete()
        self.tabela.descricao = descricao
        self.tabela.icmsIncluso = icmsIncluso
        self.tabela.bloqueada = bloqueada
        self.tabela.frete = frete
        self.tabela.tipoCalculo = tipoCalculo
        self.tabela.adValor = adValor
        self.tabela.gris = gris
        self.tabela.despacho = despacho
        self.tabela.outros = outros
        self.tabela.pedagio = pedagio
        self.tabela.tipoPedagio = tipoPedagio
        self.tabela.cubagem = cubagem
        self.tabela.fatorCubagem = fatorCubagem
        self.tabela.save()
        # Avaliar a necessidade de salvar um proprietário da tabela juntamente com a criação da tabela.
        if parceiro:
            self.tabela.parceiro.add(parceiro)
            self.tabela.save()
            print("salvou o parceiro")
        if rota:
            self.tabela.rota=rota
            self.tabela.save()
        self.tabela.toDict()

    def anexaTabelaAoParceiro(self, parceiro: object, idTabela):
        if TblFrete.objects.filter(id=idTabela).exists():
            self.tabela = TblFrete.objects.filter(id=idTabela).get()
            self.tabela.parceiro.add(parceiro)
            self.tabela.save()

    def readTabela(idTabela):
        if TblFrete.objects.filter(id=idTabela).exists():
            tabela = TblFrete.objects.filter(id=idTabela).get()
            print(dir(tabela))
            return tabela.toDict()
        else:
            return False

    def deleteTabela(idTabela):
        if TblFrete.objects.filter(id=idTabela).exists():
            tabela = TblFrete.objects.filter(id=idTabela).get()
            tabela.delete()
            return True
        else:
            return False

    def toDict(self):
        return self.tabela.toDict()
    
    def updateTabela(self, idTabela, parceiro=None, rota=None, descricao=None,
                     frete=None, tipoCalculo=None, adValor=None, gris=None, despacho=None,
                     outros=None, pedagio=None, tipoPedagio=None, cubagem=None,
                     fatorCubagem=None, icmsIncluso=True, bloqueada=False):

        if TblFrete.objects.filter(id=idTabela).exists():
            self.tabela = TblFrete.objects.filter(id=idTabela).get()
            self.tabela.descricao = descricao
            self.tabela.icmsIncluso = icmsIncluso
            self.tabela.bloqueada = bloqueada
            self.tabela.frete = frete
            self.tabela.tipoCalculo = tipoCalculo
            self.tabela.adValor = adValor
            self.tabela.gris = gris
            self.tabela.despacho = despacho
            self.tabela.outros = outros
            self.tabela.pedagio = pedagio
            self.tabela.tipoPedagio = tipoPedagio
            self.tabela.cubagem = cubagem
            self.tabela.fatorCubagem = fatorCubagem
            self.tabela.save()
            return self.tabela.toDict()
        else:
            return False
