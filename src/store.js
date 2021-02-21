import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import { sessionService } from 'redux-react-session';


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxThunk))
);
sessionService.initSessionService(store);
export default store;