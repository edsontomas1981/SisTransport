from django.urls import path
from operacional import views as viewsOperacional

urlpatterns = [
    path('',viewsOperacional.operacional,name='operacional'),
    path('createColeta/',viewsOperacional.createColeta,name='createColeta'),
    path('readColeta/',viewsOperacional.readColeta,name='readColeta'),
    path('updateColeta/',viewsOperacional.updateColeta,name='updateColeta'),
    path('deleteColeta/',viewsOperacional.deleteColeta,name='deleteColeta'),
    path('readColetasGeral/',viewsOperacional.read_coletas_geral,name='readColetasGeral'),
    path('printColetas/',viewsOperacional.print_coletas,name='print'),
    path('impressaoColetas/',viewsOperacional.impressao_coletas,name='impressao_coletas'),

    path('createNf/',viewsOperacional.create_nf,name='createNf'),
    path('readNf/',viewsOperacional.read_nf,name='readNf'),
    path('readNfDtc/',viewsOperacional.read_nfs_by_dtc,name='read_nfs_by_dtc'),
    path('updateNf/',viewsOperacional.update_nf,name='updateNf'),
    path('deleteNf/',viewsOperacional.delete_nf,name='deleteNf'),
    path('createCte/',viewsOperacional.create_cte,name='createCte'),
    path('delete_cte/',viewsOperacional.delete_cte,name='delete_cte'),
    path('read_cte_by_dtc/',viewsOperacional.read_cte_by_dtc,name='read_cte_by_dtc'),
     
    path('read_rotas/',viewsOperacional.readRota,name='read_rotas'),
    ]