# Two-Back Experiment

A web-based 2-back cognitive task built with JavaScript and jsPsych, with a FastAPI backend for storing experiment results.

## Overview

This project implements a 2-back working memory experiment designed for browser-based participation on desktop and mobile devices.

Participants complete two stages of the experiment. Their performance is recorded and sent to the backend, where results are stored in a SQLite database.

## Features

* Browser-based experiment interface
* Support for keyboard and touch input
* Two experimental stages
* Automatic calculation of stage scores
* Backend API for storing participant results
* SQLite database for persistent storage
* Feedback selection with distribution tracking
* Export of experiment results to Excel
* Persian time zone support for completion timestamps

## Technologies

* **Frontend:** HTML, CSS, JavaScript, jsPsych
* **Backend:** Python, FastAPI, Uvicorn
* **Database:** SQLite, SQLAlchemy
* **Data Export:** OpenPyXL
* **Version Control:** Git and GitHub

## Project Structure

```text
two-back-experiment/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── index.html
│   └── ...
└── README.md
```

The exact files may vary depending on the current project version.

## Requirements

Before running the project, install:

* Python 3.10 or a compatible version supported by the project dependencies
* A modern web browser
* Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/yunus3331/two-back-experiment.git
cd two-back-experiment
```

### 2. Set up the backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment.

**Windows PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

**Windows Command Prompt:**

```bat
venv\Scripts\activate.bat
```

Install the dependencies:

```bash
python -m pip install -r requirements.txt
```

Start the FastAPI server:

```bash
python -m uvicorn main:app --reload
```

The backend should now be available at:

* API: `http://127.0.0.1:8000`
* Interactive API documentation: `http://127.0.0.1:8000/docs`

Keep this terminal running while using the experiment.

### 3. Set up the frontend

Open a second terminal and navigate to the frontend directory:

```bash
cd frontend
```

Start a local static HTTP server:

```bash
python -m http.server 5500
```

Open the following URL in your browser:

`http://localhost:5500`

**Important:** Do not open `index.html` directly using a `file://` URL. Serving the frontend over HTTP avoids browser origin issues.

## Configuration

For local development, the frontend should send API requests to:

```text
http://127.0.0.1:8000
```

The backend CORS configuration must allow the frontend origins:

```text
http://localhost:5500
http://127.0.0.1:5500
```

If the API base URL or port changes, update the frontend and backend configuration accordingly.

## API Endpoints

The backend provides endpoints for experiment data and feedback management.

| Endpoint              | Purpose                             |
| --------------------- | ----------------------------------- |
| `POST /results`       | Submit and store experiment results |
| `GET /results`        | Retrieve stored results             |
| `GET /results/export` | Export results to an Excel file     |
| `GET /feedback/next`  | Request the next feedback category  |

Some endpoints may require authentication. See the FastAPI documentation at `/docs` for the current request and response schemas.

## Database

The project uses SQLite to store experiment results locally. The database file is created or initialized according to the backend's database setup.

Do not commit personal participant information, experiment results, database files containing real data, or credentials to the public repository.

## Notes

* Run the backend and frontend in separate terminals.
* Keep the backend running while participants use the experiment.
* Ensure all required database tables are initialized before submitting results.
* For production deployment, configure environment variables, access controls, and HTTPS as appropriate.
* This repository is configured for local development; a public deployment requires its own server and production configuration.

## License

No license has been specified yet. If you intend to allow others to reuse or modify this project, add an appropriate open-source license.

## Author

Developed as a browser-based cognitive experiment project using JavaScript, jsPsych, Python, and FastAPI.
