let placaPrincipalManifesto = document.getElementById('placaPrincipal')
let proprietarioPrincipal = document.getElementById('proprietarioPrincipal')
let modeloPrincipal = document.getElementById('modeloPrincipal')


placaPrincipalManifesto.addEventListener('blur',async()=>{
    if(placaPrincipalManifesto.value != "" && placaPrincipalManifesto.value.length ==7){
        let data = {'placa':placaPrincipalManifesto.value}
        let conexao = new Conexao('/operacional/read_veiculo_placa/', data);
        const result = await conexao.sendPostRequest();
        console.log(result)

        if (result.status == 200){
            proprietarioPrincipal.value = result.veiculo.proprietario_fk.parceiro_fk.raz_soc
            modeloPrincipal.value = result.veiculo.modelo
        }else{
            msgErro('Veículo não localizado')
            placaPrincipalManifesto.value = ""
            proprietarioPrincipal.value = ""
            modeloPrincipal.value = ""
        }
    }
})

