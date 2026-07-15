# ResumePulse

ResumePulse is a full-stack resume comparison application for tracking how a candidate's resume changes over time. The project combines a modern Next.js frontend with an Express backend that accepts uploaded resume files, extracts text from PDF, DOCX, and TXT documents, compares versions, and stores comparison history in MongoDB. It is designed for job seekers and recruiters who want a structured way to review resume iterations, highlight meaningful changes, and preserve a history of earlier versions.

## Key Features

- Upload two resume versions and compare them side by side
- Extract and normalize text from PDF, DOCX, and TXT files
- Generate structured comparison summaries with severity-based highlights
- Store comparison history in MongoDB for later review
- Preview uploaded files in the browser and delete saved history records
- Use AI-assisted comparison through a Groq-compatible API when configured, with fallback heuristics if unavailable

## Table of Contents

- [Architecture](#architecture)
- [Features](#features)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Testing](#testing)
- [Build & Deployment](#build--deployment)
- [Security](#security)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Future Improvements](#future-improvements)

## Architecture

ResumePulse follows a simple three-layer architecture:

1. Frontend: A Next.js application renders the landing page, resume upload workflow, file previews, and history views.
2. Backend API: An Express service handles multipart file uploads, text extraction, resume comparison, and history retrieval.
3. Data layer: MongoDB stores resume records and comparison logs, while uploaded files are written to the backend uploads directory.

### High-Level Architecture

- The frontend communicates with the backend through the API client in `app/services/api.ts`.
- The backend exposes REST endpoints under `/api/resumes`.
- Resume analysis is performed by a combination of local parsing logic and optional AI comparison using a Groq-compatible endpoint.

### Folder Structure

```text
resume-pulse/
├── app/                      # Next.js app router pages and UI components
│   ├── components/           # Reusable React components
│   ├── history/              # History page
│   ├── resume-analyzer/      # Resume comparison page
│   └── services/             # Frontend API client
├── backend/
│   ├── src/
│   │   ├── app.js            # Express app setup
│   │   ├── server.js         # Server entry point
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/       # Upload middleware
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   └── services/         # Parsing, comparison, and AI services
│   └── uploads/              # Uploaded files storage
└── public/                   # Static assets
```

### Technology Stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS, Lucide React
- Backend: Node.js, Express 5, Mongoose, Multer, dotenv
- File parsing: `pdf2json`, `mammoth`
- AI comparison: OpenAI-compatible SDK configured for Groq
- Database: MongoDB

### Design Decisions

- The frontend and backend are intentionally separated so the UI can evolve independently from the analysis pipeline.
- Comparisons use a deterministic fallback parser even when AI services are unavailable.
- The API accepts file uploads directly rather than relying on a separate object storage layer.

## Features

### Core Functionality

- Upload an original resume and an updated resume version
- Extract textual content from supported file types
- Normalize text and compare sections such as skills, title, experience, education, employers, location, and dates
- Produce a structured report with summary text, highlights, and stats
- Save each comparison in history and allow deletion of individual entries

### Major Modules

- `UploadForm`: manages file selection and submits comparison requests
- `ResumeViewer`: renders uploaded documents (PDF preview or download fallback for other formats)
- `ResumeScanner`: provides the loading overlay while files are being processed
- `resume.controller.js`: orchestrates the compare, history, and delete flows
- `comparison.service.js`: builds fallback comparison reports from extracted text
- `groq.service.js`: sends resume content to an AI model when a Groq API key is configured
- `pdf.service.js`: handles parsing for PDF, DOCX, and TXT files

### User Workflows

1. Open the analyzer page.
2. Upload the original and new resume files.
3. Submit the comparison request.
4. Review the generated report and saved history entries.

## Installation

### Prerequisites

- Node.js 18 or newer
- npm
- A running MongoDB instance
- An optional Groq API key for AI-assisted analysis

### Clone the Repository

```bash
git clone <repository-url>
cd resume-pulse
```

### Install Dependencies

```bash
npm install
cd backend
npm install
cd ..
```

### Environment Variables

Create a backend environment file named `.env` in the backend directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resumepulse
GROQ_API_KEY=your-groq-api-key
```

Create a frontend environment file named `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Configuration

- The backend server reads environment values from `backend/.env`.
- The frontend reads `NEXT_PUBLIC_API_URL` for the API base URL.
- Uploaded files are stored under `backend/uploads`.

### Database Setup

MongoDB must be available before starting the backend. If you use a local instance, ensure the connection string in `MONGO_URI` points to an existing database. The application will create the necessary collections automatically through Mongoose models.

## Running the Project

### Development

Start the backend API:

```bash
cd backend
npm run dev
```

In a second terminal, start the frontend:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

### Production

Build the frontend:

```bash
npm run build
```

Start the frontend:

```bash
npm run start
```

Start the backend:

```bash
cd backend
npm run start
```

### Docker

No Docker configuration is currently included in the repository.

## Usage

1. Open the analyzer page.
2. Upload two resumes in PDF, DOCX, or TXT format.
3. Click "Compare Resumes".
4. Review the generated summary and highlights.
5. Visit the history page to inspect prior comparisons.

### Example Upload Request

```bash
curl -X POST http://localhost:5000/api/resumes/compare \
  -F "oldResume=@/path/to/old-resume.pdf" \
  -F "newResume=@/path/to/new-resume.pdf"
```

### Example History Request

```bash
curl http://localhost:5000/api/resumes/history
```

### Screenshots

Screenshots and demo assets can be added to the `public` directory in a future iteration.

## Project Structure

### Frontend

- `app/page.tsx`: landing page and hero experience
- `app/resume-analyzer/page.tsx`: main analyzer interface
- `app/history/page.tsx`: comparison history view
- `app/components/UploadForm.tsx`: file upload and comparison submission UI
- `app/components/ResumeFileCard.tsx`: document preview component
- `app/components/ResumeScanner.tsx`: processing overlay component
- `app/services/api.ts`: Axios client configuration

### Backend

- `backend/src/app.js`: Express app configuration and route mounting
- `backend/src/server.js`: server entry point and database initialization
- `backend/src/controllers/resume.controller.js`: compare, list, and delete logic
- `backend/src/services/comparison.service.js`: fallback comparison heuristics
- `backend/src/services/groq.service.js`: optional AI comparison integration
- `backend/src/services/pdf.service.js`: file parsing and normalization
- `backend/src/models/Resume.js`: stored resume metadata
- `backend/src/models/Comparison.js`: stored comparison results
- `backend/src/routes/resume.routes.js`: REST route definitions

## Configuration

### Root Configuration Files

- `package.json`: Next.js app scripts and dependencies
- `tsconfig.json`: TypeScript compiler settings and path aliases
- `next.config.ts`: Next.js configuration
- `eslint.config.mjs`: linting configuration

### Backend Configuration Files

- `backend/package.json`: backend scripts and dependencies
- `backend/src/config/db.js`: MongoDB connection logic
- `backend/src/middleware/upload.middleware.js`: Multer storage configuration

## API Documentation

### Endpoints

#### POST `/api/resumes/compare`

Uploads two resume files and returns a comparison report.

Request:

- `multipart/form-data`
- Fields: `oldResume`, `newResume`
- Supported file types: `.pdf`, `.docx`, `.txt`

Response:

```json
{
  "success": true,
  "message": "Resume comparison completed successfully",
  "data": {
    "comparisonId": "...",
    "oldResume": "old.pdf",
    "newResume": "new.pdf",
    "aiUsed": false,
    "comparison": {
      "summary": "...",
      "highlights": [],
      "stats": {
        "totalChanges": 0,
        "importantChanges": 0,
        "minorChanges": 0,
        "reviewChanges": 0
      }
    }
  }
}
```

#### GET `/api/resumes/history`

Returns all saved comparison records.

#### DELETE `/api/resumes/history/:id`

Deletes a comparison record and the associated resume records and uploaded files.

### Authentication

No authentication or authorization layer is currently implemented.

### Error Responses

The API returns JSON error responses with a `success: false` field and a `message` value for validation and server failures.

## Database

### Schema Overview

- `Resume`: stores metadata for each uploaded/parsed resume including candidate name, version, original file name, and file path.
- `Comparison`: stores the analysis result, including summary, highlights, stats, and references to the original and updated resume records.

### Migrations

There are no migration scripts in the repository. The database is created and updated through Mongoose models at runtime.

### Seed Data

No seed data is included in the repository.

## Testing

Automated tests are not currently included in the repository. The available validation step is linting:

```bash
npm run lint
```

## Build & Deployment

### Build Process

```bash
npm run build
```

### CI/CD

No CI/CD workflow files are currently present in the repository.

### Deployment Steps

- Deploy the Next.js frontend to a host that supports Node.js and Next.js.
- Deploy the Express backend separately on a Node.js-compatible platform.
- Ensure both services can reach the same MongoDB instance and that the frontend points to the backend URL through `NEXT_PUBLIC_API_URL`.

## Security

- Uploaded files are stored on disk under the backend uploads directory.
- Environment variables are used for database and API configuration.
- No authentication, authorization, or input sanitization layer beyond basic request handling is implemented in the current version.
- API keys and secrets should never be committed to source control.

## Performance

- File parsing is performed per upload and may take longer for larger PDF files.
- AI-based comparison is optional and can increase latency depending on the external service response time.
- The current implementation is suitable for small to medium usage and can be scaled by moving file storage and API hosting to managed services.

## Troubleshooting

### Common Issues

- `MONGO_URI is not set`: ensure backend `.env` contains a valid MongoDB connection string.
- `NEXT_PUBLIC_API_URL` is undefined: verify the frontend `.env.local` file exists and points to the backend URL.
- Unsupported file format: only PDF, DOCX, and TXT files are currently supported.
- AI comparison not working: confirm `GROQ_API_KEY` is set correctly; the app will still fall back to local heuristics if it is missing.

## Contributing

Contributions are welcome. Please follow these general guidelines:

- Keep changes focused and well-documented.
- Update documentation when adding new endpoints, environment variables, or workflows.
- Prefer small, reviewable pull requests.
- Run linting locally before submitting changes.

## License

No explicit license has been declared in the repository at this time.

## Future Improvements

Potential enhancements for a future version include:

- Authentication and role-based access control
- User-facing test coverage
- Docker support for local development and deployment
- Better OCR and parsing quality for complex PDF documents
- Improved comparison models and richer analytics
