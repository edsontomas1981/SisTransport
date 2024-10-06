let btnBuscaParceiroModalFatura = document.getElementById('btnBuscaParceiroModalFatura')


btnBuscaParceiroModalFatura.addEventListener('click',()=>{
    cnpjBuscaParceiro = document.getElementById('cnpjSacadoFatura')
    razaoBuscaParceiro = document.getElementById('razaoSacadoFatura')
    openModal('mdlBuscaParceiro')
})
