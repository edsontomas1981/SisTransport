from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound
from django.db import IntegrityError
from django.utils import timezone

from operacional.models.contrato_frete import Contrato

class ContratoError(Exception):
    """Exceção base para erros relacionados ao manifesto."""

class BadRequestError(ContratoError):
    """Exceção para erros de solicitação inválida (código HTTP 400)."""

class NotFoundError(ContratoError):
    """Exceção para erros de recurso não encontrado (código HTTP 404)."""

class InternalServerError(ContratoError):
    """Exceção para erros internos do servidor (código HTTP 500)."""

class ContratoManager:
    @classmethod
    def _carregar_dados_comuns(cls, data):
        return {
            'frete_contratado': data.get('frete_contratado',''),
            'data_emissao_contrato': data.get('data_emissao_contrato',''),
            'numero_ciot': data.get('numero_ciot',''),
            'valor_pedagio': data.get('valor_pedagio',''),
            'valor_coleta': data.get('valor_coleta',''),
            'outros_creditos': data.get('outros_creditos',''),
            'ir_retido': data.get('ir_retido',''),
            'inss': data.get('inss',''),
            'iss': data.get('iss',''),
            'sest_senat': data.get('sest_senat',''),
            'adiantamento': data.get('adiantamento',''),
            'outros_descontos': data.get('outros_descontos',''),
            'frete_bruto': data.get('frete_bruto',''),
            'total_descontos': data.get('total_descontos',''),
            'frete_a_pagar': data.get('frete_a_pagar',''),        
            'contrato_obs': data.get('contrato_obs',''),
        }
    
    @classmethod
    def criar_contrato(cls, data):
        dados_comuns = cls._carregar_dados_comuns(data)
        dados_comuns['usuario_cadastro']= data.get('usuario')
        dados_comuns['data_cadastro']=str(timezone.now())
        contrato = Contrato.objects.create(**dados_comuns)
        return contrato

    @classmethod
    def atualizar_contrato(cls, contrato_id, data):
        contrato = cls.obter_contrato_por_id(contrato_id)
        if contrato is None:
            raise NotFoundError(f"Contrato com o ID {contrato_id} não encontrado")

        dados_comuns = cls._carregar_dados_comuns(data)
        dados_comuns['usuario_ultima_atualizacao'] = data.get('usuario')
        dados_comuns['data_ultima_atualizacao'] = str(timezone.now())

        # Atualizar os campos do contrato com os novos dados
        for attr, value in dados_comuns.items():
            setattr(contrato, attr, value)

        contrato.save()
        return contrato


    @classmethod
    def obter_contrato_por_id(cls, contrato_id):
        try:
            # Retornar o contrato
            if Contrato.objects.get(id=int(contrato_id)):
                return Contrato.objects.get(id=int(contrato_id))
            else:
                return None
        except Contrato.DoesNotExist:
            raise ValueError("Contrato com o ID {} não encontrado".format(contrato_id))
        except ValueError:
            raise ValueError("O contrato_id deve ser um número inteiro")    

