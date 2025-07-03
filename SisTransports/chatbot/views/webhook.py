import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from chatbot.service.verifica_estado_chat import processar_mensagem

WHATSAPP_API_URL = "https://graph.facebook.com/v16.0/YOUR_PHONE_NUMBER_ID/messages"
ACCESS_TOKEN = "EAANxmkzeEj8BOwulMw4mURkgkiNJfhU776XajdgYrpxXlhtHSP6k1TNE8jZA5lrdIKKcUClKfHgvHtgmhyIDwAQrSLs3gAbiw8UloRmWkZCP9hVAzfEQQ64iXkO6nA4cgVFmvA2lfEbEHDuhJtg2trwCiU0FIN8kdjJLAAKlkhzr1526Gq1W4cWGgnvj9tXZAZBOiMmMGQ3124RohIN6ZC80yAZC232jnwpDGgLXAUoesZD"

@csrf_exempt
def webhook_whatsapp(request):
    if request.method == 'GET':
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
            resposta_texto = processar_mensagem(texto_recebido)

            # Envia a resposta para o usuário
            enviar_resposta_whatsapp(numero, resposta_texto)

            return JsonResponse({'status': 200, 'resposta': resposta_texto})

        except Exception as e:
            print(f'Erro : {e}')
            return JsonResponse({'status': 403, 'message': f'erro: {e}'})


def enviar_resposta_whatsapp(numero, texto):
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    payload = {
        "messaging_product": "whatsapp",
        "to": numero,
        "type": "text",
        "text": {
            "body": texto
        }
    }

    response = requests.post(WHATSAPP_API_URL, headers=headers, json=payload)
    if response.status_code == 200:
        print(f"Mensagem enviada com sucesso para {numero}")
    else:
        print(f"Erro ao enviar mensagem: {response.status_code} - {response.text}")
