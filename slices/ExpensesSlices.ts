import ExpensesModel from "../model/ExpensesModel";
import {createSlice} from "@reduxjs/toolkit";

export const initialState : ExpensesModel[] = []

const ExpensesSlice = createSlice({
    name : 'expenses',
    initialState : initialState,
    reducers : {
        addExpense: (state,action) =>{
            state.push(action.payload)
        },
        deleteExpense: (state, action) =>{
            state = state.filter(expense => expense.expense_id !== action.payload.expense_id)
            console.log(state)
            return state;
        },
        updateExpense: (state, action) =>{
            let updatedExpense = action.payload;
            const index = state.findIndex(expense => expense.expense_id === action.payload.expense_id);
            if (index > -1){
                state[index] = updatedExpense;
            }
        }
    }
})

export const {addExpense,deleteExpense,updateExpense} = ExpensesSlice.actions;
export default ExpensesSlice.reducer;