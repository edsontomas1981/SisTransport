from operacional.models.manifesto import Manifesto

class ManifestoManager:
    @classmethod
    def criar_manifesto(cls, data):
        manifesto = Manifesto.objects.create(
            emissor_fk=data.get('emissor_fk'),
            data_previsão_inicio=data.get('data_previsão_inicio'),
            data_previsão_chegada=data.get('data_previsão_chegada'),
            rota_fk=data.get('rota_fk'),
            frete_carreteiro=data.get('frete_carreteiro'),
            frete_adiantamento=data.get('frete_adiantamento'),
            lacres=data.get('lacres'),
            averbacao=data.get('averbacao'),
            liberacao=data.get('liberacao'),
            observacao=data.get('observacao'),
            usuario_cadastro=data.get('usuario_cadastro'),
        )
        manifesto.motoristas.add(*motoristas)
        manifesto.veiculos.add(*veiculos)
        manifesto.dtc.add(*dtc)
        return manifesto

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


