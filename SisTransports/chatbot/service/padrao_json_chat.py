def default_json():
     return {
                'data_sender':{"nome": "",
                        "fone": "",
                        "email": ""
                        },
                "menu":{
                        "menu_atual":"cadastro",
                        "passo":""
                       },
                "coletas": {},
                "cotacao": {},
                "rastreamento": {},
                "endereco_coleta": {},
                "endereco_entrega": {},
                "reclamacoes": {},
            }


def get_campos_cadastro():
    return [
                ('nome', "Qual é o seu nome?"),
                ('fone', "Qual é o seu telefone?"),
                ('email', "Qual é o seu email?"),
            ]