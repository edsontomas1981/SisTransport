// Função para abrir e fechar o off-canvas
const abrirPainelIntinerario = () => {
    const offcanvas = document.getElementById("offcanvas");
    offcanvas.classList.add("open");  // Abre o painel, adicionando a classe 'open'
};

const fecharPainelIntinerario = () => {
    const offcanvas = document.getElementById("offcanvas");
    offcanvas.classList.remove("open");  // Fecha o painel, removendo a classe 'open'
}; 