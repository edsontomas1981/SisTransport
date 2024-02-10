



// // Define os dados do gráfico
// var dataColetas = {
//     labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
//     datasets: [{
//         label: 'Matriz',
//         data: [24, 9, 5, 10, 1, 75, 192, 351, 8, 32, 89, 150],
//         // backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'red',
//         borderWidth: 3,
//         fill: false, // Desativa o preenchimento da área
//         context:{'teste':'teste3'},
//     },
//     {
//         label: 'Filial 1 ',
//         data: [48, 18, 10, 5,10, 150, 197, 322, 150, 100, 80, 40], // Dados fictícios, substitua pelos seus dados
//         // backgroundColor: 'rgba(255, 99, 132, 0.2)', // Cor de fundo
//         borderColor: 'blue', // Cor da borda
//         borderWidth: 3,
//         context:{'teste':'teste3'},
//         fill: false // Desativa o preenchimento da área
//     },
//     {
//     label: 'Filial 1 ',
//     data: [96, 36, 20, 10, 20, 20, 360, 48, 330, 150, 375, 250], // Dados fictícios, substitua pelos seus dados
//     // backgroundColor: 'rgba(255, 99, 132, 0.2)', // Cor de fundo
//     borderColor: 'green', // Cor da borda
//     borderWidth: 3,
//     context:{'teste':'teste3'},
//     fill: false // Desativa o preenchimento da área
//     }],
    
// };

var areaData = {
    labels: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
    datasets: [
    {
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        borderColor: [
        '#4747A1'
        ],
        borderWidth: 2,
        fill: false,
        label: "Orders"
    },
    {
        data: [11, 21, 31, 41, 51, 61, 71, 81, 91, 101, 111, 121],
        borderColor: [
        '#F09397'
        ],
        borderWidth: 2,
        fill: false,
        label: "Downloads"
    },
    {
        data: [12, 22, 32, 42, 52, 62, 72, 82, 92, 102, 112, 122],
        borderColor: [
        '#F09498'
        ],
        borderWidth: 2,
        fill: false,
        label: "Downloads"
    },
    {
        data: [13, 23, 33, 43, 53, 63, 73, 83, 93, 103, 113, 123],
        borderColor: [
        '#F01390'
        ],
        borderWidth: 2,
        fill: false,
        label: "Downloads"
    }
    ]
};
var areaOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
    filler: {
        propagate: false
    }
    },
    scales: {
    xAxes: [{
        display: true,
        ticks: {
        display: true,
        padding: 10,
        fontColor:"#6C7383"
        },
        gridLines: {
        display: false,
        drawBorder: false,
        color: 'transparent',
        zeroLineColor: '#eeeeee'
        }
    }],
    yAxes: [{
        display: true,
        ticks: {
        display: true,
        autoSkip: false,
        maxRotation: 0,
        // stepSize: 200,
        // min: 200,
        // max: 1200,
        padding: 18,
        fontColor:"#6C7383"
        },
        gridLines: {
        display: true,
        color:"#f2f2f2",
        drawBorder: false
        }
    }]
    },
    legend: {
    display: false
    },
    tooltips: {
    enabled: true
    },
    elements: {
    line: {
        tension: .35
    },
    point: {
        radius: 0
    }
    }
}

document.addEventListener('DOMContentLoaded', function() {
   // Obtém o contexto do canvas
   var ctx = document.getElementById('coletasPorFilial').getContext('2d');
    // Configurações do gráfico
    var options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        title: {
            display: true,
            text: 'Coletas por Filial',
            fontSize:16,
            fontColor: 'black',
        },
        legend: {
            position: 'right' // Define a posição da legenda para 'direita'
        },
    };

    // Cria o gráfico
    var myChart = new Chart(ctx, {
        type: 'line',
        data: areaData,
        options: areaOptions
    });



})

