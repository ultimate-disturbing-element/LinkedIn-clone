import {combineReducers} from 'redux';
import userReducer from './userReducer';
import articleReducer from './articleReducer';

const rootReducer = combineReducers({
    userState:userReducer,
    articleReducer:articleReducer,
})
export default rootReducer;