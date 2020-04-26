import axios from 'axios';

// Google Maps

export const GoogleMapsApiUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCtycvmNiAf4r__uFcZoy2gbGbiWDREPOQ&callback=onGoogleMapsLoaded';

// Foursquare

export const FoursquareClientId = '0WMQXA5ZNO3WQJYWUBQ3M4NZGFUVGNPUURBMQYE1M5NPDQEA';
export const FoursquareClientSecret = 'E1AUB33MVBWLTJ40LF1WSGWBO5K2NBBPLOXUHXQCMKTRMWHR';

export const FoursquareAPI = axios.create({
    baseURL: 'https://api.foursquare.com/v2/'
})

FoursquareAPI.defaults.params = {
    client_id: FoursquareClientId,
    client_secret: FoursquareClientSecret,
    v: '20180323'
};

