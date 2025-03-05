from django.views import View
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from operacional.classes.coleta import Coleta
from operacional.classes.dtc import Dtc
from operacional.classes.cte import Cte
from operacional.classes.nota_fiscal import Nota_fiscal_CRUD
from Classes.utils import dprint,pode_ser_inteiro

class BuscarDocumentos(ViewBase, View):

    def post(self, request, *args, **kwargs):
        try:
            dados = self.process_request_data(request)

            lista_de_coletas = []
            lista_de_ctes = []
            lista_de_dtc =  []
            lista_de_notas =  []
            lista_por_nome = []
            lista_por_cnpj = []

            if pode_ser_inteiro(dados.get('id_documento')):
                dtcs = Dtc.obter_dtc_id(dados.get('id_documento'))
                coletas =Coleta.get_obj_coleta_by_id_coleta(dados.get('id_documento'))
                ctes = Cte.obtem_cte_id(dados.get('id_documento'))
                notas =  Nota_fiscal_CRUD.get_notas_por_num_nf(dados.get('id_documento'))
                lista_de_coletas =prepara_coletas(coletas)
                lista_de_ctes = prepara_ctes(ctes)
                lista_de_dtc =prepara_dtc(dtcs)
                lista_de_notas =prepara_notas(notas)
            
            if not pode_ser_inteiro(dados.get('id_documento')):
                dtcs_por_nome = Dtc.buscar_dtc_por_trechos_razao(dados.get('id_documento'))
                lista_por_nome = [dtc.to_dict() for dtc in dtcs_por_nome]
            
            if len(dados.get('id_documento'))>5 :
                dtcs_por_cnpj = Dtc.buscar_dtc_por_trechos_cnpj(dados.get('id_documento'))
                lista_por_cnpj = [dtc.to_dict() for dtc in dtcs_por_cnpj]

            return JsonResponse({'success': True,
                                 'notas':lista_de_notas,
                                 'coletas':lista_de_coletas,
                                 'ctes':lista_de_ctes,
                                 'dtcs':lista_de_dtc,
                                 'id_documento_busca':dados.get('id_documento'),
                                 'dtc_por_nome':lista_por_nome,
                                 'dtc_por_cnpj':lista_por_cnpj
                                 }, status=201)
        except:
            return JsonResponse({'success': False,'error':'Erro interno'}, status=400)

def prepara_coletas(coletas):
    lista_de_coletas = []
    if coletas:
        coleta = coletas.to_dict()
        dtc = Coleta.get_obj_dtc_by_id_coleta(coleta.get('id')).to_dict()   
        lista_de_coletas.append({'coletas':coleta,'dtc':dtc})
    return lista_de_coletas

def prepara_dtc(dtcs):
    lista_de_dtc = []
    if dtcs:
        lista_de_dtc.append(dtcs.to_dict())
    return lista_de_dtc

def prepara_ctes(ctes):
    lista_de_ctes = []
    if ctes:
        cte = ctes.to_dict()
        dtc  =Cte.obtem_dtc_cte(cte.get('id')).to_dict()
        lista_de_ctes.append({'ctes':ctes.to_dict(),'dtc':dtc})
    
    return lista_de_ctes

def prepara_notas(notas):
    lista_de_notas = []
    if notas:
        for nota in notas:
            dict_nota = nota.to_dict()
            dtc = Dtc.obter_dtc_id(dict_nota.get('id_dtc')).to_dict()
            lista_de_notas.append({'nota':dict_nota,'dtc':dtc})
    return lista_de_notas


      
