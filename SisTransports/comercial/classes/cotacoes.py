from comercial.models.cotacao import Cotacao
from Classes.utils import toFloat, checkBox, dprint


class Cotacao:
    def __init__(self):
        pass

    def createOrUpdate(self,dados):
        self.cotacao = Cotacao()
        self.cotacao.dtc_fk = dados['dtc_fk'][0]
        self.cotacao.peso = dados['peso'][0]
        self.cotacao.qtde =dados['qtde'][0]
        self.cotacao.vlrNf= dados['vlrNf'][0]
        self.cotacao.m3 = dados['m3'][0]
        self.cotacao.save()
        
        return 200

    def createCotacao(self,dados):
        self.createOrUpdate(dados)
        
        return 200
        
