

import { mainService } from './mainService'
import { main } from '../../config';
import initState from '../../config/initState';
import Main from './main';
import { StoreState } from '../../config';
import { connect, Dispatch } from 'react-redux';

export const PROCESS_ACTION = 'PROCESS_ACTION';
export type PROCESS_ACTION = typeof PROCESS_ACTION;

const BREAD_MAP = 'BREAD_MAP'
type BREAD_MAP = typeof BREAD_MAP
 const CHANGE_NUM='CHANGE_NUM'
 type CHANGE_NUM=typeof CHANGE_NUM
 interface ChangeNum{
     type:CHANGE_NUM,
     payLoad:any
 }
interface ProcessPage {
    type: PROCESS_ACTION;
}
interface BreadMap {
    type: BREAD_MAP,
    payLoad: any
}
export const MENU_CHANGE = 'MENU_CHANGE';
export type MENU_CHANGE = typeof MENU_CHANGE;

export interface MenuChange {
    type: MENU_CHANGE;
    payLoad:any
}

export function menuChange(data:any): MenuChange {
    return {
        type: MENU_CHANGE,
        payLoad:data
    }
}
export const MENU_LIST = 'MENU_LIST';
export type MENU_LIST = typeof MENU_LIST;
//将菜单数据放到menuList中
export interface MenuList {
    type: MENU_LIST;
    payLoad:any
}
type ProcessAction = ChangeNum|ProcessPage | MenuChange |MenuList| BreadMap
//请求接口
export const GetmenuByuser = (param:any,param2:any) => {
  
    return async (dispatch:any) => {
        try{
            await mainService.GetmenuByuser(param).then((res:any)=>{
            console.log(res)
                dispatch(menuList(res.data['MenuTree Information']))
                sessionStorage.setItem('history',param2)
                sessionStorage.setItem('departid',res.data['User Information'].departid==null?'':res.data['User Information'].departid)
            })
        }
        catch(error){
            param2.push('/login')
            
            // alert("菜单查询失败")
        }
    }
}

function changeNum (data:any): ChangeNum {
    return {
        type: CHANGE_NUM,
        payLoad:data
    }
}
function breadMap(datas: any): BreadMap {
    return {
        type: BREAD_MAP,
        payLoad: datas
    }
}
export function menuList(data:any): MenuList {
    return {
        type: MENU_LIST,
        payLoad:data
    }
}


export function processhusiasm(state: main = initState.main, action: ProcessAction): main {
    switch (action.type) {
        case CHANGE_NUM:
        return Object.assign({},state,{
            num:action.payLoad
        })
        case PROCESS_ACTION:
            return Object.assign({},state,{ languageName:'Hello'})
        case MENU_CHANGE:
            return Object.assign({},state,{
                showMenu : action.payLoad
            })
        case BREAD_MAP:
            return Object.assign({}, state, { data: !action.payLoad })
        case MENU_LIST:
            // console.log(action.payLoad)
            return Object.assign({},state,{
                menulist : action.payLoad
            })
        default:
            return state
    }
}

export function mapStateToProps({  main: {num ,showMenu,menulist} }: StoreState ) {
    return {
        num,
        showMenu,
        menulist,
    }
}

export function mapDispatchToProps(dispatch: Dispatch<ProcessAction>) {
    return {
        changeNum:(data:any) => dispatch(changeNum(data)),
        menuChange: (data:any) => dispatch(menuChange(data)),
        menuList: (data:any) => dispatch(menuList(data)),
        GetmenuByuser: (data:any,data1:any) => dispatch(GetmenuByuser(data,data1)),
        breadMap: (data: any) => dispatch(breadMap(data)),
    }
}
export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps,mergeProps)(Main);