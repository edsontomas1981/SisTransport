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
            switch (response.status) {
                case 200:
                    alert('Dtc de numero ' + response.dados.id + ' salvo com sucesso !')
                    $('#numPed').val(response.dados.id)
                    break;
                case 210:
                    alert('Dtc ' + $('#numPed').val(response.dados.id) + ' alterado com sucesso !')
                    $('#numPed').val(response.dados.id)
                    break;
                case 400:
                    alert('Erro !')
                    break;
                default:
                    // code block
            }

        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}
