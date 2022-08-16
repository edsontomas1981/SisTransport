from bradocs4py import CPF ,Cnpj

def validaCpf(cpf):
    cpf = CPF(cpf)
    return cpf.isValid

def validaCnpj(cnpj):
    cnpj=Cnpj(cnpj)
    return cnpj.isValid

def validaCnpjCpf(cnpj_cpf):
    if cnpj_cpf.length == 14:
       return validaCnpj(cnpj_cpf)
    elif cnpj_cpf.length == 11:
        return validaCpf(cnpj_cpf)
    else:
        return False
    
        
        
    


