let carretaSecundaria = document.getElementById('carretaSecundaria')
let modeloCarretaSecundaria = document.getElementById('modeloCarretaSecundaria')
let proprietarioCarretaSecundaria = document.getElementById('proprietarioCarretaSecundaria')

carretaSecundaria.addEventListener('blur',async ()=>{
    if(carretaSecundaria.value != "" && carretaSecundaria.value.length ==7){
        let data = {'placa':carretaSecundaria.value}
        let conexao = new Conexao('/operacional/read_veiculo_placa/', data);
        const result = await conexao.sendPostRequest();
        if (result.status == 200){
            modeloCarretaSecundaria.value = result.veiculo.modelo
            proprietarioCarretaSecundaria.value = result.veiculo.proprietario_fk.parceiro_fk.raz_soc
        }else{
            msgErro('Veículo não localizado')
            carretaSecundaria.value = ""
            modeloCarretaSecundaria.value = ""
            proprietarioCarretaSecundaria.value = ""
        }
    }
})
