import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import appReducers from "./reducers";
import logger from "redux-logger";

const ReduxStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        appReducers,
        composeEnhancers(applyMiddleware(thunk,logger))
    );
    return store;
}

export default ReduxStore;