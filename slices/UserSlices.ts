import UserModel from "../model/UserModel";
import {createSlice} from "@reduxjs/toolkit";

export const initialState :UserModel[] = []

const UserSlice = createSlice({
    name : 'users',
    initialState : initialState,
    reducers : {
        addUser:(state,action)=>{
            state.push(action.payload)
            return state
        },
        removeUser:(state,action)=>{
            state = []
            return state
        }
    },
})

export const {addUser,removeUser} = UserSlice.actions
export default UserSlice.reducer;