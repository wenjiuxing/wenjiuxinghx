import { combineReducers } from 'redux';
import {processhusiasm}from'./main/mainReducer'
// import {materialhusiasm} from './sys_order/SaleOrder/saleOrderReducer';

const rootReducer = combineReducers({
   
    main:processhusiasm,
    
});

export default rootReducer;