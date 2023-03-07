from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from comercial import views as viewsComercial

urlpatterns = [
    path('',viewsComercial.readTabela,name='readTabela'),
    path('createTabela/',viewsComercial.createTabela,name='createTabela'),
    path('updateTabela/',viewsComercial.updateTabela,name='updateTabela'),    
    path('readTabela/',viewsComercial.readTabela,name='readTabela'),  
    path('readTabelasPorParceiro/',viewsComercial.readTabelasPorParceiro,
         name='readTabelaPorParceiro'),  
    path('deleteTabela/',viewsComercial.deleteTabela,name='deleteTabela'),
    path('getTodasTabelas/',viewsComercial.getTodasTabelas,name='todasTabelas'),
    path('excluiParceiroTabela/',viewsComercial.excluiParceiroTabela,name='excluiParceiroTabela'),
    path('cnpjTabela/',viewsComercial.cnpjTabela,name='cnpjTabela'),
    path('filtraTabelas/',viewsComercial.filtraTabelas,name='filtraTabelas'),  
    path('faixa/createFaixa/',viewsComercial.createFaixa,name='createFaixa'),
    path('faixa/readFaixa/',viewsComercial.readFaixa,name='readFaixa'),
    path('faixa/readFaixas/',viewsComercial.readFaixas,name='readFaixas'),
    path('faixa/updateFaixa/',viewsComercial.updateFaixa,name='updateFaixa'),
    path('faixa/deleteFaixa/',viewsComercial.deleteFaixa,name='deleteFaixa'),
    path('cotacao/createCotacao/',viewsComercial.createCotacao,name='createCotacao'),
    path('cotacao/readCotacao/',viewsComercial.readCotacao,name='readCotacao'),
    path('cotacao/updateCotacao/',viewsComercial.updateCotacao,name='updateCotacao'),
    path('cotacao/deleteCotacao/',viewsComercial.deleteCotacao,name='deleteCotacao'),

]