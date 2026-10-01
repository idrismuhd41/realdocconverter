# RealDocConverter

All-in-one document conversion platform — PDF, images, Office, OCR.
API-first architecture, built to be consumed by the web app today and Flutter apps later.

## Architecture

    Client (Next.js / Flutter)
        │  HTTPS
        ▼
    Nginx (reverse proxy, aaPanel)
        │
        ├── /          → Next.js  (apps/web,  port 3000)
        └── /api/*     → NestJS   (apps/api,  port 4000)
                            │
                            ▼
                     Redis + BullMQ  ←→  Worker (apps/worker)
                            │
                            ▼
                    Conversion engines (LibreOffice, Ghostscript,
                    Poppler, qpdf, Tesseract, Sharp)

## Monorepo layout

    apps/api        NestJS HTTP API
    apps/worker     BullMQ worker process (long-running conversions)
    apps/web        Next.js frontend
    packages/shared Shared TS types (DTOs, job events, enums)
    packages/config Shared configs (eslint, tsconfig, prettier)
    infra/nginx     vhost templates
    infra/docker    optional production containers
    storage/        local storage (dev); S3 in production

## Local development

See `docs/INSTALL.md`.

## Status

Built in phases. Current phase: **Phase 1 — auth, upload, image→PDF**.