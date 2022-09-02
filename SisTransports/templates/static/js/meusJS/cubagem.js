$('#btnVolumes').on('click', function(e){
    console.log('volumes')
    let altura=$('#altura').val().replace(',','.');
    let largura=$('#largura').val().replace(',','.');
    let comprimento=$('#comprimento').val().replace(',','.');
    let volumes=$('#volumes').val().replace(',','.');
    let totalM3=parseFloat(altura*largura*comprimento*volumes)
    console.log(totalM3)  
    $('#totalM3').val(totalM3)    
    e.preventDefault();
});