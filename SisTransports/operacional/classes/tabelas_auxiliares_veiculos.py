from operacional.models.marca_veiculos import Marca as Mdl_Marca
from operacional.models.tipo_veiculo import Tipo_Veiculo as Mdl_Tipo_Veiculo
from operacional.models.tipo_combustivel import Tipo_Combustivel as Mdl_Tipo_Combustivel
from operacional.models.tipo_carroceria import Tipo_Carroceria as Mdl_Tipo_Carroceria


class Marcas:

    @classmethod
    def get_marca_por_id(cls, marca_id):
        try:
            return Mdl_Marca.objects.get(id=marca_id)
        except Mdl_Marca.DoesNotExist:
            return None
        
    @classmethod
    def get_marcas(cls):
        try:
            return Mdl_Marca.objects.all()
        except Mdl_Marca.DoesNotExist:
            return None
        
class Tipo_Veiculo:

    @classmethod
    def get_tipo_veiculo_por_id(cls, tipo_veiculo_id):
        try:
            return Mdl_Tipo_Veiculo.objects.get(id=tipo_veiculo_id)
        except Mdl_Tipo_Veiculo.DoesNotExist:
            return None
        
    @classmethod
    def get_tipos_veiculos(cls):
        try:
            return Mdl_Tipo_Veiculo.objects.all()
        except Mdl_Tipo_Veiculo.DoesNotExist:
            return None
        
class Tipo_Combustivel:

    @classmethod
    def get_tipo_combustivel_por_id(cls, tipo_combustivel_id):
        try:
            return Mdl_Tipo_Combustivel.objects.get(id=tipo_combustivel_id)
        except Mdl_Tipo_Combustivel.DoesNotExist:
            return None
        
    @classmethod
    def get_tipos_combustivels(cls):
        try:
            return Mdl_Tipo_Combustivel.objects.all()
        except Mdl_Tipo_Combustivel.DoesNotExist:
            return None
        
class Tipo_carroceria:

    @classmethod
    def get_tipo_carroceria_por_id(cls, tipo_carroceria_id):
        try:
            return Mdl_Tipo_Carroceria.objects.get(id=tipo_carroceria_id)
        except Mdl_Tipo_Carroceria.DoesNotExist:
            return None
        
    @classmethod
    def get_tipos_carrocerias(cls):
        try:
            return Mdl_Tipo_Carroceria.objects.all()
        except Mdl_Tipo_Carroceria.DoesNotExist:
            return None