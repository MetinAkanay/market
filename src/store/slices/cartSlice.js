import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";



const initialState = {
    cartNumber: 0,
    products : []
}




export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers:{
        increment: (state,action) =>{
            state.cartNumber += 1
            state.products.push(action.payload)
        },
        cartClear: (state) =>{
            state.cartNumber = 0
            state.products = []
        },
        removeItem: (state, action) =>{
            let newProduct = state.products.filter(product => product._id !== action.payload)
            state.cartNumber -= 1
            state.products = newProduct 
        }
    },
})

export const {increment, cartClear, removeItem} = counterSlice.actions
export default counterSlice.reducer