# Renta

**Book, Scan, Drive — The simplest way to rent vehicles.**  
Owners list their cars, renters book instantly, and QR codes make pickup seamless.  
_No paperwork, no hassle._

> **Note:** This project is still in active development. Features and documentation are subject to change.

---

## How Renta Works

A seamless experience for both **vehicle owners** and **renters**.

### For Renters

1. **Browse & Book**  
   Find the perfect vehicle, check availability, and book instantly with just a few clicks.

2. **Receive QR Code**  
   Get your unique QR code confirmation immediately after booking. No waiting, no paperwork.

3. **Quick Pickup**  
   Visit the owner’s location, show your QR code, and drive away. It’s that simple!

### For Vehicle Owners

1. **List Your Vehicle**  
   Create your account, add vehicle details, photos, and set your availability and pricing.

2. **Receive Bookings**  
   Get notified when someone books your vehicle. View all booking details in your dashboard.

3. **Scan & Confirm**  
   Simply scan the renter’s QR code to confirm the booking. Instant verification and peace of mind.

---

## Powerful Features

- **QR Code Technology**  
  Instant booking confirmation and seamless pickup process with QR codes.

- **Owner Dashboard**  
  Vehicle, and Booking management in one place.

- **Smart Scheduling _(Soon)_** \
  Automated availability management and booking conflict prevention.

- **Open Source**  
  Fully transparent and community-driven. Contribute, customize, and deploy your own rental platform with our open-source codebase.

- **Owner Location Tracking**  
  GPS integration for easy vehicle location and pickup coordination.

- **Instant Notifications _(Soon)_**  
  Real-time updates for bookings, confirmations, and important alerts.

---

## Tech Stack

- **Frontend:** React / Next.js
- **Backend:** ASP.NET Core Web API
- **Database:** PostgreSQL
- **Hosting:** Amazon Web Services (EC2, S3 & RDS)
- **Other:** QR Code generation

---

## 🚀 Next.js Frontend Deployment Guide

This guide explains how to set up and deploy the **Next.js frontend** for your project.

---

## 1. Prerequisites

- Node.js **18+** installed locally
- Git installed
- Your Next.js project code in a GitHub/GitLab/Bitbucket repository
- Vercel account (for cloud deployment)
- AWS EC2 instance (optional, if you plan to self-host)

---

## 2. Local Setup

Clone your Next.js repo:

```bash
git clone https://github.com/raishudesu/renta-frontend.git
cd renta-frontend
```

Install dependencies:

```bash
npm install
```

Run in development mode:

```bash
npm run dev
```

Access at [http://localhost:3000](http://localhost:3000).

---

## 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-api.com
NEXT_PUBLIC_SHARED_SECRET=your-secret-if-needed
NEXTAUTH_SECRET=your-nextauth-secret
```

👉 Variables prefixed with `NEXT_PUBLIC_` will be available in the frontend.
👉 Do **not** commit `.env.local` to Git.

---

## 4. Deploy on Vercel (Recommended)

1. Go to [https://vercel.com](https://vercel.com)
2. Import your GitHub repo.
3. Configure environment variables in **Vercel Project Settings → Environment Variables**.
4. Deploy — Vercel will handle build & hosting.

Your app will be available at:

```
https://your-app-name.vercel.app
```

---

✅ That’s it — your Next.js frontend is now ready!
