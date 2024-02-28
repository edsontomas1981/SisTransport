from django.contrib import admin
from operacional.models.emissor import Emissor
from operacional.models.marca_veiculos import Marca
from operacional.models.tipo_carroceria import Tipo_Carroceria
from operacional.models.tipo_combustivel import Tipo_Combustivel
from operacional.models.tipo_veiculo import  Tipo_Veiculo
from operacional.models.ocorrencias_manifesto import Ocorrencia_manifesto
from operacional.models.tipo_documento import Tipo_Documento

admin.site.register(Emissor)
admin.site.register(Marca)
admin.site.register(Tipo_Carroceria)
admin.site.register(Tipo_Combustivel)
admin.site.register(Tipo_Veiculo)
admin.site.register(Ocorrencia_manifesto)
admin.site.register(Tipo_Documento)