# Laila Shamsi Atelier 👗✨
Luxury Pakistani Haute Couture & Festive Pret E-Commerce Platform with Full-Stack Admin Management.

## Overview
Laila Shamsi Atelier is a high-end luxury fashion brand e-commerce platform built with modern web technologies:
- **Frontend**: React + Vite + Tailwind CSS + Lucide Icons + Cinzel/Playfair luxury typography.
- **Backend**: Node.js + Express + MongoDB + Mongoose + JWT + Multer.
- **Admin Panel**: Bespoke private admin dashboard with live order tracking, garment CRUD, and auto-logout security.

---

## Architecture & Features

### 🛍️ Client Storefront
- **Curated Collections**: Festive Formals, Ready To Wear, Silk & Co-ords, Summer Festive.
- **Interactive Garment Experience**: High-resolution gallery, colorway selection, bespoke sizing (XS, S, M, L, XL), live shopping bag drawer.
- **Direct WhatsApp Concierge**: Instant ordering and customer care via WhatsApp.

### 🛡️ Private Admin Panel
- Access via discrete lock icon in the footer (`/admin`).
- Single-master registration security (permanent lock after initial admin).
- Auto-logout on leaving or closing the admin dashboard.
- Live catalog management: Add, edit, and delete garments with local image upload & instant preview.
- Order management with real-time status updates and WhatsApp client link.

---

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
# Ensure MongoDB is running locally (mongodb://127.0.0.1:27017/lailashamsi)
npm start # Runs on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev # Runs on http://localhost:5173
```

---

## Admin Credentials
- **Email**: `admin@lailashamsi.com`
- **Password**: `adminPassword123`
*(Can also be registered via one-time master registration if database is clean)*
