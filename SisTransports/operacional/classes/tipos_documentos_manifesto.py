from django.db import models
from django.conf import settings
from operacional.models.tipo_documento import Tipo_Documento

class TipoDocumentoManifestoManager():
    def __init__(self):
        pass

    @classmethod
    def get_tipo_id(cls, id):
        """
        Retorna uma única ocorrência de manifesto pelo ID.
        """
        try:
            tipo_documento = Tipo_Documento.objects.get(id=id)
            return tipo_documento
        except Tipo_Documento.DoesNotExist:
            return None

    @classmethod
    def get_tipos(cls):
        """
        Retorna todas as ocorrências de manifesto.
        """
        return Tipo_Documento.objects.all()
