from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseNotAllowed
from Classes.utils import checaCampos
from operacional.classes.proprietario import ProprietarioManager
from django.core.exceptions import ValidationError
from parceiros.classes.parceiros import Parceiros
from operacional.models.marca_veiculos import Marca
from operacional.models.tipo_carroceria import Tipo_Carroceria
from operacional.models.tipo_combustivel import Tipo_Combustivel
from operacional.models.tipo_veiculo import Tipo_Veiculo

import json


@login_required(login_url='/auth/entrar/')
def dados_cadatro_veiculo(request):
    if request.method == "POST":
        try:
            return JsonResponse({'status': 200, 'marcas' : Marca.to_dict_all(),
                                'tipo_carroceria':Tipo_Carroceria.to_dict_all(),
                                'tipo_combustivel':Tipo_Combustivel.to_dict_all(),
                                'tipo_veiculo':Tipo_Veiculo.to_dict_all()
                                })
        except ValidationError as ve:
            return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
        except Exception as e:
            return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})
    else:

        return HttpResponseNotAllowed(['GET'])
