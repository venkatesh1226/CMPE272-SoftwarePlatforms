from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

DATABASE_PATH = "database.db"


def init_db():
    with sqlite3.connect(DATABASE_PATH) as conn:
        conn.execute(
            "CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY, name TEXT)"
        )


init_db()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/add_name", methods=["POST"])
def add_name():
    data = request.json
    name = data.get("name")
    with sqlite3.connect(DATABASE_PATH) as conn:
        conn.execute("INSERT INTO names (name) VALUES (?)", (name,))
    return jsonify(success=True)


@app.route("/get_names", methods=["GET"])
def get_names():
    with sqlite3.connect(DATABASE_PATH) as conn:
        names = conn.execute("SELECT id, name FROM names").fetchall()
    return jsonify(names)


@app.route("/update_name", methods=["POST"])
def update_name():
    data = request.json
    name_id = data.get("id")
    new_name = data.get("name")
    with sqlite3.connect(DATABASE_PATH) as conn:
        conn.execute("UPDATE names SET name = ? WHERE id = ?", (new_name, name_id))
    return jsonify(success=True)


@app.route("/delete_name", methods=["POST"])
def delete_name():
    data = request.json
    name_id = data.get("id")
    with sqlite3.connect(DATABASE_PATH) as conn:
        conn.execute("DELETE FROM names WHERE id = ?", (name_id,))
    return jsonify(success=True)


if __name__ == "__main__":
    app.run(debug=True)
