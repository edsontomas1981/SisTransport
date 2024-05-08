from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
import requests

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def proxy_openrouteservice(request):
    try:
        # Obter os dados da solicitação POST
        data = json.loads(request.body.decode('utf-8'))
        # https://api.openrouteservice.org/v2/directions/driving-car
        # Parâmetros para a API do OpenRouteService
        api_url = 'https://api.openrouteservice.org/v2/directions/driving-car'
        params = {
            'api_key': '5b3ce3597851110001cf6248fa2ac3e598a04b3c9c4ef05b1472356b',  # Substitua pela sua chave de API do OpenRouteService
            'start': data.get('start'),
            'end': data.get('end'),
            # Outros parâmetros da API, se necessário
        }

        print(data.get("start"))
        print(data.get("end"))
        # # Fazer a solicitação GET para a API do OpenRouteService
        response = requests.get(api_url, params=params)

        # Verificar se a solicitação foi bem-sucedida
        if response.status_code == 200:
            response_data = response.json()

            # Extrair coordenadas da rota
            route_coordinates = []

            if 'features' in response_data and len(response_data['features']) > 0:
                # Iterar sobre as coordenadas da rota
                for coord in response_data['features'][0]['geometry']['coordinates']:
                    # Adicionar coordenadas à lista de pontos da rota
                    route_coordinates.append((coord[1], coord[0]))  # Inverter lat/long para (lat, long)

            # Verificar quais localidades estão próximas à rota
            localidades_na_rota = []
            for localidade in data.get('localidades'):
                for coord in route_coordinates:
                    # Calcular distância entre coordenadas (exemplo: distância euclidiana)
                    distance = ((localidade[0] - coord[0])**2 + (localidade[1] - coord[1])**2)**0.5
                    if distance < 0.05:  # Exemplo de distância limite (ajuste conforme necessário)
                        localidades_na_rota.append(localidade[3])
                        break  # Parar a verificação se a localidade estiver na rota

        else:
            # Se a solicitação não foi bem-sucedida, retornar erro
            return JsonResponse({'msg': 'Falha ao obter rota do OpenRouteService', 'status':404})
        
        # Retornar localidades na rota como uma resposta JSON
        return JsonResponse({'localidades_na_rota':localidades_na_rota,'rota':route_coordinates,'status':200})

    except Exception as e:
        # Tratar qualquer exceção que possa ocorrer durante a solicitação
        error_message = str(e)
        return JsonResponse({'error': error_message,'status':500})


