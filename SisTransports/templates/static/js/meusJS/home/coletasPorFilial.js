

var areaData = {
    labels: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
    datasets: [
    {
        data: [10, 20, 15, 40, 35, 60, 20, 80, 90, 70, 90, 120],
        borderColor: [
        '#4747A1'
        ],
        borderWidth: 2,
        fill: false,
        label: "Orders"
    },
    {
        data: [11, 45, 31, 57, 31, 49, 25, 81, 50, 21, 90, 121],
        borderColor: [
        '#F09397'
        ],
        borderWidth: 2,
        fill: false,
        label: "Downloads"
    },
    {
        data: [12, 42, 20, 98, 52, 80, 72, 82, 45, 50, 80, 122],
        borderColor: [
        '#F09498'
        ],
        borderWidth: 2,
        fill: false,
        label: "Downloads"
    },
    {
        data: [13, 44, 89, 87, 30, 63, 49, 90, 89, 10, 50, 12],
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

