import React from 'react';
import axios from 'axios';
import { baseUrl } from '../globalConstant/globalConstant';
/**
 * This function is used when we need to fetch data from the server
 * Its takes 3 params url,method i.e post,get,put,delete, and last parmas incase if we want to post something to the server
 * 
 * @function ApiCalls()  
 */
async function ApiCalls(url:any,method:any,params:any) {
   
    let resData;
   if(method == 'GET' || method == 'get'){
    resData = await axios.get(url)
    
   }

   if(method == 'POST' || method == 'post'){
    resData = await axios.post(url,params)
    
   }
   return resData;

}

export default ApiCalls
