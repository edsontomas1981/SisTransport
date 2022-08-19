import requests
import json

def cnpjWs(cnpj):
    url = "https://receitaws.com.br/v1/cnpj/"+cnpj
    headers = {"Content-Type": "application/json"}
    response = requests.request("GET", url, headers=headers)
    if response.status_code == 200 :
        responseJson = json.loads(response.content)
        return responseJson
    elif response.status_code == 429:
        message = "Limite de requisições excedido"
        responseJson={'message':message}
        return responseJson
    else:
        message = "Cnpj não encontrado"
        responseJson = {'message':message}
        return responseJson