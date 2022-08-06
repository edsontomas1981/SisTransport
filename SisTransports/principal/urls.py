from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from principal.views.cadParceiros import ViewCadPar
from principal import views
from parceiros import views as viewParceiros

urlpatterns = [
     path('',views.home,
         name='home'),
     path('cadParceiros/',
        ViewCadPar.as_view(),name='cadParceiros'),
     path('salva_parceiro/',views.salva_parceiro,
         name='salva_parceiro'),
     path('cad_contato/',views.cad_contato,
         name='cad_contato'),
     path('busca_parceiro/',viewParceiros.busca_parceiro,
         name='busca_parceiro'),         
]
urlpatterns += static(settings.STATIC_URL, 
                      document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, 
                      document_root=settings.MEDIA_ROOT)