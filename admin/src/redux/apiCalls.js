import { publicRequest, userRequest } from "../requestMethods";
import { addClientSuccess, deleteClientSuccess, getClientSuccess, updateClientSuccess } from "./clientSlice";
import { clientFailure } from "./clientSlice";
import { clientStart } from "./clientSlice";
import { getOrdersSuccess, orderStart, orderFailure, getOrderStatsSuccess } from "./orderSlice";
import { 
    addProductSuccess,
    deleteProductSuccess, 
    getProductSuccess,
    productFailure,
    productStart, 
    updateProductSuccess} 
from "./productSlice";
import { loginFailure, loginStart, loginSuccess } from "./userSlice"

//LOGIN
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(loginFailure());
    }
}

//GET ALL PRODUCTS
export const getProducts = async (dispatch) => {
    dispatch(productStart());
    try {
        const res = await publicRequest.get("/products")
        dispatch(getProductSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(productFailure());
    }
}

//DELETE PRODUCT
export const deleteProduct = async (id, dispatch) => {
    dispatch(productStart());
    try {
        //DELETE FROM DB
        const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id));
    } catch (error) {
        console.log(error)
        dispatch(productFailure());
    }
}

//UPDATE PRODUCT
export const updateProduct = async (product, dispatch) => {
    dispatch(productStart());
    try {
        //UPDATE DB
        const res = await userRequest.put(`/products/${product._id}`, product);
        dispatch(updateProductSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(productFailure());
    }
}

//ADD PRODUCT
export const addProduct = async (product, dispatch) => {
    dispatch(productStart());
    try {
        const res = await userRequest.post(`/products/`, product)
        dispatch(addProductSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(productFailure());
    }
}

//GET ALL CLIENTS
export const getClients = async (dispatch) => {
    dispatch(clientStart());
    try {
        const res = await userRequest.get("/users");
        dispatch(getClientSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(clientFailure());
    }
}

//DELETE CLIENT
export const deleteClient = async (id, dispatch) => {
    dispatch(clientStart());
    try {
        //DELETE FROM DB
        //const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteClientSuccess(id));
    } catch (error) {
        console.log(error)
        dispatch(clientFailure());
    }
}

//UPDATE CLIENT
export const updateClient = async (client, dispatch) => {
    dispatch(clientStart());
    try {
        //UPDATE DB
        const res = await userRequest.put(`/users/${client._id}`, client);
        dispatch(updateClientSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(clientFailure());
    }
}

//ADD CLIENT
export const addClient = async (client, dispatch) => {
    dispatch(clientStart());
    try {
        const res = await userRequest.post(`/auth/register`, client)
        dispatch(addClientSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(clientFailure());
    }
}

//GET ALL ORDERS
export const getOrders = async (dispatch) => {
    dispatch(orderStart());
    try {
        const res = await userRequest.get("/orders");
        dispatch(getOrdersSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(orderFailure());
    }
}
//GET ORDER STATS
export const getOrderStats = async (dispatch) => {
    dispatch(orderStart());
    try {
        const res = await userRequest.get("/orders/income");
        res.data.sort((a, b) => a._id-b._id);
        dispatch(getOrderStatsSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(orderFailure());
    }
}