from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from operacional.models.dtc import Dtc 
from parceiros.models.parceiros import Parceiros

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
            dtc.remetente_fk=remetente
            dtc.destinatario_fk=destinatario
            if redespacho :
                dtc.redespacho_fk=redespacho
            if consignatario :
                dtc.consignatario_fk=consignatario
            dtc.save()
            dadosDtc = [dtc.to_dict()]
            return JsonResponse({'status': 200 , 'dadosDtc':dadosDtc}) #Cadastro efetuado com sucesso
        else:
            
            return JsonResponse({'status': 402}) #Erro nao especificado 
    else:
        return JsonResponse({'status': 402}) #Erro nao especificado
        
        
            
        