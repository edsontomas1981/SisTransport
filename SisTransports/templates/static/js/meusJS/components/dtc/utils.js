// Controla o comportamento das tabs
let tabs = document.querySelectorAll('.nav-link');

// Adiciona um ouvinte de evento para cada guia
tabs.forEach(tab => {
  tab.addEventListener('click', async () => {
      // Obtém o ID do conteúdo da guia associado
      let tabContentId = tab.getAttribute('aria-controls');
      
      switch (tabContentId) {
          case 'pills-dtc':
            break;
          case 'pills-coleta':
            break;  
          case 'pills-cotacao':
            break;
          case 'pills-nf':
              limpaNf();
              break;
          case 'pills-calculoFrete':
            calculoSemDiv()
            let nf = await loadNfs();
            console.log(nf)
            if(nf){
                if (nf.nfs.length > 0) {
                    await preDtcSemCalculo() 
                    populaTotaisNaTabelaNfCte();
                } else {
                    preDtcSemNf()
                    break;
                }
                }else{
                    preDtcSemNf()
                    break;
            }
             
            case 'pills-rastreamento':
                break;
            default:
              break;
      }
  });
});

