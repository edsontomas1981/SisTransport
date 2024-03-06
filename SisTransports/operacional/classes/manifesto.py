from operacional.models.manifesto import Manifesto
from django.utils import timezone


class ManifestoManager:
    @classmethod
    def _carregar_dados_comuns(cls, data):
        return {
            'emissor_fk': data.get('emissor_fk'),
            'data_previsão_inicio': data.get('data_previsão_inicio'),
            'data_previsão_chegada': data.get('data_previsão_chegada'),
            'rota_fk': data.get('rota_fk'),
            'frete_carreteiro': data.get('frete_carreteiro'),
            'frete_adiantamento': data.get('frete_adiantamento'),
            'lacres': data.get('lacres'),
            'averbacao': data.get('averbacao'),
            'liberacao': data.get('liberacao'),
            'observacao': data.get('observacao'),
        }

    @classmethod
    def criar_manifesto(cls, data):
        dados_comuns = cls._carregar_dados_comuns(data)
        dados_comuns['usuario_cadastro']= data.get('usuario_cadastro')
        dados_comuns['data_cadastro']=str(timezone.now())

        motoristas_data = data.get('motoristas', [])
        veiculos_data = data.get('veiculos', [])

        manifesto = Manifesto.objects.create(**dados_comuns)

        # Salvando motoristas associados ao manifesto
        manifesto.motoristas.set(motoristas_data)

        # Salvando veiculos associados ao manifesto
        manifesto.veiculos.set(veiculos_data)        

        return manifesto

    @classmethod
    def cria_ou_atualiza(cls, manifesto_id=None, **kwargs):
        if manifesto_id:
            return cls.atualizar_manifesto(manifesto_id, **kwargs)
        else:
            return cls.criar_manifesto(kwargs)

    @classmethod
    def obter_manifesto_por_id(cls, manifesto_id):
        return Manifesto.objects.get(id=manifesto_id)

    @classmethod
    def atualizar_manifesto(cls, manifesto_id, **kwargs):
        manifesto = Manifesto.objects.get(id=manifesto_id)
        for field, value in kwargs.items():
            setattr(manifesto, field, value)
        manifesto.save()
        return manifesto
    
    
    @classmethod
    def deletar_manifesto(cls, manifesto_id):
        manifesto = Manifesto.objects.get(id=manifesto_id)
        manifesto.delete()
