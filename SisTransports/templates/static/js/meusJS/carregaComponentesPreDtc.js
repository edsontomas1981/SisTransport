$(document).ready(function() {
    readRotas('rotaCotacao')
    capturaDadosNaRowClicada()
    // Adiciona um manipulador de evento de clique a todos os botões de classe "btn"
    idRowBotao()
});
    
var idRowBotao = ()=>{
    alert(1)
    // Adiciona o evento de clique aos botões nas linhas da tabela
    $('#tabela').on('click', 'button', function() {
        // Identifica qual botão foi clicado
        var botaoClicado = $(this).attr('id');
        
        // Identifica a ID da linha correspondente
        var idLinha = $(this).closest('tr').attr('id');
        
        // Exibe as informações na console para fins de depuração
        console.log('Botão clicado:', botaoClicado);
        console.log('ID da linha:', idLinha);
        
        // Adicione aqui o código para lidar com o clique no botão
        // por exemplo, para excluir ou editar a linha correspondente
    });

}