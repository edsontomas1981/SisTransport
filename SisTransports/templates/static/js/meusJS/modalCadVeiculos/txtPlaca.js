let placa = document.getElementById('placaProprietario')

placa.addEventListener('blur',async ()=>{
    let data = {'placa':placa.value}
    let conexao = new Conexao('/operacional/read_veiculo_placa/', data);
    try {
        const result = await conexao.sendPostRequest();
        populaVeiculo(result)
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
})

const populaVeiculo = (dados)=>{
   
    document.getElementById('numeroFrota').value = dados.veiculo.numero_frota
    document.getElementById('numeroRastreador').value = dados.veiculo.numero_rastreador
    document.getElementById('renavam').value = dados.veiculo.renavam
    document.getElementById('chassisVeiculo').value = dados.veiculo.chassi
    document.getElementById('tipoCombustivel').value = dados.veiculo.tipo_combustivel_fk.id
    document.getElementById('marcaVeiculo').value = dados.veiculo.marca_fk.id
    document.getElementById('modeloVeiculo').value =  dados.veiculo.modelo
    document.getElementById('corVeiculo').value = dados.veiculo.cor
    document.getElementById('cnpjProprietario').value = dados.veiculo.proprietario_fk.parceiro_fk.cnpj_cpf
    document.getElementById('nomeProprietario').value = dados.veiculo.proprietario_fk.parceiro_fk.raz_soc
    document.getElementById('tipoVeiculo').value = dados.veiculo.tipo_veiculo_fk.id
    document.getElementById('tipoCarroceria').value = dados.veiculo.tipo_carroceria_fk.id
    document.getElementById('anoFabMod').value = dados.veiculo.ano
    document.getElementById('cidadeVeiculo').value = dados.veiculo.cidade
    document.getElementById('ufVeiculo').value = dados.veiculo.uf
    document.getElementById('tara').value = dados.veiculo.tara
    document.getElementById('capacidadeKg').value = dados.veiculo.capacidade_kg
    document.getElementById('capacidadeCubica').value = dados.veiculo.capacidade_cubica
    
}

const limpaVeiculo  = ()=>{

    document.getElementById('placaProprietario').value = ''
    document.getElementById('numeroFrota').value = ''
    document.getElementById('numeroRastreador').value = ''
    document.getElementById('renavam').value = ''
    document.getElementById('chassisVeiculo').value = ''
    document.getElementById('tipoCombustivel').value = ''
    document.getElementById('marcaVeiculo').value = ''
    document.getElementById('modeloVeiculo').value = ''
    document.getElementById('corVeiculo').value = ''
    document.getElementById('cnpjProprietario').value = ''
    document.getElementById('nomeProprietario').value = ''
    document.getElementById('tipoVeiculo').value = ''
    document.getElementById('tipoCarroceria').value = ''
    document.getElementById('anoFabMod').value = ''
    document.getElementById('cidadeVeiculo').value = ''
    document.getElementById('ufVeiculo').value = ''
    document.getElementById('tara').value = ''
    document.getElementById('capacidadeKg').value = ''
    document.getElementById('capacidadeCubica').value = ''

}

document.getElementById('btnCloseVeiculo').addEventListener('click',()=>{
    limpaVeiculo()
})

document.getElementById('btnLimpaVeiculo').addEventListener('click',()=>{
    limpaVeiculo()
})

function transformToUpperCase(inputId) {
    var input = document.getElementById(inputId);
    if (input) {
      input.value = input.value.toUpperCase();
    }
}