from comercial.models.tabelaFrete import TabelaFrete as TblFrete
from Classes.parceiros import Parceiros 

class TabelaFrete:
    def __init__(self):
        self.tabela=None

    def createTabela(self,parceiro=None, rota=None, descricao=None,frete=None,
                      adValor=None, gris=None, despacho=None, outros=None, pedagio=None, 
                     tipoPedagio=None,cubagem=None, fatorCubagem=None, icmsIncluso=True,
                     tipoTabela=None,freteMinimo=None, bloqueada=False, tipoCalculo=None):

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
        self.tabela.tipoTabela= tipoTabela
        self.tabela.freteMinimo = freteMinimo
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

    def anexaTabelaAoParceiro(self, parceiro: object, idTabela):
        if TblFrete.objects.filter(id=idTabela).exists():
            self.tabela = TblFrete.objects.filter(id=idTabela).get()
            self.tabela.parceiro.add(parceiro)
            self.tabela.save()
  
    def readTabela(self,idTabela):
        if TblFrete.objects.filter(id=idTabela).exists():
            self.tabela = TblFrete.objects.filter(id=idTabela).get()
        else:
            return False
        
    def getTodasTabelas():
        tabelas = TblFrete.objects.all()
        return tabelas
        
    def cnpjVinculado(self):
        cnpjs=[]
        for i in self.tabela.parceiro.all():
            parceiro=Parceiros.getParceiro(i.cnpj_cpf)
            cnpjs.append(parceiro.to_dict())
        return cnpjs

    def deleteTabela(idTabela):
        if TblFrete.objects.filter(id=idTabela).exists():
            tabela = TblFrete.objects.filter(id=idTabela).get()
            tabela.delete()
            return True
        else:
            return False

    def filtraTabelas(self,filtro):
        self.tabela=TblFrete.objects.filter(descricao__contains=filtro)
        return self.tabela

    def toDict(self):
        return self.tabela.toDict()
    

