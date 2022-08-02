from enderecos.models import Endereco

def salva_end(cep,logradouro,numero,complemento,bairro,cidade,estado):
    endereco=Endereco()
    endereco.cep=cep
    endereco.logradouro=logradouro
    endereco.numero=numero
    endereco.complemento=complemento
    endereco.bairro=bairro
    endereco.cidade=cidade
    endereco.estado=estado
    endereco.save()