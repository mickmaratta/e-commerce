import { publicRequest, userRequest } from "../requestMethods";
import { deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess } from "./productSlice";
import { loginFailure, loginStart, loginSuccess } from "./userSlice"

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

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products")
        dispatch(getProductSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(getProductFailure());
    }
}

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        //DELETE FROM DB
        //const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id));
    } catch (error) {
        console.log(error)
        dispatch(deleteProductFailure());
    }
}