let motorista = document.getElementById('cpfMotoristaManifesto')
let nomeMotorista = document.getElementById('nomeMotoristaManifesto')

motorista.addEventListener('blur',async()=>{
    let response= await connEndpoint('/operacional/read_motorista/', {'cpfMotorista':motorista.value})

    if(response.status == 200){

        nomeMotorista.value = response.motorista.parceiro_fk.raz_soc
        
    }else{
        msgErro('Motorista não localizado')
        nomeMotorista.value = ""
        motorista.value = ""
    }
    

})

