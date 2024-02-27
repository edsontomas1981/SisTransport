let placa = document.getElementById('placaPrincipal')
let proprietarioPrincipal = document.getElementById('proprietarioPrincipal')
let modeloPrincipal = document.getElementById('modeloPrincipal')


placa.addEventListener('blur',async()=>{
    if(placa.value != "" && placa.value.length ==7){
        let data = {'placa':placa.value}
        let conexao = new Conexao('/operacional/read_veiculo_placa/', data);
        const result = await conexao.sendPostRequest();
        console.log(result)

        if (result.status == 200){
            proprietarioPrincipal.value = result.veiculo.proprietario_fk.parceiro_fk.raz_soc
            modeloPrincipal.value = result.veiculo.modelo
        }else{
            msgErro('Veículo não localizado')
            placa.value = ""
            proprietarioPrincipal.value = ""
            modeloPrincipal.value = ""
        }
    }
})

