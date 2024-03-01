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
    console.log(existemCamposVazios)
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

