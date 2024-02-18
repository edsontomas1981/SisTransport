const consignatario = new Parceiro($('#cnpjConsig').val(),'Consig');
const remetente = new Parceiro($('#cnpjRem').val(),'Rem');
const destinatario = new Parceiro($('#cnpjDest').val(),'Dest');
const parceiroMdl = new Parceiro ($('#cnpjMdl').val(),'Mdl')
// Remetente
$('#cnpjRem').on('blur', function(e) {
    if($('#cnpjRem').val()!=='' ){
        remetente.cnpj=$('#cnpjRem').val()
        remetente.readParceiro()
    }
});

$('#btnLimpaCnpjRem').on('click', function(e) {
    remetente.limparCamposDtc()
    remetente.limpaDados()
    e.preventDefault();
});

// Destinatario
$('#cnpjDest').on('blur', function(e) {
    if($('#cnpjDest').val()!=='' ){
        destinatario.cnpj=$('#cnpjDest').val()
        destinatario.readParceiro()
    }
});

$('#btnLimpaCnpjDest').on('click', function(e) {
    destinatario.limparCamposDtc()
    destinatario.limpaDados()
    e.preventDefault();
});


// Consignatario
$('#cnpjConsig').on('blur', function(e) {
    if($('#cnpjConsig').val()!=='' ){
        consignatario.cnpj=$('#cnpjConsig').val()
        consignatario.readParceiro()
    }
});

$('#btnLimpaCnpjConsig').on('click', function(e) {
    consignatario.limparCamposDtc()
    consignatario.limpaDados()
    e.preventDefault();
});


// Modal
$('#btnBuscaCnpj').on('click', async (e)=> {
    parceiroMdl.cnpj=$('#cnpjMdl').val()
    if (validateDocumentNumber($('#cnpjMdl').val()))
    {
        await parceiroMdl.getWsParceiro();
        // parceiroMdl.carregaParceiroMdl()
    }else{
        alert("CNPJ inválido");
    }
    e.preventDefault();
})

$('#salvaParceiro').on('click',async (e)=>{
    if (validateDocumentNumber($('#cnpjMdl').val()))
    {
        parceiroMdl.createParceiro();
    }else{
        alert("CNPJ inválido");
    }
})


$('#cnpjMdl').on('blur',function(e){
    if($('#cnpjMdl').val()!=='' ){
        if (validateDocumentNumber($('#cnpjMdl').val()))
        {
            parceiroMdl.cnpj=$('#cnpjMdl').val()
            parceiroMdl.carregaParceiroMdl()
        }else{
            alert("CNPJ inválido");
        }
    }
});


// Botoes fechar
$('#btnFechar').on('click', function(e) {
    $('#mdlCadParceiros').modal('hide'); 
    closeModal();
    e.preventDefault();
})

// $('#btnClose').on('click', function(e) {
//     $('#mdlCadParceiros').modal('hide'); 
//     closeModal();
//     e.preventDefault();
// })

// funcoes diversas



$('#btnLimpaParceiros').on('click',function(e){
    limpaModalParceiroCnpj()
    e.preventDefault()
})

function limpaModalParceiroCnpj() {
    $('#idParceiro').val('')
    $('#idEndereco').val('')
    $('#cnpjMdl').val('');
    $('#insc_estMdl').val('');
    $('#razaoMdl').val('');
    $('#fantasiaMdl').val('');
    $('#obsMdl').val('');
    $('#cepMdl').val('');
    $('#ruaMdl').val('');
    $('#numeroMdl').val('');
    $('#complementoMdl').val('');
    $('#bairroMdl').val('');
    $('#cidadeMdl').val('');
    $('#ufMdl').val('');
    $('#relatorioTabelaParceiro tbody tr').remove();
    limpaTabelaContatos();  
}

function closeModal() {
    // Limpa os campos
    $('#cnpj').val('');
    $('#idParceiro').val('');
    $('#collapseOne').removeClass('show');
    $('#collapseTwo').removeClass('show');
    $('#collapseThree').removeClass('show');
    $('#comercial').removeClass('show');
    $('#mdlCadParceiros').modal('hide'); 
    limpaModalParceiroCnpj();
    limpaTabelaContatos();  
}



const validarDtc = () => {
    let rotas=document.getElementById('rotasDtc')
    let modalidade=document.getElementById('modalidadeFrete')
    let verificaCampos = []

    //Verifica se exite Parceiro selecionado para salvar o Dtc
    if (remetente.id || destinatario.id || consignatario.id){
        switch (true) {
            case remetente.id:
                alert('modalidade.selectedIndex=1')
                break;
            case destinatario.id:
                alert('modalidade.selectedIndex=2')
                break;
            case consignatario.id:
                alert('modalidade.selectedIndex=3')
                break;
        
            default:
                break;
        }
    }else{
        const msgFaltaParceiro = 'Por favor, informe ao menos um parceiro comercial. É importante preencher essa informação para prosseguir com a operação desejada. Obrigado!'
        verificaCampos.push(msgFaltaParceiro)
        }

        if (rotas.selectedIndex === 0 && modalidade.selectedIndex === 0){
          const msgPagRota='Por favor, escolha a rota e o pagador do frete antes de prosseguir.'
          verificaCampos.push(msgPagRota)
        }else{
            if(rotas.selectedIndex === 0){
                const msgRota='Por favor, escolha a rota antes de prosseguir.'
                verificaCampos.push(msgRota);
            }else if(modalidade.selectedIndex === 0){
                const msgPag='Por favor, escolha o pagador do frete antes de prosseguir.'
                verificaCampos.push(msgPag);
            }
        }
    return verificaCampos

}
