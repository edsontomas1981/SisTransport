from contatos.models.contato import Contatos as MdlContato

class Contato:
    def __init__(self):
        self.contato=MdlContato()

    def createOrUpdate(self,dados):
        self.contato.cargo=dados['cargo']
        self.contato.nome=dados['nome']
        self.contato.fone_email_etc=dados['descContato']
        self.contato.tipo=dados['tipo']
        self.contato.envio=dados['envio']
        self.contato.parceiro=dados['parceiro']
        
    def createContato(self,dados):
        self.createOrUpdate(dados)
        self.contato.save()
        return 200

    def readContatos(self):
        if MdlContato.objects.filter(parceiro_fk_id=self.parceiro.id).exists() :
            contatos=MdlContato.objects.filter(parceiro_fk_id=self.parceiro.id)
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


        