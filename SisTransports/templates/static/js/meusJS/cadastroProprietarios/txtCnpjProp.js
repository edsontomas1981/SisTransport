let parceiro = document.getElementById('cnpj_cpf')
let razaoProp = document.getElementById('razaoProp')

parceiro.addEventListener('blur',async()=>{
    // consultaParceiro()
    let prop = await consultaProprietario()
    console.log(prop)
    if (prop.status==200){ 
        populaProprietario(prop.dados)
    }else{
        consultaParceiro()
    }
})
 
const consultaParceiro = async()=>{
    let dados={'cnpj_cpf':parceiro.value}
    let conexao = new Conexao('/parceiros/read_parceiro_json/',dados);
    try {
        const result = await conexao.sendPostRequest();
        if(result.status >= 200 && result.status < 300 ){
            razaoProp.value = result.parceiro.raz_soc
        }else {
            msgErro('Parceiro não cadastrado. É necessário cadastrar um parceiro primeiro.');
        }
        // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
}

const consultaProprietario = async()=>{
    let dados={'cnpj_cpf':parceiro.value}
    let conexao = new Conexao('/operacional/read_proprietario/',dados);
    try {
        const result = await conexao.sendPostRequest();
        return result
        // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
}

const populaProprietario=(dados)=>{
    $('#selectTipoProp').val(dados.tipo_proprietario)
    $('#razaoProp').val(dados.parceiro_fk.raz_soc)
    $('#anttProp').val(dados.antt)
    $('#dataAntt').val(formataData(dados.validade_antt))
}

