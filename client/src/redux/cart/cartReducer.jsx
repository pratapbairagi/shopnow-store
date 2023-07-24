import { ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADJUST_CART_QTY_REQUEST, ADJUST_CART_QTY_SUCCESS, REMOVE_FROM_CART_FAIL, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS } from "./cardType";



export const Cart_reducer = (
    state={
        loading : false,
        success : false,
        cart : [],
        error : null
    }, action) =>{
        switch(action.type){
            case ADD_TO_CART_REQUEST :
              return  {
                    ...state,
                    loading : true
                }
            case ADD_TO_CART_SUCCESS :
                const item = state.cart.find(v=>v._id === action.payload._id);
                console.log(item)
                console.log(action.payload)

                if(item){
                return {
                    ...state,
                    success : true,
                    loading : false,
                    cart : state.cart.map(v=> v._id === item._id ? action.payload : v)
                }
            }
            else{
                return {
                    ...state,
                    success :true,
                    loading :false,
                    cart : [...state.cart, action.payload]
                }
            }
        case REMOVE_FROM_CART_REQUEST :
            return  {
                ...state,
                loading : true

            }
        case REMOVE_FROM_CART_SUCCESS :
            return {
                ...state,
                loading : false,
                success : true,
                cart : state.cart.filter(v=> v._id !== action.payload._id)
            }
        case REMOVE_FROM_CART_FAIL :
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        case ADJUST_CART_QTY_REQUEST :
            return {
                ...state,
                loading : true
            }
        case ADJUST_CART_QTY_SUCCESS :
            return {
                ...state,
                loading : false,
                success : true,
                cart : state.cart.map(v=> v._id === action.payload.id ? {...v, qty : action.payload.adjust === "+" ? v.qty+=+1 : v.qty+=-1} : v)
            }

            default : return state
        }
}