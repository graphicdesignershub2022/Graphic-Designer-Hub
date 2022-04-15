import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { designerDetailsReducer, designerReducer, loginReducer, newReviewReducer } from "./reducers/designerReducer";
import { userReducer,profileUserReducer, forgotPasswordReducer } from "./reducers/userReducer";
import { myOrdersReducer, orderDetailsReducer } from "./reducers/orderReducer";



const reducer = combineReducers({
    designers : designerReducer,
    designerDetails : designerDetailsReducer,
    user : userReducer,
    profile : profileUserReducer,
    forgotPassword: forgotPasswordReducer,
    newReview :  newReviewReducer,
    designer : loginReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    
});

let initialState={};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;