# 

import openrouteservice

# Criar cliente OpenRouteService
client = openrouteservice.Client(key='5b3ce3597851110001cf6248fa2ac3e598a04b3c9c4ef05b1472356b')

# Coordenadas de partida, ponto intermediário e destino
start_point = (-23.716565778582133, -46.81367695097887)
intermediate_point = (-23.716565778582137, 46.81367695097890)  # Exemplo de coordenadas de um ponto intermediário
end_point = (-23.727007768207486, -46.756443093086276)

def calculate_route(start, intermediate, end):
    # Calcular rota com um raio de busca de 1000 metros
    route = client.directions(coordinates=[start, intermediate, end], profile='driving-car')
    return route

# Calcular rota entre os pontos
route_coordinates = calculate_route(start_point, intermediate_point, end_point)
print(route_coordinates)
