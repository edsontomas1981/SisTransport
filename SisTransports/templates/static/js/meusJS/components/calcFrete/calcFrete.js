const populaTotaisNaTabelaNfCte = async () => {
    let totais = await calculaTotalNfs()
    populaTotaisNfs(totais)
};
const calculaTotalNfs = async ()=>{
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

        return totais
    }
}

const existemNfs=async()=>{
    let nf = await loadNfs();
    let existeNf = false
    if(nf.nfs.length !== 0){
        existeNf = true
    }
    return existeNf
}

const populaTotaisNfs=(totais)=>{
    let rowTotais = document.getElementById('totaisNfs')
    rowTotais.innerHTML=`<td>${totais.volumes}</td>
                        <td>${totais.peso}</td>
                        <td>${totais.m3}</td>
                        <td>R$ ${totais.vlrNf}</td>`
}
const populaCamposFrete=async (response)=>{
        loadDivOrigemCte(response.dtc.rota.origemCidade+"-"+response.dtc.rota.origemUf)
        loadDivDestinoCte(response.dtc.rota.destinoCidade+"-"+response.dtc.rota.destinoUf)
        loadDivEmissoraCte()
        loadDivTipoCte()
        loadDivTipoCalcCte()
        loadDivSelecionaTabelaCte()
        loadDivCfopCte()
        loadDivReDespachanteCte()
        loadDivObsCte()
        populaTabelaTotaisCte()
        loadDivFretePesoCte()
        loadDivFreteValorCte()
        loadDivAdvalorCte()
        loadDivGrisCte()
        loadDivPedagioCte()
        loadDivDespachoCte()
        loadDivOutrosCte()
        loadDivIcmsInclusoCte()
        loadDivBaseCalculoCte()
        loadDivAliquotaCte()
        loadDivIcmsNfCte()
        loadDivTotalFreteCte()
        loadDivBtnCalcCte()
}

const bloquearCamposCalcFrete=()=> {
    const campos = document.querySelectorAll('.form-control');
    campos.forEach(campo => {
        campo.setAttribute('disabled', 'true');
    });
    document.getElementById('icmsInclusoNf').setAttribute('disabled', 'true');
    document.getElementById('tipoCalc').setAttribute('disabled', 'true');
    document.getElementById('selecionaTabelaCte').setAttribute('disabled', 'true');
}

const desbloquearCamposCalcFrete=()=> {
    const campos = document.querySelectorAll('.form-control');
    campos.forEach(campo => {
        campo.removeAttribute('disabled');
    });

    document.getElementById('icmsInclusoNf').removeAttribute('disabled');
    document.getElementById('tipoCalc').removeAttribute('disabled');
    document.getElementById('selecionaTabelaCte').removeAttribute('disabled');
}

const geraDadosCalcCte=()=> {
    const dicionario = {
        tipoCalc: document.getElementById('tipoCalc').value,
        selecionaTabelaCte: document.getElementById('selecionaTabelaCte').value,
        icmsInclusoNf: document.getElementById('icmsInclusoNf').checked,
        fretePesoNf: document.getElementById('fretePesoNf').value,
        freteValorNf: document.getElementById('freteValorNf').value,
        advalorNf: document.getElementById('advalorNf').value,
        coletaNf: document.getElementById('coletaNf').value,
        grisNf: document.getElementById('grisNf').value,
        pedagioNf: document.getElementById('pedagioNf').value,
        despachoNf: document.getElementById('despachoNf').value,
        outrosNf: document.getElementById('outrosNf').value,
        baseCalculoNf: document.getElementById('baseCalculoNf').value,
        aliquotaNf: document.getElementById('aliquotaNf').value,
        icmsNf: document.getElementById('icmsNf').value,
        freteTotalNf: document.getElementById('freteTotalNf').value
    };

    // Realize validações
    const camposObrigatorios = ['tipoCalc', 'fretePesoNf', 'freteValorNf', 'advalorNf', 'coletaNf', 'grisNf', 'pedagioNf', 'despachoNf', 'outrosNf'];
    const mensagensErro = {};

    camposObrigatorios.forEach(campo => {
        if (!dicionario[campo] || dicionario[campo].trim() === '') {
            mensagensErro[campo] = 'Este campo é obrigatório.';
        }
    });

    // Mais validações personalizadas aqui, se necessário

    if (Object.keys(mensagensErro).length > 0) {
        // Trate os erros de validação aqui, como exibir mensagens para o usuário
        console.log('Erros de validação:', mensagensErro);
        return null;
    }

    return dicionario;
}





