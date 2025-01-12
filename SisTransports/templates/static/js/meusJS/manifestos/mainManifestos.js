let listaDocumentos = []

document.addEventListener('DOMContentLoaded', ()=>{
    carregaTipoManifeto()
    carregaTipoDocumentos()
})

const botoesManifesto={
    baixaRapida: { 
      classe: "btn-primary text-white rounded",
      texto:  '<i class="fa fa-check" aria-hidden="true"></i>',
      callback: baixaRapida
    },
    baixaDetalhada: { 
        classe: "btn-success text-white rounded",
        texto:  '<i class="fa fa-check" aria-hidden="true"></i>',
        callback: baixaDetalhada
      },
    excluir: { 
        classe: "btn-danger text-white rounded",
        texto: '<i class="fa fa-trash" aria-hidden="true"></i>',
        callback: removerDocumentoPorId
      },
  };

async function carregaTipoManifeto(){

    let response = await connEndpoint('/operacional/get_ocorrencias_manifesto/',{})

    adicionarDadosAoSelect(response.ocorrencias,'cmbTipoManifesto','id','tipo_ocorrencia')

}

async function carregaTipoDocumentos (){

    let response = await connEndpoint('/operacional/get_tipos_documentos/',{})

    adicionarDadosAoSelect(response.tipos,'cmbTipoDocumento','id','tipo_documento')

}

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

const preparaImpressaoManifesto =(response,comFrete=true)=>{
    let dados = []
    const tipoFrete = (tipo)=>{
        switch (tipo) {
            case 1:
                return "CIF"
                break;
            case 2:
                return "FOB"
                break;
            default:
                return "OUTROS";
        }
    }

    const determinarFonteColetaOuNfs = (e)=>{
        let volume = 0
        let peso = 0
        let cubagem = 0
        let valorNf = 0

        if(e.dtc_fk.notas_fiscais.length > 0){
            e.dtc_fk.notas_fiscais.forEach(element => {
                volume += parseFloat(element.volume)
                peso += parseFloat(element.peso)
                cubagem += parseFloat(element.m3)
                valorNf += parseFloat(element.valor_nf)
            });
        }else{
            volume += parseFloat(e.dtc_fk.coleta.volume)
            peso += parseFloat(e.dtc_fk.coleta.peso)
            cubagem += parseFloat(e.dtc_fk.coleta.cubM3)
            valorNf += parseFloat(e.dtc_fk.coleta.valor)
        }

        return{"volume":volume+"",
            "peso":peso+"",
            "cubagem":cubagem+"",
            "valorNf":valorNf+""}
    }
    if(comFrete){
            response.forEach(e => {
            const remetente = e.dtc_fk.remetente ? e.dtc_fk.remetente.raz_soc : " ";
            const destinatario = e.dtc_fk.destinatario ? e.dtc_fk.destinatario.raz_soc : " ";
            const destino = e.dtc_fk.rota ? `${e.dtc_fk.rota.destinoUf}-${e.dtc_fk.rota.destinoCidade}` : " ";
            const cteId = e.cte ? e.cte.id +"" : ""; // Verifica se cte existe antes de acessar id
            const dtcId = e.dtc_fk ? e.dtc_fk.id + "" : ""
            const freteCte = e.cte ? e.cte.totalFrete +"" : "0.00";

            let nfs = {}
            nfs.nfs = e.dtc_fk.notas_fiscais
            let dadosColetaEntrega = determinarFonteColetaOuNfs(e)

            dados.push([
                dtcId,cteId,remetente,destinatario,destino,
                truncateString(geraTextoNf(nfs),17),
                dadosColetaEntrega.volume,dadosColetaEntrega.peso,dadosColetaEntrega.cubagem,dadosColetaEntrega.valorNf,
                `R$ ${freteCte}`,
                tipoFrete(e.dtc_fk.tipoFrete)
            ]);
        });
    }else{
        response.forEach(e => {
            const remetente = e.dtc_fk.remetente ? e.dtc_fk.remetente.raz_soc : " ";
            const destinatario = e.dtc_fk.destinatario ? e.dtc_fk.destinatario.raz_soc : " ";
            const destino = e.dtc_fk.rota ? `${e.dtc_fk.rota.destinoUf}-${e.dtc_fk.rota.destinoCidade}` : " ";
            const cteId = e.cte ? e.cte.id +"" : ""; // Verifica se cte existe antes de acessar id
            const dtcId = e.dtc_fk ? e.dtc_fk.id + "" : ""
            const freteCte = e.cte ? e.cte.totalFrete +"" : "0.00";

            let nfs = {}
            nfs.nfs = e.dtc_fk.notas_fiscais
            let dadosColetaEntrega = determinarFonteColetaOuNfs(e)

            dados.push([
                dtcId,cteId,remetente,destinatario,destino,
                truncateString(geraTextoNf(nfs),17),
                dadosColetaEntrega.volume,dadosColetaEntrega.peso,dadosColetaEntrega.cubagem,dadosColetaEntrega.valorNf,
                tipoFrete(e.dtc_fk.tipoFrete)
            ]);
        });
    }

    return dados
}

const cabecalhoManifesto = (response)=>{
    return{
    numManifesto:response.manifesto.id,
    emissor:response.manifesto.emissor_fk.razao,
    enderecoOrigem:response.manifesto.emissor_fk.endereco.logradouro,
    numOrigem:response.manifesto.emissor_fk.endereco.numero,
    bairroOrigem:response.manifesto.emissor_fk.endereco.bairro,
    cidadeOrigem:response.manifesto.emissor_fk.endereco.cidade,
    ufOrigem:response.manifesto.emissor_fk.endereco.uf,

    destinatario:"Serafim Transportes de Cargas Ltda",
    enderecoDestinatario:"Rua Nova Veneza",
    numDestinatario:"179",
    bairroDestinatario:"Teste",
    cidadeDestinatario:"Teresina",
    ufDestinatario:"PI",
    dataSaida:formataDataPtBr(response.manifesto.data_cadastro),

    veiculo:response.manifesto.veiculos[0].placa,
    carreta:response.manifesto.veiculos[1] ? response.manifesto.veiculos[1].placa: null ,
    motorista:response.manifesto.motoristas[0].parceiro_fk.raz_soc,
    cpfMotorista: response.manifesto.motoristas[0].parceiro_fk.cnpj_cpf,
    foneMotorista:"11-96926-2277",
    liberacaoMotorista:response.manifesto.liberacao,
    lacres:response.manifesto.lacres}
}

async function getOcorrenciasBySelect(){

    const handlerOcorrencias = async (respostasOcorrencias)=>{
        let dadosNormalizadosParaSelect = []
        
        respostasOcorrencias.forEach(e => {
            dadosNormalizadosParaSelect.push({value:e.id,texto:`${e.codigo} - ${e.descricao}`})
        });
        return dadosNormalizadosParaSelect        
    }

    let ocorrencias = new OcorrenciasManifesto()
    await ocorrencias.getOcorrencias()

    return await handlerOcorrencias(ocorrencias.jsonOcorrencias.dados)
}

async function populaTbodyDocumentos (response){
    const documento = prepareDataToTableManifesto(response);
    const opcoesSelect = await getOcorrenciasBySelect();
    
    popula_tbody_manifesto('tableDtcManifesto', documento, botoesManifesto, false,opcoesSelect);

}

const prepareDataToTableManifesto = (response) => {
    return response.map(element => {
        const data = {
            id: element.dtc_fk?.id || '',
            cte: element.cte?.id || '',
            remetente: truncateString(element.dtc_fk?.remetente?.raz_soc, 20) || '',
            destinatario: truncateString(element.dtc_fk?.destinatario?.raz_soc, 20) || '',
            ocorrencia: element.ocorrencia_manifesto_fk?.tipo_ocorrencia || '',
            dtsaida: element.manifesto_fk ? formataDataPtBr(element.manifesto_fk.data_previsão_inicio) : '',
            origem: truncateString(element.dtc_fk?.remetente?.endereco_fk?.cidade, 10) + ' - ' + (element.cte?.dtc_fk?.remetente?.endereco_fk?.uf || ''),
            destino: truncateString(element.dtc_fk?.destinatario?.endereco_fk?.cidade, 8) + ' - ' + (element.cte?.dtc_fk?.destinatario?.endereco_fk?.uf || '')
        };
        return data;
    });
}

async function selecionaColeta(idDtc) {
    let coleta = new NovaColeta()
    await coleta.carregaColetasPorDtc(idDtc)
    return coleta
}

async function selecionaCte(idCte, tipoOcorrencia) {
    let cte = new Cte()
    await cte.carregaCtePorDtc(idCte)
    return cte
}

async function baixaDetalhada (idDocumento,tipoOcorrencia){
    ocorrencias = await getOcorrenciasBySelect()
    populaSelect(ocorrencias,'selectModalOcorrencias','Selecione a Ocorrência')
    document.getElementById('tbodyHistoricoDtc').innerHTML = ''

    let documento

    let dados = {}

    let apiService = new ApiService();
    let url= "/operacional/get_ocorrencias_documento/"
    let response
    switch (tipoOcorrencia) {
        
        case 'Coleta':
            documento =  await selecionaColeta(idDocumento,tipoOcorrencia)
            document.getElementById('mdlTipoDocumentoModalOcorrencia').value = "1"
            document.getElementById('idDocumentoModalOcorrencia').value = documento.jsonColeta.id
            dados={tipoDocumento:'1',idDocumento:documento.jsonColeta.id}
            response = await apiService.postData(url, dados);
            populaTabelaModalOcorrencias(response.ocorrencias)
            break; 

        case 'Entrega':
            documento =  await selecionaCte(idDocumento,tipoOcorrencia)            
            document.getElementById('idDocumentoModalOcorrencia').value = documento.jsonCte.id
            document.getElementById('mdlTipoDocumentoModalOcorrencia').value = "2"
            dados={tipoDocumento:'2',idDocumento:documento.jsonCte.id}
            response = await apiService.postData(url, dados);
            populaTabelaModalOcorrencias(response.ocorrencias)
            break;

        default:
            break;
    }
    
    


    openModal('mdlBaixaDocumentos')
}

async function baixaRapida (idDtc,tipo_documento){
    let idSelect = 'select'+idDtc

    let selectOcorrencia = document.getElementById(idSelect)

    if(tipo_documento == 'Entrega'){
        let cte = new Cte()
        await cte.carregaCtePorDtc(idDtc)
        // cte.update_status_cte()
    }

    if(tipo_documento == 'Coleta'){
        let coleta = new NovaColeta()
        await coleta.carregaColetasPorDtc(idDtc)
    }

    console.log(`Ocorrencia : ${selectOcorrencia.value} Documento: ${idDtc}`)
}














