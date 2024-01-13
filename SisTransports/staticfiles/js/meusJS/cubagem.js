var textResultadoM3

$('#btnVolumes').on('click', function(e) {
    let altura = parseFloat($('#altura').val().replace(",", "."));
    let largura = parseFloat($('#largura').val().replace(",", "."));
    let comprimento = $('#comprimento').val().replace(",", ".");
    let vol = parseFloat($('#vol').val());
    let memoriaM3 = parseFloat($('#totalM3').val().replace(",", "."))
    let m3 = altura * largura * comprimento * vol + memoriaM3
    $('#totalM3').val(m3.toFixed(3))
    $('#altura').focus()
    limpaM3();
    e.preventDefault();
});

$('#btnVolumes').on('blur', function(e) {
    $('#altura').focus()
    e.preventDefault();
});

$('#btnSalvarM3').on('click', function(e) {
    salvarM3();
});

$('#btnM3Cotacao').on('click', function(e) {
    textResultadoM3 = 'resultM3Cotacao'
});

$('#btnM3Coleta').on('click', function(e) {
    textResultadoM3 = 'resultM3'
});


$('#totalM3').on('blur', function(e) {
    e.preventDefault();
});

$('#fechar').on('click', function(e) {
    descartar();
    fecharMdlM3();
});

const fecharMdlM3 = ()=>{
    $('#totalM3').val(0)
    textResultadoM3 = ''
}

function limpaM3() {
    $('.m3').val('')
}

$('#modalCalcM3').on('keypress', function(e) {
    salvaComTecla(e)
});


function salvarM3() {
    $("#"+textResultadoM3).val($('#totalM3').val())
    limpaM3()
    $('#totalM3').val(0)
    textResultadoM3 = ''
    $('#modalCalcM3').modal('hide')
}

function descartar() {
    limpaM3()
    $('#totalM3').val(0)
fecharMdlM3();
}


function salvaComTecla(e) {
    var tecla = e.keyCode;
    if (tecla === 115 || tecla === 83) {
        salvarM3();
    }
    if (tecla === 100 || tecla === 68) {
        descartar();
    }
}




