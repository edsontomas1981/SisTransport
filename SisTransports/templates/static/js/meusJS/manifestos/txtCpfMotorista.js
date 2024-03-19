let motorista = document.getElementById('cpfMotoristaManifesto')
let nomeMotorista = document.getElementById('nomeMotoristaManifesto')

motorista.addEventListener('blur',async()=>{
    let cpfSemEspacos = motorista.value.replace(/\s/g, '');

    if (cpfSemEspacos != ""){
        if(validateCPF(cpfSemEspacos)){
            let response= await connEndpoint('/operacional/read_motorista/', {'cpfMotorista':cpfSemEspacos})
            if(response.status == 200){
                nomeMotorista.value = response.motorista.parceiro_fk.raz_soc
            }else{
                msgErro('Motorista não localizado')
                nomeMotorista.value = ""
                motorista.value = ""
            }
        }else{
            msgErro('CPF inválido')
            nomeMotorista.value = ""
            motorista.value = ""
        }
    }
})

motorista.addEventListener('input', (event)=> {
    motorista.value = motorista.value.replace(/\D/g, '');
});