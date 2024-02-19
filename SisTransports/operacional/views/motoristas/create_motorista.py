from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from operacional.classes.motorista import MotoristaManager
from parceiros.classes.parceiros import Parceiros
from Classes.utils import string_para_data
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def create_motorista(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        data['usuario_cadastro'] = request.user 

        required_fields = ['cpfMotorista','dataNascimento',
                            'filiacaoMae','numeroHabilitacao',
                            'registroHabilitacao','categoriaHabilitacao',
                            'dtToxicologico','dataEmissao','dataValidade',
                            'dataPrimeiraHabilitacao','usuario_cadastro']
        
        for field in required_fields:
            if field not in data or data[field] == '':
                return JsonResponse({'status': 422, 'error': f'O campo {field} é obrigatório.'})
        
        dados_formatados = prepare_dados_create(data)
        
        motorista = MotoristaManager()
        motorista.read_motorista_by_cpf(data.get('cpfMotorista'))

        if motorista.obj_motorista.id:
            motorista.update_motorista(motorista.obj_motorista.id, dados_formatados)
            status = 201
        else:
            motorista.create_motorista(dados_formatados)
            status = 200

        return JsonResponse({'status': status,'motorista':motorista.obj_motorista.to_dict()})
    
    except ValidationError as ve:
        return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
    
    except Exception as e:
        return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})

def prepare_dados_create(data):

    parceiro = Parceiros()
    parceiro.readParceiro(data.get('cpfMotorista'))

    return{
        'parceiro_id':parceiro.parceiro.id,
        'data_nascimento':string_para_data(data.get('dataNascimento')),
        'validade_toxicologico':string_para_data(data.get('dtToxicologico')),
        'filiacao_pai':data.get('filiacaoPai'),
        'pis':data.get('pisMotorista'),
        'estado_civil':data.get('estadoCivil'),
        'filiacao_mae':data.get('filiacaoMae'),
        'cnh_numero':data.get('numeroHabilitacao'),
        'cnh_categoria':data.get('categoriaHabilitacao'),
        'cnh_validade':string_para_data(data.get('dataNascimento')),
        'dt_emissao_cnh':string_para_data(data.get('dataEmissao')),
        'dt_primeira_cnh':string_para_data(data.get('dataNascimento')),
        'numero_registro_cnh':data.get('registroHabilitacao'),
        'usuario_cadastro':data.get('usuario_cadastro').id
        }
