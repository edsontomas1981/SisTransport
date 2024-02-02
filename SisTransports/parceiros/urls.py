from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from parceiros import views as viewsParceiros

urlpatterns = [
        path('',viewsParceiros.parceiros,name='parceiros'),
        path('createParceiro/',viewsParceiros.createParceiro,name='createParceiro'),
        path('readParceiro/',viewsParceiros.readParceiro,name='readParceiro'),
        path('updateParceiro/',viewsParceiros.updateParceiro,name='updateParceiro'),
        path('searchPartnerWs/',viewsParceiros.searchPartnerWs,name='searchPartnerWs'),
        path('deleteParceiro/',viewsParceiros.deleteParceiro,name='deleteParceiro'),
        path('read_parceiro_json/',viewsParceiros.read_parceiro_json,name='read_parceiro_json'),
    ]
    