from django import forms
from contatos.models import Contatos, Tipo_contatos
class FormParceiros(forms.Form):
    cpnj_cpf = forms.CharField(required=True,label='Cnpj/Cpf',max_length=18)
    nome_razao = forms.CharField(required=True,label='Nome/Razão',max_length=50,
                    widget=forms.TextInput(attrs={'class':'form-control'}))
    nome_fantasia = forms.CharField(required=False,label='Nome Fantasia',max_length=50,
                    widget=forms.TextInput(attrs={'class':'form-control'}))
    insc_est = forms.CharField(required=False,label='Inscrição Estadual',max_length=30)
    observacao = forms.CharField(required=False,label='Observação',max_length=100,
                    widget=forms.Textarea(attrs={'rows':2}))
    cep=forms.CharField(required=True,
                    widget=forms.TextInput(attrs={
                    'onblur':'pesquisacep(this.value);','name': 'cep'}))
    rua = forms.CharField(required=True,
                    widget=forms.TextInput(attrs={
                    'name':"rua", 'id':"rua"}))
    numero=forms.CharField(required=False,label='Nº')
    complemento=forms.CharField(required=False,label='Complemento')
    bairro = forms.CharField(required=False,
                    widget=forms.TextInput(attrs={
                    'name':'bairro','id':"bairro"}))
    cidade=forms.CharField(required=True,
                    widget=forms.TextInput(attrs={
                    'name':'cidade','id':"cidade"}))
    uf = forms.CharField(required=True,
                    widget=forms.TextInput(attrs={
                    'name':'uf','id':"uf"}))
    
    tipo=Tipo_contatos.objects.all().order_by('descricao_contato')
    tipo_contato = forms.ModelMultipleChoiceField(tipo,required=True,
                    widget=forms.Select(attrs={'class':'form-select'}))                    
    
    fone_email_etc = forms.CharField(required=True,label='Contato',max_length=50,
                    widget=forms.TextInput(attrs={'class':'form-control'}))
    nome = forms.CharField(required=True,label='Nome',max_length=50,
                    widget=forms.TextInput(attrs={'class':'form-control'}))
    cargo = forms.CharField(required=True,label='Cargo',max_length=50,
                    widget=forms.TextInput(attrs={'class':'form-control'}))
    envio = forms.BooleanField(required=True,label='Envio',
                    widget=forms.CheckboxInput())
    
