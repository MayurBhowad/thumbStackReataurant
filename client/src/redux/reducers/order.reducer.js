import { LOADING, ADD_FOOD, REMOVE_ALL_FOOD, UPDATE_ORDER } from "../types.redux"

const initialState = {
    loading: false,
    foodItem: {},
    foodList: [],
    update: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_FOOD:
            let food_existed = state.foodList.map(el => { return el.foodTag });
            let existed = food_existed.includes(action.payload.foodTag);
            if (!existed) {
                return {
                    ...state,
                    foodList: [...state.foodList, action.payload],
                    loading: false
                }
            }
            if (existed) {
                return {
                    ...state,
                    foodList: state.foodList.map(el => el.foodTag === action.payload.foodTag ?
                        { ...el, quantity: action.payload.quantity, price: action.payload.price } : el),
                    loading: false
                }
            }
        case UPDATE_ORDER:
            return {
                ...state,
                update: action.payload,
                loading: false
            }
        case REMOVE_ALL_FOOD:
            return {
                ...state,
                foodList: [],
                loading: false
            }
        default:
            return state;
    }
}