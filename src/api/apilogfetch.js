
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

      try {
        const response = await fetch('http://192.168.0.229:5000'
        , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
          },
          body: JSON.stringify({ key: 'value' }), // Replace with your data
        });
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

};
