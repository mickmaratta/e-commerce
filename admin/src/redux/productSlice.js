import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false
    },
    reducers: {
        productStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        productFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //GET ALL
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
        },
        //DELETE
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.splice(
                state.products.findIndex(item=>item._id === action.payload),
            )
        },
        //UPDATE
        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products[state.products.findIndex((item) => item._id === action.payload._id)
            ] = action.payload
        },
        //ADD
        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.push(action.payload);
        },
    },
});

export const { 
    productStart,
    productFailure,
    getProductSuccess, 
    deleteProductSuccess, 
    updateProductSuccess,
    addProductSuccess
} =productSlice.actions;

export default productSlice.reducer;