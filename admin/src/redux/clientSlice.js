import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
    name: "client",
    initialState: {
        clients: [],
        isFetching: false,
        error: false,
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
        },
        //UPDATE
        updateClientSuccess: (state, action) => {
            state.isFetching = false;
            state.clients[state.clients.findIndex((item) => item._id === action.payload._id)
            ] = action.payload
        },
        //ADD
        addClientSuccess: (state, action) => {
            state.isFetching = false;
            state.clients.push(action.payload);
        },
    },
});

export const { 
    clientStart,
    clientFailure,
    getClientSuccess,
    deleteClientSuccess,
    updateClientSuccess,
    addClientSuccess
} =clientSlice.actions;

export default clientSlice.reducer;