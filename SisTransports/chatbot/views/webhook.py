import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from chatbot.service.verifica_estado_chat import processar_mensagem
from Classes.utils import dprint


WHATSAPP_API_URL = "https://graph.facebook.com/v16.0/559569933902545/messages"
ACCESS_TOKEN = "EAANxmkzeEj8BPEGd0EZAIIQwJUW3HAtd35PZC6ARFTVE3JbE63EwNhzZB5BXMlXXjqTi7esGCGogfpO7Ptk5oPcCJh9RjquXnycrV0ZCMZC6TvowhyxMaYps7wiyGmBtCawYG4YMEZALiHv5Vv9YGfpoRp75AM1xGQzTgFGJRcS5fZBL0THXrxowOXrlEHyRFBHUgpZAnyOT7xkrSyIg1TJZCaxjbt58R6ZCZAniXKuZBxmf7gZDZDEAANxmkzeEj8BPALhYdyoDeZAXE2wq7Dj2IZBxf8ZB7B7PKovya9Xpp5NgqMmcqebXzgA6aamxwrkpSMa16NEZA5kZCMrboteRaVpzOfYrx7GLDt5ypLeBfFnlZCBwmASb1hTJKSrVezZBzFZCZAxhO0FIcCy9P0ZB1oBcrfssGvEaxJzXPaSxmPPdUzaO6yGjfAWHFDu9Q2tc9OTGDT3Sj6hZCpzTP8tkJQKGrjmaA8onwsMKQZD"

@csrf_exempt
def webhook_whatsapp(request):
    if request.method == 'GET':
        print("GET request received at webhook_whatsapp")
        # Confirmar webhook para o Facebook (caso configure a validação)
        verify_token = "An@lu171007"  # Token de verificação que você definiu no Facebook App
        mode = request.GET.get('hub.mode')
        token = request.GET.get('hub.verify_token')
        challenge = request.GET.get('hub.challenge')
        if mode == 'subscribe' and token == verify_token:
            return JsonResponse(int(challenge), safe=False)
        else:
            return JsonResponse({'status': 'Forbidden'}, status=403)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)

            dprint(data)

            # Aqui você deve navegar no JSON do webhook para extrair:
            # - Número do remetente
            # - Mensagem de texto

            # Exemplo típico do payload (você deve adaptar conforme seu webhook)
            entry = data.get('entry', [])[0]
            changes = entry.get('changes', [])[0]
            value = changes.get('value', {})
            messages = value.get('messages', [])
            if not messages:
                return JsonResponse({'status': 'no messages'})

            message = messages[0]
            numero = message['from']  # número do usuário que enviou a mensagem
            texto_recebido = message['text']['body']  # texto da mensagem

            # Processa a mensagem
            resposta_texto = processar_mensagem(numero, texto_recebido)

            # Envia a resposta para o usuário
            enviar_resposta_whatsapp(numero, resposta_texto)

            return JsonResponse({'status': 200, 'resposta': resposta_texto})

        except Exception as e:
            print(f'Erro : {e}')
            return JsonResponse({'status': 403, 'message': f'erro: {e}'})


def enviar_resposta_whatsapp(numero, resposta):
    """
    Envia uma resposta via API do WhatsApp, aceitando tanto string quanto dict.

    Args:
        numero (str): Número do destinatário (formato 55DDNUMERO).
        resposta (str | dict): Texto simples ou estrutura de mensagem.
    """
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    if isinstance(resposta, str):
        payload = {
            "messaging_product": "whatsapp",
            "to": numero,
            "type": "text",
            "text": {
                "body": resposta
            }
        }
    elif isinstance(resposta, dict):
        # Espera que o dict já esteja estruturado no formato da API
        payload = {
            "messaging_product": "whatsapp",
            "to": numero,
            **resposta  # exemplo: {'type': 'text', 'text': {'body': '...'}}
        }
    else:
        print(f"Tipo de resposta inválido: {type(resposta)}")
        return

    response = requests.post(WHATSAPP_API_URL, headers=headers, json=payload)

    if response.status_code == 200:
        print(f"✅ Mensagem enviada com sucesso para {numero}")
    else:
        print(f"❌ Erro ao enviar mensagem: {response.status_code} - {response.text}")
