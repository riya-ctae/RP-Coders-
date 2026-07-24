from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

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

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    conn = connect_db()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (data["email"], data["password"])
    )

    user = cur.fetchone()
    conn.close()

    if user:
        return jsonify({"message":"Login Successful"})
    else:
        return jsonify({"message":"Invalid Email or Password"})


@app.route("/add_quiz", methods=["POST"])
def add_quiz():

    data = request.json

    conn = connect_db()
    cur = conn.cursor()

    cur.execute(
        """INSERT INTO quiz(question,option1,option2,option3,option4,answer)
        VALUES(?,?,?,?,?,?)""",
        (
            data["question"],
            data["option1"],
            data["option2"],
            data["option3"],
            data["option4"],
            data["answer"]
        )
    )

    conn.commit()
    conn.close()

    return jsonify({"message":"Quiz Added Successfully"})

@app.route("/get_quiz", methods=["GET"])
def get_quiz():
    conn = connect_db()
    cur = conn.cursor()

    cur.execute("""SELECT id, question, option1, option2, option3, option4 FROM quiz ORDER BY id""")
    quiz = cur.fetchone()
    conn.close()
    quizzes = [dict(row) for row in rows]
    return jsonify(quizzes)

if __name__ == "__main__":
    app.run(debug=True)