from django.core.exceptions import ObjectDoesNotExist, ValidationError
from chatbot.models.estado_clientes_chatbot import EstadoConversa

class EstadoConversaManager:
    
    @staticmethod
    def criar_estado_conversa(fone_email_etc, nome=None, descricao=None, estado_conversa={}):
        """
        Cria um novo EstadoConversa garantindo unicidade do fone_email_etc.
        """
        try:
            obj, created = EstadoConversa.objects.get_or_create(
                fone_email_etc=fone_email_etc,
                defaults={
                    'nome': nome,
                    'descricao': descricao,
                    'estado_conversa': estado_conversa
                }
            )
            if created:
                return {"success": True, "message": "EstadoConversa criado com sucesso!", "data": obj.to_dict()}
            else:
                return {"success": False, "message": "Já existe um EstadoConversa com esse contato!", "data": obj.to_dict()}
        except ValidationError as e:
            return {"success": False, "message": str(e)}
    
    @staticmethod
    def listar_todos():
        """
        Retorna todos os registros de EstadoConversa em formato de dicionário.
        """
        return [obj.to_dict() for obj in EstadoConversa.objects.all()]

    @staticmethod
    def buscar_por_fone_email(fone_email_etc):
        """
        Busca um EstadoConversa pelo campo único fone_email_etc e retorna em formato de dicionário.
        """
        try:
            obj = EstadoConversa.objects.get(fone_email_etc=fone_email_etc)
            return {"success": True, "data": obj.to_dict()}
        except ObjectDoesNotExist:
            return {"success": False, "message": "EstadoConversa não encontrado!"}
    
    @staticmethod
    def atualizar_estado_conversa(fone_email_etc, nome=None, descricao=None, estado_conversa=None):
        """
        Atualiza os dados de um EstadoConversa pelo fone_email_etc.
        """
        try:
            obj = EstadoConversa.objects.get(fone_email_etc=fone_email_etc)
            if nome:
                obj.nome = nome
            if descricao:
                obj.descricao = descricao
            if estado_conversa:
                obj.estado_conversa = estado_conversa
            obj.save()
            return {"success": True, "message": "EstadoConversa atualizado com sucesso!", "data": obj.to_dict()}
        except ObjectDoesNotExist:
            return {"success": False, "message": "EstadoConversa não encontrado!"}

    @staticmethod
    def deletar_estado_conversa(fone_email_etc):
        """
        Deleta um EstadoConversa pelo fone_email_etc.
        """
        try:
            obj = EstadoConversa.objects.get(fone_email_etc=fone_email_etc)
            obj.delete()
            return {"success": True, "message": "EstadoConversa deletado com sucesso!"}
        except ObjectDoesNotExist:
            return {"success": False, "message": "EstadoConversa não encontrado!"}
