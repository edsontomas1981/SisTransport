from operacional.models.coleta import Coleta  as MdlColeta
from operacional.classes.dtc import Dtc
from operacional.models.dtc import Dtc as ClsDtc
from Classes.utils import dprint,dpprint,toFloat

class Coleta(): 
    def __init__(self):
        self.obj_coleta=MdlColeta()

    def saveOrUpdate(self,dados):
        self.obj_coleta.notaFiscal= dados['nf']
        self.obj_coleta.volume= dados['volume']
        self.obj_coleta.peso=dados['peso']
        self.obj_coleta.valor=toFloat(dados['valor'])
        self.obj_coleta.cubM3 =toFloat(dados['m3'])
        self.obj_coleta.veiculo=dados['veiculo']
        self.obj_coleta.tipo=dados['tipoMercadoria']
        self.obj_coleta.horario=dados['horario']
        self.obj_coleta.especie=dados['especie']
        self.obj_coleta.observacao=dados['obs']
        self.obj_coleta.nome=dados['nomeContato']
        self.obj_coleta.contato=dados['numeroContato']
        self.obj_coleta.cep=dados['cep']
        self.obj_coleta.rua=dados['rua']
        self.obj_coleta.numero=dados['numero']
        self.obj_coleta.complemento=dados['complemento']
        self.obj_coleta.bairro=dados['bairro']
        self.obj_coleta.cidade=dados['cidade']
        self.obj_coleta.uf=dados['uf']
 
    def readColetaId(self,idColeta):
        if MdlColeta.objects.filter(id=idColeta).exists():
            self.obj_coleta=MdlColeta.objects.filter(id=idColeta).get()

    def readColetaParceiro(self):
        pass

    def createColeta(self,dados):
        try:
            dtc=Dtc()
            dtc.readDtc(dados['dtc'])
            if dtc.dtc.coleta_fk:
                if MdlColeta.objects.filter(id=dtc.dtc.coleta_fk.id).exists():
                    self.obj_coleta=MdlColeta.objects.filter(id=dtc.dtc.coleta_fk.id).get()
                    self.saveOrUpdate(dados)
                    self.obj_coleta.save()
                    dtc.anexaColeta(dados['dtc'],self.obj_coleta)
                    return 201
            else:
                self.saveOrUpdate(dados)
                self.obj_coleta.save()
                dtc.anexaColeta(dados['dtc'],self.obj_coleta)
                return 200
        except:
            return 300
        
    def updateColeta(self,idColeta,dados):
        dtc=Dtc()
        dtc.readDtc(dados['dtc'])
        if MdlColeta.objects.filter(id=idColeta).exists():
            self.obj_coleta=MdlColeta.objects.filter(id=idColeta).get()
            self.saveOrUpdate(dados)
            self.obj_coleta.save()
            dtc.anexaColeta(dados['dtc'],self.obj_coleta)
            return 200 
        
    def deleteColeta(self,idColeta):
        if MdlColeta.objects.filter(id=idColeta).exists():
            self.coleta=MdlColeta.objects.filter(id=idColeta).get()
            if ClsDtc.objects.filter(coleta_fk=idColeta).exists():
                dtc=ClsDtc.objects.filter(coleta_fk=idColeta).get()
                dtc.coleta_fk=None
                dtc.save()
                self.coleta.delete()
