from comercial.models.tabelaFrete import TabelaFrete as TblFrete

class TabelaFrete():
    def __init__(self):
        pass
    def __str__(self):
        return self.tabela.descricao


    def incluiTabela(self,parceiro=None,rota=None,descricao=None,frete=None,tipoCalculo=None
                     ,adValor=None,gris=None,despacho=None,outros=None,pedagio=None,tipoPedagio=None
                     ,cubagem=None,fatorCubagem=None,icmsIncluso=True,bloqueada=False):

        self.tabela=TblFrete()
        # self.tabela.rota=rota
        self.tabela.descricao=descricao
        self.tabela.icmsIncluso=icmsIncluso
        self.tabela.bloqueada=bloqueada
        self.tabela.frete=frete
        self.tabela.tipoCalculo=tipoCalculo
        self.tabela.adValor=adValor
        self.tabela.gris=gris
        self.tabela.despacho=despacho
        self.tabela.outros=outros
        self.tabela.pedagio=pedagio
        self.tabela.tipoPedagio=tipoPedagio
        self.tabela.cubagem=cubagem
        self.tabela.fatorCubagem=fatorCubagem
        self.tabela.save()
        self.tabela.parceiro.add(parceiro)            
        self.tabela.save()
        
    def anexaTabelaAoParceiro(self,parceiro:object,idTabela):
        if TblFrete.objects.filter(id=idTabela).exists():
            self.tabela=TblFrete.objects.filter(id=idTabela).get()
            self.tabela.parceiro.add(parceiro)            
            self.tabela.save()
    
    def readTabela(idTabela):
        if TblFrete.objects.filter(id=idTabela).exists():
            tabela=TblFrete.objects.filter(id=idTabela).get()
            return tabela
        else:
            return False
        
    def deleteTabela(idTabela):
        if TblFrete.objects.filter(id=idTabela).exists():
            tabela=TblFrete.objects.filter(id=idTabela).get()
            tabela.delete()
            return True
        else:
            return False            
        
    def updateTabela(self,idTabela,parceiro=None,rota=None,descricao=None,
                     frete=None,tipoCalculo=None,adValor=None,gris=None,despacho=None,
                     outros=None,pedagio=None,tipoPedagio=None,cubagem=None,
                     fatorCubagem=None,icmsIncluso=True,bloqueada=False):
        
        if TblFrete.objects.filter(id=idTabela).exists():
            self.tabela=TblFrete.objects.filter(id=idTabela).get()
            self.tabela.descricao=descricao
            self.tabela.icmsIncluso=icmsIncluso
            self.tabela.bloqueada=bloqueada
            self.tabela.frete=frete
            self.tabela.tipoCalculo=tipoCalculo
            self.tabela.adValor=adValor
            self.tabela.gris=gris
            self.tabela.despacho=despacho
            self.tabela.outros=outros
            self.tabela.pedagio=pedagio
            self.tabela.tipoPedagio=tipoPedagio
            self.tabela.cubagem=cubagem
            self.tabela.fatorCubagem=fatorCubagem
            self.tabela.save()
            self.tabela.parceiro.add(parceiro)            
            self.tabela.save()
            return True
        else:
            return False 
            