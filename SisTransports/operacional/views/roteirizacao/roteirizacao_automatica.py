from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
import requests
from Classes.utils import dprint
import polyline


@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST", "GET"])
def roteirizacao_automatica(request):
    try:
        # Obter os dados da solicitação POST
        data = json.loads(request.body.decode('utf-8'))

        # Preparar os dados de jobs (pontos de atendimento)
        jobs = prepara_dados_jobs(data.get('pontos_atendimento'))

        # Preparar os dados dos veículos
        vehicles = prepara_dados_vehicles(data.get('veiculos'), data.get('start'))

        # URL da API do OpenRouteService
        api_url = 'https://api.openrouteservice.org/optimization'

        # Cabeçalhos e corpo da solicitação POST
        headers = {
            'Authorization': '5b3ce3597851110001cf6248fa2ac3e598a04b3c9c4ef05b1472356b',  # Substitua pela sua chave de API do OpenRouteService
            'Content-Type': 'application/json'
        }

        # Organizando as coordenadas no formato esperado pela API (jobs + veículos)
        coordinates = []
        # for job in jobs:
        #     coordinates.append(job['location'])  # Adicionar coordenadas dos pontos de atendimento
        # for vehicle in vehicles:
        #     coordinates.append(vehicle['start'])  # Adicionar coordenadas de início dos veículos

        # Corpo da solicitação com as coordenadas e parâmetros necessários
        body = {
            "jobs": jobs,
            "vehicles":vehicles,
            "services": [
                {"id": i, "service_duration": 5} for i in range(len(jobs))  # Exemplo de tempo de serviço, ajustar conforme necessário
            ],
            "options": {
                "avoid_tolls": False,
                "avoid_ferries": False
            }
        }

        # Fazer a solicitação POST para a API do OpenRouteService
        response = requests.post(api_url, headers=headers, json=body)

        # Verificar se a solicitação foi bem-sucedida
        if response.status_code == 200:
            # Resposta bem-sucedida, decodificando as coordenadas da rota
            response_data = response.json()
            encoded_geometry = response_data.get('routes')[0].get('geometry')
            coordinates = polyline.decode(encoded_geometry)
            
            # Retornar a resposta com a rota e coordenadas decodificadas
            return JsonResponse({'rota': response_data, 'status': 200, 'coordenadas': coordinates})
        else:
            # Se a solicitação não for bem-sucedida, retornar erro
            return JsonResponse({'error': 'Erro na solicitação à API', 'status': response.status_code})

    except Exception as e:
        # Tratar qualquer exceção que possa ocorrer durante a solicitação
        error_message = str(e)
        return JsonResponse({'error': error_message, 'status': 500})


def prepara_dados_jobs(jobs):
    # Lista para armazenar os jobs limitados
    lista_jobs = []

    # Iterando sobre os jobs, limitando a 20 com enumerate
    for idx, job in enumerate(jobs):
    #    if idx >= 5:
    #        break  # Sai do loop após 20 iterações

        if isinstance(job, dict):
            lista_jobs.append({
                "id": job.get('idDtc'),
                "location": [job.get('lng'), job.get('lat')],
                "amount": [job.get('peso')]
        })

    return lista_jobs

def prepara_dados_vehicles(vehicles,start):
    lista_vehicles = []
    for vehicle in vehicles:
        if isinstance(vehicle, dict):
            lista_vehicles.append({ "id": vehicle.get('placa'), "start": [start.get('lng'), start.get('lat')], "capacity": [1000, 100], "max_jobs": 10 })
    return lista_vehicles


