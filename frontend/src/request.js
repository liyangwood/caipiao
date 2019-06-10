import axios from 'axios';
import _ from 'lodash';

const _axios = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  // baseURL: 'https://api-wallet-ela.elastos.org/api/1',
  

});

_axios.interceptors.response.use((res)=>{
  if(res.data){
    if(res.data.code > 0){
      return Promise.resolve(res.data.data, res.data);
    }
    else{
      return Promise.reject(res.data);
    }
  }
}, (error)=>{
  return Promise.reject(error);
});

const F = {
  getSsqList(){
    return _axios.get('/ssq/list');
  }
};


export default F;