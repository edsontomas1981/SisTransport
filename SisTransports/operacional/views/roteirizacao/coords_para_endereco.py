from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
import requests
from Classes.utils import imprimirJsonTerminal

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def coords_para_endereco(request):
    try:
        # Obter e validar os dados da solicitação POST
        try:
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return JsonResponse({'msg': 'Formato JSON inválido.'}, status=400)

        # Verificar se 'coordenadas' existe e é uma lista
        coords = [data.get('coordenadas')]
        if not coords or not isinstance(coords, list):
            return JsonResponse({'msg': 'A chave "coordenadas" é necessária e deve ser uma lista.'}, status=400)

        # URL da API para Geocoding Reverse
        api_url = 'https://api.openrouteservice.org/geocode/reverse'
        headers = {
            'Authorization': '5b3ce3597851110001cf6248fa2ac3e598a04b3c9c4ef05b1472356b',  # Substitua pela sua chave de API do OpenRouteService
            'Content-Type': 'application/json'
        }

        enderecos = []

        # Iterar sobre as coordenadas e fazer a requisição para cada par lat/lng
        for coord in coords:
            lat = coord.get('lat')
            lng = coord.get('lng')

            # Validar latitude e longitude
            if lat is None or lng is None:
                enderecos.append({'coordenadas': coord, 'endereco': 'Coordenada inválida'})
                continue

            response = requests.get(
                f"{api_url}?api_key={headers['Authorization']}&point.lat={lat}&point.lon={lng}&size=1"
            )

            imprimirJsonTerminal(response)

            if response.status_code == 200:
                data = response.json()
                if data['features']:
                    # Extrair o endereço completo
                    endereco_completo = f"""{data['features'][0]['properties'].get('name', 'Endereço não encontrado')}-{data['features'][0]['properties'].get('neighbourhood', 'Bairro não encontrado')}-{data['features'][0]['properties'].get('locality', 'Cidade não encontrado')}-{data['features'][0]['properties'].get('region', 'UF não encontrado')}-{data['features'][0]['properties'].get('country_a', 'País não encontrado')}"""
                    # endereco_completo = data['features'][0]['properties'].get('label', 'Endereço não encontrado')
                    cidade = None
                    bairro = None

                    # Tentar localizar cidade e bairro com verificações de existência
                    address = data['features'][0]['properties'].get('address', {})
                    cidade = address.get('city', 'Cidade não encontrada')
                    bairro = address.get('suburb', 'Bairro não encontrado')

                    enderecos.append({
                        'coordenadas': coord,
                        'endereco': endereco_completo,
                        'cidade': cidade,
                        'bairro': bairro
                    })
                else:
                    enderecos.append({'coordenadas': coord, 'endereco': 'Endereço não encontrado'})
            else:
                enderecos.append({'coordenadas': coord, 'endereco': 'Erro ao obter endereço'})

        return JsonResponse({'enderecos': enderecos})

    except Exception as e:
        error_message = str(e)
        return JsonResponse({'error': error_message, 'status': 500})