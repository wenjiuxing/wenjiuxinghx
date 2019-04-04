import request from '@/utils/request';

 export async function query() {
    return request('/api/gateway');
  }
  
  export async function queryCurrent() {
    return request('/api/currentUser');
  }