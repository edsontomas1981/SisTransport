let cnpjCadastro = document.getElementById('cnpjCadastroFiliais');
cnpjCadastro.addEventListener('blur', async () => {
    carregaParceiroMdl(cnpjCadastro.value, 'cnpjCadastroFiliais', 'nomeRazaoSocial','enderecoMdlFiliais',
                        'numeroMdlFiliais',null,'cidadeMdlFiliais','ufMdlFiliais','cepMdlFiliais',null);
})
