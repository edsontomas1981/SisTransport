from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from principal.views.cadParceiros import ViewCadPar
from principal import views as viewsPrincipal
from parceiros import views as viewParceiros
from operacional import views as viewsOperacional
from comercial import views as viewsComercial
from enderecos import views as viewsEnderecos


urlpatterns = [
    path('',viewsPrincipal.home,name='home'),
    path('inclui_contato/',viewsPrincipal.incluiContato,name='incluiContato'),
    path('exclui_contato/',viewsPrincipal.excluiContato,name='exluiContato'),
    path('cad_contato/',viewsPrincipal.cad_contato,name='cad_contato'),
    
    path('salva_parceiro/',viewsPrincipal.salva_parceiro,name='salva_parceiro'),
    path('busca_parceiro/',viewParceiros.busca_parceiro,name='busca_parceiro'),
    path('createParceiro/',viewParceiros.createParceiro,name='createParceiro'),
    path('readParceiro/',viewParceiros.readParceiro,name='readParceiro'),
    path('updateParceiro/',viewParceiros.updateParceiro,name='updateteParceiro'),
    path('deleteParceiro/',viewParceiros.deleteParceiro,name='deleteParceiro'),

    path('preDtc/',viewsOperacional.preDtc,name='preDtc'),
    path('preDtc/buscaDtc/',viewsOperacional.buscaDtc,name='buscaDtc'),           
    path('preDtc/saveDtc/',viewsOperacional.saveDtc,name='saveDtc'),

    path('preDtc/createDtc/',viewsOperacional.createDtc,name='createDtc'),
    path('preDtc/readDtc/',viewsOperacional.readDtc,name='readDtc'),
    path('preDtc/updateDtc/',viewsOperacional.updateDtc,name='updateDtc'),
    path('preDtc/deleteDtc/',viewsOperacional.deleteDtc,name='deleteDtc'),
    
    path('preDtc/excluiDtc/',viewsOperacional.excluiDtc,name='excluiDtc'),   
    path('preDtc/saveColeta/',viewsOperacional.saveColeta,name='saveColeta'), 
    path('preDtc/deletaColeta/',viewsOperacional.deletaColeta,name='deletaColeta'), 
    path('rotas/', viewsOperacional.rotas,name='rotas'),
    path('rotas/createRota/', viewsOperacional.createRota,name='createRota'),
    path('rotas/readRota/', viewsOperacional.readRota,name='readRota'),
    path('rotas/readRotas/', viewsOperacional.readRotas,name='readRotas'),
    path('rotas/updateRota/', viewsOperacional.updateRota,name='updateRota'),
    path('rotas/deleteRota/', viewsOperacional.deleteRota,name='deleteRota'),
    path('endereco/readMunicipio/', viewsEnderecos.readMunicipio,name='readMunicipio'),          
]
urlpatterns += static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)