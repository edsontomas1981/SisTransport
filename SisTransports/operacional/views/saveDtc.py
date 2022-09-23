from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from parceiros.models.parceiros import Parceiros
from Classes.dtc import Dtc 
from Classes.coleta import Coleta 

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
            if request.POST.get('numPed') != '':
                dtc=Dtc()
                dtc.readDtc(request.POST.get('numPed'))
                dtc.updateDtc(remetente,destinatario,redespacho,consignatario)
                dados=dtc.to_dict()
                return JsonResponse({'status': 210,'dados':dados})#Atualiza Dtc
            else:
                dtc=Dtc()
                dtc.createDtc(remetente,destinatario,redespacho,consignatario)
                dados=dtc.to_dict()
                return JsonResponse({'status': 200,'dados':dados}) #Cadastro efetuado com sucesso

        else:
            return JsonResponse({'status': 402}) #Erro nao especificado 
    else:
        return JsonResponse({'status': 402}) #Erro nao especificado
        
        
            
        