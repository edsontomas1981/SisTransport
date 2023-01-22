from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from parceiros.models.parceiros import Parceiros
from Classes.dtc import Dtc 
from Classes.coleta import Coleta 
from Classes.utils import dprint

        
@login_required(login_url='/auth/entrar/')
def saveDtc (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        dados=carregaDadosParaCadastro(request)
        if request.POST.get('cnpjRem') == '' or request.POST.get('cnpjDest')=='':
            return JsonResponse({'status': 401}) #Cnpj remetente ou Destinatario vazios
        elif dados['remetente'] and dados['destinatario'] :
            if request.POST.get('numPed') != '':
                dtc=Dtc()
                dtc.readDtc(request.POST.get('numPed'))
                dtc.updateDtc(dados)
                dados=dtc.to_dict()
                return JsonResponse({'status': 210,'dados':dados})#Atualiza Dtc
            else:
                dtc=Dtc()
                dtc.createDtc(dados)
                dados=dtc.to_dict()
                return JsonResponse({'status': 200,'dados':dados}) #Cadastro efetuado com sucesso

        else:
            return JsonResponse({'status': 402}) #Erro nao especificado 
    else:
        return JsonResponse({'status': 402}) #Erro nao especificado

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
        
        

        
            
        