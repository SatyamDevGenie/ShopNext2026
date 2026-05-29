import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  orders: [],
  myOrders: [],
  loading: false,
  error: null,
  success: false,
}

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      }
      const { data } = await axios.post('/api/orders', orderData, config)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order')
    }
  }
)

export const getMyOrders = createAsyncThunk(
  'orders/getMyOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      }
      const { data } = await axios.get('/api/orders/myorders', config)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders')
    }
  }
)

export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      }
      const { data } = await axios.get('/api/orders', config)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all orders')
    }
  }
)

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      }
      const { data } = await axios.put(`/api/orders/${id}/status`, { status }, config)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update order status')
    }
  }
)

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null
    },
    clearSuccess: (state) => {
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false
        state.myOrders = action.payload
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        )
        state.success = true
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearOrderError, clearSuccess } = orderSlice.actions
export default orderSlice.reducer
