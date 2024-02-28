from django.db import models
from django.conf import settings
from operacional.models.ocorrencias_manifesto import Ocorrencia_manifesto as Ocorrencia

class Ocorrencia_manifesto():
    def __init__(self):
        pass

    @classmethod
    def get_ocorrencia_id(cls, id):
        """
        Retorna uma única ocorrência de manifesto pelo ID.
        """
        try:
            ocorrencia = Ocorrencia.objects.get(id=id)
            return ocorrencia
        except Ocorrencia.DoesNotExist:
            return None

    @classmethod
    def get_ocorrencia(cls):
        """
        Retorna todas as ocorrências de manifesto.
        """
        return Ocorrencia.objects.all()

    @classmethod
    def criar_ocorrencia(cls, dados):
        """
        Cria uma nova ocorrência de manifesto com os dados fornecidos.
        """
        return Ocorrencia.objects.create(**dados)

    @classmethod
    def atualizar_ocorrencia(cls, id, dados):
        """
        Atualiza uma ocorrência de manifesto existente pelo ID com os dados fornecidos.
        Retorna True se a ocorrência foi atualizada com sucesso, False caso contrário.
        """
        try:
            ocorrencia = Ocorrencia.objects.get(id=id)
            for chave, valor in dados.items():
                setattr(ocorrencia, chave, valor)
            ocorrencia.save()
            return True
        except Ocorrencia.DoesNotExist:
            return False

    @classmethod
    def deletar_ocorrencia(cls, id):
        """
        Deleta uma ocorrência de manifesto pelo ID.
        Retorna True se a ocorrência foi deletada com sucesso, False caso contrário.
        """
        try:
            ocorrencia = Ocorrencia.objects.get(id=id)
            ocorrencia.delete()
            return True
        except Ocorrencia.DoesNotExist:
            return False

    
    


                

