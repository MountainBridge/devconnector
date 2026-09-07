# DevConnector — 2026 API Modernization

A Node.js + Express + MongoDB developer social network, retained as a historical application and upgraded with a production-shaped API baseline.

## What changed

This modernization branch deliberately preserves the original domain while adding engineering practices expected from a current backend service:

- Environment-based MongoDB and JWT configuration; no credentials in source control
- Liveness and readiness probes
- Startup failure handling and graceful shutdown
- Explicit one-hour JWT lifetime
- JSON health responses suitable for containers and deployment platforms
- Reproducible local configuration through `.env.example`

The original implementation used Express, Mongoose, JWT, bcrypt and express-validator; this branch modernizes the operational boundary without pretending the original code was designed this way.

## Run locally

Prerequisites: Node.js 18+ and MongoDB 6+ (local or hosted).

```bash
npm install
cp .env.example .env
# set MONGO_URI and JWT_SECRET in your shell/environment
npm start
```

The API listens on `http://localhost:5000` by default.

### Useful endpoints

- `GET /` — service status
- `GET /health/live` — process liveness
- `GET /health/ready` — MongoDB readiness
- `POST /api/auth` — authenticate a user
- `/api/users`, `/api/profile`, `/api/posts` — existing domain APIs

## Production-shaped checklist

- [x] Secret/config separation
- [x] Health and readiness endpoints
- [x] Graceful termination
- [x] Deterministic local configuration template
- [ ] Automated unit/integration tests
- [ ] OpenAPI contract
- [ ] Container image + compose stack
- [ ] Rate limiting and security headers
- [ ] Structured logging and request correlation
- [ ] CI quality/security gates

The unchecked items are deliberate follow-up work rather than claims about the legacy application.

## Portfolio / interview angle

Use this project to discuss **API contracts, authentication boundaries, MongoDB document modeling, operational readiness, failure modes, and incremental modernization**. The deeper MongoDB engineering lab in the portfolio will isolate indexing, aggregation, consistency and transaction trade-offs so this application remains focused on product/API integration.
