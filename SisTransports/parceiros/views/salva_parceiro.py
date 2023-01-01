from parceiros.models import Parceiros

def salva_parceiro(cnpj,razao,fantasia,inscr,obs,endereco_fk):
    parceiro=Parceiros()
    parceiro.cnpj_cpf=cnpj
    parceiro.raz_soc=razao
    parceiro.nome_fantasia=fantasia
    parceiro.insc_est=inscr
    parceiro.observacao=obs
    parceiro.endereco_fk=endereco_fk
    parceiro.save()
    return parceiro