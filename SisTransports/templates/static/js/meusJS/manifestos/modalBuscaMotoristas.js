document.addEventListener('DOMContentLoaded', function() {
    let modalMotorista = document.getElementById('mdlBuscaMotoristas') 
    modalMotorista.addEventListener('shown.bs.modal', async ()=> {

        let response  = await connEndpoint('/operacional/read_motoristas/', {})
        var dadosDosMotoristas= preparaDadosTbodyBuscaMotorista(response.motoristas)

        console.log(dadosDosMotoristas)
        populaTbodyBuscaMotorista(dadosDosMotoristas)

        const inputBusca = document.getElementById('nomeMotorista');

        inputBusca.addEventListener('input', function() {
            const termoBusca = inputBusca.value.toLowerCase();
            const motoristasFiltrados = dadosDosMotoristas.filter(function(motorista) {
                return motorista.nome.toLowerCase().includes(termoBusca) || motorista.id.includes(termoBusca);
            });
            populaTbodyBuscaMotorista(motoristasFiltrados)
    
        });
    });
});

const populaTbodyBuscaMotorista = (dados)=>{
    let botoes={
        alterar: {
            classe: "btn-primary text-white",
            texto: '<i class="fas fa-check" aria-hidden="true"></i>',
            callback: selecionaMotorista
          }
        }
    popula_tbody_paginacao('paginacaoBuscaMotorista','tbodyBuscaMotorista',dados,botoes,1,15,false,false)
}

const preparaDadosTbodyBuscaMotorista=(response)=>{
    let dadosBuscaMotorista = []
    response.forEach(element => {
        dadosBuscaMotorista.push({'id':element.parceiro_fk.cnpj_cpf,'nome':element.parceiro_fk.raz_soc})
    });
    return dadosBuscaMotorista
}

const selecionaMotorista = async(element)=>{
    let response  = await connEndpoint('/operacional/read_motorista/', {'cpfMotorista':element})
    document.getElementById('cpfMotoristaManifesto').value = response.motorista.parceiro_fk.cnpj_cpf
    document.getElementById('nomeMotoristaManifesto').value = response.motorista.parceiro_fk.raz_soc
    closeModal()
}
