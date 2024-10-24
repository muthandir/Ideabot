# Idea Brainstorming Chatbot

## Overview

This project is a full-stack application that allows users to brainstorm ideas through a chat interface. It utilizes a chatbot powered by a language model to generate responses based on user input.

## Tech Stack

- **Frontend**: React, TypeScript, Formik, Yup, Axios
- **Backend**: NestJS, TypeScript, Prisma, PostgreSQL
- **Styling**: CSS Variables for theming
- **Deployment**: Docker for containerization
- **Api documentation**: Swagger: [remote](https://ideabot-vo2n.onrender.com/api/docs) or [local](http://localhost:3001/api/docs)

## Features

- **Chat Interface**: Users can send messages and receive responses from the chatbot.
- **Idea Management**: Users can save and view their ideas.
- **Error Handling**: Includes error messages for user feedback.
- **Responsive Design**: Mobile-friendly layout.
- **Environment Configuration**: Uses `.env` files for sensitive information.
- **Rate Limiter**: A rate limiter is implemented to prevent abuse.

## Potential Improvements

- **Logging**: Improved logging can be implemented for better transporting the logs to the desired log repository (like Betterstack, Splunk, etc.).
- **User Management**: Registration, login, authentication, and profile management modules can be implemented in the future.
- **LLM Prompt Administration**: The functionality to manage and customize prompts wrapping the user messages to be sent to the language model can be implemented.
- **Frontend Tests**: I normally use Playwright for writing the UI tests and use it for local testing + CI/CD testing with the headless browser option.
- **Monitoring**: Implementing monitoring tools (such as Prometheus, Grafana, or New Relic) to track application performance, user interactions, and error rates.

## Tests:

- **llm.service.spec.ts**: Tests the LlmService for generating responses and handling errors when calling the Groq API.
- **chat.service.spec.ts**: Tests the ChatService for generating responses, retrieving chat history, and resetting chat messages.
- **ideas.service.spec.ts**: Tests the IdeasService for saving ideas, retrieving all ideas, and resetting ideas.

### Running the Tests 

```bash
cd backend
npm run test
```

## CI-CD and Hosting

- CI/CD is set up for the main branch on GitHub to deploy to Render.com.
- The application can be accessed at [https://ideabot-x511.onrender.com](https://ideabot-x511.onrender.com).

p.s. Because the render api is a free instance, it will spin down with inactivity, which can delay requests by 50 seconds or more while it is inactive.

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)

## Running the app using your local host
### Environment Variables

- **Frontend**: Create a `.env` file in the `frontend` directory with the following:
  ```plaintext
  PORT=3000
  REACT_APP_API_URL=http://localhost:3001
  ```
- **Backend**: Create a `.env` file in the `backend` directory with the following:
  ```plaintext
  PORT=3001
  NODE_ENV=development
  DATABASE_URL="postgresql://user:password@localhost:5432/chatbotdb?schema=public"
  GROQ_API_KEY=abc
  GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
  ```


This will get the db running:
```
docker-compose up db
```

In a new terminal run the backend:
```
cd backend/
npm run start:dev
```

In a new terminal run the frontend:
```
cd frontend/
npm start
```
## Running the app using Docker 

1. Ensure you have Docker and Docker Compose installed.
2. Create the .docker.env files similar to env files above. Consider the possible changes:
   - networking configuration: for example the db host can change to "postgresql://user:password@db:5432/chatbotdb?schema=public" using in-docker network naming rather than localhost.
   - port assignments
3. Navigate to the root directory of the project.
4. Start the application using Docker Compose:

   ```bash
   docker-compose up --build
   ```

   This command will build the images and start the containers for the frontend, backend, and database services.

### Stopping the Application

To stop the application, you can use:

```bash
docker-compose down
```

### Accessing the Application

- The frontend will be available at `http://localhost:3000`.
- The backend API will be accessible at `http://localhost:3001`.

## Updating the prisma database schema

_See [best practices from prisma here](https://www.prisma.io/docs/guides/migrate/prototyping-schema-db-push)._


Overview:

1. Make changes to the schema in `prisma/schema.prisma`.
2. Start the local database container (see above).
3. run `npx prisma db push` to test the change on the local database.
4. Keep making changes until you're happy with them.
5. Once you're happy with them, you can `git stash` to stash the changes you made to the schema and run push once more and go back to what you had. Then `git stash pop` to get the changes back (which you know work, due to your prototyping in steps 1-4).
6. Finally, run `npm run prisma:dev <name>` (or `npx prisma migrate --name <name>`) create a migration that creates the changes. You can skip step 5, but that will create drift in the database that will force you to reset it completely.

## API Endpoints

- **POST /chat**: Send a message to the chatbot and receive a response.
- **POST /ideas**: Save a new idea.
- **GET /ideas**: Fetch all saved ideas.
- **POST /ideas/reset**: Reset all saved ideas.
