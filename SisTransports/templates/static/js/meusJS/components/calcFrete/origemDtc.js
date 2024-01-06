const populaOrigemDtc = async()=>{
    var origemCte = document.getElementById('origemCte');
    let ufRem = document.getElementById('ufRem')
    let cidadeRem = document.getElementById('cidadeRem')

    while (origemCte.firstChild) {
        origemCte.removeChild(origemCte.firstChild);
    }

    // Array de opções que você deseja adicionar
    var opcoes = ["Cidade do Emissor",(cidadeRem.value + '-' + ufRem.value) ];

    // Itera sobre o array e adiciona cada opção à selectbox
    for (var i = 0; i < opcoes.length; i++) {
        var option = document.createElement('option');
        option.value = i; // Valor da opção (pode ser qualquer valor que você desejar)
        option.text = opcoes[i]; // Texto visível da opção
        origemCte.appendChild(option); // Adiciona a opção à selectbox
    }
}


