# Project Task List: Sunglasses Ecommerce (cPanel Native)

## Phase 1: Foundation & Environment Setup
- [x] **Infrastructure Initialization**
  - [x] Initialize Vite + React project
  - [x] Initialize Memory Bank (Brief, PRD, Arch, Tasks)
  - [x] Configure Tailwind CSS v4
  - [x] Setup folder structure (`/src/components`, `/src/context`, `/src/api`, `/api/backend`)
- [x] **Backend Core (PHP)**
  - [x] Create database connection script (`db.php`)
  - [x] Implement JWT authentication system in PHP
  - [x] Create base API response handler

## Phase 2: Database & Auth Integration
- [x] **Database Schema**
  - [x] Create MySQL tables (Users, Products, Orders, Items)
- [x] **Auth Frontend Integration**
  - [x] Create AuthContext in React
  - [x] Implement Login/Logout logic connecting to PHP API
  - [ ] Setup Protected Routes for Admin

## Phase 3: Product Catalog & Filtering
- [x] **Product Management API**
  - [x] GET products with pagination/filtering
  - [x] Category and Tag mapping
- [x] **Frontend Catalogue**
  - [x] Create high-end Product Grid
  - [x] Implement debounced search and sidebar filters
  - [x] Premium Tag filtering system

## Phase 4: Product Details & Social Proof
- [x] **PDP Redesign**
  - [x] Multi-image gallery with smooth transitions
  - [x] Specifications accordion
  - [x] "You May Also Like" recommendation engine
- [x] **Review System**
  - [x] PHP API for reviews (GET/POST)
  - [x] Verified purchase badge logic

## Phase 5: Shopping Cart & Location Logic
- [x] **Cart Engine**
  - [x] React Context for Cart management
  - [x] Persistence via LocalStorage
- [x] **Bangladesh Location System**
  - [x] Integration of District/Thana data
  - [x] Dynamic delivery charge calculation (Dhaka vs Outside)

## Phase 6: Checkout & Order Processing
- [x] **Checkout Flow**
  - [x] Multi-step form for Shipping & Payment
  - [x] bKash instruction UI + manual verification step
- [x] **Order API**
  - [x] Atomic order submission in PHP (Orders + Items)
  - [ ] Automatic email confirmation via SMTP (Pending SMTP config)

## Phase 7: Admin Panel (Local Management)
- [x] **Admin UI**
  - [x] Stats Dashboard with Recharts
  - [x] Product CRUD with local image upload
  - [x] Order management list with detail modals
- [x] **Image Storage**
  - [x] PHP image upload handler (resizing/validation)

## Phase 8: SEO, Performance & PWA
- [ ] **Optimization**
  - [ ] JSON-LD Structured Data
  - [ ] Image lazy loading and WebP conversion
  - [ ] PWA manifest and service worker
- [ ] **Final QA & Deployment**
  - [ ] `.htaccess` configuration for cPanel
  - [ ] Mobile responsiveness audit
