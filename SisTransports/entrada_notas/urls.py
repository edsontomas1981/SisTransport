from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from entrada_notas.views import entrada_nf as viewsEntradaNF
urlpatterns = [
    # path('',viewsEntradaNF,name='entrada'),
    path('entrada_notas/',viewsEntradaNF.EntradaNFView.as_view(),name='EntradaNFView'),
    ]
