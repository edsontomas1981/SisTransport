from contatos.models.contato import Contatos as MdlContato
from Classes.utils import dprint
class Contato:
    def __init__(self):
        self.contato=MdlContato()

    def createOrUpdate(self,dados):
        try:
            self.contato.cargo=dados['cargo']
            self.contato.nome=dados['nome']
            self.contato.fone_email_etc=dados['descContato']
            self.contato.tipo=dados['tipo']
            self.contato.envio=dados['envio']
            self.contato.parceiro_fk=dados['parceiro']
        except:
            return 501

    def createContato(self,dados):
        try:
            self.createOrUpdate(dados)
            self.contato.save()
            return 200
        except:
            return 500

    def updateContato(self,dados,idContato):
        if MdlContato.objects.filter(id=idContato).exists():
            self.contato=MdlContato.objects.filter(id=idContato).get()
            self.createOrUpdate(dados)
            self.contato.save() 
            return 200
        else:
            return 400



    def readContatos(self,idParceiro):
        if MdlContato.objects.filter(parceiro_fk_id=idParceiro).exists() :
            contatos=MdlContato.objects.filter(parceiro_fk_id=idParceiro)
            listaContatos=[]
            for contato in contatos:
                listaContatos.append(contato.to_dict())
            return listaContatos
        
        
    def excluiContato(self,id):
        self.id=id
        contato=MdlContato.objects.filter(id=self.id)
        if contato:
            contato.delete()
            return{'status':200}
        else:
            return{'status':401}


        