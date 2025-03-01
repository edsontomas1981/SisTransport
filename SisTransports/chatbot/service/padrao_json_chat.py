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
                'coletas':{
                            'cnpj_remetente': '',
                            'razao_remetente': '',
                            'rua_remetente': '',
                            'numero_remetente': '',
                            'complemento_remetente': '',
                            'bairro_remetente': '',
                            'cidade_remetente': '',
                            'uf_remetente': '',

                            'cnpj_destinatario': '',
                            'razao_destinatario': '',
                            'rua_destinatario': '',
                            'numero_destinatario': '',
                            'complemento_destinatario': '',
                            'bairro_destinatario': '',
                            'cidade_destinatario': '',
                            'uf_destinatario': '',

                            'volumes_dados': '',
                            'peso_dados': '',
                            'valor_dados': '',
                            'm3_dados': '',
                            'num_nf_dados': '',
                            'pagador_frete_dados': '',

                            'endereco_cep_coleta': '',
                            'endereco_rua_coleta': '',
                            'endereco_numero_coleta': '',
                            'endereco_complemento_coleta': '',
                            'endereco_bairro_coleta': '',
                            'endereco_cidade_coleta': '',
                            'endereco_uf_coleta': '',

                            'endereco_cep_entrega': '',
                            'endereco_rua_entrega': '',
                            'endereco_numero_entrega': '',
                            'endereco_complemento_entrega': '',
                            'endereco_bairro_entrega': '',
                            'endereco_cidade_entrega': '',
                            'endereco_uf_entrega': '',

                            'sufixo': ''
                        },
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

def get_campos_solicitacao_coleta():
    return  [
                ('endereco_cep_coleta', "Beleza! Agora me passa o CEP do local de coleta.?"),
                ('endereco_rua_coleta', "Qual é a rua onde o material será coletado?"),
                ('endereco_numero_coleta', "E o número desse endereço de coleta?"),
                ('endereco_complemento_coleta', "Tem algum complemento no endereço de coleta? Se não, só digita 'não'."),
                ('endereco_bairro_coleta', "Qual é o bairro do endereço de coleta?"),
                ('endereco_cidade_coleta', "Me diz a cidade da coleta."),
                ('endereco_uf_coleta', "E o estado da coleta?"),

                ('cnpj_remetente', "Me passa o CNPJ do remetente."),
                ('razao_remetente', "Qual é a razão social do remetente?"),
                ('rua_remetente', "Qual é a rua do remetente?"),
                ('numero_remetente', "E o número do endereço do remetente?"),
                ('complemento_remetente', "Tem algum complemento no endereço do remetente? Se não, só digita 'não'."),
                ('bairro_remetente', "Qual é o bairro do remetente?"),
                ('cidade_remetente', "Me diz a cidade do remetente."),
                ('uf_remetente', "E o estado do remetente?"),

                ('cnpj_destinatario', "Agora me passa o CNPJ do destinatário."),
                ('razao_destinatario', "Qual é a razão social do destinatário?"),
                ('rua_destinatario', "Qual é a rua do destinatário?"),
                ('numero_destinatario', "E o número do endereço do destinatário?"),
                ('complemento_destinatario', "Tem algum complemento no endereço do destinatário? Se não, só digita 'não'."),
                ('bairro_destinatario', "Qual é o bairro do destinatário?"),
                ('cidade_destinatario', "Me diz a cidade do destinatário."),
                ('uf_destinatario', "E o estado do destinatário?"),

                ('volumes_dados', "Quantos volumes serão coletados?"),
                ('peso_dados', "Qual é o peso total da carga?"),
                ('valor_dados', "Qual é o valor da nota fiscal?"),
                ('m3_dados', "Qual é o volume da carga em metros cúbicos?"),
                ('num_nf_dados', "Me diz o número da nota fiscal."),
                ('pagador_frete_dados', "Quem vai pagar o frete? CIF (Remetente), FOB (Destinatário) ou Terceiros?"),

                ('endereco_cep_entrega', "Beleza! Agora me passa o CEP do local de entrega.?"),
                ('endereco_rua_entrega', "Qual é a rua do endereço de entrega?"),
                ('endereco_numero_entrega', "E o número do endereço de entrega?"),
                ('endereco_complemento_entrega', "Tem algum complemento no endereço de entrega? Se não, só digita 'não'."),
                ('endereco_bairro_entrega', "Qual é o bairro do endereço de entrega?"),
                ('endereco_cidade_entrega', "Me diz a cidade da entrega."),
                ('endereco_uf_entrega', "E o estado da entrega?"),
            ]

def get_campos_nome_amigavel():
    return [
        ('endereco_cep_coleta', "CEP Coleta"),
        ('endereco_rua_coleta', "Endereço de Coleta"),
        ('endereco_numero_coleta', "Número do Endereço de Coleta"),
        ('endereco_complemento_coleta', "Complemento do Endereço de Coleta"),
        ('endereco_bairro_coleta', "Bairro de Coleta"),
        ('endereco_cidade_coleta', "Cidade de Coleta"),
        ('endereco_uf_coleta', "Estado de Coleta"),

        ('pagador_frete_dados', "Pagador do Frete"),

        ('cnpj_remetente', "CNPJ do Remetente"),
        ('razao_remetente', "Razão Social do Remetente"),
        ('rua_remetente', "Endereço do Remetente"),
        ('numero_remetente', "Número do Endereço do Remetente"),
        ('complemento_remetente', "Complemento do Endereço do Remetente"),
        ('bairro_remetente', "Bairro do Remetente"),
        ('cidade_remetente', "Cidade do Remetente"),
        ('uf_remetente', "Estado do Remetente"),

        ('cnpj_destinatario', "CNPJ do Destinatário"),
        ('razao_destinatario', "Razão Social do Destinatário"),
        ('rua_destinatario', "Endereço do Destinatário"),
        ('numero_destinatario', "Número do Endereço do Destinatário"),
        ('complemento_destinatario', "Complemento do Endereço do Destinatário"),
        ('bairro_destinatario', "Bairro do Destinatário"),
        ('cidade_destinatario', "Cidade do Destinatário"),
        ('uf_destinatario', "Estado do Destinatário"),

        ('volumes_dados', "Quantidade de Volumes"),
        ('peso_dados', "Peso Total da Carga"),
        ('valor_dados', "Valor da Nota Fiscal"),
        ('m3_dados', "Volume da Carga (m³)"),
        ('num_nf_dados', "Número da Nota Fiscal"),

        ('endereco_cep_entrega', "CEP de Entrega"),
        ('endereco_rua_entrega', "Endereço de Entrega"),
        ('endereco_numero_entrega', "Número do Endereço de Entrega"),
        ('endereco_complemento_entrega', "Complemento do Endereço de Entrega"),
        ('endereco_bairro_entrega', "Bairro de Entrega"),
        ('endereco_cidade_entrega', "Cidade de Entrega"),
        ('endereco_uf_entrega', "Estado de Entrega")
    ]