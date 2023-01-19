import { combineReducers } from 'redux';
import usersReducer from './user/userReducer';

const rootReducer = combineReducers({
  users: usersReducer,
});
export default rootReducer;
