from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
import requests
from Classes.utils import dprint


@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST", "GET"])
def obtem_localizacao_veiculos(request):
    veiculos = dados_veiculos()
    return JsonResponse({'veiculos':veiculos,'status':200})


def dados_veiculos():
    return [
        {
            'lat': -23.550520,
            'lng': -46.633308,
            'dados_veiculo': {
                'motorista': "Lucas Martins",
                'placa': "GHI-9012",
            },
            'jobs':[{'idDtc':1001,'qtde':1,'peso':101,'valor':1000.01,'cliente':'cliente 1','status':'Em rota'},
                    {'idDtc':1002,'qtde':2,'peso':102,'valor':1000.02,'cliente':'cliente 2','status':'Em rota'},
                    {'idDtc':1003,'qtde':3,'peso':103,'valor':1000.03,'cliente':'cliente 3','status':'Em rota'}]
        },
        {
            'lat': -23.548943,
            'lng': -46.638818,
            'dados_veiculo': {
                'motorista': "Gustavo Lima",
                'placa': "JKL-3456",
            }
        },
        {
            'lat': -23.555772,
            'lng': -46.651007,
            'dados_veiculo': {
                'motorista': "Gustavo Lima",
                'placa': "MNO-7890",
            }
        },
        {
            'lat': -23.569379,
            'lng': -46.694794,
            'dados_veiculo': {
                'motorista': "José Pereira",
                'placa': "MNO-7899",
            }
        },
        {
            'lat': -23.603900,
            'lng': -46.686182,
            'dados_veiculo': {
                'motorista': "Gustavo Lima",
                'placa': "STU-4560",
            }
        },
        {
            'lat': -23.634881,
            'lng': -46.642417,
            'dados_veiculo': {
                'motorista': "José Pereira",
                'placa': "STU-4560",
            }
        },
        {
            'lat': -23.618541,
            'lng': -46.599819,
            'dados_veiculo': {
                'motorista': "Laura Gomes",
                'placa': "BCD-3450",
            }
        },
        {
            'lat': -23.543178,
            'lng': -46.576232,
            'dados_veiculo': {
                'motorista': "Fernando Rodrigues",
                'placa': "JKL-3456",
            }
        },
        {
            'lat': -23.521093,
            'lng': -46.485267,
            'dados_veiculo': {
                'motorista': "Ana Oliveira",
                'placa': "PQR-1230",
            }
        },
        {
            'lat': -23.485799,
            'lng': -46.563987,
            'dados_veiculo': {
                'motorista': "Mateus Oliveira",
                'placa': "BCD-3450",
            }
        },
        {
            'lat': -23.462990,
            'lng': -46.513534,
            'dados_veiculo': {
                'motorista': "Mariana Costa",
                'placa': "BCD-3450",
            }
        }
    ]

