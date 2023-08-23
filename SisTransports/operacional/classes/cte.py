from django.db import models
from django.conf import settings
from operacional.models.cte import Cte as Mdl_cte

class Cte():
    def __init__ (self):
        self.obj_cte = Mdl_cte()

    def create(self, dados):
        for key, value in dados.items():
            setattr(self.obj_cte, key, value)
        self.obj_cte.save()
        return self.obj_cte

    def read(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass

    pass
    # def criar_frete_dtc(self, **kwargs):
    #     return self.create(**kwargs)

    # @classmethod
    # def criar(cls, **kwargs):
    #     return cls.objects.criar_frete_dtc(**kwargs)

    # @classmethod
    # def ler(cls, dtc_fk_id):
    #     try:
    #         return cls.objects.get(dtc_fk_id=dtc_fk_id)
    #     except cls.DoesNotExist:
    #         return None
        
    # def atualizar(self, **kwargs):
    #     for campo, valor in kwargs.items():
    #         setattr(self, campo, valor)
    #     self.save()

    # def deletar(self):
    #     self.delete()

    # @classmethod
    # def listar(cls):
    #     return cls.objects.all()
