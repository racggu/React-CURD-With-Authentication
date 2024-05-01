
import axios from 'axios';
import { browserName, browserVersion, isMobile, isAndroid, isIOS, isWindows, isMacOs} from "react-device-detect";


export const api_log = async (params) => {
    const time = Date.now();
    params.time = `${time}`  // log time add
    params.browser = `${browserName} ${browserVersion}`  // user browser
    params.isMobile = `${isMobile} `
    const variables = {
      isAndroid: isAndroid,
      isIOS: isIOS,
      isWindows: isWindows,
      isMacOs: isMacOs
    };
    const isOS = Object.keys(variables).filter(key => variables[key]);
    params.isOS = `${isOS} `
    // ** console.log(process.env.REACT_APP_LOGING, JSON.stringify(params));
    //axios.defaults.baseURL ='192.168.0.229:5000' // process.env.REACT_APP_LOGING
    //axios.defaults.withCredentials = true;
    try {
      await axios.post('192.168.0.229:5000', params)
      //return response.data;
    } catch (error) {
      //console.error('Error fetching data:', error);
      //throw error; // 에러를 상위로 전파
    }
};
