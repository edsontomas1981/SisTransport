const populaNumNfs = async ()=>{
    let nfs = await loadNfs()
    let nfCte = document.getElementById('nfCte')
    nfCte.value = geraTextoNf(nfs)
}