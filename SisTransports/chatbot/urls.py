from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from chatbot import views as views_chatbot

urlpatterns = [
    path('',views_chatbot.main_chatbot,name='main_chatbot'),
    path('teste_chat/',views_chatbot.teste_chat,name='teste_chat'),
    # path('mensagens/conversa/<str:conversa_id>/', views_chatbot.listar_mensagens_conversa),
]
    