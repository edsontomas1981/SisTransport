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
def create_manifesto(request):
    required_fields = ['emissorMdfe','dtInicioManif',
                       'dtPrevisaoChegada','rotasManifesto']
        
    data = json.loads(request.body.decode('utf-8'))
    data['usuario_cadastro'] = request.user

    for field in required_fields:
        if field not in data or data[field] == '':
            return JsonResponse({'status': 422, 'error': f'O campo {field} é obrigatório.'})

    if data.get('idManifesto'):
        dados = prepare_data(data)
        dados['usuario_ultima_atualizacao']= request.user
        manifesto = ManifestoManager.atualizar_manifesto(data.get('idManifesto'),**dados)
        dcto_manifesto = ManifestoManager.obtem_documentos_manifesto(manifesto.id)
        return JsonResponse({'status': 201,'manifesto':manifesto.to_dict(),'documentos':dcto_manifesto})

    else:
        dados = prepare_data(data)
        dados['usuario_cadastro']= request.user
        manifesto = ManifestoManager.criar_manifesto(dados)
        dcto_manifesto = ManifestoManager.obtem_documentos_manifesto(manifesto.id)
        return JsonResponse({'status': 200,'manifesto':manifesto.to_dict(),'documentos':dcto_manifesto})
    


def prepare_data(data):
    rota = Rota()
    rota.readRota(data.get('rotasManifesto'))
    emissor = EmissorManager.get_emissores_por_id(data.get('emissorMdfe'))
    
    return {
            'emissor_fk':EmissorManager.get_emissores_por_id(data.get('emissorMdfe')),
            'rota_fk':rota.rota,
            'data_previsão_inicio':string_para_data(data.get("dtInicioManif")),
            'data_previsão_chegada':string_para_data(data.get("dtPrevisaoChegada")),
            'frete_carreteiro':toFloat(data.get("freteCarreteiro")),
            'frete_adiantamento':toFloat(data.get("adiantamentoCarreteiro")),
            'lacres':data.get("lacresManifesto"),
            'averbacao':data.get("averbacaoManifesto"),
            'liberacao':data.get("liberacaoMotorista"),
            'observacao':data.get("txtObservacao"),
            }
