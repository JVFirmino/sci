document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();
});

async function loadDashboard() {
    try {
        const response = await fetch('./data/history.json');
        const data = await response.json();

        if (!data.length) {
            showNoData();
            return;
        }

        const last = data[data.length - 1];
        console.log(last)

        renderOverview(last);
        renderTrendChart(data);
        renderModuleChart(last);
        renderRecentFailures(data);
        renderDurationChart(data);

    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

function renderOverview(last) {
    const scoreEl = document.getElementById('qualityScore');
    const rate = last.total ? ((last.passed / last.total) * 100).toFixed(2) : 0;

    let color = "#4CAF50";
    if (rate < 95) color = "#FF9800";
    if (rate < 85) color = "#F44336";
    scoreEl.innerHTML = `${rate}% de Sucesso (última execução)`;
    scoreEl.style.color = color;

    createBarChartHorizontal(
        'overviewChart',
        ['Sucesso', 'Falhas'],
        [last.passed, last.failed],
        ['#4CAF50', '#F44336']
    );
}

function renderTrendChart(data) {
    const labels = data.map(d => d.date);
    const passRates = data.map(d =>
        ((d.passed / d.total) * 100).toFixed(2)
    );

    createLineChart('trendChart', labels, passRates, 'Taxa de Sucesso (%)', '#4CAF50');
}

function renderModuleChart(last) {
    const modules = last.modules || {};
    const labels = Object.keys(modules);

    const rates = labels.map(name => {
        const m = modules[name];
        console.log(m)
        return ((m.passed / m.total) * 100).toFixed(2);
    });

    createBarChart('moduleChart', labels, rates, 'Sucesso por Módulo (%)', '#2196F3');
}

function renderRecentFailures(data) {
    const recent = data.slice(-7);
    const labels = recent.map(d => d.date);
    const failures = recent.map(d => d.failed);

    createBarChart('recentFailuresChart', labels, failures, 'Falhas', '#F44336');
}

function renderDurationChart(data) {
    const labels = data.map(d => d.date);
    const durations = data.map(d => d.duration);

    createLineChart('durationChart', labels, durations, 'Tempo de Execução (segundos)', '#FF9800');
}

function createLineChart(id, labels, data, label, color) {
    new Chart(document.getElementById(id), {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label,
                data,
                borderColor: color,
                fill: false,
                tension: 0.3
            }]
        }
    });
}

function createBarChart(id, labels, data, label, color) {
    new Chart(document.getElementById(id), {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label,
                data,
                backgroundColor: color
            }]
        }
    });
}

function createBarChartHorizontal(id, labels, data, colors) {
    new Chart(document.getElementById(id), {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Quantidade',
                data,
                backgroundColor: colors
            }]
        },
        options: {
            indexAxis: 'y', 
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { beginAtZero: true }
            }
        }
    });
}