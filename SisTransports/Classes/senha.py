import re # Modulo de Expressoes Regulares

class Senha():

    def valida_senha(senha,conf_senha):
        if senha == None:
            mensagem='Senha não pode ser vazia'
            return False , mensagem
        if len(senha) < 6:
            mensagem='Senha deve conter no mínimo 6 caracteres'
            return False , mensagem
        elif not re.search('[0-9]', senha):
            mensagem='Senha deve conter no mínimo 1 número'
            return False,mensagem
        elif not re.search('[A-Z]', senha):
            mensagem='Senha deve conter no mínimo 1 letra maiúscula'
            return False,mensagem
        elif not re.search('[a-z]', senha):
            mensagem='Senha deve conter no mínimo 1 letra minúscula'
            return False , mensagem
        elif not re.search('[_@$]', senha):
            mensagem='Senha deve conter no mínimo 1 caracter especial'
            return False,mensagem
        elif len(senha.strip())==0:
            mensagem='Senha não pode ser vazia'
            return False ,mensagem   
        elif len(conf_senha.strip())==0:
            mensagem='Confirmação de senha não pode ser vazia'
            return False ,mensagem
        elif senha != conf_senha:       
            mensagem='Senhas não conferem'
            return False ,mensagem         
        else:
            mensagem='Senha alterada com sucesso !'
            return True,mensagem 