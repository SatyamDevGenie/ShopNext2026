# Debugging Orders Issue

## Quick Checks

### 1. Check if order was created in database

Open MongoDB Compass or MongoDB shell:
```bash
# Connect to MongoDB
mongosh

# Switch to shopnest database
use shopnest

# Check all orders
db.orders.find().pretty()

# Check orders for specific user
db.orders.find({ userId: ObjectId("your_user_id_here") }).pretty()

# Count total orders
db.orders.countDocuments()
```

### 2. Check Browser Console

Open DevTools (F12) and check Console tab for:
```
Creating order with data: {...}
Order created successfully: {...}
```

### 3. Check Network Requests

Open DevTools (F12) → Network tab → Filter: Fetch/XHR

**After completing payment, you should see:**
1. `POST /api/payment/verify` - Status: 200
2. `POST /api/orders` - Status: 201 (This creates the order)
3. Response should contain the created order object

**When viewing profile:**
1. `GET /api/orders/myorders` - Status: 200
2. Response should contain array of your orders

### 4. Check Backend Logs

In the terminal running your backend, you should see:
```
POST /api/payment/verify 200
POST /api/orders 201
GET /api/orders/myorders 200
```

## Common Issues and Fixes

### Issue 1: Order created but not showing in profile

**Cause:** Profile page not refetching orders after creation

**Fix Applied:**
- Updated `OrderSuccess.jsx` to fetch orders on mount
- This ensures orders are loaded when you click "View My Orders"

**Test:**
1. Complete a payment
2. On success page, click "View My Orders"
3. Orders should appear

### Issue 2: Token expired

**Symptoms:**
- 401 Unauthorized errors
- Orders not creating
- Profile shows empty

**Fix:**
1. Logout
2. Login again
3. Try placing order again

### Issue 3: Backend not receiving order data

**Check:**
```javascript
// In Checkout.jsx, check console for:
console.log('Creating order with data:', orderData)
```

**Verify orderData contains:**
- items array with productId, qty, price
- totalAmount (number)
- address object
- paymentId (string from Razorpay)

### Issue 4: User ID mismatch

**Check:**
```javascript
// In browser console:
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
console.log('User ID:', userInfo._id || userInfo.id)
```

**Then in MongoDB:**
```javascript
db.orders.find({ userId: ObjectId("paste_user_id_here") })
```

## Step-by-Step Debugging

### Step 1: Verify Payment Works
1. Add product to cart
2. Go to checkout
3. Fill address
4. Click "Proceed to Payment"
5. Complete Razorpay test payment
6. **Check console for:** "Payment verification successful"

### Step 2: Verify Order Creation
1. After payment success
2. **Check console for:** "Creating order with data: {...}"
3. **Check console for:** "Order created successfully: {...}"
4. If you see these, order was created

### Step 3: Verify Order in Database
```bash
mongosh
use shopnest
db.orders.find().sort({createdAt: -1}).limit(1).pretty()
```
This shows the most recent order

### Step 4: Verify Order Fetch
1. Go to Profile page
2. **Check Network tab for:** GET /api/orders/myorders
3. **Check response:** Should contain array with your orders
4. **Check Redux DevTools:** state.orders.myOrders should have data

## Manual Test Script

Run this in browser console on Profile page:

```javascript
// Check Redux state
const state = window.store.getState()
console.log('My Orders:', state.orders.myOrders)
console.log('Loading:', state.orders.loading)
console.log('Error:', state.orders.error)

// Check localStorage
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
console.log('User Info:', userInfo)
console.log('User ID:', userInfo._id || userInfo.id)
console.log('Token:', userInfo.token ? 'Present' : 'Missing')

// Manually fetch orders
fetch('/api/orders/myorders', {
  headers: {
    'Authorization': `Bearer ${userInfo.token}`
  }
})
.then(res => res.json())
.then(data => console.log('Orders from API:', data))
.catch(err => console.error('Error fetching orders:', err))
```

## Expected Flow

1. **User completes payment** → Razorpay success handler called
2. **Payment verified** → POST /api/payment/verify returns success
3. **Order created** → POST /api/orders returns order object
4. **Cart cleared** → localStorage cart removed
5. **Redirect to success** → Navigate to /ordersuccess
6. **Orders fetched** → GET /api/orders/myorders called
7. **Orders displayed** → Profile page shows orders

## If Orders Still Not Showing

### Last Resort Checks:

1. **Clear browser cache and localStorage:**
```javascript
localStorage.clear()
// Then login again
```

2. **Check backend environment variables:**
```bash
cd backend
cat .env | grep JWT_SECRET
cat .env | grep MONGO_URI
```

3. **Restart both servers:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

4. **Check MongoDB connection:**
```bash
# In backend terminal, you should see:
MongoDB Connected: ...
```

5. **Test with curl:**
```bash
# Replace TOKEN with your actual token from localStorage
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:5000/api/orders/myorders
```

## Contact Points

If orders are still not showing after all checks:

1. Share browser console logs
2. Share backend terminal logs
3. Share MongoDB query results
4. Share Network tab screenshots

This will help identify exactly where the issue is occurring.
