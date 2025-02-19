from django.db import models

class EstadoConversa(models.Model):
    nome = models.CharField(max_length=50, null=True)
    descricao = models.CharField(max_length=50, null=True)
    fone_email_etc = models.CharField(max_length=50, unique=True)  # Garantindo unicidade
    estado_conversa = models.JSONField(default=dict)

    def __str__(self):
        return self.nome

    def to_dict(self):
        """
        Retorna os dados do objeto como um dicionário JSON.
        """
        return {
            "id": self.id,
            "nome": self.nome,
            "descricao": self.descricao,
            "fone_email_etc": self.fone_email_etc,
            "estado_conversa": self.estado_conversa
        }
