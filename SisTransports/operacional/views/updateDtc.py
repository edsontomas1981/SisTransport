from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from operacional.classes.dtc import Dtc 
from parceiros.models.parceiros import Parceiros

@login_required(login_url='/auth/entrar/')
def updateDtc (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        dados=carregaDadosParaCadastro(request)
        dtc=Dtc()
        dtc.updateDtc(dados,request.POST.get('numDtc'))
        return JsonResponse({'status': 200, 'dtc':dtc.to_dict()}) 

def buscaParceiro(cnpj):
    if Parceiros.objects.filter(cnpj_cpf=cnpj).exists():
        parceiro=Parceiros.objects.filter(cnpj_cpf=cnpj).get()
        return parceiro
        
def carregaDadosParaCadastro(request):
        remetente=buscaParceiro(request.POST.get('cnpjRem'))
        destinatario=buscaParceiro(request.POST.get('cnpjDest'))
        consignatario=buscaParceiro(request.POST.get('cnpjConsig'))
        tomador=buscaParceiro(request.POST.get('cnpjTomador'))
        modalidadeFrete=request.POST.get('modalidadeFrete')
        return {'remetente':remetente,'destinatario':destinatario,'consignatario':consignatario,
                'tomador':tomador,'modalidadeFrete':modalidadeFrete}        