import axios from 'axios';
import { APP_API_LOGING_URL } from '../config';
import { browserName, browserVersion, isMobile, isAndroid, isIOS, CustomView } from "react-device-detect";
import {  BrowserRouter, Route, Routes  } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";

export default class apilogaxios  {
    static async post(params) {
        console.log(APP_API_LOGING_URL)
        const time = Date.now();
        console.log(time);
        //console.log(`${browserName} ${browserVersion}`);       
        //console.log(`${isMobile} ${isAndroid}`);    
        params.browser = `${browserName} ${browserVersion}`
        console.log(useNavigate);
        console.log(params);  
        try{ 
            let response = await axios.post(APP_API_LOGING_URL, params)
            //return response.data
        } catch (error) {
        //응답 실패
        console.error(error);
        }
    }
    
}
