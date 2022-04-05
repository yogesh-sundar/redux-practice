const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;
const axios = require("axios");

const initialState = {
    loading: false,
    users: [],
    error: ""
}

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST: return {
            ...state, loading: true
        }
        case FETCH_USERS_SUCCESS: return {
            loading: false,
            users: action.payload,
            error: ""

        }
        case FETCH_USERS_FAILURE: return {
            loading: false,
            users: [],
            error: action.payload
        }
    }
}

//Action creators

const fetchUsers = () => {
    // Action creators return function instead of action objects and uses dispatch as an args
    return function (dispatch) {
        // this will changes the state loading into true
        dispatch(fetchUsersRequest())
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                //response.data is array of users
                const users = response.data.map((user) => user.id);
                dispatch(fetchUsersSuccess(users))
            }).catch(error => {
                // error.message is the error description
                dispatch(fetchUsersFailure(error.message))
            })

    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());