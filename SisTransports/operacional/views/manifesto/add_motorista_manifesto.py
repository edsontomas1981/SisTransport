from parceiros.classes.parceiros import Parceiros
from Classes.utils import string_para_data
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json

from Classes.utils import string_para_data
from Classes.utils import toFloat

from operacional.classes.emissores import EmissorManager
from operacional.classes.rotas import Rota
from operacional.classes.motorista import MotoristaManager
from operacional.classes.veiculo import VeiculoManager
from operacional.classes.manifesto import ManifestoManager

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def add_motorista_manifesto(request):
    """
    View para adicionar um motorista a um manifesto.
    
    Requer autenticação do usuário.
    Aceita tanto requisições POST.
    """

    # Campos obrigatórios para adicionar um motorista a um manifesto
    required_fields = ['cpfMotorista', 'idManifesto']

    # Decodifica o corpo da requisição JSON
    data = json.loads(request.body.decode('utf-8'))

    # Verifica se o JSON possui todos os campos obrigatórios
    for field in required_fields:
        if field not in data or not data[field]:
            return JsonResponse({'status': 422, 'error': f'O campo {field} é obrigatório.'})

    # Garante que o usuário atual seja atribuído aos dados
    data['usuario_cadastro'] = request.user
    
    # Obtém o manifesto pelo ID
    data['manifesto'] = ManifestoManager.obter_manifesto_por_id(data.get('idManifesto'))

    # Lê os dados do motorista pelo CPF
    motorista = MotoristaManager()
    motorista.read_motorista_by_cpf(data.get('cpfMotorista'))
    data['motorista'] = motorista.obj_motorista
    
    # Adiciona o motorista ao manifesto
    response = ManifestoManager.add_motorista(data)

    lista_motoristas = ManifestoManager.obter_motoristas_manifesto(data.get('idManifesto'))

    motoristas = []

    for motorista in lista_motoristas:
        motoristas.append(motorista.to_dict())

    
    # Retorna uma resposta JSON
    return JsonResponse({'status':200,'motoristas':motoristas})
