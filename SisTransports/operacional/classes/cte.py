from django.db import models
from django.conf import settings
from operacional.models.cte import Cte as Mdl_cte
from django.core.exceptions import ObjectDoesNotExist
from operacional.models.nota_fiscal import Nota_fiscal

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
        
    def get_cte_by_dtc(self, dtc_fk):
        """
        Retorna um objeto Cte com base no campo dtc_fk.
        
        Argumentos:
        dtc_fk (int): A chave estrangeira para procurar o Cte.

        Retorna:
        Cte ou None: O objeto Cte correspondente ao dtc_fk, se encontrado, caso contrário, retorna None.
        """
        try:
            
            cte_obj = Mdl_cte.objects.get(dtc_fk=dtc_fk)
            return cte_obj
        except ObjectDoesNotExist:
            return None
    
    @classmethod
    def obtem_cte_by_dtc(cls, dtc_fk):
        """
        Retorna um objeto Cte com base no campo dtc_fk.
        
        Argumentos:
        dtc_fk (int): A chave estrangeira para procurar o Cte.

        Retorna:
        Cte ou None: O objeto Cte correspondente ao dtc_fk, se encontrado, caso contrário, retorna None.
        """
        try:
            return Mdl_cte.objects.get(dtc_fk=dtc_fk)
        except ObjectDoesNotExist:
            return None
        
    def get_cte_id  (self, idCte):
        """
        Retorna um objeto Cte com base no campo id.
        
        Argumentos:
        id (int): Id do Cte.

        Retorna:
        Cte ou None: O objeto Cte correspondente ao id, se encontrado, caso contrário, retorna None.
        """
        try:
            cte_obj = Mdl_cte.objects.filter(id=idCte)
            return cte_obj
        except ObjectDoesNotExist:
            return None
        
    @classmethod
    def obtem_cte_id(cls,idCte):
        """
        Retorna um objeto Cte com base no campo id.
        
        Argumentos:
        id (int): Id do Cte.

        Retorna:
        Cte ou None: O objeto Cte correspondente ao id, se encontrado, caso contrário, retorna None.
        """
        try:
            print(type(Mdl_cte.objects.get(id=idCte)))
            return Mdl_cte.objects.get(id=idCte)
        except ObjectDoesNotExist:
            return None

    @classmethod
    def obtem_cte_chave_cte(cls,chave_cte):
        """
        Retorna um objeto Cte com base no campo chave_cte.
        
        Argumentos:
        chave_cte (int): Chave de acesso fornecida pelo sefaz.

        Retorna:
        Cte ou None: O objeto Cte correspondente ao id, se encontrado, caso contrário, retorna None.
        """
        try:
            return Mdl_cte.objects.get(chave_cte=chave_cte)
        except ObjectDoesNotExist:
            return None
        

    def get_cte_chave_acesso_nfe(self,chave_acesso_nf):
        try:
            # 1. Encontrar a Nota_fiscal pela chave de acesso fornecida
            nota_fiscal = Nota_fiscal.objects.get(chave_acesso=chave_acesso_nf)
            # 2. A partir da Nota_fiscal, encontrar o Dtc associado
            dtc_associado = nota_fiscal.dtc_fk_id

            if dtc_associado:
                # 3. Com o Dtc, encontrar o Cte associado a ele
                cte_associado = self.get_cte_by_dtc(dtc_associado)
                return cte_associado
            else:
                # Se não houver Dtc associado à Nota_fiscal
                return None
        except Nota_fiscal.DoesNotExist:
            # Se a Nota_fiscal não for encontrada
            return None


