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
    
    def readRotas(self):
        rotas=[]
        self.rota=MdlRota.objects.all().order_by('nome')
        for i in self.rota:
            rotas.append(i.to_dict())    
        return rotas   
    
    def deleteRota(self,idRota):
        pass
    
                
        
    
        