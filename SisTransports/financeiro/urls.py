from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from financeiro import views as viewsFinanceiro

urlpatterns = [
    path('',viewsFinanceiro.financeiro,name='financeiro'),]