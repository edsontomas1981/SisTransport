from operacional.models.percurso import Percurso as MdlPercurso

class Percurso:
    
    def __init__(self):
        self.percurso=None
    
    def salvaRota(self,nome,origemUF,origemCidade,destinoUF,destinoCidade):
        
        self.rota=MdlPercurso()
        self.rota.nome=nome
        self.rota.origemCidade= origemCidade
        self.rota.origemUf=origemUF
        self.rota.destinoCidade=destinoCidade
        self.rota.destinoUf= destinoUF
        self.rota.save()