from django.views import View
from Classes.BaseView import ViewBase
from django.shortcuts import render

from Classes.utils import dprint

class ResultadoBusca(ViewBase, View):
    def get(self, request, *args, **kwargs):
        dados = self.process_request_data(request)
        return render(request,'./resultado_busca.html',)

        