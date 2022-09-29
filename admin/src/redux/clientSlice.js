import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
    name: "client",
    initialState: {
        clients: [],
        isFetching: false,
        error: false
    },
    reducers: {
        clientStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        clientFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //GET ALL
        getClientSuccess: (state, action) => {
            state.isFetching = false;
            state.clients = action.payload;
        },
        //DELETE
        deleteClientSuccess: (state, action) => {
            state.isFetching = false;
            state.clients.splice(
                state.clients.findIndex(item=>item._id === action.payload),1
            )
        },/*
        //UPDATE
        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products[state.clients.findIndex((item) => item._id === action.payload._id)
            ] = action.payload
        },
        //ADD
        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.push(action.payload);
        },*/
    },
});

export const { 
    clientStart,
    clientFailure,
    getClientSuccess,
    deleteClientSuccess
} =clientSlice.actions;

export default clientSlice.reducer;