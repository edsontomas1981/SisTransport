from django.utils import timezone
from django.db.models import Q
from operacional.models.dtc import Dtc
from faturamento.models.faturas import Faturas
from operacional.classes.cte import Cte
from django.db import transaction
from Classes.utils import dprint


class FaturasManager:
    def __init__(self):
        self.obj_fatura = Faturas()

    def save_or_update(self, dados):
        self.obj_fatura.emissor_fk = dados.get('emissor_id', None)
        self.obj_fatura.sacado_fk = dados.get('sacado_id', None)
        self.obj_fatura.data_emissao = dados.get('data_emissao', None)
        self.obj_fatura.vencimento = dados.get('vencimento', None)
        self.obj_fatura.valor_total = dados.get('valor_total', 0.0)
        self.obj_fatura.valor_a_pagar = dados.get('valor_a_pagar', 0.0)
        self.obj_fatura.desconto = dados.get('desconto', 0.0)
        self.obj_fatura.data_pagamento = dados.get('data_pagamento')

    def create_fatura(self, dados):
        # try:
            self.save_or_update(dados)
            self.obj_fatura.save()
            return 200
        # except Exception as e:
        #     print(f"Erro ao criar fatura: {e}")
        #     return 300

    def update_fatura(self, id_fatura, dados):
        try:
            if not Faturas.objects.filter(id=id_fatura).exists():
                raise ValueError(f"A fatura com o ID {id_fatura} não foi encontrada.")
            self.obj_fatura = Faturas.objects.get(id=id_fatura)
            self.save_or_update(dados)
            self.obj_fatura.save()
            return 200
        except Exception as e:
            print(f"Erro ao atualizar fatura: {e}")
            return 300

    def delete_fatura(self, id_fatura):
        try:
            if Faturas.objects.filter(id=id_fatura).exists():
                self.obj_fatura = Faturas.objects.get(id=id_fatura)
                self.obj_fatura.delete()
                return 200
            else:
                return 404  # Fatura não encontrada
        except Exception as e:
            print(f"Erro ao excluir fatura: {e}")
            return 500

    def read_fatura(self, id_fatura):
        try:
            if not Faturas.objects.filter(id=id_fatura).exists():
                raise ValueError(f"A fatura com o ID {id_fatura} não foi encontrada.")
            self.obj_fatura = Faturas.objects.get(id=id_fatura)
            return self.obj_fatura.to_dict()
        except Exception as e:
            print(f"Erro ao ler fatura: {e}")
            return None

    def read_faturas(self):
        try:
            faturas = Faturas.objects.all()
            return [fatura.to_dict() for fatura in faturas]
        except Exception as e:
            print(f"Erro ao ler faturas: {e}")
            return []

    @staticmethod
    @transaction.atomic
    def selecionar_dtc_com_cte_sem_fatura(dados):
        try:
            dtcs = Dtc.objects.filter(
                Q(frete_dtc__isnull=False) & Q(frete_dtc__faturas_fk__isnull=True)
            ).distinct()

            # Agrupa os DTCs por tomador
            dtcs_por_tomador = {}
            for dtc in dtcs:
                tomador = dtc.tomador_fk.cnpj_cpf
                id_dtc = dtc.id
                cte = Cte.obtem_cte_by_dtc(id_dtc)
                if tomador not in dtcs_por_tomador:
                    dtcs_por_tomador[tomador] = []
                dtcs_por_tomador[tomador].append(cte.to_dict())

            faturas_criadas = []

            for i,pre_fatura in enumerate(dtcs_por_tomador):
                lista_ctes = []
                ctes = dtcs_por_tomador.get(pre_fatura)
                valor_total = 0.00
                qtde_cte = 0
                for dtc in dtcs_por_tomador.get(pre_fatura):
                    lista_ctes.append(dtc.get('id'))
                    valor_total += float(dtc.get('totalFrete'))
                    qtde_cte += 1

                dprint('data',ctes[0].get('tipoFrete'))
                faturas_criadas.append(
                    {'emissor_fk':dados.get('emissor_fk'),
                     'sacado_fk':ctes[0].get('dtc_fk').get('tomador'),
                     'dt_emissao_cte':ctes[0].get('data_cadastro'),
                     'sacado_fk_cnpj':ctes[0].get('dtc_fk').get('tomador').get('cnpj_cpf'),
                     'tipo_frete': ctes[0].get('dtc_fk').get('tipoFrete'),
                     'data_emissao':dados.get('dt_emissao','17/10/07'),
                     'vencimento':dados.get('dt_vcto','17/10/07'),
                     'valor_total':valor_total,
                     'qtde_cte':qtde_cte,
                     'desconto':dados.get('desconto',0.00),
                     'impostos':dados.get('impostos',0.00),
                     'forma_pagamento':dados.get('forma_pagamento','Faturado'),
                     'observacoes':dados.get('obs'),
                     'cte':lista_ctes,
                     })

            return faturas_criadas

        except Exception as e:
            print(f"Erro ao selecionar DTCs com CTEs sem fatura: {e}")
            return None
