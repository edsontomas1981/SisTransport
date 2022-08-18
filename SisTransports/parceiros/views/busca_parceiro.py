from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from parceiros.models.parceiros import Parceiros
from contatos.models.contato import Contatos
from django.template.loader import render_to_string
from Classes.consultaCnpj import validaCnpjCpf
from Classes.buscaCnpjWs import cnpjWs

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
            return JsonResponse({'dados': [], 'contato': contato})
    else:
        contato=[]  
        return JsonResponse({'dados': [], 'contato': contato ,'message':'Cnpj ou Cpf inválidos' })
    
def parceiroWs(request):
    dados=cnpjWs(request.POST.get('cnpj_cpf'))
    parceiro=Parceiros()
    parceiro.cnpj_cpf=models.CharField(max_length=18)
    parceiro.raz_soc=models.CharField(max_length=50)
    parceiro.nome_fantasia=models.CharField(max_length=50)
    parceiro.insc_est=models.CharField(max_length=30)
    parceiro.observacao=models.TextField()
    parceiro.ativo=models.BooleanField(default=True)
    endereco_fk=models.ForeignKey(Enderecos, on_delete=models.CASCADE)
    
    
    