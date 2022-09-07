from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from principal.views.cadParceiros import ViewCadPar
from principal import views as viewsPrincipal
from parceiros import views as viewParceiros
from operacional import views as viewsOperacional
urlpatterns = [
     path('',viewsPrincipal.home,
         name='home'),
     path('cadParceiros/',
        ViewCadPar.as_view(),name='cadParceiros'),
     path('salva_parceiro/',viewsPrincipal.salva_parceiro,
         name='salva_parceiro'),
     path('inclui_contato/',viewsPrincipal.incluiContato,
         name='incluiContato'),         
     path('cad_contato/',viewsPrincipal.cad_contato,
         name='cad_contato'),
     path('busca_parceiro/',viewParceiros.busca_parceiro,
        name='busca_parceiro'),
     path('preDtc/',viewsOperacional.preDtc,
         name='preDtc'),           
     path('saveDtc/',viewsOperacional.saveDtc,
         name='saveDtc'),           

]
urlpatterns += static(settings.STATIC_URL, 
                      document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, 
                      document_root=settings.MEDIA_ROOT)