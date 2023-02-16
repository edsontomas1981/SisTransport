from contatos.models.contato import Tipo_contatos as MdlTipoContatos

class TipoContato:
    def __init__(self):
        self.tipoContato=MdlTipoContatos()
        
    def createOrUpdate(self,dados):
        self.tipoContato.descricao_contato=dados['tipo']
        
    def createTipoContato(self,dados):
        self.createOrUpdate(dados)
        self.tipoContato.save()

    def readTipo(self,idContato):
        if MdlTipoContatos.objects.filter(id=idContato).exists() :
            self.tipoContato=MdlTipoContatos.objects.filter(id=idContato).get()
            return 200
    def updateTipo(self):
        pass

    def deleteTipo(self):
        pass