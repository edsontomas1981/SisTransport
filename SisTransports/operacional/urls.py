from django.urls import path
from operacional import views as viewsOperacional

urlpatterns = [
    path('',viewsOperacional.operacional,name='operacional'),
    path('createColeta/',viewsOperacional.createColeta,name='createColeta'),
    path('readColeta/',viewsOperacional.readColeta,name='readColeta'),
    path('updateColeta/',viewsOperacional.updateColeta,name='updateColeta'),
    path('deleteColeta/',viewsOperacional.deleteColeta,name='deleteColeta'),
    
    path('createNf/',viewsOperacional.create_nf,name='createNf'),
    path('readNf/',viewsOperacional.read_nf,name='readNf'),
    path('updateNf/',viewsOperacional.update_nf,name='updateNf'),
    path('deleteNf/',viewsOperacional.delete_nf,name='deleteNf'),
    ]