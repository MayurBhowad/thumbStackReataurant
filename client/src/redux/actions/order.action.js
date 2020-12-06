import axios from 'axios';

import { ADD_FOOD, GET_BILL, LOADING, REMOVE_ALL_FOOD, GET_ONE_BILL, UPDATE_ORDER } from "../types.redux"


export const addFood = (orderData) => dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: ADD_FOOD, payload: orderData })
}

export const updateFood = (itemData, history) => dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: UPDATE_ORDER, payload: itemData });
    itemData.foodList.map(item => {
        dispatch({ type: ADD_FOOD, payload: item });
        history.push('/')
    })
}

export const checkOut = (billDetails, history) => dispatch => {
    dispatch({ type: LOADING })
    axios.post('/general/recieveBill', billDetails).then(ress => {
        dispatch({ type: GET_ONE_BILL, payload: ress.data })
        history.push('/billDetails');
    })
    dispatch({ type: REMOVE_ALL_FOOD })
}

export const removeAllFood = () => dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: REMOVE_ALL_FOOD });
}

export const getBillDetails = (billNumber, history) => dispatch => {
    dispatch({ type: LOADING })
    axios.get(`/general/billNumber/${billNumber}`)
        .then(res => {
            dispatch({
                type: GET_BILL,
                payload: res.data
            })
            history.push('/billDetails')
        })
}
export const getBillDetailsByPhone = (phoneNumber, history) => dispatch => {
    dispatch({ type: LOADING })
    axios.get(`/general/phoneNumber/${phoneNumber}`)
        .then(res => {
            dispatch({
                type: GET_BILL,
                payload: res.data
            })
            history.push('/billDetails')
        })
}