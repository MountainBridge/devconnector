# DevConnector

A Node.js/Express API for a developer social network, using MongoDB and JWT authentication.

## Local setup

1. Install Node.js and MongoDB.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and replace the JWT placeholder with a long, random local-only value.
4. Load the local variables and start the API:

   ```bash
   set -a
   source .env
   set +a
   npm start
   ```

The API listens on `PORT` (default `5000`). The database URI and JWT signing secret must be supplied through environment variables. The repository intentionally contains no real credentials.

## Environment variables

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `PORT` | Optional server port |

## Security notes

- Never commit `.env` or real credentials.
- The values in `.env.example` are placeholders for local development only.
- If credentials were previously exposed, rotate them at the provider; removing them from the current file does not revoke them.
