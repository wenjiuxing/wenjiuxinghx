
import { query as queryUsers } from '@/services/test';

export default{
    namespace:'test',
    state:{
       name:'张三',
       age:"12",
       apple:'啦啦'
    },
    effects:{
        *name(_, {call,put}){
            const response=yield call(queryUsers);
            console.log(response)
            yield put({
                type:'change',
                payLoad:response[0].name
            });
        }
    },
    reducers:{
        change(state,action){
            return{
                ...state,
                name:action.payLoad
            }
        }
    }

}