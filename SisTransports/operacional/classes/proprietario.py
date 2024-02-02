from django.utils import timezone, formats
from django.contrib.auth import get_user_model
from parceiros.models.parceiros import Parceiros
from operacional.models.proprietario import Proprietario

class ProprietarioManager:
    def __init__(self):
        self.obj_proprietario = Proprietario()

    def save_or_update(self, dados):
        self.obj_proprietario.parceiro_fk = dados.get('parceiro_id', '')
        self.obj_proprietario.antt = dados.get('antt', '')
        self.obj_proprietario.validade_antt = dados.get('validade_antt', None)
        self.obj_proprietario.tipo_proprietario = dados.get('tipo_proprietario', '')

    def create_proprietario(self, dados):
        try:
            self.save_or_update(dados)
            self.obj_proprietario.criado_por = get_user_model().objects.get(id=dados['criado_por_id'])
            self.obj_proprietario.created_at = timezone.now()
            self.obj_proprietario.save()
            return 200
        except Exception as e:
            print(f"Erro ao criar proprietário: {e}")
            return 300

    def delete_proprietario(self, id_proprietario):
        try:
            if Proprietario.objects.filter(id=id_proprietario).exists():
                self.obj_proprietario = Proprietario.objects.get(id=id_proprietario)
                self.obj_proprietario.delete()
                return 200
            else:
                return 404  # Proprietário não encontrado
        except Exception as e:
            print(f"Erro ao excluir proprietário: {e}")
            return 500
        
    def buscar_proprietario_por_cnpj(self, cnpj):
            try:
                # Busca um Parceiro pelo CNPJ
                parceiro = Parceiros.objects.filter(cnpj_cpf=cnpj).first()

                if parceiro:    
                    # Se encontrou o Parceiro, busca o Proprietário associado a ele
                    self.obj_proprietario = Proprietario.objects.filter(parceiro_fk=parceiro).first()

                    if self.obj_proprietario:
                        return 200
                    else:
                        return None
                else:
                    return None
            except Exception as e:
                print(f"Erro ao buscar proprietário por CNPJ: {e}")
                return None 

    def read_proprietario(self, id_proprietario):
        try:
            if not Proprietario.objects.filter(id=id_proprietario).exists():
                raise ValueError(f"O proprietário com o ID {id_proprietario} não foi encontrado.")
            self.obj_proprietario = Proprietario.objects.get(id=id_proprietario)
            return self.obj_proprietario.to_dict()
        except Exception as e:
            print(f"Erro ao ler proprietário: {e}")
            return None

    def read_proprietario_por_veiculo(self, id_veiculo):
        try:
            proprietario = Proprietario.objects.filter(veiculo__id=id_veiculo).first()
            if proprietario:
                return proprietario.to_dict()
            else:
                return None
        except Exception as e:
            print(f"Erro ao ler proprietário por veículo: {e}")
            return None

    def read_proprietarios(self):
        try:
            proprietarios = Proprietario.objects.all()
            return [proprietario.to_dict() for proprietario in proprietarios]
        except Exception as e:
            print(f"Erro ao ler proprietários: {e}")
            return []

    def update_proprietario(self, id_proprietario, dados):
        try:
            if not Proprietario.objects.filter(id=id_proprietario).exists():
                raise ValueError(f"O proprietário com o ID {id_proprietario} não foi encontrado.")
            self.obj_proprietario = Proprietario.objects.get(id=id_proprietario)
            self.save_or_update(dados)
            self.obj_proprietario.atualizado_por = get_user_model().objects.get(id=dados['atualizado_por_id'])
            self.obj_proprietario.updated_at = timezone.now()
            self.obj_proprietario.save()
            return 200
        except Exception as e:
            print(e)
            print(f"Erro ao atualizar proprietário: {e}")
            return 300
