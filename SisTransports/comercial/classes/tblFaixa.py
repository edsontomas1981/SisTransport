from comercial.models.tabelaFaixa import TabelaFaixa as Faixa
from Classes.utils import toFloat, dprint


class TabelaFaixa:
    def __init__(self):
        self.faixa = None

    def verificaFaixa(self, idFaixa, idTabela):
        valorFaixa = idFaixa['valor']
        faixas = self.readFaixas(idTabela)
        if faixas:
            for i in faixas:
                if int(valorFaixa) in range(i.faixaInicial, i.faixaFinal+1):
                    return True, idFaixa['chave'], i
        return False, None, None

    def createFaixa(self, tblVinculada, inicial, final, vlrFaixa):
        faixaInicial = {'valor': inicial, 'chave': 'Inicial'}
        faixaFinal = {'valor': final, 'chave': 'Final'}
        self.faixa = Faixa()
        self.faixa.tblVinculada = tblVinculada
        checaInicial, campo, faixa = self.verificaFaixa(
            faixaInicial, tblVinculada.id)
        if not checaInicial:
            checaFinal, campo, faixa = self.verificaFaixa(
                faixaFinal, tblVinculada.id)
        if checaInicial or checaFinal:
            return 400, campo, faixa  # Faixa ja coberta
        else:
            self.faixa.faixaInicial = toFloat(inicial)
            self.faixa.faixaFinal = toFloat(final)
            self.faixa.vlrFaixa = toFloat(vlrFaixa)
            self.faixa.save()
            return 200, None, None
    # seleciona todas as faixas referentes a tabela

    def readFaixas(self, idTabela):
        if Faixa.objects.filter(tblVinculada=idTabela).exists():
           listaFaixas=[]
           faixas = Faixa.objects.filter(tblVinculada=idTabela).order_by('faixaInicial')
           for faixa in faixas:
               listaFaixas.append(faixa)
           return faixas

    def readFaixasCalculo(self, idTabela):
        
        if Faixa.objects.filter(tblVinculada=idTabela).exists():
           listaFaixas=[]
           faixas = Faixa.objects.filter(tblVinculada=idTabela).order_by('faixaInicial')
           for faixa in faixas:
               listaFaixas.append(faixa.toDict())
           return listaFaixas
        else:
            return []

        

    def readFaixa(self, idFaixa):
        if Faixa.objects.filter(id=idFaixa).exists():
           self.faixa = Faixa.objects.filter(id=idFaixa).get()
           return self.faixa

    def updateFaixa(self, vlrFaixa):
        self.faixa.vlrFaixa = vlrFaixa
        self.faixa.save()
        return 200

    def deleteFaixa(self, idFaixa):
        if Faixa.objects.filter(id=idFaixa).exists():
            self.faixa = Faixa.objects.get(id=idFaixa).delete()
            return True
        else:
            return False



