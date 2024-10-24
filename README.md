# Idea Brainstorming Chatbot

## Overview
This project is a full-stack application that allows users to brainstorm ideas through a chat interface. It utilizes a chatbot powered by a language model to generate responses based on user input.

## Tech Stack
- **Frontend**: React, TypeScript, Formik, Yup, Axios
- **Backend**: NestJS, TypeScript, Prisma, PostgreSQL
- **Styling**: CSS Variables for theming
- **Deployment**: Docker for containerization

## Features
- **Chat Interface**: Users can send messages and receive responses from the chatbot.
- **Idea Management**: Users can save and view their ideas.
- **Error Handling**: Includes error messages for user feedback.
- **Responsive Design**: Mobile-friendly layout.
- **Environment Configuration**: Uses `.env` files for sensitive information.
- **Rate Limiter**: A rate limiter is implemented to prevent abuse.

## Potential Improvements
- **Logging**: Improved logging can be implemented for better transporting the logs to the desired log repository (like Betterstack, Splunk etc.).
- **LLM Prompt Administration**: The functionality to manage and customize prompts wrapping the user messages to be sent to the language model can be implemented.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)

### Using Docker Compose
1. Ensure you have Docker and Docker Compose installed.
2. Navigate to the root directory of the project.
3. Start the application using Docker Compose:

   ```bash
   docker-compose up
   ```
   This command will build the images and start the containers for the frontend, backend, and database services.

### Accessing the Application
- The frontend will be available at `http://localhost`.
- The backend API will be accessible at `http://localhost:3001`.

## CI-CD and Hosting
- CI/CD is set up for the main branch on GitHub to deploy to Render.com.
- The application can be accessed at [https://ideabot-x511.onrender.com](https://ideabot-x511.onrender.com).

### Stopping the Application
To stop the application, you can use:
```bash
docker-compose down
```

## Environment Variables
- **Frontend**: Create a `.env` file in the `frontend` directory with the following:
  ```plaintext
  REACT_APP_API_URL=http://localhost:3001
  ```
- **Backend**: Create a `.env` file in the `backend` directory with the following:
  ```plaintext
  GROQ_API_KEY=your_groq_api_key_here
  DATABASE_URL="postgresql://user:password@localhost:5432/chatbotdb?schema=public"
  ```

## API Endpoints
- **POST /chat**: Send a message to the chatbot and receive a response.
- **POST /ideas**: Save a new idea.
- **GET /ideas**: Fetch all saved ideas.
- **POST /ideas/reset**: Reset all saved ideas.

## Contributing
Feel free to fork the repository and submit pull requests for any improvements or features.

## License
This project is licensed under the MIT License.
