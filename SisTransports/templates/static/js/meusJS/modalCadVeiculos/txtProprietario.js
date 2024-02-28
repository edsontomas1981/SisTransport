let txtCnpjProprietario = document.getElementById('cnpjProprietario')
let txtNomeRazaoSocial = document.getElementById('nomeProprietario')

document.addEventListener('DOMContentLoaded',()=>{
    txtCnpjProprietario.addEventListener('blur',async ()=>{
        if(txtCnpjProprietario.value != ''){
           txtNomeRazaoSocial.value =await buscaProprietario(txtCnpjProprietario.value)
        }
    })
})

const buscaProprietario = async(cnpj)=>{
    url='/operacional/read_proprietario/'
    let dados = {'cnpj_cpf':cnpj}
    let resposta = await connEndpoint(url,dados)
    console.log(resposta)
    return resposta.dados.parceiro_fk.raz_soc
}


const connEndpoint = async (url,dados)=>{
    let conexao = new Conexao(url, dados);
    try {
        const result = await conexao.sendPostRequest();
        return result
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
        return error
    }
}