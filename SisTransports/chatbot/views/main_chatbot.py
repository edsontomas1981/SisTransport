from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from Classes.utils import dprint
from django.views.decorators.csrf import csrf_exempt
from chatbot.handlers.EstadoConversaManager import EstadoConversaManager
from chatbot.service.verifica_estado_chat import processar_mensagem
import json

@csrf_exempt
def main_chatbot(request):
    if request.method == 'GET':
        return JsonResponse({'status': 'GET'}) 
    
    elif request.method == "POST":
        # try:
            data = json.loads(request.body)  # Lendo o JSON enviado
            phone_number = data.get('client').get('phoneNumber')
            message = data.get('client').get('message')
            resposta = processar_mensagem(phone_number,message)
            return JsonResponse({'status': 200,'resposta':resposta })
    
        # except Exception as e:
        #     dprint(f'erro{e}')
        #     return JsonResponse({'status': 403,'message':f'erro{e}'})  
