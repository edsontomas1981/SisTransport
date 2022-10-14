function identificaRowBotao(){
    var tr = document.querySelectorAll('tr');
        tr.forEach((e) => {
            e.addEventListener('click', acaoNaRow);
        });

}
function acaoNaRow(e){
    e.currentTarget.id
}

function identificaBotao(e) {
    botao=e.currentTarget.id;
    identificaRowBotao(e)
}
