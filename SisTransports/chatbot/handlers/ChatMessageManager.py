from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from chatbot.models import ChatMessage

class ChatMessageManager(models.Manager):
    
    def criar_mensagem(self, remetente, destinatario, mensagem, estado_conversa=None):
        """
        Cria uma nova mensagem de chat.
        """
        if estado_conversa is None:
            estado_conversa = {}  # Se não for passado, cria um dicionário vazio.
        
        nova_mensagem = self.create(
            remetente=remetente,
            destinatario=destinatario,
            mensagem=mensagem,
            estado_conversa=estado_conversa
        )
        return nova_mensagem
    
    def obter_mensagens(self, remetente=None, destinatario=None, lida=None):
        """
        Obtém mensagens com base nos filtros fornecidos.
        """
        mensagens = self.all()

        if remetente:
            mensagens = mensagens.filter(remetente=remetente)
        if destinatario:
            mensagens = mensagens.filter(destinatario=destinatario)
        if lida is not None:
            mensagens = mensagens.filter(lida=lida)
        
        return mensagens.order_by('data_envio')
    
    def marcar_mensagem_como_lida(self, mensagem_id):
        """
        Marca a mensagem como lida, dado seu ID.
        """
        try:
            mensagem = self.get(id=mensagem_id)
            mensagem.marcar_como_lida()
            return mensagem
        except ObjectDoesNotExist:
            return None
    
    def deletar_mensagem(self, mensagem_id):
        """
        Deleta uma mensagem com base no ID.
        """
        try:
            mensagem = self.get(id=mensagem_id)
            mensagem.delete()
            return True
        except ObjectDoesNotExist:
            return False
    
    def buscar_mensagens_por_estado(self, estado):
        """
        Filtra as mensagens com base em um estado específico na conversa.
        """
        return self.filter(estado_conversa__icontains=estado)

