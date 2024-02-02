let salvaProp = document.getElementById('btnSalvaProprietario')
salvaProp.addEventListener('click',async ()=>{
    let dados = carregaDadosProprietario()
    let camposFaltantes = verificarCamposFaltantes(dados)
    if (camposFaltantes){
        msgAviso(geraMensagemCamposFaltando(camposFaltantes))
    }else{
        let conexao = new Conexao('/operacional/create_proprietario/',dados);
        try {
            const result = await conexao.sendPostRequest();
            if (result.status >= 200 && result.status < 300) {
                msgOk('Proprietário salvo com sucesso.');
            } else {
                msgErro('Não foi possível salvar o proprietário.');
            }
            // Imprime a resposta JSON da solicitação POST
        } catch (error) {
            console.log(result.status)
            console.error(error); // Imprime a mensagem de erro
        }
    }
})

const carregaDadosProprietario = ()=>{
    let antt = document.getElementById('anttProp')
    let cnpj = document.getElementById('cnpj_cpf')
    let tipoPropr = document.getElementById('selectTipoProp')
    let dataValidadeAntt = document.getElementById('dataAntt')
    
    let dadosProprietario={
        'cnpj_cpf':cnpj.value,
        'antt': antt.value,
        'validade_antt': dataValidadeAntt.value,
        'tipo_proprietario': tipoPropr.value,
    }

    return dadosProprietario
}

function verificarCamposFaltantes(dadosProprietario) {
    const camposObrigatorios = ['cnpj_cpf', 'antt', 'validade_antt', 'tipo_proprietario'];
    const camposFaltantes = [];

    camposObrigatorios.forEach((campo) => {
        if (!dadosProprietario.hasOwnProperty(campo) || dadosProprietario[campo].trim() === '') {
            camposFaltantes.push(campo);
        }
    });

    if (camposFaltantes.length > 0) {
        return camposFaltantes;
    } else {
        return null; // Nenhum campo faltante
    }
}

const parceiroExiste=async()=>{
    let dados={'cnpj_cpf':document.getElementById('cnpj_cpf').value}
    let conexao = new Conexao('/parceiros/read_parceiro_json/',dados);
    try {
        const result = await conexao.sendPostRequest();
        return true
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
        return false
    }
}