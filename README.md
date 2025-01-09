# Sentiment Analyzer - Backend API

Hey there! This project implements a sentiment analysis API using NestJS, a TypeScript framework, to analyze the sentiment of text. It utilizes the Google Cloud Natural Language API and stores the results in a MongoDB database.

### Table of Contents

1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Functionality](#functionality)
   - [API Endpoints](#api-endpoints)
4. [Running the Application](#running-the-application)
   - [Prerequisites](#prerequisites)
   - [Instructions](#instructions)
5. [Swagger UI](#swagger-ui)
6. [Logging](#logging)
7. [Testing](#testing)
8. [Additional Information](#additional-information)

---

## Architecture

The application follows a hexagonal architecture, separating the core domain logic from the infrastructure and application layers. This promotes loose coupling and testability.

- **Domain:** Contains pure TypeScript files defining entities and interfaces representing core domain concepts and their behaviors.
- **Application:** Houses services and DTOs (Data Transfer Objects) responsible for application logic and data manipulation.
- **Infrastructure:** Implements concrete logic for interacting with external systems like the Google Cloud Natural Language API and MongoDB. Includes controllers, mappers, and adapters (implementations of repositories).

---

## Functionality

### API Endpoints

1. **`/sentiment-analysis/analyze` (POST):**

   - Accepts a JSON request body with a `text` field containing the message to be analyzed.
   - Calls the Google Cloud Natural Language API to perform sentiment analysis.
   - Emits an event to another service to store the analysis result.
   - Returns a JSON response containing the sentiment score and magnitude.

2. **`/sentiment-analysis/results` (GET):**
   - Retrieves a list of all stored sentiment analysis results.

---

## Running the Application

### Prerequisites

- Docker and Docker Compose must be installed.
- A Google Cloud service account JSON key needs to be generated and placed in the project root directory.

### Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Santiago-Restrepo/sentiment-analyzer-be.git
   ```

2. **Generate a service account key**:  
   Download the JSON file from Google Cloud Console and place it in the project root directory. An example file looks like this:

   ```json
   {
     "type": "service_account",
     "project_id": "your-project-id",
     "private_key_id": "your-private-key-id",
     "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENTS\n-----END PRIVATE KEY-----",
     "client_email": "your-client-email",
     "client_id": "your-client-id",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-client-email"
   }
   ```

3. **Set up environment variables**:  
   Create a `.env` file using `.env.example` as a template. Replace the values as needed:

   ```env
   # Application
   PORT=3010
   GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-file.json

   # Database
   MONGO_HOST=mongodb
   MONGO_PORT=27017
   MONGO_INITDB_ROOT_USERNAME=root
   MONGO_INITDB_ROOT_PASSWORD=example
   ```

4. **Build Docker images**:

   ```bash
   docker compose build
   ```

5. **Start the application**:

   ```bash
   docker compose up
   ```

   The API will be accessible on port 3010 by default (configurable via `.env`).

---

### Swagger UI

The application includes a Swagger UI for testing API endpoints. Access it at `http://localhost:3010/api-docs` after running the application.

---

### Logging

The application uses structured logging to capture key events, such as:

- Incoming API requests and responses at infrastructure level.
- Detailed logging for sentiment analysis service and sentiment analysis result service.
- Errors or exceptions during processing.

---

## Testing

### Prerequisites

Install dependencies with your preferred package manager, such as `npm` or `pnpm`:

```bash
pnpm install
```

### Unit Tests

Run unit tests to verify individual components, in this project unit tests were implemented for the sentiment analysis service and the sentiment analysis result service:

```bash
pnpm run test
```

### End-to-End Tests

Run end-to-end tests to simulate user interactions with the API. This was implemented using Supertest and Jest to test the analyze endpoint and the results endpoint:

```bash
pnpm run test:e2e
```

---

## Additional Information

This README provides a basic overview of the project. For detailed implementation specifics, refer to the source code and tests.

**Note:** This project assumes a basic understanding of NestJS, Docker, and the hexagonal architecture.
