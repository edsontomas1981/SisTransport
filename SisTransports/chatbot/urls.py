from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from chatbot import views as views_chatbot

urlpatterns = [
    path('',views_chatbot.main_chatbot,name='main_chatbot'),
]
    