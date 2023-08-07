from operacional.models.nota_fiscal import Nota_fiscal as MdlNotaFiscal
from Classes.utils import toFloat

class Nota_fiscal_CRUD:
    def __init__(self):
        self.obj_nota_fiscal = MdlNotaFiscal()

    def save_or_update(self, dados):
        self.obj_nota_fiscal.chave_acesso = dados['chave_acesso']
        self.obj_nota_fiscal.num_nf = dados['num_nf']
        self.obj_nota_fiscal.data_emissao_nf = dados['data_emissao_nf']
        self.obj_nota_fiscal.natureza_nf = dados['natureza_nf']
        self.obj_nota_fiscal.especie_nf = dados['especie_nf']
        self.obj_nota_fiscal.tipo_documento = dados['tipo_documento']
        self.obj_nota_fiscal.volume_nf = dados['volume_nf']
        self.obj_nota_fiscal.peso_nf = dados['peso_nf']
        self.obj_nota_fiscal.m3_nf = dados['m3_nf']
        self.obj_nota_fiscal.valor_nf = toFloat(dados['valor_nf'])
        self.obj_nota_fiscal.save()

    def read_by_id(self, nota_fiscal_id):
        if MdlNotaFiscal.objects.filter(id=nota_fiscal_id).exists():
            self.obj_nota_fiscal = MdlNotaFiscal.objects.get(id=nota_fiscal_id)

    def delete(self, nota_fiscal_id):
        if MdlNotaFiscal.objects.filter(id=nota_fiscal_id).exists():
            self.obj_nota_fiscal = MdlNotaFiscal.objects.get(id=nota_fiscal_id)
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
        self.obj_nota_fiscal.data_emissao_nf = dados['data_emissao_nf']
        self.obj_nota_fiscal.natureza = dados['natureza']
        self.obj_nota_fiscal.especie = dados['especie']
        self.obj_nota_fiscal.tipo_documento = dados['tipo_documento']
        self.obj_nota_fiscal.volumes = dados['volumes']
        self.obj_nota_fiscal.peso = dados['peso']
        self.obj_nota_fiscal.valor_nf = toFloat(dados['valor_nf'])
        self.obj_nota_fiscal.m3 = toFloat(dados['m3'])
        self.obj_nota_fiscal.usuario_cadastro = dados['usuario_cadastro']
        self.obj_nota_fiscal.usuario_ultima_atualizacao = dados['usuario_ultima_atualizacao']
        # Preencha outros campos relevantes
        self.obj_nota_fiscal.save()

    def update(self, dados):
        if self.obj_nota_fiscal.pk:
            self.obj_nota_fiscal.chave_acesso = dados.get('chave_acesso', self.obj_nota_fiscal.chave_acesso)
            self.obj_nota_fiscal.num_nf = dados.get('num_nf', self.obj_nota_fiscal.num_nf)
            self.obj_nota_fiscal.data_emissao_nf = dados.get('data_emissao_nf', self.obj_nota_fiscal.data_emissao_nf)
            self.obj_nota_fiscal.natureza = dados.get('natureza', self.obj_nota_fiscal.natureza)
            self.obj_nota_fiscal.especie = dados.get('especie', self.obj_nota_fiscal.especie)
            self.obj_nota_fiscal.tipo_documento = dados.get('tipo_documento', self.obj_nota_fiscal.tipo_documento)
            self.obj_nota_fiscal.volumes = dados.get('volumes', self.obj_nota_fiscal.volumes)
            self.obj_nota_fiscal.peso = dados.get('peso', self.obj_nota_fiscal.peso)
            self.obj_nota_fiscal.valor_nf = toFloat(dados.get('valor_nf', self.obj_nota_fiscal.valor_nf))
            self.obj_nota_fiscal.m3 = toFloat(dados.get('m3', self.obj_nota_fiscal.m3))
            self.obj_nota_fiscal.usuario_ultima_atualizacao = dados.get('usuario_ultima_atualizacao', self.obj_nota_fiscal.usuario_ultima_atualizacao)
            # Atualize outros campos relevantes
            self.obj_nota_fiscal.save()

    def delete(self):
        if self.obj_nota_fiscal.pk:
            self.obj_nota_fiscal.delete()

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