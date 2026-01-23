import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // each item: { name, image, description, cost, quantity }
  },
  reducers: {
    // Adds a new plant or increases quantity if it already exists
    addItem: (state, action) => {
      const plant = action.payload;

      const existing = state.items.find((item) => item.name === plant.name);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...plant,
          quantity: 1,
        });
      }
    },

    // Removes an item from cart by name
    removeItem: (state, action) => {
      const name = action.payload; // we will pass the name string
      state.items = state.items.filter((item) => item.name !== name);
    },

    // Updates quantity based on { name, amount }
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;

      const item = state.items.find((i) => i.name === name);

      if (!item) return;

      // If amount goes <= 0, remove the item
      if (amount <= 0) {
        state.items = state.items.filter((i) => i.name !== name);
      } else {
        item.quantity = amount;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;