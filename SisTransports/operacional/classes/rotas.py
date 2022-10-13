from operacional.models.rota import Rota as MdlRota

class Rota:
    
    def __init__(self):
        self.rota=None
    
    def salvaRota(self,nome,origemUF,origemCidade,destinoUF,destinoCidade):
        
        self.rota=MdlRota()
        self.rota.nome=nome
        self.rota.origemCidade= origemCidade
        self.rota.origemUf=origemUF
        self.rota.destinoCidade=destinoCidade
        self.rota.destinoUf= destinoUF
        self.rota.save()
    
    
        