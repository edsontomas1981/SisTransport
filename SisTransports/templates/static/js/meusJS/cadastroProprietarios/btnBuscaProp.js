let btnModalParceiros = document.getElementById('btnBuscaProp')
let modalCadProp = document.getElementById('cadastroProprietario')
let modalCadParceiros = document.getElementById('mdlCadParceiros');
let flagModal = false
let btnFechaModalParceiro = document.getElementById('btnClose')

btnFechaModalParceiro.addEventListener('click',()=>{
    console.log(flagModal)
    if (flagModal){
        modalCadProp.style.display = 'block';
    }
})

btnModalParceiros.addEventListener('click',()=>{
    $('#mdlCadParceiros').show();
    modalCadProp.style.display = 'none';
    flagModal = true
}) 