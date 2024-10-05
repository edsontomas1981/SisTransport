// Seleciona o campo de CNPJ/CPF do sacado no modal de fatura
let cnpjSacadoModalFatura = document.getElementById('cnpjSacadoFatura');

// Adiciona um ouvinte para o evento "blur" (quando o campo perde o foco)
cnpjSacadoModalFatura.addEventListener('blur', async () => {
    try {
      if(cnpjSacadoModalFatura.value.length != 0){
        // Verifica se o campo de CNPJ/CPF está preenchido corretamente
        let documento = cnpjSacadoModalFatura.value.trim();
        
        // Validando se é CPF ou CNPJ (CPF tem 11 dígitos, CNPJ tem 14)
        if (!documento || (documento.length !== 11 && documento.length !== 14)) {
            throw new Error('Documento inválido. Certifique-se de que é um CPF (11 dígitos) ou CNPJ (14 dígitos).');
        }

        // Obtém os dados do parceiro de forma assíncrona
        let dados = await dadosParceiro(documento);

        // Se os dados forem encontrados, preenche o campo da razão social
        if (dados) {
            document.getElementById('razaoSacadoFatura').value = dados.raz_soc;
        } 
        // Caso contrário, lança um erro para exibir uma mensagem ao usuário
        else {
            throw new Error('Documento não encontrado.');
        }
      }
    } catch (erro) {
        // Exibe uma mensagem de erro para o usuário
        msgErro(erro.message);
    }
});
