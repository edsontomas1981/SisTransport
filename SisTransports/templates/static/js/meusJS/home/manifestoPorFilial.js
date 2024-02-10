var manif = {
    labels: ['Atraso', 'Em Dia'],
    datasets: [{
        data: [10, 90], // Valores percentuais ou absolutos para cada fatia
        backgroundColor: ['#FF4747','#57B657'], // Cores das fatias
        borderColor: 'white', // Defina a cor da borda desejada
        borderWidth: 1,

        // ... outras configurações do conjunto de dados
    }]
};

document.addEventListener('DOMContentLoaded', function() {
   // Obtém o contexto do canvas
   var ctx = document.getElementById('manifPorFilial').getContext('2d');
    // Configurações do gráfico
    var options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        title: {
            display: true,
            text: 'Coletas',
            fontSize:16,
            fontColor: 'white',

        },
        legend: {
            position: 'right' // Define a posição da legenda para 'direita'
        },
    };

    // Cria o gráfico
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: manif,
        options: options
    });
})

