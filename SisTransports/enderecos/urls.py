from django.urls import path ,include
from enderecos import views as views_endereco
# from operacional.views.roteirizacao import routing


urlpatterns = [
    path('get_pontos_atendimento/',views_endereco.CarregaEnderecosColetaEntrega.as_view(),name='CarregaEnderecosColetaEntrega'),
]

