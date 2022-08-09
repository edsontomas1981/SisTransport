from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from parceiros.views.salva_parceiro import salva_parceiro as salvar
from enderecos.views.salva_end import salva_end
from django.contrib import messages
from django.contrib.messages import constants
from enderecos.models.endereco import Enderecos
from parceiros.models.parceiros import Parceiros
from contatos.models.contato import Contatos
from contatos.models.contato import Tipo_contatos
from django.http import JsonResponse

def salvaParceiro(request,endereco):
    parceiro=Parceiros()
    parceiro.cnpj_cpf=request.POST.get('cnpj_cpf')
    parceiro.insc_est=request.POST.get('insc_est')
    parceiro.raz_soc=request.POST.get('razao')
    parceiro.nome_fantasia=request.POST.get('fantasia')
    parceiro.observacao=request.POST.get('obs')
    parceiro.endereco_fk=endereco
    parceiro.save()

def alteraParceiro(request,endereco):
    parceiro=Parceiros.objects.filter(cnpj_cpf=request.POST.get('cnpj_cpf')).get()
    parceiro.cnpj_cpf=request.POST.get('cnpj_cpf')
    parceiro.insc_est=request.POST.get('insc_est')
    parceiro.raz_soc=request.POST.get('razao')
    parceiro.nome_fantasia=request.POST.get('fantasia')
    parceiro.observacao=request.POST.get('obs')
    parceiro.endereco_fk=endereco
    parceiro.save()


def salvaEndereco(request):
    endereco=Enderecos()
    endereco.cep=request.POST.get('cep')
    endereco.logradouro=request.POST.get('rua')
    endereco.numero=request.POST.get('numero')
    endereco.complemento=request.POST.get('complemento')
    endereco.bairro=request.POST.get('bairro')
    endereco.cidade=request.POST.get('cidade')
    endereco.uf=request.POST.get('uf')
    endereco.save()
    return endereco

def alteraEndereco(request):
    endereco=Enderecos.objects.filter(id=request.POST.get('idEndereco')).get()
    endereco.cep=request.POST.get('cep')
    endereco.logradouro=request.POST.get('rua')
    endereco.numero=request.POST.get('numero')
    endereco.complemento=request.POST.get('complemento')
    endereco.bairro=request.POST.get('bairro')
    endereco.cidade=request.POST.get('cidade')
    endereco.uf=request.POST.get('uf')
    endereco.save()
    return endereco
   

@login_required(login_url='/auth/entrar/')
def salva_parceiro(request):
    if request.method == "GET" :
        return render(request,'./cadastroParceiros.html',)

    elif request.method == "POST" :
        if request.POST.get('acaoForm')=='incluiContato':
            print(request.POST)
            contato=Contatos()
            parceiro=Parceiros.objects.filter(id=request.POST.get('idParceiro')).get()
            tipo_contato=Tipo_contatos.objects.filter(id=1).get()
            contato.parceiro_fk=parceiro
            contato.tipo=tipo_contato
            contato.fone_email_etc=request.POST.get('contato')
            contato.nome=request.POST.get('nome')       
            contato.cargo=request.POST.get('cargo')
            if request.POST.get('envio') == 'on':
                envio = True
            else:
                envio = False
            contato.envio=envio
            contato.save()
            dados=[contato.to_dict()]
            return JsonResponse({'dados': dados})
        
        elif request.POST.get('acaoForm') == ('salvaParceiro'):

            if request.POST.get('razao') == '' or request.POST.get('cnpj_cpf') == '' \
                or request.POST.get('cep') == '' or request.POST.get('rua') == '' \
                or request.POST.get('bairro') == '' or request.POST.get('cidade') == ''\
                or request.POST.get('uf') == '' :
                              
                return JsonResponse({'status': 'error', 'message': 'Preencha todos os campos'})
            else:
                if Parceiros.objects.filter(cnpj_cpf=request.POST.get('cnpj_cpf')).exists():
                    endereco=alteraEndereco(request)
                    parceiro=alteraParceiro(request,endereco)
                    return JsonResponse({'status': 'success', 
                                         'message': 'Parceiro alterado com sucesso'})
                else:
                    endereco=salvaEndereco(request)
                    parceiro=salvaParceiro(request,endereco)
                    return JsonResponse({'status': 'success', 
                                         'message': 'Parceiro cadastrado com sucesso'})