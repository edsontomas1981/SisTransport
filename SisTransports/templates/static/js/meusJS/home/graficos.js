// // Define os dados do gráfico
// var data = {
//     labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
//     datasets: [{
//         label: 'Matriz',
//         data: [12, 19, 3, 5, 2, 0, 0, 0, 0, 0, 0, 0],
//         // backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'red',
//         borderWidth: 3,
//         fill: false, // Desativa o preenchimento da área
//         context:{'teste':'teste3'},
//     },
//     {
//         label: 'Filial 1 ',
//         data: [0, 0, 0, 0, 0, 5, 8, 12, 15, 10, 8, 4], // Dados fictícios, substitua pelos seus dados
//         // backgroundColor: 'rgba(255, 99, 132, 0.2)', // Cor de fundo
//         borderColor: 'blue', // Cor da borda
//         borderWidth: 3,
//         context:{'teste':'teste3'},
//         fill: false // Desativa o preenchimento da área
//     },
//     {
//     label: 'Filial 1 ',
//     data: [0, 0, 0, 0, 0, 10, 16, 24, 30, 20, 4, 2], // Dados fictícios, substitua pelos seus dados
//     // backgroundColor: 'rgba(255, 99, 132, 0.2)', // Cor de fundo
//     borderColor: 'green', // Cor da borda
//     borderWidth: 3,
//     context:{'teste':'teste3'},
//     fill: false // Desativa o preenchimento da área
//     }],
    
// };

// document.addEventListener('DOMContentLoaded', function() {
//    // Obtém o contexto do canvas
//    var ctx = document.getElementById('entregasNoPrazoPorFilial').getContext('2d');
//     // Configurações do gráfico
//     var options = {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         },
//         title: {
//             display: true,
//             text: 'Desempenho de Entregas por Filial'
//         },
//         legend: {
//             position: 'right' // Define a posição da legenda para 'direita'
//         },
//     };

//     // Cria o gráfico
//     var myChart = new Chart(ctx, {
//         type: 'line',
//         data: data,
//         options: options
//     });



// })

