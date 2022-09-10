from contatos.models.contato import Contatos as mdlContato
from contatos.models.contato import Tipo_contatos

class Contato:
    def __init__(self,parceiro:object):
        self.parceiro=parceiro
        
    def incluiContato(self,tipo,descContato,cargo,nome,envio):
        self.cargo=cargo
        self.nome=nome
        self.fone_email_etc=descContato
        self.tipo_fk=tipo
        self.envio=envio
        contato=mdlContato()
        contato.parceiro_fk=self.parceiro
        contato.cargo=self.cargo
        contato.nome=self.nome
        contato.fone_email_etc=self.fone_email_etc
        contato.tipo=self.tipo_fk
        contato.envio=self.envio
        contato.save()

    def contatos(self):
        if mdlContato.objects.filter(parceiro_fk_id=self.parceiro.id).exists() :
            contatos=mdlContato.objects.filter(parceiro_fk_id=self.parceiro.id)
            contato=[]
            for c in contatos:
                contato.append(c.to_dict())
            return contato
        
    def excluiContato(self,id):
        self.id=id
        contato=mdlContato.objects.filter(id=self.id)
        if contato:
            contato.delete()
            return{'status':200}
        else:
            return{'status':401}
        

        
    


