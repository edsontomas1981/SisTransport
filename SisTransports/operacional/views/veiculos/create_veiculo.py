from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseNotAllowed
from django.core.exceptions import ValidationError
from operacional.classes.tabelas_auxiliares_veiculos import Tipo_Veiculo,Tipo_carroceria,Tipo_Combustivel,Marcas
from operacional.classes.veiculo import VeiculoManager
from operacional.classes.proprietario import ProprietarioManager
from django.db import IntegrityError
import json

@login_required(login_url='/auth/entrar/')
def create_veiculo(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
            data['usuario_cadastro'] = request.user 

            dados = prepareData(data)

            veiculo  = VeiculoManager.get_veiculo_placa(dados.get('placa'))

            if not veiculo:
                VeiculoManager.create_veiculo(dados)
                return JsonResponse({'status':200}) 
            else:
                VeiculoManager.update_veiculo(veiculo.id,dados)
                return JsonResponse({'status':201}) 

        except ValidationError as ve: 
            return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
        except IntegrityError as ie:
            return JsonResponse({'status': 401, 'error': 'Erro de integridade'})           
        except Exception as e:
            return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})
     
    else:
        return HttpResponseNotAllowed(['GET'])


def prepareData(dados):
    proprietario = ProprietarioManager()
    proprietario.buscar_proprietario_por_cnpj(dados.get('cnpjProprietario'))
    tipo_veiculo = Tipo_Veiculo.get_tipo_veiculo_por_id(dados.get('tipoVeiculo'))
    marca = Marcas.get_marca_por_id(dados.get('marcaVeiculo'))
    carroceria = Tipo_carroceria.get_tipo_carroceria_por_id(dados.get('tipoCarroceria'))
    combustivel = Tipo_Combustivel.get_tipo_combustivel_por_id(dados.get('tipoCombustivel'))

    return{
            'proprietario_fk':proprietario.obj_proprietario,
            'marca_fk':marca,
            'tipo_carroceria_fk':carroceria,
            'tipo_combustivel_fk':combustivel,
            'tipo_veiculo_fk':tipo_veiculo,
            'placa':dados.get('placaProprietario'),
            'modelo':dados.get('modeloVeiculo'),
            'ano':dados.get('anoFabMod'),
            'cor':dados.get('corVeiculo'),
            'renavam':dados.get('renavam'),
            'chassi':dados.get('chassisVeiculo'),
            'cidade':dados.get('cidadeVeiculo'),
            'uf':dados.get('ufVeiculo', None),
            'numero_frota':dados.get('numeroFrota'),
            'numero_rastreador':dados.get('numeroRastreador'),
            'capacidade_kg':dados.get('capacidadeKg'),
            'capacidade_cubica':dados.get('capacidadeCubica'),
            'tara':dados.get('tara'),
            'usuario_cadastro':dados.get('usuario_cadastro').id,
        }
    
    
