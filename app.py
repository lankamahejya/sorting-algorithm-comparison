from flask import Flask, render_template, request, jsonify
from algorithms import bubble_sort, merge_sort, quick_sort
import time

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/compare", methods=["POST"])
def compare():

    data = request.get_json()

    numbers = data["numbers"]

    # Bubble Sort
    start = time.perf_counter()
    bubble_result = bubble_sort(numbers)
    bubble_time = time.perf_counter() - start

    # Merge Sort
    start = time.perf_counter()
    merge_result = merge_sort(numbers)
    merge_time = time.perf_counter() - start

    # Quick Sort
    start = time.perf_counter()
    quick_result = quick_sort(numbers)
    quick_time = time.perf_counter() - start

    times = {
        "Bubble Sort": bubble_time,
        "Merge Sort": merge_time,
        "Quick Sort": quick_time
    }

    winner = min(times, key=times.get)

    return jsonify({
        "sorted": quick_result,
        "bubble_time": bubble_time,
        "merge_time": merge_time,
        "quick_time": quick_time,
        "bubble_complexity": "O(n²)",
        "merge_complexity": "O(n log n)",
        "quick_complexity": "O(n log n)",
        "winner": winner
    })


if __name__ == "__main__":
    app.run(debug=True)