# ShopNest Frontend - React + Vite + TailwindCSS

Modern e-commerce frontend built with React, Vite, TailwindCSS, Redux Toolkit, and Razorpay integration.

## Features

- 🛍️ Complete e-commerce functionality
- 🎨 Modern UI with TailwindCSS
- 🔐 User authentication (Login/Register)
- 🛒 Shopping cart with local storage
- 💳 Razorpay payment integration (Test mode)
- 📦 Order management
- 👤 User profile with order history
- 🔧 Admin dashboard
- 📱 Fully responsive design
- ⚡ Fast performance with Vite

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Razorpay** - Payment gateway

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the frontend directory:
```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_API_URL=http://localhost:5000
```

3. Copy the ShopNestLogo.png to the `public` folder

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── admin/              # Admin pages
│   ├── AdminDashboard.jsx
│   ├── AdminOrders.jsx
│   ├── AdminProducts.jsx
│   ├── AdminUsers.jsx
│   ├── AddProduct.jsx
│   └── EditProduct.jsx
├── components/         # Reusable components
│   ├── AdminRoute.jsx
│   ├── Footer.jsx
│   ├── Loader.jsx
│   ├── Navbar.jsx
│   ├── PrivateRoute.jsx
│   └── ProductCard.jsx
├── pages/             # Public pages
│   ├── About.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Disclaimer.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── OrderSuccess.jsx
│   ├── ProductDetail.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
│   ├── ReturnPolicy.jsx
│   └── Shop.jsx
├── redux/             # Redux store and slices
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── cartSlice.js
│   │   ├── orderSlice.js
│   │   └── productSlice.js
│   └── store.js
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Features Overview

### User Features
- Browse products with search and filters
- View product details
- Add products to cart
- Checkout with Razorpay payment
- View order history
- User profile management

### Admin Features
- Dashboard with statistics
- Product management (CRUD)
- Order management
- User management
- Order status updates

## Razorpay Test Mode

The app is configured for Razorpay test mode. Use these test cards:

**Test Card Details:**
- Card Number: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

## Admin Credentials

Default admin account (from seed.js):
- Email: admin@shopnest.com
- Password: password123

## API Integration

All API calls are proxied through Vite to `http://localhost:5000/api`

Endpoints used:
- `/api/auth` - Authentication
- `/api/products` - Products
- `/api/orders` - Orders
- `/api/payment` - Razorpay payments

## Environment Variables

- `VITE_RAZORPAY_KEY_ID` - Your Razorpay key ID (test mode)
- `VITE_API_URL` - Backend API URL (default: http://localhost:5000)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
