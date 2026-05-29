# ShopNest E-Commerce Setup Guide

Complete setup guide for the ShopNest MERN stack e-commerce application with Razorpay integration.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Razorpay account (for payment integration)
- Cloudinary account (for image uploads)

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend directory:

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
GMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Get Razorpay Test Credentials

1. Sign up at [Razorpay](https://razorpay.com/)
2. Go to Dashboard → Settings → API Keys
3. Generate Test Mode keys
4. Copy Key ID and Key Secret to your `.env` file

### 5. Get Cloudinary Credentials

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret to your `.env` file

### 6. Seed the database

```bash
npm run seed
```

This will create:
- Admin user (email: admin@shopnest.com, password: password123)
- Sample products

### 7. Start the backend server

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the frontend directory:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key_id
VITE_API_URL=http://localhost:5000
```

**Important:** Use the same Razorpay Key ID from your backend `.env` file.

### 4. Copy logo file

Copy `ShopNestLogo.png` to the `frontend/public` folder (if not already there).

### 5. Start the frontend development server

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Testing the Application

### 1. Access the application
Open your browser and go to `http://localhost:3000`

### 2. Test user registration
- Click "Register" and create a new account
- You'll be automatically logged in

### 3. Test shopping flow
- Browse products on the Shop page
- Add products to cart
- Proceed to checkout
- Fill in shipping address

### 4. Test Razorpay payment (Test Mode)

Use these test card details:
- **Card Number:** 4111 1111 1111 1111
- **CVV:** Any 3 digits (e.g., 123)
- **Expiry Date:** Any future date (e.g., 12/25)
- **Cardholder Name:** Any name

### 5. Test admin features

Login with admin credentials:
- **Email:** admin@shopnest.com
- **Password:** password123

Admin can:
- View dashboard with statistics
- Add/Edit/Delete products
- Manage orders (update status)
- View all users

## Project Structure

```
shopnest-ecom-MERN/
├── backend/
│   ├── config/          # Database and Cloudinary config
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── .env             # Environment variables
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
│   ├── .env             # Environment variables
│   ├── vite.config.js   # Vite configuration
│   └── tailwind.config.js # Tailwind configuration
└── SETUP_GUIDE.md       # This file
```

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
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user's orders
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Payment
- `POST /api/payment/order` - Create Razorpay order
- `POST /api/payment/verify` - Verify Razorpay payment

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Check if port 5000 is available

### Frontend won't start
- Check if backend is running
- Verify `.env` file exists in frontend directory
- Check if port 3000 is available

### Payment not working
- Verify Razorpay test keys are correct
- Check browser console for errors
- Ensure Razorpay script is loading

### Images not uploading
- Verify Cloudinary credentials
- Check file size (should be reasonable)
- Check network tab for upload errors

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use production MongoDB URI
3. Deploy to services like Heroku, Railway, or DigitalOcean

### Frontend
1. Update `VITE_API_URL` to production backend URL
2. Build the frontend: `npm run build`
3. Deploy `dist` folder to Vercel, Netlify, or similar

### Razorpay Production
1. Switch to Live Mode in Razorpay dashboard
2. Generate Live API keys
3. Update both backend and frontend `.env` files with live keys

## Support

For issues or questions:
- Check the README files in backend and frontend directories
- Review the code comments
- Check Razorpay documentation: https://razorpay.com/docs/

## License

MIT License
