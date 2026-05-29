import { createSlice } from '@reduxjs/toolkit'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
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
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    updateCartItemQty: (state, action) => {
      const { id, qty } = action.payload
      const item = state.cartItems.find((x) => x._id === id)
      if (item) {
        item.qty = qty
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
    },
    clearCart: (state) => {
      state.cartItems = []
      localStorage.removeItem('cartItems')
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateCartItemQty,
  saveShippingAddress,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
