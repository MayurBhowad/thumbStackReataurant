import { GET_BILL, LOADING, GET_ONE_BILL } from "../types.redux";


const initialState = {
    loading: false,
    one_bill: {},
    bill: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ONE_BILL:
            return {
                ...state,
                one_bill: action.payload,
                loading: false
            }
        case GET_BILL:
            return {
                ...state,
                bill: action.payload,
                loading: false
            }
        default:
            return state;
    }
}