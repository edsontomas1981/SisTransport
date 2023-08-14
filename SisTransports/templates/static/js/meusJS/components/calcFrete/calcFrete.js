const getTotaisNf = async () => {
    let vlrNf = 0;
    let vols = 0;
    let peso = 0;
    let m3 = 0;
    let idDtc = $('#numDtc').val();
    if (idDtc) {
        let response = await loadNfs(); // Certifique-se de que loadNfs() retorna a resposta completa
        let nfs = response.nfs; // Acesso à propriedade "nfs" das NFS
        nfs.forEach(nf => {
            vlrNf += parseFloat(nf.valor_nf);
            vols += parseInt(nf.volume);
            peso += parseFloat(nf.peso);
            m3 += parseFloat(nf.m3);
        });
        let totais = {'vlrNf': vlrNf.toFixed(2),
                    'volumes':vols,
                    'peso':peso,
                    'm3':m3}
        populaTotaisNfs(totais)
    }
};

const populaTotaisNfs=(totais)=>{
    let rowTotais = document.getElementById('totaisNfs')
    rowTotais.innerHTML=`<td>${totais.volumes}</td>
                        <td>${totais.peso}</td>
                        <td>${totais.m3}</td>
                        <td>${null}</td>
                        <td>R$ ${totais.vlrNf}</td>`
}


