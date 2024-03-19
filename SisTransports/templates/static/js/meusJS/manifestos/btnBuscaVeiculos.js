let btnBuscaVeiculo = document.getElementById('btnBuscaVeiculo')

btnBuscaVeiculo.addEventListener('click',()=>{

    let idManifesto = document.getElementById('spanNumManifesto')
    if(idManifesto.textContent == ''){
        msgAviso("Para adicionar um veículo, é necessário primeiro salvar ou selecionar um manifesto.")
    }else{
        openModal('mdlBuscaVeiculo')
    }
})