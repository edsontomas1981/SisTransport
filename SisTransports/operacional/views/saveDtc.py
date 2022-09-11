from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from operacional.models.dtc import Dtc as dctoCarga
from parceiros.models.parceiros import Parceiros
from Classes.dtc import Dtc 

def buscaParceiro(cnpj):
    if Parceiros.objects.filter(cnpj_cpf=cnpj).exists():
        parceiro=Parceiros.objects.filter(cnpj_cpf=cnpj).get()
        return parceiro 

@login_required(login_url='/auth/entrar/')
def saveDtc (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        remetente=buscaParceiro(request.POST.get('cnpjRem'))
        destinatario=buscaParceiro(request.POST.get('cnpjDest'))
        redespacho=buscaParceiro(request.POST.get('cnpjRedesp'))
        consignatario=buscaParceiro(request.POST.get('cnpjConsig'))   
        if request.POST.get('cnpjRem') == '' or request.POST.get('cnpjDest')=='':
            return JsonResponse({'status': 401}) #Cnpj remetente ou Destinatario vazios
        elif remetente and destinatario :
            dtc=Dtc()
            dtc.incluiDtc(remetente,destinatario,redespacho,consignatario)
            dados=dtc.to_dict()
            dictDtc=dtc.alteraDtc(1,remetente,destinatario,redespacho,consignatario)
            return JsonResponse({'status': 200,'dados':dados}) #Cadastro efetuado com sucesso
        else:
            return JsonResponse({'status': 402}) #Erro nao especificado 
    else:
        return JsonResponse({'status': 402}) #Erro nao especificado
        
        
            
        