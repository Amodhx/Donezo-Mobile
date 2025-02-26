import {configureStore} from "@reduxjs/toolkit";
import ExpensesSlices from "../slices/ExpensesSlices";
import UserSlices from "../slices/UserSlices";

export const store = configureStore({
    reducer:{
        expenses : ExpensesSlices,
        user : UserSlices
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    })
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;