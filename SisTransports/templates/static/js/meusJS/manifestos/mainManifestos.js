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

    const dadosManifesto = {
        motoristas: listaMotoristas,
        veiculos: listaVeiculos
    };
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
            // Verifica se as listas de motoristas e veículos não estão vazias
            if (listaMotoristas.length === 0 ) {
                msgErro('É necessário informar ao menos um motorista.');
                document.getElementById('cpfMotoristaManifesto').classList.add('campo-vazio');
                document.getElementById('nomeMotoristaManifesto').classList.add('campo-vazio');
                return null;
            }

            // Verifica se as listas de motoristas e veículos não estão vazias
            if ( listaVeiculos.length === 0) {
                msgErro('É necessário informar ao menos um veículo.');
                document.getElementById('placaPrincipal').classList.add('campo-vazio');
                document.getElementById('modeloPrincipal').classList.add('campo-vazio');
                document.getElementById('proprietarioPrincipal').classList.add('campo-vazio');
            
                return null;
            }
            
            return dadosManifesto;
        }
};

const populaDadosManifesto= (response)=>{
    console.log(formataData(response.data_previsão_inicio))
    document.getElementById('emissorMdfe').value=response.emissor_fk.id
    document.getElementById('dtInicioManif').value=formataData(response.data_previsão_inicio)
    document.getElementById('dtPrevisaoChegada').value=formataData(response.data_previsão_chegada)
    document.getElementById('rotasManifesto').value=response.rota_fk.id
    document.getElementById('freteCarreteiro').value=response.frete_carreteiro
    document.getElementById('adiantamentoCarreteiro').value=response.frete_adiantamento
    document.getElementById('lacresManifesto').value=response.lacres
    document.getElementById('averbacaoManifesto').value=response.averbacao
    document.getElementById('liberacaoMotorista').value=response.liberacao
}

const limpaDadosManifesto= ()=>{
    document.getElementById('emissorMdfe').selectedIndex = 0;
    document.getElementById('dtInicioManif').value=""
    document.getElementById('dtPrevisaoChegada').value=""
    document.getElementById('rotasManifesto').selectedIndex = 0;
    document.getElementById('freteCarreteiro').value=""
    document.getElementById('adiantamentoCarreteiro').value=""
    document.getElementById('lacresManifesto').value=""
    document.getElementById('averbacaoManifesto').value=""
    document.getElementById('liberacaoMotorista').value=""
}



