from operacional.models.emissor import Emissor

class EmissorManager:
    @classmethod
    def get_emissores_por_nome(cls, nome):
        return Emissor.objects.filter(nome__icontains=nome)

    @classmethod
    def get_emissores_por_cnpj(cls, cnpj):
        return Emissor.objects.filter(cnpj=cnpj)

    @classmethod
    def get_emissores_por_id(cls, id):
        return Emissor.objects.get(id=id)

    @classmethod
    def get_emissores_por_endereco(cls, endereco):
        return Emissor.objects.filter(endereco_fk=endereco)

    # Outros métodos de classe conforme necessário
    @classmethod
    def get_todos_emissores(cls):
        return Emissor.objects.all()