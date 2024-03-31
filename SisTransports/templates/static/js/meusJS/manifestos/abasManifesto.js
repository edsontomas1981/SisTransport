    function verificarCondicoes() {
        // Verificar suas condições aqui
        let numManifesto = document.getElementById('spanNumManifesto').textContent
        return true; // Retorne true se as condições forem atendidas, caso contrário, retorne false    
    }
document.getElementById('pills-pagamentos-tab').addEventListener('click',()=>{
    // Adicionar ouvinte de evento apenas se as condições forem atendidas
    if (verificarCondicoes()) {
        document.getElementById('pills-pagamentos-tab').addEventListener('shown.bs.tab', function() {
            somaContrato()
            // Coloque aqui o código que você deseja executar quando a aba for carregada
        });
    } else {
        // Se as condições não forem atendidas, desabilitar a aba
        document.getElementById('pills-pagamentos-tab').classList.add('disabled');
        // Ou ocultar a aba
        // document.getElementById('pills-pagamentos').style.display = 'none';
    }
})

