from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from principal.views.cadParceiros import ViewCadPar
from principal import views

urlpatterns = [
    path('',views.home,
         name='home'),
    path('cadParceiros/',
        ViewCadPar.as_view(),name='cadParceiros'),
]
urlpatterns += static(settings.STATIC_URL, 
                      document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, 
                      document_root=settings.MEDIA_ROOT)