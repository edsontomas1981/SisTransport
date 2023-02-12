from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from Classes.utils import dprint,checkBox
from contatos.classes.contato import Contato 
from contatos.classes.tipoContatos import TipoContato
from parceiros.classes.parceiros import Parceiros



@login_required(login_url='/auth/entrar/')
def createContato(request):
    if request.method == 'GET':
        return JsonResponse({'status': 200}) 
    elif request.method == "POST" :
        dprint(request.POST.get('envio'))

        parceiro=Parceiros()
        parceiro.readParceiro(request.POST.get('cnpjMdl'))

        tipoContato=TipoContato()
        tipoContato.readTipo(request.POST.get('tipo_contato'))

        dados=standartData(dict(request.POST.items()))
        dados['tipo']=tipoContato.tipoContato
        dados['parceiro']=parceiro.parceiro


        contato=Contato()
        contato.createContato(dados)
        return JsonResponse({'status': 200}) 

def standartData(response):
    return{'cargo':response['cargo'],
            'nome':response['nome'],
            'descContato':response['contato'],
            'envio':checkBox(response['envio'])
            }
