from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path, re_path
from .consumers import Mapa

websocket_urlpatterns = [
    re_path(r"some_url/", Mapa.as_asgi()),
    # Adicione outras URLs WebSocket aqui, se necessário
]

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
    # Adicione outros roteadores para outros protocolos, se necessário
})
