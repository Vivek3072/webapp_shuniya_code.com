import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import code_editor from './code_editor'

const appReducer = combineReducers({
    code_editor,
    session: sessionReducer
})

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;