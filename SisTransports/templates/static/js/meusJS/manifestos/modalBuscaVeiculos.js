document.addEventListener('DOMContentLoaded', ()=> {
    let dadosDosveiculos = []
    let modalVeiculos = document.getElementById('mdlBuscaVeiculo') 
    modalVeiculos.addEventListener('shown.bs.modal', async ()=> {
        let response  = await connEndpoint('/operacional/read_veiculos/', {})
        dadosDosveiculos= preparaDadosTbodyBuscaVeiculo(response.veiculos)
        populaTbodyBuscaVeiculos(dadosDosveiculos)
    })

    const inputBuscaVeiculo = document.getElementById('placaVeiculo');

    inputBuscaVeiculo.addEventListener('input', ()=> {
        const termoBuscaVeiculos = inputBuscaVeiculo.value.toLowerCase();
    
        const veiculosFiltrados = dadosDosveiculos.filter(veiculo => {
            return veiculo.id.toLowerCase().includes(termoBuscaVeiculos) || veiculo.modelo.toLowerCase().includes(termoBuscaVeiculos);
        });
    
        console.log(veiculosFiltrados);
        populaTbodyBuscaVeiculos(veiculosFiltrados);
    });
})

const populaTbodyBuscaVeiculos = (dados)=>{
    let botoes={
        seleciona: {
            classe: "btn-primary text-white",
            texto: '<i class="fas fa-check" aria-hidden="true"></i>',
            callback: selecionaVeiculo
          }
        }
    popula_tbody_paginacao('paginacaoBuscaVeiculo','tbodyBuscaVeiculo',dados,botoes,1,10,false,false)
}

const preparaDadosTbodyBuscaVeiculo=(response)=>{
    let dadosBuscaVeiculos = []
    response.forEach(element => {
        dadosBuscaVeiculos.push({'id':element.placa,'modelo':element.modelo,'proprietario':element.proprietario_fk.parceiro_fk.raz_soc})
    });
    return dadosBuscaVeiculos
}

const selecionaVeiculo = async(element)=>{
    let response  = await connEndpoint('/operacional/read_veiculo_placa/', {'placa':element})
    document.getElementById('placaPrincipal').value = response.veiculo.placa
    document.getElementById('modeloPrincipal').value = response.veiculo.modelo
    document.getElementById('proprietarioPrincipal').value = response.veiculo.proprietario_fk.parceiro_fk.raz_soc
    closeModal()
}
