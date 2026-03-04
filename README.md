# CureOn

CureOn is a full-stack healthcare management platform for patients, doctors, labs, pharmacies, and admins.
It supports appointments, prescriptions, lab workflows, pharmacy operations, and payments in one system.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Modules](#api-modules)
- [Default Roles](#default-roles)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Features

- JWT authentication with role-based access control
- Appointment booking and schedule management
- Doctor availability, patient history, and visit status tracking
- Prescription creation and pharmacy linkage
- Lab test requests, result uploads, and history exports
- Pharmacy inventory, order, and transaction workflows
- Admin dashboards for users, appointments, labs, pharmacies, and payments
- Payment support:
  - Stripe payment flow for appointments
  - Manual payment submission with admin approval/rejection
- Multilingual frontend support (`en`, `hi`, `te`)

## Tech Stack

### Frontend

- React 18 + Vite
- Tailwind CSS + Radix UI
- Axios
- React Router
- React Hook Form + Zod
- Vitest + Testing Library

### Backend

- Django 6
- Django REST Framework
- SimpleJWT
- django-cors-headers
- SQLite (default development database)
- Stripe SDK

## Project Structure

```text
CureOn/
|-- backend/               # Django API + business logic
|   |-- accounts/
|   |-- appointments/
|   |-- equipment/
|   |-- pharmacy/
|   |-- payments/
|   |-- config/
|   |-- requirements.txt
|   `-- manage.py
`-- frontend/              # React + Vite web app
    |-- src/
    |-- public/
    `-- package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Git

### 1) Clone the repository

```bash
git clone <your-repo-url>
cd CureOn
```

### 2) Backend setup (Django)

```bash
cd backend
python -m venv .venv
```

Activate virtual environment:

- Windows (PowerShell):

```powershell
.\.venv\Scripts\Activate.ps1
```

- macOS/Linux:

```bash
source .venv/bin/activate
```

Install dependencies and run migrations:

```bash
pip install -r requirements.txt
python manage.py migrate
```

Optional: create admin user

```bash
python manage.py createsuperuser
```

Start backend server:

```bash
python manage.py runserver
```

Backend URL: `http://127.0.0.1:8000`

### 3) Frontend setup (React)

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://127.0.0.1:5173`

## Environment Variables

Create `backend/.env`:

```env
# Email
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=true
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_email_password
DEFAULT_FROM_EMAIL=your_email@gmail.com

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
APPOINTMENT_PRICE_CENTS=2000
```

Notes:

- If email credentials are missing, backend falls back to console email backend.
- Stripe payment endpoints require Stripe keys.

## Available Scripts

### Frontend (`frontend/package.json`)

```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run build:dev    # Development mode build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
```

### Backend (Django)

```bash
python manage.py runserver
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

## API Modules

- `/api/auth/`
- `/api/appointments/`
- `/api/equipment/`
- `/api/pharmacy/`
- `/api/payments/`

## Default Roles

- `ADMIN`
- `DOCTOR`
- `PATIENT`
- `LAB`
- `PHARMACY`

Role-specific dashboards and permissions are enforced on backend APIs.

## Troubleshooting

- Frontend cannot reach backend:
  - Ensure backend is running at `http://127.0.0.1:8000`.
- 401 Unauthorized errors:
  - Re-login to refresh JWT tokens.
- Stripe payment not working:
  - Check `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` in `backend/.env`.
- CORS issues:
  - Confirm frontend is running on `http://localhost:5173` or `http://localhost:3000`.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.
