const somaContrato = ()=>{
    let creditos = somarValoresFormulario('credito')
    let debitos = somarValoresFormulario('debito')

    document.getElementById('freteBruto').value=creditos
    document.getElementById('totalDescontos').value=debitos
    document.getElementById('freteAPagar').value=creditos-debitos
}

function somarValoresFormulario(classeFormulario) {
    let total = 0;
    const campos = document.querySelectorAll('.' + classeFormulario);
    campos.forEach(function(campo) {
        if (!isNaN(parseFloat(campo.value))) {
            total += parseFloat(campo.value);
        }
    });
    return total;
}


