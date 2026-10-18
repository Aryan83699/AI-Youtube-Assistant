# AI YouTube Assistant

## Overview

AI YouTube Assistant is a full-stack web application designed to make learning from YouTube videos faster and more efficient. It enables users to interact with video content by generating summaries and asking questions based on the information available in the video's transcript.

The application combines the FARM stack (FastAPI, React, and MongoDB) with LangChain to build an AI-powered question-answering workflow. Instead of manually watching an entire video to find specific information, users can submit a YouTube video and retrieve relevant answers through a conversational interface.

## Key Features

- **YouTube Video Integration:** Accepts YouTube video links for transcript-based processing.
- **AI-Powered Question Answering:** Allows users to ask questions about a video's content.
- **Context-Aware Responses:** Uses transcript-based retrieval to provide answers relevant to the selected video.
- **User Authentication:** Supports registration, email-based OTP verification, and login.
- **Session Management:** Maintains session information to associate conversations with the selected video.
- **Conversational Interface:** Provides a chat interface for submitting questions and viewing AI-generated responses.
- **Responsive User Interface:** Uses React and Tailwind CSS to create an interactive frontend.
- **Animated UI Components:** Uses GSAP for page entrance animations and interface interactions.

## Technology Stack

### Frontend

- **React:** Builds the user interface using reusable components.
- **JavaScript:** Handles client-side logic, events, and API interactions.
- **Tailwind CSS:** Provides utility-based styling and responsive layouts.
- **Axios:** Sends HTTP requests to the backend and supports credential-based requests.
- **React Router:** Handles client-side navigation and route management.
- **GSAP:** Adds animations to interface elements.

### Backend

- **Python:** Implements application logic and AI processing.
- **FastAPI:** Provides REST API endpoints for authentication, video processing, and question answering.
- **Pydantic:** Validates incoming request data.
- **LangChain:** Supports the retrieval and language-model workflow.
- **Background Tasks:** Supports processing tasks that do not need to block the immediate API response.

### Database and Storage

- **MongoDB Atlas:** Stores application data, including user information and transcript-related or retrieval data, according to the configured collections.
- **MongoDB Vector Search:** Supports similarity-based retrieval of relevant transcript content when configured with an appropriate vector index.
- **Redis:** Supports temporary data storage and expiry-based operations, such as OTP-related data and other temporary authentication information.
- **Session Middleware:** Maintains session state through signed session cookies.

### Authentication and Security

- **JWT (JSON Web Tokens):** Supports token-based authentication where implemented.
- **Email OTP Verification:** Verifies user registration through a one-time password.
- **HTTP Cookies:** Supports cookie-based session or token handling.
- **CORS Configuration:** Controls cross-origin requests between the frontend and backend.

## Application Workflow

1. **User Registration:** The user submits an email address and password through the registration form.
2. **OTP Verification:** The backend initiates email verification and validates the submitted OTP before completing registration.
3. **User Login:** The backend verifies the user's credentials and establishes the configured authentication state.
4. **Video Submission:** The authenticated user submits a YouTube video URL.
5. **Transcript Processing:** The backend extracts the video identifier and retrieves or processes the available transcript.
6. **Content Preparation:** The transcript is prepared for retrieval, including document chunking and embedding generation where configured.
7. **Question Submission:** The user submits a question through the chat interface.
8. **Context Retrieval:** The application retrieves relevant transcript content associated with the selected video.
9. **AI Response Generation:** LangChain coordinates the retrieval and language-model workflow to generate a response grounded in the retrieved context.
10. **Response Display:** The frontend displays the user's question and the generated answer.

## System Architecture

The application follows a client-server architecture.

- **React Frontend:** Manages the user interface, navigation, forms, and conversational interactions.
- **FastAPI Backend:** Exposes REST endpoints and coordinates authentication, video processing, retrieval, and AI responses.
- **MongoDB Atlas:** Provides persistent document storage and, when configured, vector search capabilities.
- **Redis:** Provides temporary storage for operations requiring expiration or short-lived state.
- **LangChain and Language Model:** Coordinate retrieval and response generation based on the selected video's content.
- **YouTube Transcript Source:** Supplies the textual content used by the application for video-specific question answering.

## Project Structure

The exact structure depends on the current implementation. A typical organization is shown below:

```text
ai-youtube-assistant/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   └── .env
│   └── requirements.txt
│
└── README.md
```

## Configuration

Create the required environment variables for the frontend and backend.

### Frontend

Configure the backend base URL used by Axios:

```env
VITE_BACKEND=http://localhost:8000
```

Replace the URL with the deployed backend URL when hosting the application.

### Backend

Configure the variables required by the implemented services. Depending on the application configuration, these may include:

```env
MONGODB_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
SECRET_KEY=your_session_secret
JWT_SECRET_KEY=your_jwt_secret
GROQ_API_KEY=your_groq_key or any other llm
YOUTUBE_API=your_google_api
EMAIL=your_email_forauth
PSWD=your_email_app_password
```

Add any additional environment variables required by the configured language model, email service, or YouTube transcript source.

Do not commit actual credentials, database connection strings, or secret keys to version control.

## Installation and Setup

### Prerequisites

- Python installed
- Node.js and npm installed
- A MongoDB Atlas account or accessible MongoDB instance
- A Redis instance if Redis functionality is enabled
- Credentials for the configured language model and email service, if required

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-youtube-assistant
```

Replace `<repository-url>` with the actual repository URL.

### 2. Configure the Backend

Navigate to the backend directory and create a virtual environment:

```bash
cd backend
python -m venv venv
```

Activate the environment.

Windows:

```bash
venv\Scripts\activate
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

Configure the backend environment variables and start the FastAPI server using the appropriate application module:

```bash
uvicorn app.main:app --reload
```

The API will generally be available at:

```text
http://localhost:8000
```

FastAPI interactive API documentation is generally available at:

```text
http://localhost:8000/docs
```

### 3. Configure the Frontend

Open a separate terminal:

```bash
cd frontend
npm install
```

Create the frontend environment file and configure `VITE_BACKEND`.

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite in the terminal.

## Security Considerations

- Store credentials and secret keys in environment variables.
- Hash passwords before storing them in the database.
- Apply expiry and validation rules to OTPs.
- Configure CORS for trusted frontend origins.
- Use HTTPS in production.
- Configure cookie attributes appropriately for the deployment environment.
- Validate user input and handle authentication failures securely.
- Apply suitable access controls to user-specific data and video conversations.

## Future Enhancements

- Conversation history and saved video sessions.
- Support for multiple videos within a single workspace.
- Improved transcript processing and retrieval quality.
- Streaming AI responses.
- Source references and timestamps in generated answers.
- Rate limiting and abuse prevention.
- Automated evaluation of AI-generated responses.
- Deployment monitoring and automated testing.

## Conclusion

AI YouTube Assistant combines full-stack web development, database management, authentication, and retrieval-augmented generation to make video content easier to explore. The project demonstrates the integration of React, FastAPI, MongoDB, and LangChain in an application that connects natural-language questions with information extracted from YouTube video transcripts.

The overall objective is to reduce the effort required to find and understand specific information within long-form video content.

## License

Add the appropriate license information before distributing or publishing the project.
