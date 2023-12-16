const carregaDestino = async ()=>{
    let cidadeDest = document.getElementById('cidadeDest')
    let ufDest = document.getElementById('ufDest')
    let destinoCte = document.getElementById('destinoCte')

    destinoCte.value = cidadeDest.value + '-' + ufDest.value

    
}

