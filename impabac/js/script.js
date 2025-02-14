const data = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
        {
            label: 'Nombre de Candidats',
            data: [767600, 755900, 760800, 732800, 729400, 739500, 778614],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
        },
        {
            label: 'Nombre de Bacheliers',
            data: [677300, 665900, 723000, 687200, 664300, 672400, 684157],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1
        }
    ]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Nombre de Candidats et de Bacheliers au Baccalauréat (2018-2024)',
                font: {
                    size: 18,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 20
                },
                align: 'center'
            }
        }
    }
};

const ctx = document.getElementById('bacChart').getContext('2d');
new Chart(ctx, config);

const tauxReussiteData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
        {
            label: 'Taux de Réussite Global (%)',
            data: [88.2, 88.1, 95, 93.8, 91.1, 90.9, 91.4],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
        }
    ]
};

const config2 = {
    type: 'bar',
    data: tauxReussiteData,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Taux de Réussite Global (%) (2018-2024)',
                font: {
                    size: 18,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 20
                },
                align: 'center'
            }
        },
        scales: {
            y: {
                min: 80,
                max: 100,
                ticks: {
                    stepSize: 2
                }
            }
        }
    }
};

const ctx2 = document.getElementById('secondChart').getContext('2d');
new Chart(ctx2, config2);

const tauxParFiliereData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
        {
            label: 'Général (%)',
            data: [91, 91.6, 97.6, 97.6, 96.1, 95.7, 96.1],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.3
        },
        {
            label: 'Technologique (%)',
            data: [88.8, 88.8, 95, 94, 90.6, 89.8, 90.3],
            borderColor: 'rgb(255, 206, 86)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.3
        },
        {
            label: 'Professionnel (%)',
            data: [82.8, 82.8, 90.4, 86.7, 82.3, 82.7, 83.4],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.3
        }
    ]
};

const config3 = {
    type: 'line',
    data: tauxParFiliereData,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Taux de Réussite par Filière (%) (2018-2024)',
                font: {
                    size: 18,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 20
                },
                align: 'center'
            }
        },
        scales: {
            y: {
                min: 75,
                max: 100,
                ticks: {
                    stepSize: 2
                }
            }
        }
    }
};

const ctx3 = document.getElementById('thirdChart').getContext('2d');
new Chart(ctx3, config3);
