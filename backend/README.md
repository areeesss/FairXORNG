# FairXORNG Backend

This is the Flask API backend for the FairXORNG system, which provides a fair random number generation algorithm with dynamic probability adjustment.

## Prerequisites

- Python 3.8+
- CMake 3.10+
- C++ compiler (GCC, Clang, MSVC)
- pip (Python package manager)

## Setup

1. Install the Python dependencies:

```bash
pip install -r requirements.txt
```

2. Build the C++ module:

```bash
cmake -B build
cmake --build build
```

## Running the Backend  

Start the Flask server:

```bash
python app.py
```

The server will run on `http://localhost:5000`.

## API Endpoints

### POST /api/evaluate

Evaluates the FairXORNG algorithm with the provided probability classes.

**Request Body:**

```json
{
  "classes": [
    {
      "classLabel": "Example Class",
      "initialProbability": 10.0,
      "incrementalBiasRate": 5.0,
      "consecutiveFailures": 0,
      "deterministicLimit": 5,
      "categoryOutcomes": [
        {
          "label": "Item A",
          "weight": 1
        },
        {
          "label": "Item B",
          "weight": 2
        }
      ]
    }
  ]
}
```

**Response:**

```json
{
  "result": "Item B",
  "isDeterministic": false,
  "classLabel": "Example Class",
  "updatedClasses": [
    {
      "classLabel": "Example Class",
      "initialProbability": 10.0,
      "incrementalBiasRate": 5.0,
      "consecutiveFailures": 1,
      "deterministicLimit": 5,
      "categoryOutcomes": [
        {
          "label": "Item A",
          "weight": 1
        },
        {
          "label": "Item B",
          "weight": 2
        }
      ]
    }
  ]
}
```

### GET /api/health

Health check endpoint.

**Response:**

```json
{
  "status": "healthy"
}
```

This Flask backend will:

1. Load your compiled C++ FairXORNG module
2. Provide an API endpoint at `/api/evaluate` that accepts probability classes
3. Call your C++ algorithm and return the result, along with updated class information
4. Include a health check endpoint for monitoring

Before running the backend:
1. Make sure your C++ code is compiled (using CMake)
2. Install the required Python dependencies (Flask and Flask-CORS)

Then you can run the backend with: 