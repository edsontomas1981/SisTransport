from comercial.models.tabelaFrete import TabelaFrete as TblFrete
from Classes.parceiros import Parceiros 
from parceiros.models.parceiros import Parceiros as MdlParceiros


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
        if rota:
            self.tabela.rota=rota
        
        self.tabela.save()

        return 200

    def updateTabela(self,idTabela,parceiro=None,rota=None,descricao=None,frete=None,
                     tipoCalculo=None,adValor=None,gris=None,despacho=None,outros=None, 
                     pedagio=None,tipoPedagio=None,cubagem=None,fatorCubagem=None, 
                     icmsIncluso=True,bloqueada=False,tipoTabela=None,freteMinimo=None):
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
        self.tabela.tipoTabela= tipoTabela
        self.tabela.freteMinimo = freteMinimo

        # if rota:
        #     self.tabela.rota.add(rota)
        # else:
        #     self.tabela.rota=None
        
        self.tabela.save()

        return self.tabela.toDict(),200

    def anexaTabelaAoParceiro(self,cnpjParc):
        if MdlParceiros.objects.filter(cnpj_cpf=cnpjParc).exists():
            parceiro=MdlParceiros.objects.filter(cnpj_cpf=cnpjParc).get()
            self.tabela.parceiro.add(parceiro)
            self.tabela.save()
            return 200
        else :
            return 400
  
    def readTabela(self,idTabela):
        if TblFrete.objects.filter(id=idTabela).exists():
            self.tabela = TblFrete.objects.filter(id=idTabela).get()
            return self.tabela,200
        else:
            return False
        
    def getTodasTabelas():
        tabelas = TblFrete.objects.all()
        return tabelas
        
    def deleteTabela(self,idTabela):
        if TblFrete.objects.filter(id=idTabela).exists():
            self.tabela = TblFrete.objects.get(id=idTabela).delete()
            return True
        else:
            return False

    def filtraTabelas(self,filtro):
        self.tabela=TblFrete.objects.filter(descricao__contains=filtro)
        return self.tabela

    def selecionaTabCnpj(self):
        tabCnpj=[]
        if MdlParceiros.objects.filter(tabelafrete__id=self.tabela.id):
            parceiros=MdlParceiros.objects.filter(tabelafrete__id=self.tabela.id)
            for parceiro in parceiros:
                tabCnpj.append(parceiro.to_dict())
            return tabCnpj
        else:
            return False

    def toDict(self):
        return self.tabela.toDict()
    

