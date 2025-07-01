# mensagens/views.py
from django.http import JsonResponse
from chatbot.MensagemManager import MensagemManager

def listar_mensagens_conversa(request, conversa_id):
    """
    Lista as mensagens de uma conversa (em memória).
    Ex: GET /mensagens/conversa/teste123/
    """
    mensagens = MensagemManager.listar_mensagens(conversa_id)
    return JsonResponse({'conversa_id': conversa_id, 'mensagens': mensagens})

