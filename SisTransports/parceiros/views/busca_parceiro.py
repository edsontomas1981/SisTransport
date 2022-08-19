from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from parceiros.models.parceiros import Parceiros
from contatos.models.contato import Contatos
from django.template.loader import render_to_string
from Classes.consultaCnpj import validaCnpjCpf
from Classes.buscaCnpjWs import cnpjWs
from enderecos.models.endereco import Enderecos
def busca_parceiro(request):
    if validaCnpjCpf(request.POST.get('cnpj_cpf')):
        if Parceiros.objects.filter(cnpj_cpf=request.POST.get('cnpj_cpf')).exists():
            parceiro = Parceiros.objects.filter(cnpj_cpf=request.POST.get('cnpj_cpf')).get()
            dados=[parceiro.to_dict()]
            if Contatos.objects.filter(parceiro_fk_id=parceiro.id).exists() :
                dados=[parceiro.to_dict()]
                contatos=Contatos.objects.filter(parceiro_fk_id=parceiro.id)
                contato=[]
                for c in contatos:
                    contato.append(c.to_dict())
                return JsonResponse({'dados': dados,'contato':contato})
            else:
                contato=[]
                dados = [parceiro.to_dict()]
                return JsonResponse({'dados': dados ,'contato': contato})
        else:#Buscar cnpj em um webservice
            dados=parceiroWs(request)
            return JsonResponse({'dados': dados})
    else:
        print()
        contato=[]  
        return JsonResponse({'dados': [], 'contato': contato ,'message':'Cnpj ou Cpf inválidos' })
    
def parceiroWs(request):
    dados=cnpjWs(request.POST.get('cnpj_cpf'))
    
    endereco=Enderecos()
    endereco.cep=dados['cep']
    endereco.logradouro=dados['logradouro']
    endereco.numero=dados['numero']
    endereco.complemento=dados['complemento']
    endereco.bairro=dados['bairro']
    endereco.cidade=dados['municipio']
    endereco.uf=dados['uf']
    
    parceiro=Parceiros()
    parceiro.cnpj_cpf=dados['cnpj']
    parceiro.raz_soc==dados['nome']
    parceiro.nome_fantasia==dados['fantasia']
    
    return response_to_dict(endereco,parceiro)

def response_to_dict(endereco,parceiro):
    return {
        'cnpj_cpf': parceiro.cnpj_cpf,
        'raz_soc': parceiro.raz_soc,
        'nome_fantasia': parceiro.nome_fantasia,
        'observacao': '',
        'endereco_fk':{
        'cep': endereco.cep,
        'logradouro': endereco.logradouro,
        'numero': endereco.numero,
        'complemento': endereco.complemento,
        'bairro': endereco.bairro,
        'cidade': endereco.cidade,
        'uf': endereco.uf}
    }
    
    
    
    