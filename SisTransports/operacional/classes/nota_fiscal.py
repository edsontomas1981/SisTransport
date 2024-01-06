from operacional.models.nota_fiscal import Nota_fiscal as MdlNotaFiscal
from Classes.utils import toFloat

class Nota_fiscal_CRUD:
    def __init__(self):
        self.obj_nota_fiscal = MdlNotaFiscal()

    def delete(self):
        self.obj_nota_fiscal.delete()

    def list_all(self):
        return MdlNotaFiscal.objects.all()
    
    def read_by_chave_acesso(self, chave_acesso):
        try:
            self.obj_nota_fiscal = MdlNotaFiscal.objects.get(chave_acesso=chave_acesso)
        except MdlNotaFiscal.DoesNotExist:
            self.obj_nota_fiscal = None

    def list_by_tipo_documento(self, tipo_documento):
        return MdlNotaFiscal.objects.filter(tipo_documento=tipo_documento)

    def list_by_date_range(self, start_date, end_date):
        return MdlNotaFiscal.objects.filter(data_emissao_nf__range=(start_date, end_date))
    
    def create(self, dados):
        self.obj_nota_fiscal.chave_acesso = dados['chave_acesso']
        self.obj_nota_fiscal.num_nf = dados['num_nf']
        self.obj_nota_fiscal.data_emissao = dados['data_emissao']
        self.obj_nota_fiscal.natureza = dados['natureza']
        self.obj_nota_fiscal.especie = dados['especie']
        self.obj_nota_fiscal.tipo_documento = dados['tipo_documento']
        self.obj_nota_fiscal.volume = dados['volume']
        self.obj_nota_fiscal.peso = dados['peso']
        self.obj_nota_fiscal.valor_nf = toFloat(dados['valor_nf'])
        self.obj_nota_fiscal.m3 = toFloat(dados['m3'])
        self.obj_nota_fiscal.dtc_fk = dados['dtc']  # Adicionando campo dtc
        self.obj_nota_fiscal.usuario_cadastro = dados['usuario_cadastro']
        self.obj_nota_fiscal.usuario_ultima_atualizacao = dados['usuario_ultima_atualizacao']
        self.obj_nota_fiscal.data_cadastro = dados['data_cadastro']  # Adicionando campo data_cadastro
        self.obj_nota_fiscal.data_ultima_atualizacao = dados['data_ultima_atualizacao']  # Adicionando campo data_ultima_atualizacao
        self.obj_nota_fiscal.save()

    def update(self, dados):
        try:
            if MdlNotaFiscal.objects.filter(chave_acesso=dados['chave_acesso'], dtc_fk=dados['dtc']).exists():
                self.obj_nota_fiscal = MdlNotaFiscal.objects.get(chave_acesso=dados['chave_acesso'], dtc_fk=dados['dtc'])
                self.obj_nota_fiscal.chave_acesso = dados['chave_acesso']
                self.obj_nota_fiscal.num_nf = dados['num_nf']
                self.obj_nota_fiscal.data_emissao = dados['data_emissao']
                self.obj_nota_fiscal.natureza = dados['natureza']
                self.obj_nota_fiscal.especie = dados['especie']
                self.obj_nota_fiscal.tipo_documento = dados['tipo_documento']
                self.obj_nota_fiscal.volume = dados['volume']
                self.obj_nota_fiscal.peso = dados['peso']
                self.obj_nota_fiscal.valor_nf = toFloat(dados['valor_nf'])
                self.obj_nota_fiscal.m3 = toFloat(dados['m3'])
                self.obj_nota_fiscal.dtc_fk = dados['dtc']  # Adicionando campo dtc
                self.obj_nota_fiscal.usuario_ultima_atualizacao = dados['usuario_ultima_atualizacao']
                self.obj_nota_fiscal.data_cadastro = dados['data_cadastro']  # Adicionando campo data_cadastro
                self.obj_nota_fiscal.data_ultima_atualizacao = dados['data_ultima_atualizacao']  # Adicionando campo data_ultima_atualizacao
                self.obj_nota_fiscal.save()
            
        except MdlNotaFiscal.DoesNotExist:
            print('objeto nao existe')  # A nota fiscal não está vinculada ao DTC especificado, não faz nada

    def carrega_nfs(self, id_dtc):
        nfs = self.list_by_dtc(id_dtc)
        lista_nfs = [nf.to_dict() for nf in nfs]
        return lista_nfs

    def read_by_id(self, nota_id):
        try:
            self.obj_nota_fiscal = MdlNotaFiscal.objects.get(id=nota_id)
        except MdlNotaFiscal.DoesNotExist:
            self.obj_nota_fiscal = None

    def list_all(self):
        return MdlNotaFiscal.objects.all()

    def list_by_tipo_documento(self, tipo_documento):
        return MdlNotaFiscal.objects.filter(tipo_documento=tipo_documento)

    def list_by_date_range(self, start_date, end_date):
        return MdlNotaFiscal.objects.filter(data_emissao_nf__range=(start_date, end_date))  

    def is_nf_linked_to_dtc(self, chave_acesso, dtc_id):
        try:
            if MdlNotaFiscal.objects.filter(chave_acesso=chave_acesso, dtc_fk=dtc_id).exists():
                return 201  # A nota fiscal está vinculada ao DTC especificado
            else:
                return 200  # A nota fiscal não está vinculada ao DTC especificado
        except MdlNotaFiscal.DoesNotExist:
            return 404  # A nota fiscal não está vinculada ao DTC especificado
    
    def read_by_dtc_chave(self, chave_acesso, dtc_id):
        try:
            if MdlNotaFiscal.objects.filter(chave_acesso=chave_acesso, dtc_fk=dtc_id).exists():
                self.obj_nota_fiscal=MdlNotaFiscal.objects.get(chave_acesso=chave_acesso, dtc_fk=dtc_id)
        except MdlNotaFiscal.DoesNotExist:
            return 404  # A nota fiscal não está vinculada ao DTC especificado        
    
    def list_by_dtc(self, dtc_id):
        return MdlNotaFiscal.objects.filter(dtc_fk=dtc_id)

      