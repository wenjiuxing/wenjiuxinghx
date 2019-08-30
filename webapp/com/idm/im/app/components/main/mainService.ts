// import {axios} from '../../config/apiService'
// export const mainService={
//
// }

import {axios} from '../../config/apiService';
import Ip from '../../config/apiIp';
export const mainService={

    GetmenuBynumber:() => {
        return new Promise(function(resolve,reject){
            axios.get(Ip.IpMain+'/get-stat-num.htm?storageName=草堂库').then(
                (headers) => {
                    resolve(headers);
                   
                }
            ).catch(
                (data) => {
                    reject(data);
                }
            )
        })
    },
    
    GetmenuYearMonth:() => {
        return new Promise(function(resolve,reject){
            axios.get(Ip.IpMain+'/get-day-data.htm?storageName=草堂库').then(
                (headers) => {
                    resolve(headers);
                    
                }
            ).catch(
                (data) => {
                    reject(data);
                }
            )
        })
    },
    GetmenuWeekDate:() => {
        return new Promise(function(resolve,reject){
            axios.get(Ip.IpMain+'/get-month-data.htm?storageName=草堂库').then(
                (headers) => {
                    resolve(headers);
                    
                }
            ).catch(
                (data) => {
                    reject(data);
                }
            )
        })
    },
    GetmenuDayDate:() => {
        return new Promise(function(resolve,reject){
            axios.get(Ip.IpMain+'/get-week-data.htm?storageName=草堂库').then(
                (headers) => {
                    resolve(headers);
                    
                }
            ).catch(
                (data) => {
                    reject(data);
                }
            )
        })
    },
    Getsite:() => {
        return new Promise(function(resolve,reject){
            axios.get(Ip.IpMain+'/get-site-info.htm?storageName=草堂库').then(
                (headers) => {
                    resolve(headers);
                    
                }
            ).catch(
                (data) => {
                    reject(data);
                }
            )
        })
    },
    
    
}