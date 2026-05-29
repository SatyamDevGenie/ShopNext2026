# ShopNest Quick Start Guide

Get your ShopNest e-commerce application running in minutes!

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your Razorpay test keys:
```env
RAZORPAY_KEY_ID=your_test_key_id_here
RAZORPAY_KEY_SECRET=your_test_key_secret_here
```

**Frontend (.env):**
```bash
cd ../frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_RAZORPAY_KEY_ID=your_test_key_id_here
```

### Step 3: Seed Database

```bash
cd backend
npm run seed
```

This creates:
- Admin user: `admin@shopnest.com` / `password123`
- 4 sample products

### Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:3000

## 🎉 You're Ready!

Open http://localhost:3000 in your browser

### Test the Application:

1. **Browse Products** - Visit the shop page
2. **Add to Cart** - Click on any product and add to cart
3. **Register** - Create a new user account
4. **Checkout** - Use Razorpay test card:
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

5. **Admin Panel** - Login as admin:
   - Email: admin@shopnest.com
   - Password: password123
   - Access: http://localhost:3000/admin

## 📦 What's Included

### Frontend Features:
- ✅ Modern UI with TailwindCSS
- ✅ Product browsing with search & filters
- ✅ Shopping cart
- ✅ Razorpay payment integration (Test mode)
- ✅ User authentication
- ✅ Order history
- ✅ Admin dashboard
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ Fully responsive design

### Backend Features:
- ✅ RESTful API with Express.js
- ✅ MongoDB database
- ✅ JWT authentication
- ✅ Razorpay payment integration
- ✅ Image upload with Cloudinary
- ✅ Email notifications
- ✅ Admin middleware
- ✅ CORS enabled

## 🔑 Default Credentials

**Admin Account:**
- Email: admin@shopnest.com
- Password: password123

## 💳 Razorpay Test Cards

**Success:**
- Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

**Failure:**
- Card: 4000 0000 0000 0002

## 📁 Project Structure

```
shopnest-ecom-MERN/
├── backend/              # Express.js API
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   └── server.js        # Entry point
├── frontend/            # React + Vite app
│   ├── src/
│   │   ├── admin/       # Admin pages
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Public pages
│   │   └── redux/       # State management
│   └── index.html       # HTML template
└── QUICKSTART.md        # This file
```

## 🛠️ Common Commands

### Backend:
```bash
npm run dev      # Start development server
npm run seed     # Seed database
npm start        # Start production server
```

### Frontend:
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## ❓ Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running locally
- Or update MONGO_URI in backend/.env to use MongoDB Atlas

**Port Already in Use:**
- Backend: Change PORT in backend/.env
- Frontend: Change port in frontend/vite.config.js

**Razorpay Not Working:**
- Verify you're using TEST mode keys
- Check both backend and frontend .env files have the same key ID

## 📚 Next Steps

1. Customize the design and colors in `tailwind.config.js`
2. Add more products through the admin panel
3. Configure Cloudinary for image uploads
4. Set up email notifications with Gmail
5. Deploy to production (see SETUP.md)

## 🎯 Key URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:3000/admin
- Shop: http://localhost:3000/shop

## 💡 Tips

- Use Redux DevTools extension to debug state
- Check browser console for any errors
- Backend logs show in the terminal
- All API calls are proxied through Vite

## 🆘 Need Help?

Check the detailed SETUP.md file for more information.

Happy coding! 🚀
