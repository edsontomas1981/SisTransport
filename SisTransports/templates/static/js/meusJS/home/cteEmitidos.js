// Define os dados do gráfico
var dataCtes = {
    labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    datasets: [{
        label: 'Matriz',
        data: [{x: 'Sales', y: 20}, {x: 'Revenue', y: 10}],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'white',
        borderWidth: 1,
        // fill: false, // Desativa o preenchimento da área
    },
    ],
};

document.addEventListener('DOMContentLoaded', function() {
   // Obtém o contexto do canvas
   var ctx = document.getElementById('ctesEmitidos').getContext('2d');
    // Configurações do gráfico
    var options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart'
          }
        }
    };
    // Cria o gráfico
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: dataCtes,
        options: options
    });
})

