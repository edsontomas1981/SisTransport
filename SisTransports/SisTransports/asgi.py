"""
ASGI config for SisTransports project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

# SisTransports/asgi.py
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SisTransports.settings.base')

# Isso inicializa os apps corretamente
django_asgi_app = get_asgi_application()

# Só depois dos apps carregados, importa as rotas websocket
import operacional.views.roteirizacao.routing

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(
            operacional.views.roteirizacao.routing.websocket_urlpatterns
        )
    ),
})
