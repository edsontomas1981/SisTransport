document.addEventListener('DOMContentLoaded', async() => {
    let response = await getRotas()
    populaRotaGeral(response,'rotasManifesto')
})