import axios from 'axios';

// import * as qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.baseURL = 'http://127.0.0.1:3002';

axios.interceptors.request.use(
  config => {
    const token=sessionStorage.getItem('token')
      // config.headers['Cache-Control']="no-cache"
      // config.headers['If-Modified-Since']='0'
      // config.headers['Content-Type']= 'application/json;charset=utf-8'
    if (token!=null) {
        // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
        config.headers.authorization = token
       
    }
    return config
},
error => {
  console.log(error)
  const data=error;
  return data
   
});
axios.interceptors.response.use(
  res => {
    const  data  = res
    return data;
  },
  error => {
    
      if (error.response) {
        if(error.response.status==401){
         
          window.location.href='http://'+document.location.hostname+'/login'
          // window.location.href='http://wms.yncic.com/login'
        }
          console.log(error.response);
         
        } else if (error.request) {
         
          console.log(error.request);
         
        } else {
             console.log('Error', error.message);
        }
 
    return Promise.reject(error)
  }
);
export { axios };