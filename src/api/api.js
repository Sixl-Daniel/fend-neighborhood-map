import axios from 'axios';
// import ApolloClient from "apollo-boost";

// foursquare

export const FoursquareAPI = axios.create({
    baseURL: 'https://api.foursquare.com/v2/'
})

FoursquareAPI.defaults.params = {
    client_id: '0WMQXA5ZNO3WQJYWUBQ3M4NZGFUVGNPUURBMQYE1M5NPDQEA',
    client_secret: 'E1AUB33MVBWLTJ40LF1WSGWBO5K2NBBPLOXUHXQCMKTRMWHR',
    v: '20180323'
};

// yelp

// const yelpKey = 'JYNs3H0KaO6e0DsWpl211jjs-qp82KdoMQSHuegN4hdS4EV1lFVdvB9WBvVN0-WZ2BdDTI4cGL0gFNyTRCQPko_Mh0pHz15iUnLqI8Ldu0GhAWA6x6i3haF-s7t4W3Yx';
// const client = new ApolloClient({
//     uri: 'https://api.yelp.com/v3/graphql/'
// });

