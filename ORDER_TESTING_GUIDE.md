# Order Testing Guide - Razorpay Integration

## Complete Order Flow Testing

### Prerequisites
1. Backend server running on `http://localhost:5000`
2. Frontend server running on `http://localhost:3000`
3. MongoDB running and connected
4. Razorpay test keys configured in both `.env` files

### Step-by-Step Testing Process

## Test 1: Complete Order Flow (User)

### 1. Login as User
```
Email: Create a new user or use existing
Password: Your password
```

### 2. Add Products to Cart
- Go to Shop page
- Click on any product
- Click "Add to Cart"
- Verify cart count increases in navbar
- Add 2-3 different products

### 3. Go to Checkout
- Click on Cart icon in navbar
- Review cart items
- Click "Proceed to Checkout"

### 4. Fill Shipping Address
```
Full Name: John Doe
Street: 123 Main Street
City: Mumbai
Postal Code: 400001
Country: India
```

### 5. Complete Payment (Razorpay Test Mode)
- Click "Proceed to Payment"
- Razorpay modal should open
- Use test card details:
  ```
  Card Number: 4111 1111 1111 1111
  CVV: 123
  Expiry: 12/25
  Name: Test User
  ```
- Click "Pay Now"

### 6. Verify Order Success
- Should redirect to `/ordersuccess` page
- Should see success message
- Cart should be cleared (cart count = 0)

### 7. Check User Profile
- Click on your name in navbar
- Click "Profile"
- OR click "View My Orders" button on success page
- **You should see your order listed with:**
  - Order ID
  - Order Date
  - Status (Pending)
  - Total Amount
  - Payment ID
  - Shipping Address
  - Number of items

### 8. Verify Order in Database (Optional)
Open MongoDB Compass or shell:
```javascript
use shopnest
db.orders.find().pretty()
```

## Test 2: Admin Order Management

### 1. Login as Admin
```
Email: admin@shopnest.com
Password: password123
```

### 2. Go to Admin Dashboard
- Click on your name in navbar
- Click "Admin Dashboard"
- **You should see:**
  - Total Revenue (sum of all orders)
  - Total Orders count
  - Recent orders table

### 3. Go to Manage Orders
- Click "Manage Orders" or navigate to `/admin/orders`
- **You should see all orders from all users:**
  - Order ID
  - Date
  - Total Amount
  - Status dropdown
  - Customer details
  - Shipping address
  - Payment ID

### 4. Update Order Status
- Find the order you just created
- Click "Show Details" to expand
- Change status from dropdown:
  - Pending → Shipped → Delivered
- Status should update immediately

### 5. Verify Status Update in User Profile
- Logout from admin
- Login as the user who placed the order
- Go to Profile
- Order status should be updated

## Troubleshooting

### Issue: Orders not showing in Profile

**Check 1: Browser Console**
```
Open DevTools (F12) → Console tab
Look for errors when:
- Placing order
- Loading profile page
```

**Check 2: Network Tab**
```
Open DevTools (F12) → Network tab
Filter: XHR
Look for:
- POST /api/orders (should return 201)
- GET /api/orders/myorders (should return 200)
```

**Check 3: Backend Logs**
```
Check terminal running backend
Should see:
- "POST /api/orders 201"
- "GET /api/orders/myorders 200"
```

**Check 4: Redux State**
```
Install Redux DevTools extension
Check state.orders.myOrders array
Should contain your orders
```

### Issue: Payment succeeds but order not created

**Possible Causes:**
1. **Token expired** - Logout and login again
2. **Network error** - Check backend is running
3. **Validation error** - Check console for error messages

**Solution:**
```javascript
// Check Checkout.jsx console logs:
console.log('Creating order with data:', orderData)
console.log('Order created successfully:', result)
```

### Issue: Admin can't see orders

**Check:**
1. Admin is logged in (role: 'admin')
2. Backend route `/api/orders` requires admin middleware
3. Check browser console for 403 errors

## Expected API Responses

### Create Order (POST /api/orders)
```json
{
  "_id": "order_id_here",
  "userId": "user_id_here",
  "items": [...],
  "totalAmount": 1234.56,
  "address": {...},
  "paymentId": "pay_xxxxx",
  "status": "Pending",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Get My Orders (GET /api/orders/myorders)
```json
[
  {
    "_id": "order_id_here",
    "userId": "user_id_here",
    "items": [
      {
        "productId": "product_id",
        "qty": 2,
        "price": 299.99
      }
    ],
    "totalAmount": 1234.56,
    "address": {
      "fullName": "John Doe",
      "street": "123 Main St",
      "city": "Mumbai",
      "postalCode": "400001",
      "country": "India"
    },
    "paymentId": "pay_xxxxx",
    "status": "Pending",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## Common Errors and Solutions

### Error: "Failed to create order"
**Solution:**
- Check if user is logged in
- Verify JWT token is valid
- Check backend logs for detailed error

### Error: "Payment verification failed"
**Solution:**
- Verify Razorpay keys match in frontend and backend
- Check Razorpay dashboard for payment status
- Ensure using test mode keys

### Error: Orders array is empty
**Solution:**
- Place a new test order
- Check MongoDB for orders collection
- Verify userId matches in orders

### Error: 401 Unauthorized
**Solution:**
- Logout and login again
- Check token in localStorage
- Verify backend JWT_SECRET is set

## Testing Checklist

- [ ] User can add products to cart
- [ ] User can proceed to checkout
- [ ] Razorpay modal opens correctly
- [ ] Test payment succeeds
- [ ] Order is created in database
- [ ] Order appears in user profile
- [ ] Order appears in admin dashboard
- [ ] Admin can update order status
- [ ] Status update reflects in user profile
- [ ] Cart is cleared after successful order
- [ ] Email confirmation sent (if configured)

## Additional Notes

1. **Test Mode**: All payments are in test mode, no real money is charged
2. **Email**: Email notifications require Gmail configuration in backend `.env`
3. **Multiple Orders**: Test with multiple orders to verify list display
4. **Different Users**: Test with different user accounts to verify isolation
5. **Order History**: Orders persist across sessions (stored in MongoDB)

## Success Criteria

✅ Order successfully created after payment
✅ Order visible in user profile immediately
✅ Order visible in admin dashboard
✅ Order details are complete and accurate
✅ Status updates work correctly
✅ Cart is cleared after order
✅ No console errors during the flow
