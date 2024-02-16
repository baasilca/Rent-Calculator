// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: "test", // Initial state
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload }; // Create a new state object with the updated user
    },
  },
});


export const { setUser } = userSlice.actions; // Export action creators
export default userSlice.reducer; // Export the reducer
