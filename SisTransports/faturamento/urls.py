from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from faturamento import views as viewsFaturamento

urlpatterns = [
    path('',viewsFaturamento.faturamento,name='faturamento'),
    path('calculaFrete/',viewsFaturamento.calculaFrete,name='calculaFrete')
]
