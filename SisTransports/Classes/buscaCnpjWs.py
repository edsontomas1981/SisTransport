import requests
import json

def cnpjWs(cnpj):
        try:
            url = "https://receitaws.com.br/v1/cnpj/"+cnpj
            headers = {"Content-Type": "application/json"}
            response = requests.request("GET", url, headers=headers)
            if response.status_code == 200 :
                status=200
                responseJson = json.loads(response.content) # Consulta ok retorno de Json
                return responseJson,status
            elif response.status_code == 429:
                status=429
                responseJson={'status':429}#Limite de requisições por minuto excedido
                return responseJson,status
            else:
                status=431
                responseJson = {'status':431}#CPF ou CNPJ nao localizado
                return responseJson,status
        except:
            return 404 #erro nao identificado
