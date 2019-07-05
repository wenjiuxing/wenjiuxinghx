// import {axios} from '../../config/apiService'
// export const mainService={
//
// }

import {axios} from '../../config/apiService';
import Ip from '../../config/apiIp';
export const mapService={

    GetmenuByuser:() => {
        return new Promise(function(resolve,reject){
            axios.get(Ip.IpMain+'/init-storage-location.htm').then(
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
    GetmenuBynum:() => {
        return new Promise(function(resolve,reject){
            axios.get(Ip.IpMain+'/init-index-num.htm').then(
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