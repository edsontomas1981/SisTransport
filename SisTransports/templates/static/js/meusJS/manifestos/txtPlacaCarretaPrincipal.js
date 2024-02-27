let carretaPrincipal = document.getElementById('carretaPrincipal')
let modeloCarretaPrincipal = document.getElementById('modeloCarretaPrincipal')
let proprietarioCarretaPrincipal = document.getElementById('proprietarioCarretaPrincipal')

carretaPrincipal.addEventListener('blur',async ()=>{
    if(carretaPrincipal.value != "" && carretaPrincipal.value.length ==7){
        let data = {'placa':carretaPrincipal.value}
        let conexao = new Conexao('/operacional/read_veiculo_placa/', data);
        const result = await conexao.sendPostRequest();
        if (result.status == 200){
            modeloCarretaPrincipal.value = result.veiculo.modelo
            proprietarioCarretaPrincipal.value = result.veiculo.proprietario_fk.parceiro_fk.raz_soc
        }else{
            msgErro('Veículo não localizado')
            carretaPrincipal.value = ""
            modeloCarretaPrincipal.value = ""
            proprietarioCarretaPrincipal.value = ""
        }
    }
})

