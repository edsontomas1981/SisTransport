from django.views.generic.edit import FormView
from SisTransports.forms.formParceiros import FormParceiros

class ViewCadPar(FormView):
    template_name = 'parceiros.html'
    form_class = FormParceiros
    success_url = '/'