import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {allRequestedBooksByAdmin, bookIsuedReducer, returnIssuedReducer, userReducer} from './reducers/userReducer'
import {bookReducer,newBookReducer,deleteBookAdminReducer, borrowBookReducer, requestedBooks, transactionBooks} from './reducers/bookReducer'


const reducer = combineReducers({
    books: bookReducer,
    // product : productDetailsReducer,
    user:userReducer,
    // profile:profileReducer,
    // forgotPassword:forgotPasswordReducer,
    // cart:cartReducer,
    // newOrder:newOrderReducer,
    // myOrders:myOrderReducer,
    // orderDetails:orderDetailsReducer,
    // newReview:newReviewReducer,
     newBook:newBookReducer,
     bookAdmin:deleteBookAdminReducer,
     borrowBook:borrowBookReducer,
     requestedBook:requestedBooks,
     allBooksGetByAdmin:allRequestedBooksByAdmin,
     bookIssued:bookIsuedReducer,
     returnBook:returnIssuedReducer,
     transaction:transactionBooks
    // productDetailsReducers:productDetailsReducers,
    // allOrders:allOrdersReducer,
    // order:orderReducer,
    // allUsers:allUsersReducer,
    // userDetails:userDetailsReducer,
    // productReviews:productReviewsReducers,
    // review:reviewReducer,
    // dealProduct:dealProductReducers,
    // likeableProducts:likebleProductReducers,
    // globalReducer:globalReducer
})
let initialState ={
    // cart: {
    //     cartItems: localStorage.getItem("cartItems")
    //       ? JSON.parse(localStorage.getItem("cartItems"))
    //       : [],
    //     shippingInfo: localStorage.getItem("shippingInfo")
    //       ? JSON.parse(localStorage.getItem("shippingInfo"))
    //       : {},
    //   },

}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;