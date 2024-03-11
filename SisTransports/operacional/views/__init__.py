from operacional.views.operacional import operacional

from operacional.views.dtc.preDtc import preDtc
from operacional.views.dtc.saveDtc import saveDtc
from operacional.views.dtc.buscaDtc import buscaDtc
from operacional.views.dtc.excluiDtc import excluiDtc
from operacional.views.dtc.createDtc import createDtc
from operacional.views.dtc.readDtc import readDtc
from operacional.views.dtc.updateDtc import updateDtc
from operacional.views.dtc.deleteDtc import deleteDtc

from operacional.views.rota.rotas import rotas
from operacional.views.rota.createRota import createRota
from operacional.views.rota.readRota import readRota
from operacional.views.rota.readRotas import readRotas
from operacional.views.rota.updateRota import updateRota
from operacional.views.rota.deleteRota import deleteRota

from operacional.views.coleta.createColeta import createColeta
from operacional.views.coleta.readColeta import readColeta
from operacional.views.coleta.updateColeta import updateColeta
from operacional.views.coleta.deleteColeta import deleteColeta
from operacional.views.coleta.saveColeta import saveColeta
from operacional.views.coleta.deletaColeta import deletaColeta
from operacional.views.coleta.read_coletas_geral import read_coletas_geral
from operacional.views.coleta.impressao_coletas import impressao_coletas
from operacional.views.coleta.print_coletas import print_coletas

from operacional.views.nf.create_nf import create_nf
from operacional.views.nf.read_nf import read_nf
from operacional.views.nf.update_nf import update_nf
from operacional.views.nf.delete_nf import delete_nf
from operacional.views.nf.read_nfs_by_dtc import read_nfs_by_dtc
from operacional.views.nf.entrada_nfs import entrada_nfs

from operacional.views.proprietario.proprietario import proprietario
from operacional.views.proprietario.create_proprietario import create_proprietario
from operacional.views.proprietario.delete_proprietario import delete_proprietario
from operacional.views.proprietario.read_proprietario import read_proprietario
from operacional.views.proprietario.read_proprietario_por_veiculo import read_proprietario_por_veiculo
from operacional.views.proprietario.read_proprietarios import read_proprietarios
from operacional.views.proprietario.update_proprietario import update_proprietario

from operacional.views.motoristas.motorista import motorista
from operacional.views.motoristas.create_motorista import create_motorista
from operacional.views.motoristas.delete_motorista import delete_motorista
from operacional.views.motoristas.read_motorista import read_motorista
from operacional.views.motoristas.read_motorista_por_veiculo import read_motorista_por_veiculo
from operacional.views.motoristas.read_motoristas import read_motoristas
from operacional.views.motoristas.update_motorista import update_motorista

from operacional.views.veiculos.create_veiculo import create_veiculo
from operacional.views.veiculos.dados_cadastro import dados_cadatro_veiculo
from operacional.views.veiculos.read_veiculo_por_placa import read_veiculo_placa

from operacional.views.manifesto.manifesto import manifesto
from operacional.views.manifesto.create_manifesto import create_manifesto
from operacional.views.manifesto.manifesto_by_num import manifesto_by_num
from operacional.views.manifesto.add_motorista_manifesto import add_motorista_manifesto
from operacional.views.manifesto.add_veiculo_manifesto import add_veiculo_manifesto
from operacional.views.manifesto.del_motorista_manifesto import del_motorista_manifesto
from operacional.views.manifesto.del_veiculo_manifesto import del_veiculo_manifesto


from operacional.views.ocorrencias_manifesto.get_ocorrencia_id import get_ocorrencia_manifesto_by_id
from operacional.views.ocorrencias_manifesto.get_ocorrencias_manifesto import get_ocorrencias_manifesto

from operacional.views.tipo_manifesto.get_tipo_manifesto import get_tipo_manifesto_by_id
from operacional.views.tipo_manifesto.get_tipos_manifesto import get_tipos_manifesto

from operacional.views.tipo_documento_manifesto.get_tipo_documento_by_id import get_tipo_documento_manifesto_by_id
from operacional.views.tipo_documento_manifesto.get_tipos_documentos import get_tipos_documentos_manifesto

from operacional.views.cte.cria_cte import create_cte
from operacional.views.cte.delete_cte import delete_cte
from operacional.views.cte.read_cte import read_cte_by_dtc
from operacional.views.cte.get_cte_by_dtc import get_cte_by_dtc
from operacional.views.cte.get_cte_chave_nfe import get_cte_chave_nfe

from operacional.views.cte.get_cte_id import get_cte_id

from operacional.views.emissores.get_emissor import get_emissor
from operacional.views.emissores.get_emissores import get_emissores






