from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from autenticacao import views

urlpatterns = [
    path('entrar/',views.entrar,
         name='entrar'),
]