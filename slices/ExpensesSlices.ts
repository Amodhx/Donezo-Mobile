import ExpensesModel from "../model/ExpensesModel";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api_call from "../services/ApiCall";

export const initialState : ExpensesModel[] = []
export const getExpenses = createAsyncThunk(
    'expenses/getExpenses',
    async (email:string,{rejectWithValue})=>{
        try {
            const response :any = await Api_call.getApiCall('/expenses/getAllExpenses',email);
            return  response.data;
        }catch (err) {
            return rejectWithValue(err);
        }
    }
)
export const saveExpenses = createAsyncThunk(
    'expenses/saveExpenses',
    async (expense:ExpensesModel,{rejectWithValue})=>{
        try {
            const response:any = await Api_call.postApiCallWithToken('/expenses/saveExpenses',expense);
            return  response.data;
        }catch (err) {
            return rejectWithValue(err);
        }
    }
)
export const updateExpenses = createAsyncThunk(
    'expenses/updateExpenses',
    async (expense:ExpensesModel,{rejectWithValue})=>{
        try {
            const response:any = await Api_call.patchApiCall('/expenses/updateExpenses',expense);
            return response.data;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)
export const deleteExpenses = createAsyncThunk(
    'expenses/deleteExpenses',
    async (expense_id:string,{rejectWithValue})=>{
        try {
            const response:any = await Api_call.deleteApiCall('/expenses/deleteExpenses',expense_id);
            return  response.data;
        }catch (err) {
            return rejectWithValue(err);
        }
    }
)
const ExpensesSlice = createSlice({
    name : 'expenses',
    initialState : initialState,
    reducers : {},
    extraReducers :(builder)=>{
        builder
            .addCase(getExpenses.pending,(state,action)=>{
                console.log("pending get expenses: ",state,action.payload);
            })
            .addCase(getExpenses.rejected,(state, action)=>{
                console.log("failed get expenses: ",state,action.payload);
            })
            .addCase(getExpenses.fulfilled,(state, action)=>{
                console.log(state)
                return action.payload;
            });
        builder
            .addCase(saveExpenses.pending,(state, action)=>{
                console.log("pending save expenses: ",state,action.payload);
            })
            .addCase(saveExpenses.rejected,(state, action)=>{
                console.log("failed save expenses: ",state,action.payload);
            })
            .addCase(saveExpenses.fulfilled,(state, action)=>{
                state.push(action.payload)
            });
        builder
            .addCase(updateExpenses.pending,(state, action)=>{
                console.log("pending update expenses: ",state,action.payload);
            })
            .addCase(updateExpenses.rejected,(state, action)=>{
                console.log("failed update expenses: ",state,action.payload);
            })
            .addCase(updateExpenses.fulfilled,(state,action)=>{
                let updatedExpense:ExpensesModel = action.payload;
                const index = state.findIndex((expense) => expense.expense_id === updatedExpense.expense_id);
                if (index !== -1) {
                    state[index] = updatedExpense;
                }
            });
        builder
            .addCase(deleteExpenses.pending,(state, action)=>{
                console.log("pending delete expenses: ",state,action.payload);
            })
            .addCase(deleteExpenses.rejected,(state, action)=>{
                console.log("failed delete expenses: ",state,action.payload);
            })
            .addCase(deleteExpenses.fulfilled,(state, action)=>{
                state = state.filter(expense => expense.expense_id !== action.payload.expense_id);
                return state;
            })
    }
})
export default ExpensesSlice.reducer;