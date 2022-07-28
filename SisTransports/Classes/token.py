import secrets

class Token():
    
    def gera_chave():
        token=secrets.token_urlsafe(16)
        return token