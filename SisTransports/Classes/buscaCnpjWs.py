import requests
import json

def cnpjWs(cnpj):
    url = "https://receitaws.com.br/v1/cnpj/"+cnpj
    headers = {"Content-Type": "application/json"}
    response = requests.request("GET", url, headers=headers)
    if response.status_code == 200 :
        resposta = json.loads(response.content)
        return resposta
    elif response.status_code == 429:
        message = "Limite de requisições excedido"
        resposta={'message':message}
        return resposta
    else:
        message = "Cnpj não encontrado"
        resposta = {'message':message}
        return resposta