from django.db import models
from django.conf import settings
from operacional.models.cte import Cte as Mdl_cte
from django.core.exceptions import ObjectDoesNotExist


class Cte():
    def __init__ (self):
        self.obj_cte = Mdl_cte()
    @staticmethod
    def verificar_campos_obrigatorios(dados, campos_obrigatorios):
        campos_faltantes = []
        for campo in campos_obrigatorios:
            if campo not in dados or (dados[campo] is None and not isinstance(dados[campo], bool)):
                campos_faltantes.append(campo)
        return campos_faltantes

    @staticmethod
    def criar_mensagem_erro(campos_faltantes):
        if campos_faltantes:
            campos_faltantes_str = ', '.join(campos_faltantes)
            return 300, f"Campos obrigatórios faltando: {campos_faltantes_str}"
        return None

    def create_or_update(self, dados):
        campos_obrigatorios = ['origem_cte', 'destino_cte', 'emissora_cte', 'tipo_cte', 'cfop_cte',
                            'tipo_calculo_cte', 'dtc_fk', 'icms_incluso', 'base_de_calculo',
                            'aliquota', 'icms_valor', 'total_frete', 'usuario_cadastro']

        campos_faltantes = Cte.verificar_campos_obrigatorios(dados, campos_obrigatorios)
        
        mensagem_erro = Cte.criar_mensagem_erro(campos_faltantes)
        if mensagem_erro:
            return mensagem_erro

        dtc_fk = dados['dtc_fk']
        existing_cte = self.read(dtc_fk)

        if existing_cte is not None:
            for key, value in dados.items():
                setattr(existing_cte, key, value)
            existing_cte.save()
            return 201
        else:
            for key, value in dados.items():
                setattr(self.obj_cte, key, value)
            self.obj_cte.save()
            return 200

    def read(self, dtc_fk):
        try:
            self.cte_obj = Mdl_cte.objects.get(dtc_fk=dtc_fk)
            return self.cte_obj
        except ObjectDoesNotExist:
            return None

    def update(self, dtc_fk, novos_dados):
        try:
            self.cte_obj = Mdl_cte.objects.get(dtc_fk=dtc_fk)
            for key, value in novos_dados.items():
                setattr(self.cte_obj, key, value)
            self.cte_obj.save()
            return self.cte_obj
        except Mdl_cte.DoesNotExist:
            return None

    def delete(self, dtc_fk):
        try:
            cte_obj = Mdl_cte.objects.get(dtc_fk=dtc_fk)
            cte_obj.delete()
            return 200  # Indicando sucesso na exclusão
        except Mdl_cte.DoesNotExist:
            return None  # O objeto não existe

