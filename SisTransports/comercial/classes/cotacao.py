from comercial.models.cotacao import Cotacao as ClsCotacao
from comercial.classes.geraFrete import CalculaFrete
from comercial.classes.tblFaixa import TabelaFaixa
from Classes.utils import  dprint,toFloat,checkBox
from datetime import datetime
from operacional.models.dtc import Dtc
from parceiros.models.parceiros import Parceiros

class Cotacao:
    def __init__(self):
        self.cotacao = ClsCotacao()
        self.geraFrete = CalculaFrete()

    def createCotacao(self, dados):
        return self.criaCotacao(dados)
    
    def adiciona_cte_cotacao(self,cte):
        self.cotacao.cotaca_aplicada_no_cte_fk = cte
        self.cotacao.save()
        return 200

    def readCotacao(self, id):
        if ClsCotacao.objects.filter(id=id).exists():
            self.cotacao = ClsCotacao.objects.filter(id=id).get()
            return {'resposta': 200, 'cotacao': self.cotacao.toDict()}
        else:
            return {'resposta': 400, 'mensagem': 'Cotação nao encontrada'}

    def updateCotacao(self, dados):
        if ClsCotacao.objects.filter(dtc_fk=dados['idPreDtc']).exists():
            self.atualizaCotacao(dados)
            return {'resposta': 200, 'cotacao': self.cotacao.toDict()}
        else:
            return {'resposta': 400, 'mensagem': 'Cotação nao encontrada'}

    def deleteCotacao(self, id):
        try:
            if ClsCotacao.objects.filter(id=id).exists():
                self.cotacao.delete()
                return {'status': 200}
            else:
                return {'status': 404, 'mensagem': 'Cotação nao encontrada'}
        except:
            return {'status': 400, 'mensagem': 'Erro interno'}
        
    def atualizaCotacao(self, dados):
        self.cotacao.rota_fk = dados['rota']
        self.cotacao.numNf = dados['nfCotacao']
        self.cotacao.nome = dados['nomeCotacao']
        self.cotacao.contato = dados['contatoCotacao']
        self.cotacao.observacao = dados['obsCotacao']
        self.cotacao.peso = int(dados['pesoCotacao'])
        self.cotacao.qtde = int(dados['volumeCotacao'])
        self.cotacao.tabela_fk = None if dados['tabela_frete'].id == None else dados['tabela_frete']
        self.cotacao.formaDeCalculo = dados['tipoTabelaCotacao']
        self.cotacao.pesoCalcular = float(dados['pesoFaturadoCotacao'])
        self.cotacao.vlrNf = toFloat(dados['valorNfCotacao'])
        self.cotacao.m3 = toFloat(dados['resultM3Cotacao'])
        self.cotacao.tipoMercadoria = dados['mercadoriaCotacao']
        self.cotacao.totalFrete = toFloat(dados['freteTotalCotacao'])
        self.cotacao.fretePeso = toFloat(dados['fretePesoCotacao'])
        self.cotacao.adValor = toFloat(dados['advalorCotacao'])
        self.cotacao.gris = toFloat(dados['grisCotacao'])
        self.cotacao.despacho = toFloat(dados['despachoCotacao'])
        self.cotacao.outros = toFloat(dados['outrosCotacao'])
        self.cotacao.pedagio = toFloat(dados['pedagioCotacao'])
        self.cotacao.vlrColeta = toFloat(dados['freteTotalCotacao'])
        self.cotacao.baseDeCalculo = toFloat(dados['baseCalculoCotacao'])
        self.cotacao.aliquota = toFloat(dados['aliquotaCotacao'])
        self.cotacao.icmsRS = toFloat(dados['icmsCotacao'])
        self.cotacao.icmsIncluso = checkBox(dados['icmsInclusoCotacao'])
        self.cotacao.pesoFaturado = dados['pesoFaturadoCotacao']
        self.cotacao.vlrColeta = toFloat(dados['vlrColetaCotacao'])
        self.cotacao.usuario_cadastro = dados['usuario']
        self.cotacao.dataHora = datetime.now()
        self.cotacao.save()

    def criaCotacao(self, dados):
        try:
            self.cotacao.dtc_fk = dados['dtc']
            self.cotacao.tabela_fk = dados['tabela_frete']
            self.cotacao.rota_fk = dados['rota']
            self.cotacao.formaDeCalculo = dados['tipoTabelaCotacao']
            self.cotacao.numNf = dados['nfCotacao']
            self.cotacao.peso = toFloat(dados['pesoCotacao'])
            self.cotacao.pesoCalcular = toFloat(dados['pesoFaturadoCotacao'])
            self.cotacao.qtde  = toFloat(dados['volumeCotacao'])
            self.cotacao.vlrNf = toFloat(dados['valorNfCotacao'])
            self.cotacao.m3 = toFloat(dados['resultM3Cotacao'])
            self.cotacao.contato = dados['contatoCotacao']
            self.cotacao.tipoMercadoria = dados['mercadoriaCotacao']
            self.cotacao.totalFrete = toFloat(dados['freteTotalCotacao'])
            self.cotacao.fretePeso = toFloat(dados['fretePesoCotacao'])
            self.cotacao.adValor = toFloat(dados['advalorCotacao'])
            self.cotacao.gris = toFloat(dados['grisCotacao'])
            self.cotacao.despacho = toFloat(dados['despachoCotacao'])
            self.cotacao.outros = toFloat(dados['outrosCotacao'])
            self.cotacao.pedagio = toFloat(dados['pedagioCotacao'])
            self.cotacao.vlrColeta = toFloat(dados['freteTotalCotacao'])
            self.cotacao.baseDeCalculo = toFloat(dados['baseCalculoCotacao'])
            self.cotacao.aliquota = toFloat(dados['aliquotaCotacao'])
            self.cotacao.icmsRS = toFloat(dados['icmsCotacao'])
            self.cotacao.icmsIncluso = checkBox(dados['icmsInclusoCotacao'])
            self.cotacao.observacao = dados['obsCotacao']
            self.cotacao.nome = dados['nomeCotacao']
            self.cotacao.pesoFaturado = dados['pesoFaturadoCotacao']
            self.cotacao.vlrColeta = toFloat(dados['vlrColetaCotacao'])
            self.cotacao.usuario_cadastro = dados['usuario']
            self.cotacao.dataHora=datetime.now()
            self.cotacao.save()
            return 200
        except:
            return 400

    def buscafaixas(self):
        tblFaixa = TabelaFaixa()
        faixas=tblFaixa.readFaixas(self.cotacao.tabela_fk.id)
        if faixas:
            listaFaixas = [i for i in faixas]
            return listaFaixas
       
    def selectCotacaoByDtc(self, dtc):
        try:
            if ClsCotacao.objects.filter(dtc_fk=dtc).exists():
                self.cotacao = ClsCotacao.objects.get(dtc_fk=dtc)
                return {'status': 200, 'cotacao': self.cotacao.toDict()}
            else:
                return {'status': 404, 'cotacao': {}}
        except :
            return {'status': 400, 'mensagem': 'Erro interno'}
        
    @staticmethod
    def selectCotacaoPorCnpj(cnpj):
        try:
            # Verificar se o CNPJ é válido
            if not cnpj:
                raise ValueError("CNPJ fornecido é inválido")

            # Encontrar o Parceiro (tomador) com o CNPJ fornecido
            parceiro_tomador = Parceiros.objects.get(cnpj_cpf=cnpj)

            # Encontrar as cotações associadas ao tomador com base no CNPJ, filtrando pelo campo em_uso igual a False
            cotacoes_do_tomador = ClsCotacao.objects.filter(
                dtc_fk__tomador_fk=parceiro_tomador.id,
                em_uso=False,
                cotaca_aplicada_no_cte_fk__isnull=True  # Adicione esta condição
            )            # Criar uma lista de dicionários contendo informações sobre cada cotação, incluindo o ID
            cotacoes_info = [{'id': cotacao.id, 'info': cotacao.toDict()} for cotacao in cotacoes_do_tomador]

            # 'cotacoes_do_tomador' agora contém todas as cotações onde o tomador_fk é igual ao tomador associado ao CNPJ fornecido.
            return cotacoes_info 
        except ValueError as ve:
            # Lide com o erro de CNPJ inválido
            return {"error": str(ve)}
        except Parceiros.DoesNotExist:
            # Lide com o caso em que o parceiro (tomador) com o CNPJ fornecido não existe
            return {"error": "Parceiro com CNPJ não encontrado"}
        except ClsCotacao.DoesNotExist:
            # Lide com o caso em que não há cotações para o tomador
            return {"error": "Não há cotações para o tomador associado ao CNPJ fornecido"}
        except Exception as e:
            # Lide com outros erros inesperados
            return {"error": str(e)}


        