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
    path('get_cte_dtc/',viewsOperacional.get_cte_by_dtc,name='get_cte_by_dtc'),

    path('get_tipo_manifesto/',viewsOperacional.get_tipos_manifesto,name='get_tipos_manifesto'),
    path('get_tipo_manifesto_id/',viewsOperacional.get_tipo_manifesto_by_id,name='get_tipo_manifesto_by_id'),

    path('get_ocorrencia_manifesto_id/',viewsOperacional.get_ocorrencia_manifesto_by_id,name='get_ocorrencia_manifesto_by_id'),
    path('get_ocorrencias_manifesto/',viewsOperacional.get_ocorrencias_manifesto,name='get_ocorrencias_manifesto'),

    path('entrada_nfs/',viewsOperacional.entrada_nfs,name='entrada_nfs'),

    path('motorista/',viewsOperacional.motorista,name='motorista'),    
    path('create_motorista/',viewsOperacional.create_motorista,name='create_motorista'),
    path('delete_motorista/',viewsOperacional.delete_motorista,name='delete_motorista'),
    path('read_por_veiculo_motorista/',viewsOperacional.read_motorista_por_veiculo,name='read_motorista_por_veiculo'),
    path('read_motorista/',viewsOperacional.read_motorista,name='read_motorista'),
    path('read_motoristas/',viewsOperacional.read_motoristas,name='read_motoristas'),
    path('update_motorista/',viewsOperacional.update_motorista,name='update_motorista'),

    path('proprietario/', viewsOperacional.proprietario, name='proprietario'),
    path('create_proprietario/', viewsOperacional.create_proprietario, name='create_proprietario'),
    path('delete_proprietario/', viewsOperacional.delete_proprietario, name='delete_proprietario'),
    path('read_proprietario_por_veiculo/', viewsOperacional.read_proprietario_por_veiculo, name='read_proprietario_por_veiculo'),
    path('read_proprietario/', viewsOperacional.read_proprietario, name='read_proprietario'),
    path('read_proprietarios/', viewsOperacional.read_proprietarios, name='read_proprietarios'),
    path('update_proprietario/',viewsOperacional.update_proprietario, name='update_proprietario'),

    path('create_veiculo/',viewsOperacional.create_veiculo, name='create_veiculo'),
    path('dados_combos_veiculos/',viewsOperacional.dados_cadatro_veiculo, name='cad_veiculo'),
    path('read_veiculo_placa/',viewsOperacional.read_veiculo_placa,name='read_veiculo_placa'),

    path('manifesto/',viewsOperacional.manifesto,name='manifesto'),


    path('read_rotas/',viewsOperacional.readRota,name='read_rotas'),
    path('rotas/',viewsOperacional.rotas,name='rotas'),

    ]