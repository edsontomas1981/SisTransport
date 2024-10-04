let btnBuscaParceiroModalFatura = document.getElementById('btnBuscaParceiroModalFatura')


btnBuscaParceiroModalFatura.addEventListener('click',()=>{
    cnpjBuscaParceiro = document.getElementById('cnpjSacadoFatura')
    razaoParceiro = document.getElementById('razaoSacadoFatura')
    openModal('mdlBuscaParceiro')
})
