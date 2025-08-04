import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, actions) => {
      state.transactions = actions.payload;
    },

    addTransaction: (state, actions) => {
      state.transactions.push(actions.payload);
    },
    resetTransaction: (state) => {
      state.transactions = [];
    },
  },
});

const { reducer, actions } = transactionSlice;

export const { setTransactions, addTransaction } = actions;
export default reducer;
