from django.db import models
from django.contrib.auth.models import User  # Se você estiver usando o modelo User padrão do Django
from chatbot.models.estado_clientes_chatbot import EstadoConversa

class ChatMessage(models.Model):
    remetente = models.ForeignKey(EstadoConversa, related_name='messages_sent', on_delete=models.CASCADE)
    mensagem = models.TextField()
    data_envio = models.DateTimeField(auto_now_add=True)
    lida = models.BooleanField(default=False)
    estado_conversa = models.JSONField(default=dict)  # Para armazenar informações adicionais da conversa, como status da conversa

    class Meta:
        ordering = ['data_envio']
    
    def __str__(self):
        return f"Mensagem de {self.remetente} para {self.destinatario} - {self.data_envio}"

    def marcar_como_lida(self):
        """
        Marca a mensagem como lida.
        """
        self.lida = True
        self.save()

    def to_dict(self):
        """
        Converte o objeto em um dicionário para serialização (por exemplo, para API).
        """
        return {
            "id": self.id,
            "remetente": self.remetente.username,
            "mensagem": self.mensagem,
            "data_envio": self.data_envio.isoformat(),
            "lida": self.lida,
            "estado_conversa": self.estado_conversa
        }
