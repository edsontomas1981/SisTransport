from django.views import View
from operacional.classes.cte import Cte
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError

class CarregaEnderecosColetaEntrega(ViewBase, View):
    def get(self, request, *args, **kwargs):
        dados = self.process_request_data(request)

        pontos_atendimento = carrega_coordenadas_pontos_atendimento()
        return JsonResponse({'success': True,'pontos_atendimento':pontos_atendimento}, status=201)
    

# apagar essa função 
def carrega_coordenadas_pontos_atendimento():
    return [
     {
        'lat': -23.736628141569525,
        'lng': -46.76861528558775,
        'idDtc': 893697,
        'dadosIntinerario': {
            'motorista': "Lucas Martins",
            'placa': "GHI-9012",
            'bairro': "Vila Olímpia",
            'volumes': 57,
            'valor': "315.19"
        }
    },
    {
        'lat': -23.717144249788973,
        'lng': -46.70427020480898,
        'idDtc': 640168,
        'dadosIntinerario': {
            'motorista': "Gustavo Lima",
            'placa': "JKL-3456",
            'bairro': "Jardins",
            'volumes': 93,
            'valor': "1464.26"
        }
    },
    {
        'lat': -23.70892453868743,
        'lng': -46.66718574669546,
        'idDtc': 677915,
        'dadosIntinerario': {
            'motorista': "Gustavo Lima",
            'placa': "MNO-7890",
            'bairro': "Perdizes",
            'volumes': 19,
            'valor': "1409.81"
        }
    },
    {
        'lat': -23.702465954184277,
        'lng': -46.61765214860171,
        'idDtc': 268669,
        'dadosIntinerario': {
            'motorista': "José Pereira",
            'placa': "BCD-3450",
            'bairro': "Pinheiros",
            'volumes': 71,
            'valor': "998.13"
        }
    },
    {
        'lat': -23.72433307326931,
        'lng': -46.58118326156309,
        'idDtc': 129546,
        'dadosIntinerario': {
            'motorista': "Gustavo Lima",
            'placa': "STU-4560",
            'bairro': "Brooklin",
            'volumes': 88,
            'valor': "1311.68"
        }
    },
    {
        'lat': -23.723698534789463,
        'lng': -46.53042635380625,
        'idDtc': 181394,
        'dadosIntinerario': {
            'motorista': "José Pereira",
            'placa': "STU-4560",
            'bairro': "Butantã",
            'volumes': 48,
            'valor': "1305.15"
        }
    },
    {
        'lat': -23.7369657795069,
        'lng': -46.48383386137131,
        'idDtc': 954464,
        'dadosIntinerario': {
            'motorista': "Laura Gomes",
            'placa': "BCD-3450",
            'bairro': "Perdizes",
            'volumes': 66,
            'valor': "970.77"
        }
    },
    {
        'lat': -23.73066150829947,
        'lng': -46.446700974970625,
        'idDtc': 12955,
        'dadosIntinerario': {
            'motorista': "Fernando Rodrigues",
            'placa': "JKL-3456",
            'bairro': "Vila Madalena",
            'volumes': 63,
            'valor': "1411.20"
        }
    },
    {
        'lat': -23.717332547434065,
        'lng': -46.37523156620252,
        'idDtc': 937397,
        'dadosIntinerario': {
            'motorista': "Ana Oliveira",
            'placa': "PQR-1230",
            'bairro': "Campo Belo",
            'volumes': 28,
            'valor': "1075.17"
        }
    },
    {
        'lat': -23.63786511940726,
        'lng': -46.795220182798985,
        'idDtc': 705427,
        'dadosIntinerario': {
            'motorista': "Mateus Oliveira",
            'placa': "BCD-3450",
            'bairro': "Campo Belo",
            'volumes': 29,
            'valor': "1383.42"
        }
    },
    {
        'lat': -23.633174490004503,
        'lng': -46.76247094186332,
        'idDtc': 535995,
        'dadosIntinerario': {
            'motorista': "Mariana Costa",
            'placa': "BCD-3450",
            'bairro': "Morumbi",
            'volumes': 43,
            'valor': "448.46"
        }
    }
]
