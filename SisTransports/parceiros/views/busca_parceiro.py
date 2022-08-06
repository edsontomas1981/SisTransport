from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from parceiros.models.parceiros import Parceiros

def busca_parceiro(request):
    print('buscar')
    parceiro=Parceiros.objects.filter(cnpj_cpf=request.POST.get('cnpj_cpf')).get()
    dados=[parceiro.to_dict()]
    return JsonResponse({'dados': dados})