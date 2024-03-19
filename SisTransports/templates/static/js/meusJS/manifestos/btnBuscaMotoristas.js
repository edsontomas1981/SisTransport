let btnBuscaMotoristas = document.getElementById('btnBuscaMotoristas')

btnBuscaMotoristas.addEventListener('click',()=>{
    let idManifesto = document.getElementById('spanNumManifesto')
    if(idManifesto.textContent == ''){
        msgAviso("Para adicionar um motorista, é necessário primeiro salvar ou selecionar um manifesto.")
    }else{
        openModal('mdlBuscaMotoristas')
    }
})