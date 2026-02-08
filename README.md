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
VITE_API_URL={url api}
VITE_SECRET_KEY="123456"
```

## Run (Development)

```
npm run dev
```

Open `http://localhost:5173`.

## Local Setup (Avoid CORS + Proxy)

1. Pastikan `VITE_API_URL` memakai `/api` di `.env` agar request lewat proxy:

```
VITE_API_URL=/api
```

2. Pastikan proxy Vite aktif di `vite.config.ts`:

```
server: {
  proxy: {
    "/api": {
      target: "http://localhost:YOUR_BACKEND_PORT",
      changeOrigin: true,
    },
  },
},
```

3. Jalankan backend di port yang sesuai dengan `target` di atas, lalu restart dev server:

```
npm run dev
```

## Build

```
npm run build
```

## Notes

- Dev server uses Vite proxy for `/api` to avoid CORS.
- If you change `.env`, restart the dev server.
