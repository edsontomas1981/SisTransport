# mensagens/routing.py
from django.urls import re_path
from mensagens.consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<conversa_id>\w+)/$', ChatConsumer.as_asgi()),
]


