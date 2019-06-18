import { createStore  ,applyMiddleware} from 'redux';
import  reducers  from '../components/indexReducer';
import { StoreState } from '.';
import thunk from 'redux-thunk'
import initState from './initState';
export default function () {
    const store = createStore<StoreState>(reducers, initState,applyMiddleware(thunk));
    return store;
}