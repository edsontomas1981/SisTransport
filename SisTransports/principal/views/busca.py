from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required(login_url='/auth/entrar/')
def busca(request):
    query = request.GET.get('query', '')  # Obtém o valor do parâmetro de consulta
    resultados = []  # Substitua por sua lógica de busca
    print(query)
    # if query:
    #     resultados = buscar_no_banco(query)  # Substitua pela função de busca real
    return render(request, 'resultado_busca.html', {'resultados': resultados, 'query': query})
