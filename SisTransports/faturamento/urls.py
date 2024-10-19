from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from faturamento import views as viewsFaturamento

urlpatterns = [
    path('',viewsFaturamento.relatorio_faturas,name='relatorio_faturamento'),
    path('gerar_faturas/',viewsFaturamento.gerar_faturas,name='gerar_faturas'),
    path('relatorio_faturas/',viewsFaturamento.relatorio_faturas,name='relatorio_faturas'),
    path('calculaFrete/',viewsFaturamento.calculaFrete,name='calculaFrete'),
    path('exclui_fatura/',viewsFaturamento.exclui_fatura,name='exclui_fatura'),
    path('get_faturas/',viewsFaturamento.get_all_faturas,name='get_faturas'),
    path('get_fatura/',viewsFaturamento.get_fatura,name='get_fatura'),
    path('cria_fatura/',viewsFaturamento.cria_fatura,name='cria_fatura'),
    path('get_fatura_criterios/',viewsFaturamento.GetFaturasCriterios.as_view(),name='get_fatura_criterios'),
]
