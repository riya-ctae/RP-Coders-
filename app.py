from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

def connect_db():
    conn = sqlite3.connect("quiz.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def home():
    return "Live Quiz Platform Backend Running"

@app.route("/register", methods=["POST"])
def register():
    data = request.json

    conn = connect_db()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    """)

    cur.execute(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)",
        (data["name"], data["email"], data["password"])
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "User Registered Successfully"})

@app.route("/users")
def users():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("SELECT id,name,email FROM users")
    rows = cur.fetchall()
    conn.close()

    return jsonify([dict(row) for row in rows])

if __name__ == "__main__":
    app.run(debug=True)