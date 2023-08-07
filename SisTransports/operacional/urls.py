from django.urls import path
from operacional import views as viewsOperacional

urlpatterns = [
    path('',viewsOperacional.operacional,name='operacional'),
    path('createColeta/',viewsOperacional.createColeta,name='createColeta'),
    path('readColeta/',viewsOperacional.readColeta,name='readColeta'),
    path('updateColeta/',viewsOperacional.updateColeta,name='updateColeta'),
    path('deleteColeta/',viewsOperacional.deleteColeta,name='deleteColeta'),
    path('createNf/',viewsOperacional.createColeta,name='createNf'),
    path('readNf/',viewsOperacional.readColeta,name='readNf'),
    path('updateNf/',viewsOperacional.updateColeta,name='updateNf'),
    path('deleteNf/',viewsOperacional.deleteColeta,name='deleteNf'),
    ]