document.getElementById('btnBuscarDocumentos').addEventListener('click',async function() {
  try {
		sessionStorage.removeItem('buscaResultados'); // Substitua 'chave' pelo nome do item
		const idDocumento = document.getElementById('documentoBusca').value;
		const apiService = new ApiService();
		const url = "/busca/";
		const resultado = await apiService.postData(url, {id_documento:idDocumento   });
		const data = await resultado;
        // Salva os resultados no sessionStorage
        sessionStorage.setItem('buscaResultados', JSON.stringify(data));

		window.location.href = '/resultado_busca/';
	} catch (error) {
		console.error(error);
	}
})