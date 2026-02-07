# Simulasi Online Test

## Prerequisites
- Node.js 18+ (recommended 20+)
- npm

## Install
```
npm install
```

## Environment
Create or update `.env`:
```
VITE_API_URL=/api
VITE_SECRET_KEY="123456"
```

## Run (Development)
```
npm run dev
```
Open `http://localhost:5173`.

## Build
```
npm run build
```

## Notes
- Dev server uses Vite proxy for `/api` to avoid CORS.
- If you change `.env`, restart the dev server.
