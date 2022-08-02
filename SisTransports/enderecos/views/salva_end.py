from enderecos.models.endereco import Enderecos

def salva_end(cep,logradouro,numero,complemento,bairro,cidade,estado):
    endereco=Enderecos()
    endereco.cep=cep
    endereco.logradouro=logradouro
    endereco.numero=numero
    endereco.complemento=complemento
    endereco.bairro=bairro
    endereco.cidade=cidade
    endereco.uf=estado
    endereco.save()
    return endereco