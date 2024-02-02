from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseNotAllowed
from Classes.utils import checaCampos
from operacional.classes.proprietario import ProprietarioManager
from django.core.exceptions import ValidationError
from parceiros.classes.parceiros import Parceiros
import json


@login_required(login_url='/auth/entrar/')
def create_proprietario(request):
    """
    View para criar um novo proprietário.

    Método GET: Retorna uma resposta JSON indicando que a criação está disponível.
    Método POST: Cria um novo proprietário com base nos dados fornecidos no corpo da solicitação.

    Exemplo de dados no corpo da solicitação:
    {
        'antt': '123456',
        'parceiro_id': <ID_DO_PARCEIRO>,
        'validade_antt': '2022-01-01',
        'tipo_proprietario': 'Individual',
        'criado_por_id': <ID_DO_USUARIO>,
        'atualizado_por_id': <ID_DO_USUARIO>,
    }
    """
    status_code = 0
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
            data['usuario_cadastro'] = request.user 
            # Lógica para criar um novo proprietário com os dados do corpo da solicitação
            dados_para_cadastro = prepare_dados_create(data)
            proprietario = ProprietarioManager()
            if(proprietario.buscar_proprietario_por_cnpj(data['cnpj_cpf'])):
                status_code=proprietario.update_proprietario(proprietario.obj_proprietario.id,dados_para_cadastro)
            else:
                proprietario = ProprietarioManager()
                status_code=proprietario.create_proprietario(dados_para_cadastro)
            return JsonResponse({'status': status_code, 'message': 'Proprietário criado com sucesso'})
        except ValidationError as ve:
            return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
        except Exception as e:
            return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})
    else:
        return HttpResponseNotAllowed(['GET'])

def prepare_dados_create(data):
    return {
    'antt': data['antt'],
    'parceiro_id': _carrega_parceiro(data['cnpj_cpf']),
    'validade_antt': data['validade_antt'],
    'tipo_proprietario': data['tipo_proprietario'],
    'criado_por_id': data['usuario_cadastro'].id,
    'atualizado_por_id':data['usuario_cadastro'].id,
}

def _carrega_parceiro(cnpj_parceiro):
    parceiro = Parceiros()
    parceiro.readParceiro(cnpj_parceiro)
    return parceiro.parceiro