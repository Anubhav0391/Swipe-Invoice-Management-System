import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoicesSlice"; // Import your other reducers

const rootReducer = combineReducers({
  invoices: invoicesReducer,
});

export default rootReducer;
