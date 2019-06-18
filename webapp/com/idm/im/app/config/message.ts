import { notification, Icon } from 'antd';
export const Message = {
    getExa: (data:any) => {
        notification.success({
            message: data,
            description: '',
            duration: 2
        })
    },
    getError: () => {
        notification.error({
            message: '获取失败，请检查网络连接',
            description: '',
            duration: 2
        })
    },
    addSuccess: () => {
        notification.success({
            message: '添加成功',
            description: '',
            duration: 2
        })
    },
    addError: () => {
        notification.error({
            message: '添加失败，请检查网络连接',
            description: '',
            duration: 2
        })
    },
    delSuccess: () => {
        notification.success({
            message: '删除成功',
            description: '',
            duration: 2
        })
    },
    delError: () => {
        notification.error({
            message: '删除失败，请检查网络连接',
            description: '',
            duration: 2
        })
    },
    setSucess: () => {
        notification.success({
            message: '修改成功',
            description: '',
            duration: 2
        })
    },
    cancelSucess: () => {
        notification.success({
            message: '撤销成功',
            description: '',
            duration: 2
        })
    },
    reversalSucess: () => {
        notification.success({
            message: '冲销成功',
            description: '',
            duration: 2
        })
    },
    InboundOrderSucess: () => {
        notification.success({
            message: '生成入库单成功',
            description: '',
            duration: 2
        })
    },
    errorMes: () => {
        notification.error({
            message: '修改失败，请检查网络连接',
            description: '',
            duration: 2
        })
    },
    //选中的数据多于一条
    checkedError: () => {
        notification.error({
            message: '请选择一条数据进行操作',
            description: '',
            duration: 2
        })
    },

    //时间戳转换为时间转换成 2015-7-18  下午4:50:43格式
    formatDate: (ns: any) => {
        return new Date(ns).toLocaleString().replace(/\//g, "-");
    },
    

}
//时间戳转换为时间转换成 2015-7-18 4:50:43格式
const add0=(m: any) => { return m < 10 ? '0' + m : m }
 export const Format=(shijianchuo: any) => {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d)+ ' ' +add0(h) + ':' +add0(mm) + ':' + add0(s);
    //  return y + '-' + add0(m) + '-' + add0(d) + ' ' +add0(h) + ':' +add0(mm) + ':' + add0(s);
}
export const Formats=(shijianchuo: any) => {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    
     return y + '-' + add0(m) + '-' + add0(d) +' 00:00:00'
}
export const Formate=(shijianchuo: any) => {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    
     return y + '-' + add0(m) + '-' + add0(d) +' 23:59:59'
}
//时间转换为时间戳
    //  console.log( new Date().valueOf())
        //  console.log(new Date().getTime())