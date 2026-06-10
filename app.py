from flask import Flask, render_template, request, jsonify
from algorithms import bubble_sort, merge_sort
import time

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/compare", methods=["POST"])
def compare():

    data = request.get_json()

    numbers = data["numbers"]

    start = time.perf_counter()
    bubble_result = bubble_sort(numbers)
    bubble_time = time.perf_counter() - start

    start = time.perf_counter()
    merge_result = merge_sort(numbers)
    merge_time = time.perf_counter() - start

    winner = "Bubble Sort"

    if merge_time < bubble_time:
        winner = "Merge Sort"

    return jsonify({
        "sorted": merge_result,
        "bubble_time": bubble_time,
        "merge_time": merge_time,
        "bubble_complexity": "O(n²)",
        "merge_complexity": "O(n log n)",
        "winner": winner
    })


if __name__ == "__main__":
    app.run(debug=True)