import sqlite3

DATABASE_URL = "experiment.db"


def get_connection():
    connection = sqlite3.connect(
        DATABASE_URL,
        timeout=30,
    )

    connection.row_factory = sqlite3.Row

    # برای همزمانی بهتر در SQLite
    connection.execute("PRAGMA journal_mode=WAL;")
    connection.execute("PRAGMA busy_timeout=30000;")

    return connection


def create_tables():
    connection = get_connection()

    try:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS participants (
                id TEXT PRIMARY KEY,
                created_at TEXT NOT NULL
            )
        """)

        connection.execute("""
            CREATE TABLE IF NOT EXISTS trials (
                id INTEGER PRIMARY KEY AUTOINCREMENT,

                participant_id TEXT NOT NULL,

                stage INTEGER NOT NULL,
                trial_number INTEGER NOT NULL,

                stim_char TEXT NOT NULL,
                corr_ans TEXT,

                response TEXT,
                rt REAL,

                correct INTEGER,

                device_type TEXT NOT NULL,

                created_at TEXT NOT NULL,

                FOREIGN KEY (participant_id)
                    REFERENCES participants(id),

                UNIQUE (
                    participant_id,
                    stage,
                    trial_number
                )
            )
        """)

        connection.commit()

    finally:
        connection.close()