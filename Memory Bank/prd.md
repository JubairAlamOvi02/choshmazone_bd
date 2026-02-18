# Product Requirements Document: Sunglasses Ecommerce

## 1. User Interface & Experience
- **Vibe**: Luxury, boutique, minimalist, and high-contrast.
- **Key UI Elements**:
  - Glassmorphic navigation bar (50% transparency + backdrop blur).
  - Cinematic hero banners with Ken Burns effects.
  - Premium product cards with clear CTAs.
  - Responsive design optimized for mobile (OnePlus/narrow screen targets).
  - Smooth page transitions and loading states.

## 2. Storefront Features
- **Catalog**:
  - Category-based and Tag-based filtering (e.g., "Premium Tags").
  - Real-time search with debounced suggestions.
  - Sorting (Price: Low-High, Newest).
- **Product Details (PDP)**:
  - Multi-image gallery with zoom support.
  - Accordion sections for Specs, Highlights, and Shipping.
  - Related products / "You May Also Like" recommendations.
  - Review section with star ratings and verified badges.
- **Cart & Checkout**:
  - Quantity control in cart.
  - Bangladesh-specific location selection (Districts/Thanas).
  - Dynamic delivery charge (Dhaka: 60, Outside: 120).
  - Payment options: bKash (Instructions/Manual Verification) and COD.

## 3. Customer Features
- **Accounts**:
  - Register/Login with email and password.
  - Order history view.
  - Profile management.
- **Order Tracking**:
  - Phone-bound order search.
  - Secure OTP verification via Email.

## 4. Admin Panel Features
- **Dashboard**:
  - Sales overview with interactive charts.
  - Recent orders and quick stats.
- **Management**:
  - CRUD for Products (with multi-image upload).
  - Order management (Status updates, detailed breakdown).
  - Customer listing.
- **Settings**:
  - Site configuration (Delivery charges, trust badges).

## 5. Technical Requirements
- **Backend API**: PHP scripts to handle auth, DB operations, and mail.
- **Security**:
  - JWT for session management.
  - Prepared MySQL statements to prevent SQL injection.
  - Image upload validation.
- **SEO**:
  - Dynamic meta tags.
  - JSON-LD structured data for products.
- **PWA**: Installable manifest and service worker for caching.
