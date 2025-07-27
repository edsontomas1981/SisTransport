 document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('mdlCidadesAtendidas');

  modal.addEventListener('shown.bs.modal', async () => {
    const apiService = new ApiService();
    let url = "/enderecos/filial_responsavel/";
    let dados = {};
    let resultadoGet = await apiService.getData(url);
    carregaSelect('selectFilialMdlCidadesAtendidas', resultadoGet.data,'id', 'filial_responsavel',  'Selecione a filial responsável');
    carregaSelect('selectUfMdlCidadeAtendida', estadosBrasileiros,'estadoId','sigla','Selecione a UF');

 });
});

let selectUfMdlCidadeAtendida = document.getElementById('selectUfMdlCidadeAtendida');
selectUfMdlCidadeAtendida.addEventListener('change', async function() {
  // Certifique-se de que 'botoes' esteja no escopo correto
  let botoesCidadesAtendidas = {
    addFilial: {
      classe: "btn-primary text-white",
      texto: '<i class="fa fa-check" aria-hidden="true"></i>',
      callback: teste
    }
  };

  let apiService = new ApiService();
  let url = `/enderecos/readMunicipio/`;
  let dados = {uf: pegarTextoSelect('selectUfMdlCidadeAtendida')};
  let response = await apiService.postData(url, dados);
  console.log(response.municipios);
  popula_tbody_pag('idDivNavCidadesAtendidas', 'idTbodyCidadesAtendidas', response.municipios, botoesCidadesAtendidas,1,10,false,false );

  function teste(id) {
    alert(id)
  }

})
