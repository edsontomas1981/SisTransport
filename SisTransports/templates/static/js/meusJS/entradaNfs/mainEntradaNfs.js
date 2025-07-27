document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('mdlEntradaNfs');
  modal.addEventListener('shown.bs.modal', () => {
      carregaSelect('selectUfEntradaNfs', estadosBrasileiros, 'estadoId', 'sigla', 'Selecione a uf');
  });

  let cnpjRemetenteEntradaNfs = document.getElementById('cnpjRemetenteEntradaNfs');
  let nomeRemetenteEntradaNfs = document.getElementById('nomeRemetenteEntradaNfs');
  let cnpjDestinatarioEntradaNfs = document.getElementById('cnpjDestinatarioEntradaNfs');
  let nomeDestinatarioEntradaNfs = document.getElementById('nomeDestinatarioEntradaNfs');

  cnpjDestinatarioEntradaNfs.addEventListener('blur', async function() {
    await carregaParceiroMdl(cnpjDestinatarioEntradaNfs.value, 'cnpjDestinatarioEntradaNfs', 'nomeDestinatarioEntradaNfs',null,null,null,"selectCidadeEntradaNfs","selectUfEntradaNfs",null,null);
  })
  cnpjRemetenteEntradaNfs.addEventListener('blur', async function() {
    await carregaParceiroMdl(cnpjRemetenteEntradaNfs.value, 'cnpjRemetenteEntradaNfs', 'nomeRemetenteEntradaNfs');
  })


});

let chaveDeAcessoEntradaNfs = document.getElementById('idChaveDeAcessoEntradaNfs');

chaveDeAcessoEntradaNfs.addEventListener('blur', async function() {
  let chave = await parseChaveAcesso(chaveDeAcessoEntradaNfs.value);
  cnpjRemetenteEntradaNfs.value = chave.cnpj;
  triggerById('cnpjRemetenteEntradaNfs', 'blur');
})



 
