// import {axios} from '../../config/apiService'
// export const mainService={
//
// }

import {axios} from '../../config/apiService';
import Ip from '../../config/apiIp';
export const mainService={

    GetmenuByuser:(param:any) => {
        return new Promise(function(resolve,reject){
            axios.get(Ip.IpMain+'/wms/sysUacUsers/findByUserName?userName='+param).then(
                (headers) => {
                    resolve(headers);
                    console.log(headers,'header')
                }
            ).catch(
                (data) => {
                    reject(data);
                }
            )
        })
    },
    
}