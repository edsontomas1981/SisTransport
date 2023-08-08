const gereDadosNf = () => {
    let dados = {};
    $('#formNf :input').each(function() {
        const id = $(this).attr('id');
        
        if ($(this).prop('required') && $(this).val() === '') {
            msgVazioNf($(this).data('nome'))
            dados=false
            return dados; // ou trate o erro de outra forma
        }
        dados[id] = $(this).val();
    });

    return dados;
}


const msgVazioNf = (campo) => {
    Swal.fire({
        icon: 'error',
        title: 'Campo Obrigatório',
        text: `O campo ${campo} é obrigatório e precisa ser preenchido.`,
        showConfirmButton: true
    });
}




