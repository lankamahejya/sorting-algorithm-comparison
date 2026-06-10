let chart;

function generateDataset() {

    let size = parseInt(
        document.getElementById("datasetSize").value
    );

    let numbers = [];

    for (let i = 0; i < size; i++) {
        numbers.push(
            Math.floor(Math.random() * 10000)
        );
    }

    document.getElementById("numbers").value =
        numbers.join(",");
}

async function compareSorts() {

    let input =
        document.getElementById("numbers").value;

    let values = input.split(",");

    let numbers = [];

    for (let value of values) {

        value = value.trim();

        if (value === "" || isNaN(value)) {
            alert(
                "Please enter valid numbers separated by commas."
            );
            return;
        }

        numbers.push(Number(value));
    }

    const response = await fetch("/compare", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            numbers: numbers
        })
    });

    const data = await response.json();

    document.getElementById("result").style.display =
        "block";

    document.getElementById("timeChart").style.display =
        "block";

    document.getElementById("result").innerHTML = `

        <h2>📊 Results Dashboard</h2>

        <div class="result-grid">

            <div class="card">
                <h3>🟢 Bubble Sort</h3>
                <p>${data.bubble_time.toFixed(8)} sec</p>
            </div>

            <div class="card">
                <h3>🔵 Merge Sort</h3>
                <p>${data.merge_time.toFixed(8)} sec</p>
            </div>

            <div class="card">
                <h3>🟣 Quick Sort</h3>
                <p>${data.quick_time.toFixed(8)} sec</p>
            </div>

            <div class="card winner">
                <h3>🏆 Fastest</h3>
                <p>${data.winner}</p>
            </div>

        </div>

        <h3>📦 Dataset Summary</h3>

        <p>
            Total Elements Sorted:
            <strong>${data.sorted.length}</strong>
        </p>

        <p>
            <strong>First 20 Elements:</strong>
            <br>
            ${data.sorted.slice(0,20).join(", ")}
        </p>

        <p>
            <strong>Last 20 Elements:</strong>
            <br>
            ${data.sorted.slice(-20).join(", ")}
        </p>

        <h3>📚 Time Complexity</h3>

        <p>Bubble Sort : ${data.bubble_complexity}</p>

        <p>Merge Sort : ${data.merge_complexity}</p>

        <p>Quick Sort : ${data.quick_complexity}</p>
    `;

    const ctx =
        document.getElementById("timeChart");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Bubble Sort",
                "Merge Sort",
                "Quick Sort"
            ],

            datasets: [{
                label:
                    "Execution Time (seconds)",

                data: [
                    data.bubble_time,
                    data.merge_time,
                    data.quick_time
                ]
            }]
        },

        options: {

            responsive: true,

            plugins: {

                legend: {
                    display: true
                }
            },

            scales: {

                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.onload = function () {

    document.getElementById("result").style.display =
        "none";

    document.getElementById("timeChart").style.display =
        "none";
};