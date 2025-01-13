        // Função para obter os parâmetros da URL
        function getQueryParameter(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        // Captura o parâmetro 'query' da URL
        const query = getQueryParameter('query');

        // Atualiza o título com o termo buscado
        const tituloBusca = document.getElementById('titulo-busca');
        tituloBusca.textContent = `Resultados para: ${query}`;

        // Faz uma requisição ao backend para obter os resultados
        fetch(`/buscar-resultado/${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar resultados.');
                }
                return response.json();
            })
            .then(data => {
                const listaResultados = document.getElementById('lista-resultados');
                if (data.resultados.length > 0) {
                    data.resultados.forEach(resultado => {
                        const li = document.createElement('li');
                        li.textContent = resultado;
                        listaResultados.appendChild(li);
                    });
                } else {
                    listaResultados.innerHTML = '<li>Nenhum resultado encontrado.</li>';
                }
            })
            .catch(error => {
                console.error(error);
                const listaResultados = document.getElementById('lista-resultados');
                listaResultados.innerHTML = '<li>Erro ao carregar os resultados.</li>';
            });