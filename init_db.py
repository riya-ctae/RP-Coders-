import sqlite3

conn = sqlite3.connect("quiz.db")
cursor = conn.cursor()

# Users Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
)
""")

# Quiz Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS quiz(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    option1 TEXT NOT NULL,
    option2 TEXT NOT NULL,
    option3 TEXT NOT NULL,
    option4 TEXT NOT NULL,
    answer TEXT NOT NULL
)
""")

# Results Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS results(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_name TEXT,
    score INTEGER
)
""")

conn.commit()
conn.close()

print("Database Created Successfully")