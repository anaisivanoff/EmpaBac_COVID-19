const data = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
        {
            label: 'Taux de réussite général (%)',
            data: [88, 89, 78, 96, 91, 98, 78],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: 'Taux de mention Très Bien (%)',
            data: [25, 26, 40, 42, 35, 22, 78],
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
        },
        {
            label: 'Taux de mention Bien (%)',
            data: [10, 12, 19, 27, 20, 45, 78],
            fill: false,
            borderColor: 'rgb(54, 162, 235)',
            tension: 0.1
        },
        {
            label: 'Taux de mention Assez Bien (%)',
            data: [29, 79, 95, 48, 33, 69, 78],
            fill: false,
            borderColor: 'rgb(255, 206, 86)',
            tension: 0.1
        }
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        animations: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
    }
};
const ctx = document.getElementById('bacChart').getContext('2d');
new Chart(ctx, config);

const labels = ['2018', '2019', '2020', '2021', '2023', '2024'];
const data2 = {
    labels: labels,
    datasets: [{
        label: 'Nombre total de candidats',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    }]
};

const config2 = {
    type: 'bar',
    data: data2,
    options: {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
    }
};
const ctx2 = document.getElementById('secondChart').getContext('2d');
new Chart(ctx2, config2);

const data3 = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
        {
            label: 'Taux de réussite général (%)',
            data: [88, 89, 78, 96, 91, 98, 78],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: 'Taux de mention Assez Bien (%)',
            data: [29, 79, 95, 48, 33, 69, 78],
            fill: false,
            borderColor: 'rgb(255, 206, 86)',
            tension: 0.1
        }
    ]
};

const config3 = {
    type: 'line',
    data: data3,
    options: {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
    }
};
const ctx3 = document.getElementById('thirdChart').getContext('2d');
new Chart(ctx3, config3);

const config1 = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
};
document.addEventListener("DOMContentLoaded", function() {
    const statistiquesSection = document.getElementById("statistiques");
    const statistiquesLink = document.getElementById("statistiques-link");
    
    statistiquesLink.addEventListener("click", function(event) {
        event.preventDefault();
        statistiquesSection.style.display = "block";
        statistiquesSection.scrollIntoView({ behavior: "smooth" });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add("loaded");
});

