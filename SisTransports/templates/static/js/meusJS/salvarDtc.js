
$(document).keydown(function(event) {
    if (event.altKey && event.which === 88) {
        funSalvaDtc();
        e.preventDefault();
    }
});

function funSalvaDtc() {
    let url = '/preDtc/saveDtc/'
    let postData = $('form').serialize();
   
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            alert('DTC salvo com sucesso')
            $('#numPed').val(response.dados.id)
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}
$('#salvaDtc').on('click', function(e) {
    funSalvaDtc()
    e.preventDefault();
})