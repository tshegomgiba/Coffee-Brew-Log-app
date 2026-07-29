# Coffee Brew Log App

A full-stack coffee brewing log app with a React frontend and an Express/MongoDB backend.

## Features
- Add, edit, and delete brew entries
- View brews in a log list
- Filter brews by brewing method
- Deployable to Render

## Requirements
- Node.js 20+
- npm
- MongoDB Atlas connection string

## Local Development

1. Install dependencies at the project root:
   ```bash
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   npm --prefix frontend install --include=dev
   ```

3. Create a `.env` file in the project root with your MongoDB URI:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   ```

4. Start the app:
   ```bash
   npm run dev
   ```

This runs:
- the backend on port 5000
- the Vite frontend on the Vite dev server

## Production Build

Run:
```bash
npm run build
```

Then start the app with:
```bash
npm start
```

## Render Deployment

1. Push the repository to GitHub.
2. Create a new Web Service on Render.
3. Use the repository root as the root directory.
4. Add the environment variable:
   - `MONGODB_URI=your_mongodb_connection_string`
5. Deploy.

The app is configured to build the frontend and start the Express server automatically.
