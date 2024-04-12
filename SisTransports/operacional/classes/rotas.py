from operacional.models.rota import Rota as MdlRota
from Classes.utils import verificaCamposObrigatorios,toFloat,checkBox,dprint,dpprint


class Rota:
    def __init__(self):
        self.rota=MdlRota()

    @classmethod
    def salvaRota(cls, dados):

        nome_rota = dados.get("nome")
        if MdlRota.objects.filter(nome=nome_rota).exists():
            return 422

        rota = cls()
        rota.rota.nome = dados.get("nome")
        rota.rota.origemCidade = dados.get("origemCidade")
        rota.rota.origemUf = dados.get("origemUF")
        rota.rota.destinoCidade = dados.get("destinoCidade")
        rota.rota.destinoUf = dados.get("destinoUF")
        rota.rota.endereco_origem_fk = dados.get("enderecoOrigem")
        rota.rota.endereco_destino_fk = dados.get("enderecoDestino")
        rota.rota.save()
        return rota
    
    def readRotas(self):
        rotas=[]
        self.rota=MdlRota.objects.all().order_by('nome')
        for i in self.rota:
            rotas.append(i.to_dict())    
        return rotas 
      
    def readRota(self,idRota):
        try:
            self.rota=MdlRota.objects.filter(id=idRota).get()
            return 200
        except MdlRota.DoesNotExist:
            return 400
        except MdlRota.MultipleObjectsReturned:
            return 300
        except ValueError:
            return 500
        
    def seleciona_rota(self,idRota):
        try:
            self.rota=MdlRota.objects.filter(id=idRota).get()
            return 200
        except MdlRota.DoesNotExist:
            return 400
        except MdlRota.MultipleObjectsReturned:
            return 300
        except ValueError:
            return 500
    
   
    def deleteRota(self,idRota):
        pass
    
                
        
    
        