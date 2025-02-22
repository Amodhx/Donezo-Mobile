import {configureStore} from "@reduxjs/toolkit";
import ExpensesSlices from "../slices/ExpensesSlices";

export const store = configureStore({
    reducer:{
        expenses : ExpensesSlices
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;