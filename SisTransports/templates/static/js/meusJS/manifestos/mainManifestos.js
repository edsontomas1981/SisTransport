const carregaTipoManifeto = async ()=>{

    let response = await connEndpoint('/operacional/get_ocorrencias_manifesto/',{})

    adicionarDadosAoSelect(response.ocorrencias,'cmbTipoManifesto','id','tipo_ocorrencia')

}

const carregaTipoDocumentos = async ()=>{

    let response = await connEndpoint('/operacional/get_tipos_documentos/',{})

    adicionarDadosAoSelect(response.tipos,'cmbTipoDocumento','id','tipo_documento')

}

document.addEventListener('DOMContentLoaded', ()=>{
    carregaTipoManifeto()
    carregaTipoDocumentos()
})

const geraDadosManifesto = () => {
    const dados = ['emissorMdfe', 'dtInicioManif', 'dtPrevisaoChegada', 'rotasManifesto',
                   'freteCarreteiro', 'adiantamentoCarreteiro', 'lacresManifesto',
                   'averbacaoManifesto', 'liberacaoMotorista', 'txtObservacao'];

    // Verifique se os campos obrigatórios estão preenchidos
    const obrigatorios = ['emissorMdfe', 'dtInicioManif', 'dtPrevisaoChegada', 'rotasManifesto'];

    const dadosManifesto = {};
    document.getElementById('cpfMotoristaManifesto').classList.remove('campo-vazio');
    document.getElementById('nomeMotoristaManifesto').classList.remove('campo-vazio');
    document.getElementById('placaPrincipal').classList.remove('campo-vazio');
    document.getElementById('modeloPrincipal').classList.remove('campo-vazio');
    document.getElementById('proprietarioPrincipal').classList.remove('campo-vazio');

    // Preenche os dados do manifesto
    for (const campo of dados) {
        dadosManifesto[campo] = document.getElementById(campo).value.trim();
    }

    existemCamposVazios = validarCamposObrigatorios(dadosManifesto,obrigatorios)
    if(existemCamposVazios.length !=0 ){
            return null
        }else{
            return dadosManifesto;
        }
};


const dadosParaTbodyMotoristas = (motoristas)=>{
    let dadosMotoristas = []
    motoristas.forEach(motorista => {
        dadosMotoristas.push({'id':motorista.parceiro_fk.cnpj_cpf,'nome':truncateString(motorista.parceiro_fk.raz_soc,12)})
    });
    return dadosMotoristas
}

const btnRemoveMotorista = async (cpfMotorista)=>{
    let idManifesto = document.getElementById('spanNumManifesto')
    // removerMotoristaLista(cpfMotorista,idManifesto)
    let response = await connEndpoint('/operacional/del_motorista_manifesto/',{'idManifesto':idManifesto.textContent,'cpfMotorista':cpfMotorista})
    if (response.status == 200){
        populaTbodyMotorista(response.motoristas)
        msgOk('O motorista foi removido do manifesto com sucesso.')
    }else{
        msgErro('Não foi possível excluir o motorista do manifesto. Verifique sua conexão com a internet e tente novamente.')
    }
    
}

const populaTbodyMotorista = (motoristas)=>{
    let botoes={
        excluir: {
            classe: "btn btn-danger text-white",
            texto: 'Apagar',
            callback: btnRemoveMotorista
          }
      };    

    popula_tbody('tbodyMotorista',dadosParaTbodyMotoristas(motoristas),botoes,false)

}

const populaDadosManifesto = (response) => {
    document.getElementById('emissorMdfe').value = response.emissor_fk ? response.emissor_fk.id : '';
    document.getElementById('dtInicioManif').value = response.data_previsão_inicio ? formataData(response.data_previsão_inicio) : '';
    document.getElementById('dtPrevisaoChegada').value = response.data_previsão_chegada ? formataData(response.data_previsão_chegada) : '';
    document.getElementById('rotasManifesto').value = response.rota_fk ? response.rota_fk.id : '';
    document.getElementById('freteCarreteiro').value = response.frete_carreteiro ? response.frete_carreteiro : '';
    document.getElementById('freteContratado').value = response.frete_carreteiro ? response.frete_carreteiro : '';
    document.getElementById('adiantamentoCarreteiro').value = response.frete_adiantamento ? response.frete_adiantamento : '';
    document.getElementById('lacresManifesto').value = response.lacres ? response.lacres : '';
    document.getElementById('averbacaoManifesto').value = response.averbacao ? response.averbacao : '';
    document.getElementById('liberacaoMotorista').value = response.liberacao ? response.liberacao : '';
}

const limpaDadosManifesto= ()=>{
    document.getElementById('emissorMdfe').selectedIndex = 0;
    document.getElementById('dtInicioManif').value=""
    document.getElementById('dtPrevisaoChegada').value=""
    document.getElementById('rotasManifesto').selectedIndex = 0;
    document.getElementById('freteCarreteiro').value=""
    document.getElementById('freteContratado').value=""
    document.getElementById('adiantamentoCarreteiro').value=""
    document.getElementById('lacresManifesto').value=""
    document.getElementById('averbacaoManifesto').value=""
    document.getElementById('liberacaoMotorista').value=""
}

const populaVeiculosManifesto=(dadosVeiculos)=>{
    populaTbodyVeiculos(dadosVeiculos)
}

const obtemVeiculosManifesto=async(idManifesto)=>{
    let response = await connEndpoint('/operacional/obter_veiculos_manifesto/',{'idManifesto':idManifesto})
    return response
}


const populaTbodyVeiculos = (veiculos)=>{
    let botoes={
        excluir: {
            classe: "btn btn-danger text-white",
            texto: 'Apagar',
            callback: btnRemoveVeiculos
          }
      };    

    popula_tbody('tbodyVeiculos',dadosParaTbodyVeiculos(veiculos),botoes,false)

}

const dadosParaTbodyVeiculos = (veiculos)=>{
    let dadosVeiculos = []
    veiculos.forEach(veiculo => {
        dadosVeiculos.push({'id':veiculo.placa,'modelo':truncateString(veiculo.modelo,12),'proprietario':truncateString(veiculo.proprietario_fk.parceiro_fk.raz_soc,12)})
    });
    return dadosVeiculos
}

const populaContratoFrete= (response)=>{
    document.getElementById('idContrato').value = response.id
    document.getElementById('freteContratado').value = response.frete_contratado
    document.getElementById('dataEmissaoContrato').value = formataData(response.data_emissao_contrato)
    document.getElementById('numeroCiot').value = response.numero_ciot
    document.getElementById('valorPedagio').value = response.valor_pedagio
    document.getElementById('irRetido').value = response.ir_retido
    document.getElementById('inss').value = response.inss
    document.getElementById('valorColeta').value = response.valor_coleta
    document.getElementById('iss').value = response.iss
    document.getElementById('sestSenat').value = response.sest_senat
    document.getElementById('outrosCreditos').value = response.outros_creditos
    document.getElementById('adiantamento').value = response.adiantamento
    document.getElementById('outrosDescontos').value = response.outros_descontos
    document.getElementById('freteBruto').value = response.frete_bruto
    document.getElementById('totalDescontos').value = response.total_descontos
    document.getElementById('contratoObs').value = response.contrato_obs
    document.getElementById('freteAPagar').value = response.frete_a_pagar
}

const limpaContratoFrete= (response)=>{
    document.getElementById('idContrato').value = ""
    // document.getElementById('freteContratado').value = ""
    document.getElementById('dataEmissaoContrato').value = ""
    document.getElementById('numeroCiot').value = ""
    document.getElementById('valorPedagio').value = ""
    document.getElementById('irRetido').value = ""
    document.getElementById('inss').value = ""
    document.getElementById('valorColeta').value = ""
    document.getElementById('iss').value = ""
    document.getElementById('sestSenat').value = ""
    document.getElementById('outrosCreditos').value = ""
    document.getElementById('adiantamento').value = ""
    document.getElementById('outrosDescontos').value = ""
    document.getElementById('freteBruto').value = ""
    document.getElementById('totalDescontos').value = ""
    document.getElementById('contratoObs').value = ""
    document.getElementById('freteAPagar').value = ""
}



