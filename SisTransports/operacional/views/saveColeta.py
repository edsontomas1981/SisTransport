from traceback import print_tb
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from parceiros.models.parceiros import Parceiros
from Classes.dtc import Dtc 
from Classes.coleta import Coleta 
from operacional.models.dtc import Dtc  as MdlDtc


@login_required(login_url='/auth/entrar/')
def saveColeta (request):
    if request.method == 'GET': 
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        if MdlDtc.objects.filter(id=request.POST.get('numPed')).exists():
            dtc=MdlDtc.objects.filter(id=request.POST.get('numPed')).get()
            print('request.POST')
            coleta=Coleta(dtc,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,)
            coleta.salvaColeta()
            return JsonResponse({'status': 200}) #Erro nao especificado
        else:
            return JsonResponse({'status': 402}) #Erro nao especificado
        
    
    # notaFiscal=None,volume=None,peso=None,m3=None,valor=None,especie=None,
    #              veiculo=None,tipo=None,horario=None,obs=None,cep=None,rua=None,num=None,
    #              comp=None,bairro=None,cidade=None,uf=None,nome=None,contato=None):