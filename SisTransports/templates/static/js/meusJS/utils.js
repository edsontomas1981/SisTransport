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
