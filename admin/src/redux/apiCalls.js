import { publicRequest, userRequest } from "../requestMethods";
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