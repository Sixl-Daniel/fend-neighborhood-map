import axios from 'axios';

// foursquare

export const FoursquareAPI = axios.create({
    baseURL: 'https://api.foursquare.com/v2/'
})

FoursquareAPI.defaults.params = {
    client_id: '0WMQXA5ZNO3WQJYWUBQ3M4NZGFUVGNPUURBMQYE1M5NPDQEA',
    client_secret: 'E1AUB33MVBWLTJ40LF1WSGWBO5K2NBBPLOXUHXQCMKTRMWHR',
    v: '20180323'
};

