let btnBuscaParceiroModalFatura = document.getElementById('btnBuscaParceiroModalFatura')


btnBuscaParceiroModalFatura.addEventListener('click',()=>{
    cnpjBuscaParceiro = document.getElementById('cnpjSacadoFatura')
    razaoBuscaParceiro = document.getElementById('razaoSacadoFatura')
    limpaModalParceiros()
    openModal('mdlBuscaParceiro')
})

const limpaModalParceiros = ()=>{
    document.getElementById('nomeOuCnpjParceiro').value = ''
    document.getElementById('tbodyModalParceiros').innerHTML = ''
}
