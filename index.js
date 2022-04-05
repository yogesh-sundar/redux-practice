const redux = require("redux");
const reduxLogger = require ("redux-logger")
const createStore = redux.createStore;

//To combine two or more reducers into one reducer
const combineReducers = redux.combineReducers;
// Creating logger of middleware
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();


// Action

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "buy_icecream"

function buy_cake() {
    return {
        type: BUY_CAKE,
        info: "first redux action"
    }
}

function buy_Icecream() {
    return {
        type: BUY_ICECREAM
    }
}


// Reducer (previousState, action)=>newState

//state declaration

// const initialValue = {
//     numberOfCakes: 10,
//     numberOfIceCreams: 20
// }

const initialCake = {
    numberOfCakes: 10
}
const initialIceCream = {
    numberOfIceCreams: 20
}

// creating separate reducer function for both ice and cake

const cakeReducer = (state = initialCake, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state, numberOfCakes: state.numberOfCakes - 1
        }
        default: return state
    }
}

const iceCreamReducer = (state = initialIceCream, action)=>{
    switch(action.type){
        case BUY_ICECREAM: return{
            ...state,
            numberOfIceCreams: state.numberOfIceCreams-1
        }
        default: return state
    }
}

// creating reducer function

// Combining multiple actions in a single reducer will cause trouble while debugging
// const reducer = (state = initialValue, action) => {
//     switch (action.type) {
//         case BUY_CAKE: return {
//             // In reality state contains multiple properties so before updating
//             // the state we must take copy of the state by using ...spread operator
//             ...state,
//             numberOfCakes: state.numberOfCakes - 1
//         }
//         case BUY_ICECREAM: return {
//             ...state, numberOfIceCreams: state.numberOfIceCreams - 1
//         }
//         //In case there is no action it defaultly return state value
//         default: return state
//     }
// }

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})


// i)creating store for entire application
//ii) passing applymiddleware as an argument with logger
const store = createStore(rootReducer, applyMiddleware(logger))

// ii)Accessing the state via getState()
console.log("initial State", store.getState())

// register and unregistering the listeners via subscribe(listeners)
const unsubscribe = store.subscribe(() => console.log("Updated State", store.getState()))
// Updating the state via dispatch(action)
store.dispatch(buy_cake());
store.dispatch(buy_cake());
store.dispatch(buy_cake());
store.dispatch(buy_Icecream());
store.dispatch(buy_Icecream());
//unregistering the listeners
unsubscribe()