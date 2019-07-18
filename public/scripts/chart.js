let ctx = document.getElementById('chart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1,2,4,5,6],
        datasets: [{
            data: [0, 200, 300, 1200, 1225, 1399],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
            steppedLine: true,
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
