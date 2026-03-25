# FuelFlow Pro — Customer Portal

Vue 3 + TypeScript + Tailwind CSS customer-facing portal for IFDS bulk fuel delivery management.

---

## Tech Stack

- **Vue 3** + Composition API
- **TypeScript**
- **Tailwind CSS v4**
- **Pinia** — state management
- **Vue Router 4**
- **Vite** — build tool
- **Laravel Echo + Pusher** — real-time WebSocket notifications
- **PWA** — installable on mobile via vite-plugin-pwa

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3002)
npm run dev

# Type-check only
npm run type-check
```

---

## Production Build

```bash
# Build for production (output → ./dist)
npm run build

# Preview the production build locally
npm run preview
```

---

## Deploy to Production

After building, push the `dist/` folder to the server via rsync:

```bash
# Standard deploy (adjust user and web root path as needed)
rsync -avz --delete dist/ root@srv1135836.hstgr.cloud:/var/www/portal/

# If web root is under public_html (Hostinger default)
rsync -avz --delete dist/ root@srv1135836.hstgr.cloud:/home/user/public_html/

# If using a specific vhost path
rsync -avz --delete dist/ root@srv1135836.hstgr.cloud:/var/www/html/portal/
```

### One-liner: build + deploy

```bash
npm run build && rsync -avz --delete dist/ root@srv1135836.hstgr.cloud:/var/www/portal/
```

> **Note:** Replace `root` with your actual SSH username and the path with your server's web root for this domain.

---

## Production URLs

| Service | URL |
|---------|-----|
| Customer Portal | https://portal.srv1135836.hstgr.cloud |
| API (backend) | https://customer-api.srv1135836.hstgr.cloud/api/v1 |

---

## Environment Files

| File | Purpose |
|------|---------|
| `.env` | Shared defaults |
| `.env.local` | Local overrides (gitignored) |
| `.env.production` | Production environment variables |

Key variables:

```env
VITE_API_URL=https://customer-api.srv1135836.hstgr.cloud/api/v1
VITE_REVERB_APP_KEY=fuelflow-reverb-key-prod
VITE_REVERB_HOST=portal.srv1135836.hstgr.cloud
VITE_REVERB_PORT=443
VITE_REVERB_SCHEME=https
```

---

## Project Structure

```
src/
├── assets/          Static images
├── components/      Reusable components (NotificationBell, SidebarLink, etc.)
├── composables/     Vue composables (useNotifications, useCustomerChannel)
├── layouts/         AppLayout.vue — sidebar + mobile nav wrapper
├── router/          Vue Router config
├── services/        Axios API client + Laravel Echo setup
├── stores/          Pinia stores (auth, orders, payments)
└── views/
    ├── auth/        Login, Register, ForgotPassword
    ├── orders/      OrderList, NewOrder, OrderDetail
    ├── payments/    PaymentList, MakePayment
    └── profile/     Profile, Locations, Notifications
```
