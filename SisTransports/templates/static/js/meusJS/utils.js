function GetLinhasClicadas(callback){

    GetLinhasClicadas.prototype.getLinha = function (){
        var tr = document.querySelectorAll('tr');
        tr.forEach((e) => {
            e.addEventListener('click',this.acaoNaRow);
            });
    }

    GetLinhasClicadas.prototype.acaoNaRow(e) = function(e){
        callback(e.currentTarget.id)
        
    }
}
// function GetIdLinhaSelecionada(){

//     GetIdLinhaSelecionada.prototype.identificaLinhaSelecionada(e){
//         this.idTr=e.currentTarget.id;
//         alert('Id Linha :  : 3 '+ this.idTr)
//         this.idDaLinha=this.idTr
//     };

//     set idDaLinha(idLinha){
//         this.linhaNum=idLinha
//     }

//     get idLinha() {
//         var tr = document.querySelectorAll('tr');
//         tr.forEach((e) => {
//             e.addEventListener('click',this.identificaLinhaSelecionada);
//             });
//         return this.idDaLinha
//     }

// }

// function identificaRowBotao(){
//     var tr = document.querySelectorAll('tr');
//         tr.forEach((e) => {
//             e.addEventListener('click', acaoNaRow);
//         });

// }
// function acaoNaRow(e){
// alert(e.currentTarget.id)
// }

// function identificaBotao(e) {
//     botao=e.currentTarget.id;
//     identificaRowBotao(e)
// }
