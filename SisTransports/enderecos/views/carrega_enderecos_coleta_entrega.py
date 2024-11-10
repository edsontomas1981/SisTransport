from django.views import View
from operacional.classes.cte import Cte
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
import random


class CarregaEnderecosColetaEntrega(ViewBase, View):
    def get(self, request, *args, **kwargs):
        dados = self.process_request_data(request)
        pontos_atendimento = carrega_coordenadas_pontos_atendimento()
        return JsonResponse({'success': True,'pontos_atendimento':pontos_atendimento}, status=201)
    


def carrega_coordenadas_pontos_atendimento():
    # Função para gerar coordenadas aleatórias dentro de um intervalo para São Paulo e região metropolitana
    def coordenadas_aleatorias(lat_centro, lng_centro, deslocamento=0.05):
        lat = lat_centro + random.uniform(-deslocamento, deslocamento)
        lng = lng_centro + random.uniform(-deslocamento, deslocamento)
        return lat, lng

    registros = [
        # Região central expandida (10 registros)
        {
            'lat': -23.5615,
            'lng': -46.6554,
            'idDtc': 1001,
            'dadosIntinerario': {
                'motorista': "Fernando Souza",
                'placa': "ABC-1234",
                'bairro': "Consolação",
                'volumes': 45,
                'valor': "350.50",
                'peso': 120,
                'nome': 'Cliente Central 1'
            }
        },
        {
            'lat': -23.5587,
            'lng': -46.6629,
            'idDtc': 1002,
            'dadosIntinerario': {
                'motorista': "Ana Mendes",
                'placa': "XYZ-9876",
                'bairro': "Bela Vista",
                'volumes': 30,
                'valor': "720.80",
                'peso': 95,
                'nome': 'Cliente Central 2'
            }
        },
        {
            'lat': -23.5515,
            'lng': -46.6333,
            'idDtc': 1003,
            'dadosIntinerario': {
                'motorista': "Carlos Silva",
                'placa': "GHI-9012",
                'bairro': "Sé",
                'volumes': 78,
                'valor': "950.00",
                'peso': 210,
                'nome': 'Cliente Central 3'
            }
        },
        {
            'lat': -23.5463,
            'lng': -46.6377,
            'idDtc': 1004,
            'dadosIntinerario': {
                'motorista': "Beatriz Andrade",
                'placa': "DEF-4567",
                'bairro': "República",
                'volumes': 50,
                'valor': "610.40",
                'peso': 180,
                'nome': 'Cliente Central 4'
            }
        },
        {
            'lat': -23.5402,
            'lng': -46.6357,
            'idDtc': 1005,
            'dadosIntinerario': {
                'motorista': "Eduardo Costa",
                'placa': "MNO-7890",
                'bairro': "Santa Ifigênia",
                'volumes': 55,
                'valor': "425.75",
                'peso': 140,
                'nome': 'Cliente Central 5'
            }
        },
        {
            'lat': -23.5360,
            'lng': -46.6345,
            'idDtc': 1006,
            'dadosIntinerario': {
                'motorista': "Fernanda Lima",
                'placa': "JKL-3456",
                'bairro': "Liberdade",
                'volumes': 65,
                'valor': "885.60",
                'peso': 300,
                'nome': 'Cliente Central 6'
            }
        },
        {
            'lat': -23.5540,
            'lng': -46.6487,
            'idDtc': 1007,
            'dadosIntinerario': {
                'motorista': "Rafael Lopes",
                'placa': "PQR-1234",
                'bairro': "Paraíso",
                'volumes': 48,
                'valor': "380.30",
                'peso': 90,
                'nome': 'Cliente Central 7'
            }
        },
        {
            'lat': -23.5565,
            'lng': -46.6490,
            'idDtc': 1008,
            'dadosIntinerario': {
                'motorista': "Marta Sousa",
                'placa': "EFG-5678",
                'bairro': "Jardim Paulista",
                'volumes': 58,
                'valor': "760.90",
                'peso': 110,
                'nome': 'Cliente Central 8'
            }
        },
        {
            'lat': -23.5479,
            'lng': -46.6436,
            'idDtc': 1009,
            'dadosIntinerario': {
                'motorista': "Paulo Xavier",
                'placa': "TUV-9123",
                'bairro': "Vila Buarque",
                'volumes': 33,
                'valor': "635.15",
                'peso': 125,
                'nome': 'Cliente Central 9'
            }
        },
        {
            'lat': -23.5488,
            'lng': -46.6505,
            'idDtc': 1010,
            'dadosIntinerario': {
                'motorista': "Carla Torres",
                'placa': "STU-4560",
                'bairro': "Higienópolis",
                'volumes': 72,
                'valor': "1150.75",
                'peso': 200,
                'nome': 'Cliente Central 10'
            }
        }
    ]

    # Adicionando registros aleatórios na região de São Paulo e Grande São Paulo
    for i in range(11, 71):
        lat, lng = coordenadas_aleatorias(-23.6, -46.7, deslocamento=0.1)
        registros.append({
            'lat': lat,
            'lng': lng,
            'idDtc': 1000 + i,
            'dadosIntinerario': {
                'motorista': f"Motorista {i}",
                'placa': f"ABC-{1000 + i}",
                'bairro': f"Bairro {i}",
                'volumes': random.randint(10, 100),
                'valor': f"{random.uniform(100, 1500):.2f}",
                'peso': random.randint(1, 300),
                'nome': f'Cliente {i}'
            }
        })

    return registros

