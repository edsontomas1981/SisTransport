from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from faturamento import views as viewsFaturamento

urlpatterns = [
    path('',viewsFaturamento.relatorio_faturas,name='relatorio_faturamento'),
    path('gerar_faturas/',viewsFaturamento.gerar_faturas,name='gerar_faturas'),

    path('calculaFrete/',viewsFaturamento.calculaFrete,name='calculaFrete'),
]
