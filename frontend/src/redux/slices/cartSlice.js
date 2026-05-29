import { createSlice } from '@reduxjs/toolkit'

// Helper function to get user-specific cart key
const getCartKey = () => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const user = JSON.parse(userInfo)
    return `cartItems_${user._id || user.id}`
  }
  return 'cartItems_guest'
}

const getShippingKey = () => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const user = JSON.parse(userInfo)
    return `shippingAddress_${user._id || user.id}`
  }
  return 'shippingAddress_guest'
}

const cartItemsFromStorage = localStorage.getItem(getCartKey())
  ? JSON.parse(localStorage.getItem(getCartKey()))
  : []

const shippingAddressFromStorage = localStorage.getItem(getShippingKey())
  ? JSON.parse(localStorage.getItem(getShippingKey()))
  : {}

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find((x) => x._id === item._id)

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        )
      } else {
        state.cartItems.push(item)
      }
      localStorage.setItem(getCartKey(), JSON.stringify(state.cartItems))
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
      localStorage.setItem(getCartKey(), JSON.stringify(state.cartItems))
    },
    updateCartItemQty: (state, action) => {
      const { id, qty } = action.payload
      const item = state.cartItems.find((x) => x._id === id)
      if (item) {
        item.qty = qty
      }
      localStorage.setItem(getCartKey(), JSON.stringify(state.cartItems))
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem(getShippingKey(), JSON.stringify(action.payload))
    },
    clearCart: (state) => {
      state.cartItems = []
      state.shippingAddress = {}
      localStorage.removeItem(getCartKey())
      localStorage.removeItem(getShippingKey())
    },
    loadUserCart: (state) => {
      const cartItems = localStorage.getItem(getCartKey())
      const shippingAddress = localStorage.getItem(getShippingKey())
      state.cartItems = cartItems ? JSON.parse(cartItems) : []
      state.shippingAddress = shippingAddress ? JSON.parse(shippingAddress) : {}
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateCartItemQty,
  saveShippingAddress,
  clearCart,
  loadUserCart,
} = cartSlice.actions

export default cartSlice.reducer
