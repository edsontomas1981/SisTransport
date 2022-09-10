from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from parceiros.models.parceiros import Parceiros
from contatos.models.contato import Tipo_contatos
from django.http import JsonResponse
from Classes.contato import Contato as ClasseContato

@login_required(login_url='/auth/entrar/')
def excluiContato(request):
    if request.method == "GET" :
        return render(request,'./cadastroParceiros.html',)
    elif request.method=="POST":
        parceiro=Parceiros.objects.filter(cnpj_cpf=request.POST.get('cnpj_cpfMdl')).get()
        contato=ClasseContato(parceiro)
        contato.excluiContato(request.POST.get('idContato'))
        contato = contato.contatos()
        dados=[parceiro.to_dict()]
        return JsonResponse({'status':200,'contato':contato,'dados': dados})
    else:
        return JsonResponse({'status':400})#Erro parceiro nao locallizado