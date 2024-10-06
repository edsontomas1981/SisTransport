let cnpjRelatFaturaBuscaFatura = document.getElementById('cnpjRelatFaturaBuscaFatura')
let razaoRelatFaturaBuscaFatura = document.getElementById('razaoRelatFaturaBuscaFatura')
let relatoriodeFaturasBuscaParceiro = document.getElementById('relatoriodeFaturasBuscaParceiro')

relatoriodeFaturasBuscaParceiro.addEventListener('click',()=>{
    cnpjBuscaParceiro = cnpjRelatFaturaBuscaFatura
    razaoBuscaParceiro = razaoRelatFaturaBuscaFatura
    openModal('mdlBuscaParceiro')
})

