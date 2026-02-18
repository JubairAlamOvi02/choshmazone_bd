# Project Brief: Sunglasses Ecommerce (cPanel Native)

## Project Overview
A premium sunglasses e-commerce website built to be 100% compatible with standard cPanel shared hosting (LAMP stack). This is a migration/rebuild of the previous "choshmazone_ag" project, moving from a Supabase-centric architecture to a PHP/MySQL backend while retaining the high-end React frontend experience.

## Core Objectives
1. **cPanel Compatibility**: Ensure the entire application (frontend, backend, database) runs natively on cPanel without requiring specialized Node.js hosting or external cloud services like Supabase.
2. **Premium UX**: Maintain the boutique, high-end aesthetic and smooth SPA (Single Page Application) feel using React and Tailwind CSS v4.
3. **Local Sovereignty**: All data and assets should be stored on the user's own server.
4. **Performance**: Optimize for fast loading times on standard shared hosting environments.

## Tech Stack (Recommended)
- **Frontend**: React (Vite), Tailwind CSS v4 (Glassmorphism, smooth animations).
- **Backend**: PHP 8.2+ (RESTful API).
- **Database**: MySQL (Managed via phpMyAdmin).
- **Authentication**: JWT (JSON Web Tokens) with PHP.
- **Email**: SMTP (via cPanel Business Email).

## Key Features
- High-performance product catalog with advanced filtering.
- Dynamic delivery charge system (Bangladesh-specific).
- Secure checkout with bKash and COD.
- Full-featured Admin Dashboard for inventory and order management.
- Order tracking with OTP verification.
