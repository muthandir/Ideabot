# Idea Brainstorming Chatbot

## Overview

This project is a full-stack application that allows users to brainstorm ideas through a chat interface. It utilizes a chatbot powered by a language model to generate responses based on user input.

## Tech Stack

- **Frontend**: React, TypeScript, Formik, Yup, Axios
- **Backend**: NestJS, TypeScript, Prisma, PostgreSQL
- **Styling**: CSS Variables for theming
- **Deployment**: Docker for containerization
- **Api documentation**: Swagger

## Features

- **Chat Interface**: Users can send messages and receive responses from the chatbot.
- **Idea Management**: Users can save and view their ideas.
- **Error Handling**: Includes error messages for user feedback.
- **Responsive Design**: Mobile-friendly layout.
- **Environment Configuration**: Uses `.env` files for sensitive information.
- **Rate Limiter**: A rate limiter is implemented to prevent abuse.

## Potential Improvements

- **Logging**: Improved logging can be implemented for better transporting the logs to the desired log repository (like Betterstack, Splunk etc.).
- **User Management**: Registration, login, authentication and profile management modules can be implemented in the future.
- **LLM Prompt Administration**: The functionality to manage and customize prompts wrapping the user messages to be sent to the language model can be implemented.
- **Frontend Tests**: I normally use Playwright for writing the UI tests and use it for local testing + CI/CD testing with the headless browser option.


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

### Environment Variables

- **Frontend**: Create a `.env` file in the `frontend` directory with the following:
  ```plaintext
  REACT_APP_API_URL=http://localhost:3001
  ```
- **Backend**: Create a `.env` file in the `backend` directory with the following:
  ```plaintext
  GROQ_API_KEY=your_groq_api_key_here
  DATABASE_URL="postgresql://user:password@localhost:5432/chatbotdb?schema=public"
  ```

### Using Docker Compose

1. Ensure you have Docker and Docker Compose installed.
2. Navigate to the root directory of the project.
3. Start the application using Docker Compose:

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

- The frontend will be available at `http://localhost`.
- The backend API will be accessible at `http://localhost:3001`.

## API Endpoints

- **POST /chat**: Send a message to the chatbot and receive a response.
- **POST /ideas**: Save a new idea.
- **GET /ideas**: Fetch all saved ideas.
- **POST /ideas/reset**: Reset all saved ideas.
