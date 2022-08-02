from django import forms
from contatos.models import Contatos, Tipo_contatos
class FormParceiros(forms.Form):
    cnpj_cpf = forms.CharField(required=True,label='Cnpj/Cpf',max_length=18,
                               widget=forms.TextInput(attrs={'class':'form-control form-control-sm',
                                                             'id':'cnpj','name':'cnpj','onblur':'consultaCnpj();'}))
    nome_razao = forms.CharField(required=True,label='Nome/Razão',max_length=50,
                    widget=forms.TextInput(attrs={'class':'form-control form-control-sm','id':'razao','name':'razao'}))
    nome_fantasia = forms.CharField(required=False,label='Nome Fantasia',max_length=50,
                    widget=forms.TextInput(attrs={'class':'form-control form-control-sm','id':'fantasia','name':'fantasia'}))
    insc_est = forms.CharField(required=False,label='Inscrição Estadual',max_length=30,
                    widget=forms.TextInput(attrs={'class':'form-control form-control-sm','id':'inscr','name':'inscr'}))
    observacao = forms.CharField(required=False,label='Observação',max_length=100,
                    widget=forms.Textarea(attrs={'class':'form-control form-control-sm',
                                                 'rows':2 , 'id':'obs','name':'obs'}))
    cep=forms.CharField(required=True,widget=forms.TextInput(
                                attrs={'class':'form-control form-control-sm','onblur':'pesquisacep(this.value);',
                                       'id':'cep','name': 'cep'}))
    rua = forms.CharField(required=True,
                    widget=forms.TextInput(attrs={'class':'form-control form-control-sm',
                    'name':"rua", 'id':"rua"}))
    numero=forms.CharField(required=False,label='Nº', 
                           widget=forms.TextInput(attrs={'class':'form-control form-control-sm',
                            'name':"numero", 'id':"numero"}))
    complemento=forms.CharField(required=False,label='Complemento',
                            widget=forms.TextInput(attrs={'class':'form-control form-control-sm',
                            'name':"complemento", 'id':"complemento"}))
    bairro = forms.CharField(required=True,
                    widget=forms.TextInput(attrs={
                    'name':'bairro','id':"bairro"}))
    cidade=forms.CharField(required=True,
                    widget=forms.TextInput(attrs={
                    'name':'cidade','id':"cidade"}))
    uf = forms.CharField(required=True,
                    widget=forms.TextInput(attrs={
                    'name':'uf','id':"uf"}))
    
    tipo=Tipo_contatos.objects.all().order_by('descricao_contato')
    tipo_contato = forms.ModelMultipleChoiceField(tipo,required=False,
                    widget=forms.Select(attrs={'class':'form-select form-control-sm','name':'tipo_contato'}))                    
    
    fone_email_etc = forms.CharField(required=False,label='Contato',max_length=50,
                    widget=forms.TextInput(attrs={'class':'form-control form-control-sm'}))
    nome = forms.CharField(required=False,label='Nome',max_length=50,
                    widget=forms.TextInput(attrs={'class':'form-control form-control-sm'}))
    cargo = forms.CharField(required=False,label='Cargo',max_length=50,
                    widget=forms.TextInput(attrs={'class':'form-control form-control-sm'}))
    envio = forms.BooleanField(required=False,label='Envio',
                    widget=forms.CheckboxInput())
    
