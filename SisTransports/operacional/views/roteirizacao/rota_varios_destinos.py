from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
import requests
from Classes.utils import dprint,calculo_distancia_coordenadas_haversine
import polyline


@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def rotas_varios_destinos(request):
    try:
        # Obter os dados da solicitação POST
        data = json.loads(request.body.decode('utf-8'))

        # Definir o índice do ponto inicial (por exemplo, o primeiro ponto da lista)
        ponto_inicial = data.get('pontoInicial')

        coordenadas = []
        if ponto_inicial:
            coordenadas.append([ponto_inicial.get('lng'), ponto_inicial.get('lat')])

        coordenadas_ordenada_por_distancia = []

        for index, coord in enumerate(data.get('coordenadas')):
            distancia = calculo_distancia_coordenadas_haversine(ponto_inicial.get('lat'), ponto_inicial.get('lng'), coord.get('lat'), coord.get('lng'))
            coordenadas_ordenada_por_distancia.append({'index':index, 'distancia':distancia,'coord':coord})

        coordenadas_ordenada_por_distancia = ordenar_por_distancia(coordenadas_ordenada_por_distancia)


        for coord in coordenadas_ordenada_por_distancia:

            coordenadas.append([coord.get('coord').get('lng'), coord.get('coord').get('lat')])

        # URL da API do OpenRouteService
        api_url = 'https://api.openrouteservice.org/v2/directions/driving-car/json'

        # Cabeçalhos e corpo da solicitação POST
        headers = {
            'Authorization': '5b3ce3597851110001cf6248fa2ac3e598a04b3c9c4ef05b1472356b',  # Substitua pela sua chave de API do OpenRouteService
            'Content-Type': 'application/json'
        }
        body = {
            "coordinates": coordenadas
        }

        # Fazer a solicitação POST para a API do OpenRouteService
        response = requests.post(api_url, headers=headers, json=body)

        response_data = response.json()
        

        # Sua string codificada
        encoded_geometry = response_data.get('routes')[0].get('geometry')

        # Decodificando para uma lista de coordenadas (latitude, longitude)
        coordinates = polyline.decode(encoded_geometry)

        # Verificar se a solicitação foi bem-sucedida
        if response.status_code == 200:
            return JsonResponse({'rota': response_data, 'status': 200, 'coordenadas': coordinates})
        else:
            # Se a solicitação não foi bem-sucedida, retornar erro
            return JsonResponse({'msg': 'Falha ao obter rota do OpenRouteService', 'status': response.status_code})

    except Exception as e:
        # Tratar qualquer exceção que possa ocorrer durante a solicitação
        error_message = str(e)
        return JsonResponse({'error': error_message, 'status': 500})
    
def ordenar_por_distancia(lista_dicionarios):
    """Ordena uma lista de dicionários pelo valor da chave 'distancia'.

    Args:
        lista_dicionarios: A lista de dicionários a ser ordenada.

    Returns:
        Uma nova lista ordenada pelos valores de 'distancia'.
    """

    return sorted(lista_dicionarios, key=lambda x: x['distancia'])