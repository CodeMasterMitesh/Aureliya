# Aureliya — eCommerce Platform (React Vite + Node.js/Express + MongoDB)

**Stack:** Frontend: React (Vite + Tailwind) | Backend: Node.js + Express | Database: MongoDB | Auth: JWT + bcrypt | Payments: Razorpay | Email: Nodemailer  
**Note:** This README covers a production-ready structure with industry-standard patterns, security considerations, and instructions to run locally (no Docker).
## Quickstart

1) Prerequisites: Node.js 18+, npm, MongoDB running locally (or Atlas URI).

2) Frontend

```
cd frontend
npm install
npm run dev
```

App runs on http://localhost:3000 (if busy, Vite will use http://localhost:3001)

3) Backend

```
cd backend
copy .env.example .env   # Fill values
npm install
npm run dev
```

API runs on http://localhost:4100 (health: /health)

The frontend is prewired to call the API base URL from Vite env `VITE_API_BASE_URL` (see `frontend/.env`).


---

## Table of Contents
1. Project Overview
2. Features (Customer & Admin)
3. Folder Structure (Frontend & Backend)
4. MongoDB Collections & Schemas (Recommended)
5. Environment Variables
6. Frontend (React + Vite) — Detailed Steps
7. Backend (Node.js + Express) — Detailed Steps
8. Authentication & Security
9. Guest Cart → Registered Cart Transfer Flow
10. Payments (Razorpay) Integration
11. Email Setup (Nodemailer)
12. Admin Panel Functionality
13. API Endpoints (Summary)
14. Scripts & Commands
15. Testing & Validation
16. Logging, Monitoring & Error Handling
17. Deployment (No Docker)
18. Performance & SEO Tips
19. Bonus Features & Next Steps
20. License & Contact

---

## 1) Project Overview
Build a full-featured eCommerce website with a React (Vite) frontend and Node/Express backend with MongoDB storing data. Features include product browsing, guest and registered carts, checkout via Razorpay, order management, customer profile, admin panel with CRUD controls, and standard security practices (JWT, bcrypt).

---

## 2) Features (Customer & Admin)

### Customer (Public & Authenticated)
- Home page: Nav, Banner, New Arrivals, Featured products, Blog preview, Footer
- Product listing with filters (category, price, rating), sorting, pagination
- Product page with images carousel, variants, stock info, reviews
- Blog listing and blog post pages
- Search functionality (fuzzy / text index)
- Guest cart (localStorage) and guest checkout (optionally)
- Customer registration & login (JWT)
- On login: transfer guest cart to user cart
- Checkout page with address selection, coupon support, order summary
- Payments via Razorpay (orders, capture, webhook support)
- Order tracking and My Orders page
- Customer profile: update details, change password
- Password reset via email (tokenized link)
- Email notifications: order confirmation, shipment, password resets

### Admin
- Admin login (separate guard / route)
- Dashboard summary (sales, orders, users, inventory alerts)
- CRUD for products, categories, banners, blogs
- View & manage all orders (change status: processing, shipped, delivered, canceled)
- Manage users (view, block/unblock)
- View analytics & export orders (CSV)
- Manage coupons and discounts
- Manage site content (Home banners, featured products)

---

## 3) Folder Structure

### Frontend (React Vite)
```
frontend/
├── public/
├── src/
│   ├── api/                # Axios instances and API wrappers
│   ├── assets/
│   ├── components/         # Reusable UI components (Header, Footer, ProductCard)
│   ├── features/           # Feature-level components (cart, auth, product)
│   ├── pages/              # Route pages (Home, Product, Cart, Checkout)
│   ├── store/              # Zustand/Redux or Context for state management
│   ├── utils/              # helpers (formatPrice, validators)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

### Backend (Node.js + Express)
```
backend/
├── src/
│   ├── controllers/
│   ├── models/             # Mongoose schemas
│   ├── routes/
│   ├── middlewares/
│   ├── services/           # Razorpay service, email service, payment verification
│   ├── utils/              # helpers, validators, error classes
│   ├── jobs/               # background jobs (emails, queue handlers)
│   ├── config/
│   ├── app.js            # Express app (exported for tests)
│   └── server.js         # Boots Mongo connection and starts HTTP server
├── tests/
├── package.json
└── README.md
```

---

## 4) MongoDB Collections & Schemas (Recommended)

> Use Mongoose for schema definitions. Keep indexes for search and relations via ObjectId refs.

### `users`
```js
{
  _id: ObjectId,
  name: String,
  email: { type: String, unique: true, index: true },
  passwordHash: String,
  phone: String,
  role: { type: String, enum: ['customer','admin'], default: 'customer' },
  addresses: [{
    label, street, city, state, postalCode, country, isDefault
  }],
  createdAt, updatedAt
}
```

### `products`
```js
{
  _id, title, slug: String (unique), description, category: ObjectId ref,
  price: Number, comparePrice: Number, currency: 'INR', stock: Number,
  images: [String], thumbnails: [String], variants: [{sku, options, price, stock}],
  attributes: { color, size, material },
  tags: [String],
  rating: { avg: Number, count: Number },
  createdAt, updatedAt
}
```

### `categories`
```js
{ _id, name, slug, parentId, description, image, createdAt, updatedAt }
```

### `carts`
```js
{
  _id, userId: ObjectId (nullable for guest), items: [{ productId, variantId, qty, price }],
  coupon: { code, discountValue }, total, createdAt, updatedAt
}
```

### `orders`
```js
{
  _id, userId, items: [{productId, variantId, qty, price }], shippingAddress, billingAddress,
  payment: { method, razorpayOrderId, razorpayPaymentId, status },
  orderStatus: 'pending'|'processing'|'shipped'|'delivered'|'cancelled',
  totals: { subtotal, tax, shipping, discount, grandTotal },
  createdAt, updatedAt
}
```

### `blogs`
```js
{ _id, title, slug, content, excerpt, authorId, tags, featuredImage, createdAt, updatedAt }
```

### `coupons`
```js
{ code, type: 'percent'|'flat', value, minOrderValue, usageLimit, expiresAt, createdAt }
```

### `payments` (optional)
```js
{ orderId, razorpayOrderId, razorpayPaymentId, amount, currency, status, rawResponse, createdAt }
```

### `notifications` (optional)
```js
{ userId, type, message, read, meta, createdAt }
```

---

## 5) Environment Variables (`.env`)

```
# Backend
PORT=4000
MONGODB_URI=mongodb://localhost:27017/bluepip_ecom
JWT_SECRET=your_jwt_secret
JWT_EXPIRES=7d
BCRYPT_SALT=12
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=yyy
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=sendgrid_api_key
FROM_EMAIL=store@example.com
FRONTEND_URL=http://localhost:3000
ADMIN_SECRET=someadminsecret  # optional for initial admin creation
```

---

## 6) Frontend — React + Vite (Detailed Steps)

### Setup
```bash
cd frontend
npm init @vitejs/app
npm install react-router-dom axios dayjs react-hook-form yup tailwindcss clsx
# choose package manager and template (react)
```

### Key Pages & Components
- `Header` — nav with categories, search, mini-cart preview (shows guest or user items)
- `Home` — banner carousel (use Swiper), featured, new arrivals, blog preview
- `ProductList` — filters, sort, pagination (server-side or client-side)
- `ProductPage` — images, details, add to cart (choose variant)
- `Cart` — localStorage for guest, API sync for logged-in users
- `Checkout` — address form, select payment method, place order (calls backend to create Razorpay order)
- `Auth` — login/register forms (validation with react-hook-form + yup)
- `Profile` — update user details, change password
- `MyOrders` — list user's orders with details and track status
- `Admin` (separate route guarded by admin token) — can be SPA with its own layout

### State Management
- Use **Redux Toolkit** or **Zustand** for cart + auth state.
- Persist cart to `localStorage` for guest users.
- On login, call API to merge guest cart to server-side cart and clear localStorage if needed.

### API layer
- Create `api/axios.js` with base URL and interceptors for JWT token attach and error handling.
- Use API wrappers: `authApi`, `productApi`, `cartApi`, `orderApi` for cleaner calls.

---

## 7) Backend — Node.js + Express (Detailed Steps)

### Setup
```bash
mkdir backend && cd backend
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken cors nodemailer razorpay joi multer multer-s3 aws-sdk
npm install --save-dev nodemon jest supertest
```

### Basic app scaffolding (`src/app.js`)
- Setup Express, JSON body parser, CORS (allow FRONTEND_URL), connect to MongoDB using mongoose.
- Use modular routers: `/api/auth`, `/api/products`, `/api/cart`, `/api/orders`, `/api/admin`, `/api/blogs`.

### Auth Flow
- **Register:** validate input, hash password with bcrypt, save user, optionally send welcome email.
- **Login:** verify password, issue JWT (access token), set token in response (client stores in localStorage or httpOnly cookie if chosen).
- **Middleware:** `authMiddleware` to verify JWT and attach `req.user`. `adminMiddleware` checks `req.user.role === 'admin'`.

### File uploads (product images)
- Use `multer` for local uploads in dev; use S3/Backblaze in prod (multer-s3 or direct S3 client). Store URLs in product docs.

### Cart Management
- **Guest Cart:** frontend localStorage.
- **User Cart in DB:** `carts` collection with `userId`. Expose endpoints to `get`, `addItem`, `updateItem`, and `clear` cart.
- **Merge on login:** endpoint `/api/auth/merge-cart` which frontend calls after login with guest items payload. Backend merges quantities, validates stock, returns updated cart.

### Orders & Payments
- **Create Order (backend):** validate cart, create DB order with `pending` status, compute totals, create Razorpay order via SDK (`razorpay.orders.create`), return `razorpayOrderId` + order id to frontend.
- **Capture Payment:** frontend completes payment flow with Razorpay Checkout using returned `razorpayOrderId`; on success, send payment details to backend to verify signature and capture if needed, then set order status to `processing`/`paid`.
- **Webhooks:** optionally implement Razorpay webhook endpoint to update payment status reliably (must secure with secret signature verification).

### Emails (Nodemailer)
- Create `services/emailService.js` to send templated emails using Nodemailer with SendGrid or SMTP settings from `.env`.
- Send emails: order confirmation, shipping update, password reset link (token stored in DB or signed JWT with short expiry).

---

## 8) Authentication & Security

- **Hash passwords:** bcrypt with salt rounds (12 recommended).
- **JWT:** Sign tokens with `JWT_SECRET`. Use access tokens with reasonable expiry (e.g., 7d) or short-lived access + refresh token flow for higher security.
- **Protect routes:** middleware to verify JWT; admin-only routes for admin router.
- **Rate limiting:** express-rate-limit on auth endpoints to prevent brute-force.
- **Input validation:** use `Joi` or `celebrate` on all endpoints.
- **CORS:** restrict allowed origins to frontend URL.
- **Store tokens securely:** Prefer httpOnly secure cookies if targeting browsers, else use localStorage with care and XSS protections.

---

## 9) Guest Cart → Registered Cart Transfer Flow

1. User adds items to cart (stored in `localStorage` as `guest_cart`).
2. On login/register success, frontend POSTs `guest_cart` to `/api/auth/merge-cart` along with token.
3. Backend fetches `user_cart` for that user, merges items (sum quantities, validate stock), updates DB cart, returns merged cart.
4. Frontend clears `guest_cart` localStorage and uses server cart for subsequent operations.

Edge cases: products removed from catalog, stock shortage — inform user the item is unavailable or reduced qty.

---

## 10) Payments (Razorpay)

### Steps (recommended flow)
1. **Backend** creates an order via Razorpay SDK providing amount and currency. Example:
```js
const order = await razorpay.orders.create({ amount: amountInPaise, currency: 'INR', receipt: orderId });
```
2. **Return** the `order.id` to frontend along with your own `orderId` (DB).
3. **Frontend** opens Razorpay Checkout with `order.id`, user completes payment.
4. **Frontend** sends the payment response (razorpay_payment_id, razorpay_order_id, signature) to backend for verification.
5. **Backend** verifies signature and marks order as `paid` and fulfils it (or captures payment if needed).
6. **(Optional)** Use webhook to listen for payment events for redundancy.

**Security:** Always verify Signature on server using `crypto` and Razorpay secret key.

---

## 11) Email Setup (Nodemailer)

- Use SMTP provider like SendGrid, Mailgun, or Amazon SES for reliability.
- Example using SendGrid (Nodemailer):
```js
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});
await transporter.sendMail({ from: process.env.FROM_EMAIL, to, subject, html });
```

---

## 12) Admin Panel Functionality (Detailed)

- **Admin Auth:** separate admin login endpoint or admin flag; protect admin UI routes using token+role.
- **Dashboard:** Orders summary (24h, 7d), total revenue, active users, low-stock alerts.
- **Products:** Add/edit/delete products, upload images, set featured/newArrival flags.
- **Orders:** View, update status, add tracking number, refund (if using Razorpay, use their refunds API).
- **Users:** View user list, ban/unban, view order history.
- **Content:** Manage blogs, banners, categories.
- **Reports:** Export orders CSV, display charts (use Chart.js in admin frontend).

---

## 13) API Endpoints (Summary)

### Auth
- `POST /api/auth/register` — register
- `POST /api/auth/login` — login
- `POST /api/auth/merge-cart` — merge guest cart after login
- `POST /api/auth/forgot-password` — send reset email
- `POST /api/auth/reset-password` — reset password

### Products
- `GET /api/products` — list (filters & pagination)
- `GET /api/products/:slug` — detail
- `POST /api/products` — admin create
- `PUT /api/products/:id` — admin update
- `DELETE /api/products/:id` — admin delete

### Cart
- `GET /api/cart` — get user cart
- `POST /api/cart` — add item
- `PUT /api/cart/item/:id` — update item qty
- `DELETE /api/cart/item/:id` — remove item

### Orders
- `POST /api/orders` — create order (returns razorpay order id)
- `POST /api/orders/verify` — verify payment and mark paid
- `GET /api/orders` — user orders / admin all orders
- `GET /api/orders/:id` — detail
- `PUT /api/orders/:id/status` — admin update status

### Admin
- `POST /api/admin/login`
- `GET /api/admin/dashboard`
- `GET /api/admin/users`, `GET /api/admin/orders`, etc.

### Blogs, Coupons, Categories — standard CRUD endpoints

---

## 14) Scripts & Commands

### Frontend
```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run preview    # preview built app
```

### Backend
```bash
cd backend
npm install
npm run dev        # nodemon src/server.js (dev)
npm run start      # node src/server.js or pm2 start
npm test           # run tests
```

---

## 15) Testing & Validation

- Unit tests for backend controllers and services using `jest` and `supertest` (API integration tests). Example included: `GET /health`.
- Frontend tests using React Testing Library and Vitest.
- E2E testing with Cypress for major flows: registration, add to cart, checkout, webhook processing.
- Test payments in Razorpay sandbox before production.

---

## 16) Logging, Monitoring & Error Handling

- Implement structured logging (winston or pino). Track request id, user id, job id in logs.
- Centralized logs: ELK stack, Papertrail, or LogDNA.
- Error middleware in Express to catch and format errors consistently (send appropriate status codes).

---

## 17) Deployment (No Docker)

### Frontend (Vite build)
- Build using `npm run build` → upload `dist/` to a static hosting provider (Vercel, Netlify, Cloudflare Pages) or serve with Nginx on VPS.

### Backend (Node.js on VPS)
- Provision a VPS (DigitalOcean/Hetzner/AWS EC2).
- Use `pm2` to run the Node app in production:
```bash
pm2 start src/app.js --name ecommerce-backend --env production
pm2 save
pm2 startup
```
- Use Nginx as reverse proxy for SSL termination (Let's Encrypt certbot). Configure upstream to PM2 app port (e.g., 4000).

### MongoDB
- Use managed MongoDB Atlas or host on VPS (replica set recommended). For production, use Atlas for backups and reliability.

### Background Jobs & Webhooks
- Run separate node process for jobs/worker or use cron for scheduled tasks. Configure webhooks (Razorpay) with public HTTPS endpoint (use ngrok for local dev).

---

## 18) Performance & SEO Tips

- Server-side rendering (SSR) or static generation (SSG) for product pages improves SEO (use Vite + React with frameworks like Vite + SSG or consider Next.js for SSR if SEO is critical).
- Implement image optimization (use WebP, responsive sizes, lazy loading).
- Caching: Redis for session caching, product listing cache, and rate-limiting.
- Use CDN for static assets (Cloudflare, BunnyCDN).

---

## 19) Bonus Features & Next Steps

- Multi-currency & multi-language support
- Wishlist, Recently Viewed, Product Recommendations (collaborative filtering)
- Admin role-based access controls (RBAC)
- Analytics dashboard with user behavior tracking
- Refunds and partial cancellations support
- Payouts and accounting integration for sellers (if marketplace)

---

## 20) License & Contact
- License: MIT (or choose appropriate license)
- Author: Replace with your name and contact email

---

**You're ready to start.** If you want, I can scaffold initial files (backend auth, products, frontend home) now. Tell me which to scaffold first.
