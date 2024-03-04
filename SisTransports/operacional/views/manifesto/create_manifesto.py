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
@require_http_methods(["POST","GET"])
def create_manifesto(request):
    required_fields = ['emissorMdfe','dtInicioManif',
                       'dtPrevisaoChegada','rotasManifesto',
                       'motoristas','veiculos']
        
    data = json.loads(request.body.decode('utf-8'))
    data['usuario_cadastro'] = request.user

    for field in required_fields:
        if field not in data or data[field] == '':
            return JsonResponse({'status': 422, 'error': f'O campo {field} é obrigatório.'})
    
    dados = prepare_data(data)
    data
    ManifestoManager.criar_manifesto(dados)
    
    return JsonResponse({'status': 200})


def prepara_lista_de_motoristas(lista_motoristas):
    """
    Prepara uma lista de dicionários de motoristas para uma lista de objetos Motorista.

    Args:
        lista_motoristas (list): Lista de dicionários contendo informações dos motoristas.

    Returns:
        list: Lista de objetos Motorista.
    """
    motorista_manager = MotoristaManager()
    lista_preparada = []

    for motorista_info in lista_motoristas:
        cpf = motorista_info.get('id')
        motorista_manager.read_motorista_by_cpf(cpf)
        lista_preparada.append(motorista_manager.obj_motorista)
    
    return lista_preparada

def prepara_lista_de_veiculos(lista_veiculos):
    """
    Prepara uma lista de dicionários de motoristas para uma lista de objetos veiculos

    Args:
        lista_veiculos (list): Lista de dicionários contendo informações dos veiculos.

    Returns:
        list: Lista de objetos veiculos
    """
    lista_preparada = []

    for veiculo_info in lista_veiculos:
        placa = veiculo_info.get('id')
        lista_preparada.append(VeiculoManager.get_veiculo_placa(placa))

    return lista_preparada

def prepare_data(data):
    rota = Rota()
    rota.readRota(data.get('rotasManifesto'))
    emissor = EmissorManager.get_emissores_por_id(data.get('emissorMdfe'))
    
    return {
            'emissor_fk':EmissorManager.get_emissores_por_id(data.get('emissorMdfe')),
            'rota_fk':rota.rota,
            'motoristas':prepara_lista_de_motoristas(data.get('motoristas')),
            'veiculos':prepara_lista_de_veiculos(data.get('veiculos')),
            'data_previsão_inicio':string_para_data(data.get("dtInicioManif")),
            'data_previsão_chegada':string_para_data(data.get("dtPrevisaoChegada")),
            'frete_carreteiro':toFloat(data.get("freteCarreteiro")),
            'frete_adiantamento':toFloat(data.get("adiantamentoCarreteiro")),
            'lacres':data.get("lacresManifesto"),
            'averbacao':data.get("averbacaoManifesto"),
            'liberacao':data.get("liberacaoMotorista"),
            'observacao':data.get("txtObservacao"),
            'usuario_cadastro':data.get("usuario_cadastro"),

            }

'''
    "veiculos": [
        {
            "id": "AWY1749",
            "modelo": "Voyage",
            "proprietario": "SERAFIM TRAN..."
        }
    ],
}
'''