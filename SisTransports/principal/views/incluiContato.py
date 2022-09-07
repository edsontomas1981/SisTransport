from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from parceiros.models.parceiros import Parceiros
from contatos.models.contato import Tipo_contatos
from django.http import JsonResponse
from Classes.contato import Contato as ClasseContato

def verificaParceiro(cnpjParc):
    if Parceiros.objects.filter(cnpj_cpf=cnpjParc).exists():
        parceiro=Parceiros.objects.filter(cnpj_cpf=cnpjParc).get()
        return parceiro

@login_required(login_url='/auth/entrar/')
def incluiContato(request):
    if request.method == "GET" :
        return render(request,'./cadastroParceiros.html',)
    elif request.method=="POST":
        parceiro=verificaParceiro(request.POST.get('cnpj_cpfMdl'))
        if parceiro :
            tipo_contato=Tipo_contatos.objects.filter(id=1).get()
            if request.POST.get('envio') == 'on':
                envio = True
            else:
                envio = False
            contatos=ClasseContato(parceiro) 
            contatos.incluiContato(tipo_contato,request.POST.get('contato'),
                                    request.POST.get('cargo'),request.POST.get('nome'),envio)
            dados=[parceiro.to_dict()]
            contato=contatos.contatos()
            return JsonResponse({'status':200, 'dados': dados,'contato':contato})#Cadastro de contato efetuado
        else:
            return JsonResponse({'status':400})#Erro parceiro nao locallizado