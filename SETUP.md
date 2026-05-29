# ShopNest E-Commerce Setup Guide

Complete setup guide for ShopNest MERN stack e-commerce application.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- Razorpay account (for payment integration)

## Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables in `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shopnest
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_email_app_password
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

4. Seed the database (creates admin user and sample products):
```bash
npm run seed
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables in `.env`:
```env
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key_id
VITE_API_URL=http://localhost:5000
```

4. Copy ShopNestLogo.png to the public folder:
   - Place your logo image in `frontend/public/ShopNestLogo.png`

5. Start the frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Default Admin Credentials

After running the seed script, you can login as admin:
- **Email:** admin@shopnest.com
- **Password:** password123

## Razorpay Test Mode Setup

1. Sign up for a Razorpay account at https://razorpay.com
2. Go to Settings → API Keys
3. Generate Test API Keys
4. Copy the Key ID and Key Secret
5. Add them to both backend and frontend `.env` files

### Test Card Details for Razorpay:
- **Card Number:** 4111 1111 1111 1111
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **Name:** Any name

## Project Structure

```
shopnest-ecom-MERN/
├── backend/
│   ├── config/          # Database and Cloudinary config
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth and admin middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── server.js        # Express server
│   └── seed.js          # Database seeder
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── admin/       # Admin pages
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Public pages
│   │   ├── redux/       # Redux store and slices
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── index.html       # HTML template
│   └── vite.config.js   # Vite configuration
└── SETUP.md             # This file
```

## Features

### User Features:
- ✅ User registration and login
- ✅ Browse products with search and filters
- ✅ View product details
- ✅ Add to cart functionality
- ✅ Checkout with Razorpay payment
- ✅ Order history
- ✅ User profile

### Admin Features:
- ✅ Admin dashboard with statistics
- ✅ Product management (Create, Read, Update, Delete)
- ✅ Order management
- ✅ User management
- ✅ Order status updates

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/users` - Get all users (Admin only)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user's orders
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Payment
- `POST /api/payment/order` - Create Razorpay order
- `POST /api/payment/verify` - Verify Razorpay payment

## Troubleshooting

### Backend Issues:

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGO_URI in `.env`

**Port Already in Use:**
- Change PORT in backend `.env`
- Kill the process using port 5000

### Frontend Issues:

**API Connection Error:**
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend `.env`

**Razorpay Not Loading:**
- Check VITE_RAZORPAY_KEY_ID in frontend `.env`
- Ensure you're using test mode keys

## Production Deployment

### Backend:
1. Set `NODE_ENV=production` in `.env`
2. Use MongoDB Atlas for database
3. Deploy to services like Heroku, Railway, or Render

### Frontend:
1. Build the production bundle:
```bash
npm run build
```
2. Deploy the `dist` folder to Vercel, Netlify, or any static hosting

## Support

For issues or questions, please create an issue in the repository.

## License

MIT License
