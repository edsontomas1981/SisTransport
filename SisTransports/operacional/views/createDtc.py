from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from operacional.classes.dtc import Dtc 
from parceiros.models.parceiros import Parceiros
from operacional.classes.rotas import Rota
from Classes.utils import dprint,dpprint

@login_required(login_url='/auth/entrar/')
def createDtc (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        dados=carregaDadosParaCadastro(request)
        dtc=Dtc()
        dtc.createDtc(dados)
        return JsonResponse({'status': 200, 'dtc':dtc.to_dict()}) 
    
def buscaParceiro(cnpj):
    if Parceiros.objects.filter(cnpj_cpf=cnpj).exists():
        parceiro=Parceiros.objects.filter(cnpj_cpf=cnpj).get()
        return parceiro

def buscaRota(idRota):
    rota=Rota()
    rota.readRota(idRota)
        
def carregaDadosParaCadastro(request):
        remetente=buscaParceiro(request.POST.get('cnpjRem'))
        destinatario=buscaParceiro(request.POST.get('cnpjDest'))
        consignatario=buscaParceiro(request.POST.get('cnpjConsig'))
        tomador=buscaParceiro(request.POST.get('cnpjTomador'))
        modalidadeFrete=request.POST.get('modalidadeFrete')
        rota=Rota()
        rota.readRota(request.POST.get('rotasDtc'))        
        return {'remetente':remetente,'rota':rota.rota,'destinatario':destinatario,'consignatario':consignatario,
                'tomador':tomador,'modalidadeFrete':modalidadeFrete}    