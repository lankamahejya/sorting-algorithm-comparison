let chart;

function generateDataset(){

    let size =
        parseInt(document.getElementById("datasetSize").value);

    let numbers = [];

    for(let i = 0; i < size; i++){

        numbers.push(
            Math.floor(Math.random() * 10000)
        );
    }

    document.getElementById("numbers").value =
        numbers.join(",");
}


async function compareSorts() {

    let input = document.getElementById("numbers").value;

    let values = input.split(",");

    let numbers = [];

    for(let value of values){

        value = value.trim();

        if(value === "" || isNaN(value)){
            alert("Please enter valid numbers only.");
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

    document.getElementById("result").innerHTML = `

        <h2>📊 Results</h2>

        <p>
        🟢 <strong>Bubble Sort:</strong>
        ${data.bubble_time.toFixed(8)} seconds
        </p>

        <p>
        🔵 <strong>Merge Sort:</strong>
        ${data.merge_time.toFixed(8)} seconds
        </p>

        <p>
        🟣 <strong>Quick Sort:</strong>
        ${data.quick_time.toFixed(8)} seconds
        </p>

        <p>
        🏆 <strong>Fastest Algorithm:</strong>
        ${data.winner}
        </p>

        <p>
        📦 <strong>Sorted Output:</strong>
        ${data.sorted}
        </p>

        <p>
        📘 Bubble Sort Complexity:
        ${data.bubble_complexity}
        </p>

        <p>
        📘 Merge Sort Complexity:
        ${data.merge_complexity}
        </p>

        <p>
        📘 Quick Sort Complexity:
        ${data.quick_complexity}
        </p>
    `;

    const ctx = document.getElementById("timeChart");

    if(chart){
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

                label: "Execution Time (seconds)",

                data: [
                    data.bubble_time,
                    data.merge_time,
                    data.quick_time
                ]
            }]
        },

        options: {

            responsive: true,

            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}