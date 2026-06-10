async function compareSorts() {

    let input = document.getElementById("numbers").value;

    let values = input.split(",");

let numbers = [];

for(let value of values){

    value = value.trim();

    if(value === "" || isNaN(value)){
        alert("Please enter valid numbers separated by commas.");
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
        <h2>Results</h2>

        <p><strong>Sorted Array:</strong>
        ${data.sorted}</p>

        <p><strong>Bubble Sort Time:</strong>
        ${data.bubble_time.toFixed(8)} seconds</p>

        <p><strong>Merge Sort Time:</strong>
        ${data.merge_time.toFixed(8)} seconds</p>

        <p><strong>Bubble Sort Complexity:</strong>
        ${data.bubble_complexity}</p>

        <p><strong>Merge Sort Complexity:</strong>
        ${data.merge_complexity}</p>
    `;
}