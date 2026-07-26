# Samana Builders - Real Estate Management ERP

A comprehensive Real Estate Management ERP + Corporate Website for **Samana Builders & Developers (Pvt.) Ltd.**

## Technology Stack

- **Backend:** Python Django + Django REST Framework
- **Frontend:** Django Templates (Professional Blue Theme) + React.js (Vite + Tailwind CSS)
- **Database:** SQLite (dev) | PostgreSQL (production)
- **API:** RESTful API via DRF

## ERP Modules

| Module | Description |
|--------|-------------|
| Customer Management | Auto-generated IDs (CUS-XXXXX), search, booking history, customer ledger |
| Property Inventory | Projects, phases, plots with status tracking, features, price history |
| Booking & Ledger | Full workflow with booking groups, transfers, amendments, reservations |
| Installment Management | Auto-generation, templates, late fees, rescheduling, early settlement |
| Payment Verification | Multi-method (Cash/Bank/Cheque/JazzCash/Easypaisa/Raast), verification workflow |
| Receipts & Invoices | Auto-generation, duplicate handling, cancellation |
| Refunds & Allocations | Payment allocation to installments, refund processing |
| Dashboard | Real-time stats, quick actions, recent activity |
| Audit Logs | Full action history with timestamps and IP tracking |
| Role-Based Access | Super Admin, Admin, Staff with granular permissions |
| Approval Chains | Configurable approval workflows |
| Customer Aging | Receivable aging reports |

## Features

- Auto-generated IDs for customers, bookings, and payments
- CNIC validation (XXXXX-XXXXXXX-X format)
- Multi-method payment support (Cash, Bank Transfer, Cheque, JazzCash, Easypaisa, Raast)
- Cheque tracking with bank name, clearance dates, bounce handling
- Payment allocation to specific installments
- Booking transfers between customers/plots
- Booking amendments tracking
- Reservation system with token amounts and expiry
- Cancellation policies with tiered penalties
- Installment plan templates for quick setup
- Late fee configuration with grace periods
- Early settlement calculations
- Customer ledger with running balance
- Receivable aging reports
- Project phases with pricing per marla
- Plot features (corner, park facing, direction)
- Plot documents and import/export
- Price history tracking
- Role-based permission decorators (Super Admin, Admin, Staff)
- Approval chain workflows
- Login attempt tracking
- Audit trail logging all user actions
- REST API endpoints at `/api/`

## Quick Start

```bash
# Clone the repository
git clone https://github.com/kali69017/SamanaBuilders.git
cd SamanaBuilders

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start Django backend
python manage.py runserver

# (Optional) Start React frontend
cd frontend
npm install
npm run dev
```

## Default Login

- **ERP Dashboard:** http://127.0.0.1:8000/login/
- **Corporate Website:** http://localhost:5173 (when frontend is running)
- **Admin:** `admin` / `admin123`

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/customers/` | Customer CRUD + detail views |
| `/api/ledger-entries/` | Customer ledger entries |
| `/api/projects/` | Project CRUD |
| `/api/project-phases/` | Project phases |
| `/api/plots/` | Plot CRUD + detail views |
| `/api/plot-features/` | Plot features |
| `/api/price-history/` | Plot price history |
| `/api/bookings/` | Booking CRUD |
| `/api/installment-plans/` | Installment plans |
| `/api/installments/` | Individual installments |
| `/api/reservations/` | Plot reservations |
| `/api/payments/` | Payment CRUD + verification |
| `/api/receipts/` | Receipt management |
| `/api/refunds/` | Refund processing |
| `/api/payment-allocations/` | Payment-to-installment allocation |
| `/api/users/` | User management |
| `/api/audit-logs/` | Audit log viewer |

## Project Structure

```
Samana Builders/
├── samana_erp/              # Django project settings
├── core/                    # Dashboard, auth, permissions, audit logs, approval chains
├── customers/               # Customer management + ledger + aging
├── properties/              # Projects, phases, plots, features, price history
├── bookings/                # Bookings, groups, transfers, amendments, reservations
├── payments/                # Payments, receipts, refunds, allocations
├── api/                     # REST API URL routing
├── frontend/                # React.js corporate website (Vite + Tailwind)
├── templates/               # HTML templates (Professional Blue theme)
├── themes/                  # Theme samples
└── docs/                    # Design specs
```

## Testing

```bash
python manage.py test
```

## Contributors

- **Muhammad Ali Kashif** - Backend development, ERP modules
- **Mahanoor A** - React frontend, design system

## License

Private - Samana Builders & Developers (Pvt.) Ltd.
