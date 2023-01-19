from comercial.models.tabelaFrete import TabelaFrete as TblFrete
from operacional.classes.rotas import Rota
from parceiros.models.parceiros import Parceiros as MdlParceiros
from parceiros.classes.parceiros import Parceiros
from Classes.utils import toFloat, checkBox, dprint


class TabelaFrete:
    def __init__(self):
        self.tabela = TblFrete()

    def anexaRota(self, idRota):
        rota = Rota()
        rota.readRota(idRota)
        self.tabela.rota_fk = rota.rota

    def salvaOuAtualiza(self, dados):
        tabelaBloqueada = False
        icms = False
        cobraCubagem = False

        if 'tabBloq' in dados:
            tabelaBloqueada = checkBox(dados['tabBloq'][0])
        if 'icms' in dados:
            icms = checkBox(dados['icms'][0])
        if 'cobraCubagem' in dados:
            cobraCubagem = checkBox(dados['cobraCubagem'][0])

        self.tabela.descricao = dados['descTabela'][0]
        self.tabela.icmsIncluso = icms
        self.tabela.bloqueada = tabelaBloqueada
        self.tabela.tipoTabela = dados['tipoTabela'][0]
        self.tabela.tipoCalculo = dados['tipoFrete'][0]
        self.tabela.tipoPedagio = dados['tipoCobranPedagio'][0]
        self.tabela.cubagem = cobraCubagem
        self.tabela.fatorCubagem = toFloat(dados['cubagem'][0])
        self.tabela.gris = toFloat(dados['gris'][0])
        self.tabela.freteMinimo = toFloat(dados['freteMinimo'][0])
        self.tabela.frete = toFloat(dados['vlrFrete'][0])
        self.tabela.adValor = toFloat(dados['advalor'][0])
        self.tabela.despacho = toFloat(dados['despacho'][0])
        self.tabela.outros = toFloat(dados['outros'][0])
        self.tabela.pedagio = toFloat(dados['pedagio'][0])
        self.tabela.aliquotaIcms = toFloat(dados['aliquotaIcms'][0])
        self.anexaRota(dados['rota'][0])
        self.tabela.save()

    def createTabela(self, dados):
        self.salvaOuAtualiza(dados)
        return 200

    def updateTabela(self, dados):
        self.tabela = TblFrete.objects.filter(id=dados['numTabela'][0]).get()
        self.salvaOuAtualiza(dados)
        self.tabela.save()
        return 200

    def anexaTabelaAoParceiro(self, cnpjParc):
        if MdlParceiros.objects.filter(cnpj_cpf=cnpjParc).exists():
            parceiro = MdlParceiros.objects.filter(cnpj_cpf=cnpjParc).get()
            self.tabela.parceiro.add(parceiro)
            self.tabela.save()
            return 200
        else:
            return 400

    def readTabela(self, idTabela):
        if TblFrete.objects.filter(id=idTabela).exists():
            self.tabela = TblFrete.objects.filter(id=idTabela).get()
            return self.tabela, 200
        else:
            return False

    def getTodasTabelas():
        tabelas = TblFrete.objects.all()
        return tabelas

    def deleteTabela(self, idTabela):
        if TblFrete.objects.filter(id=idTabela).exists():
            self.tabela = TblFrete.objects.get(id=idTabela).delete()
            return True
        else:
            return False

    def filtraTabelas(self, filtro):
        self.tabela = TblFrete.objects.filter(descricao__contains=filtro)
        return self.tabela

    def selecionaTabCnpj(self):
        tabCnpj = []
        if MdlParceiros.objects.filter(tabelafrete__id=self.tabela.id):
            parceiros = MdlParceiros.objects.filter(
                tabelafrete__id=self.tabela.id)
            for parceiro in parceiros:
                tabCnpj.append(parceiro.to_dict())
            return tabCnpj
        else:
            return False

    def desvincularCnpjTabela(self, idParceiro):
        if TblFrete.objects.filter(parceiro__id=idParceiro).exists:
            self.tabela.parceiro.remove(idParceiro)
            return True
        else:
            return False

    def toDict(self):
        return self.tabela.toDict()
