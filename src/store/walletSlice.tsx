import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WalletState {
  firstWalletValue: number;
  secondWalletValue: number;
  firstCurRate: number;
  secondCurRate: number;
}

const initialState: WalletState = {
  firstWalletValue: 1000,
  secondWalletValue: 2000,
  firstCurRate: 1,
  secondCurRate: 1,
};

export const walletSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.secondWalletValue += action.payload;
    },
    exchange: (state, action) => {
      state.secondWalletValue *= action.payload;
    },
    setFirstCurRate: (state, action) => {
      state.firstCurRate = action.payload;
    },
    setSecondCurRate: (state, action) => {
      state.secondCurRate = action.payload;
    },
  },
});

export const { increment, exchange, setFirstCurRate, setSecondCurRate } =
  walletSlice.actions;

export default walletSlice.reducer;
