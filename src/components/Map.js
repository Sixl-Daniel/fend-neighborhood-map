import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import { toast } from 'react-toastify';

import { FoursquareAPI as Foursquare } from '../api/api';

import MapStyle from '../MapStyle';
import Pepper from '../images/pepper.svg';

class Map extends Component {

    componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) {
            if (isScriptLoadSucceed) {
                this.initMap()
            } else {
                toast.error('Map could not be loaded.');
            }
        }
    }

    componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;
        if (isScriptLoaded && isScriptLoadSucceed) {
            this.initMap();
        }
    }

    getDetailsForPlace = (id) => {
        Foursquare.get('venues/' + id)
            .then(json => {
                const details = json.data.response.venue;
                if (details.length) {
                    return details
                } else {
                    return 'No details found.'
                }
            })
            .catch(error => {
                toast.error('Error occured while fetching details from Foursquare.');
            });
    }

    initMap() {
        const GM = window.google.maps;

        // map
        const centerPoint = { lat: 49.452102, lng: 11.076665 };
        const map = new GM.Map(document.getElementById('map'), {
            center: centerPoint,
            zoom: 15
        });
        const styledMapType = new GM.StyledMapType(MapStyle);
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

        // marker
        this.props.places.forEach(place => {
            const p = place.venue;
            const infoWindowContent =
            `
            <div class="maps-info-window">
                <h2>${p.name}</h2>
                <p class="address">
                    <img src='${p.categories[0].icon.prefix}bg_32${p.categories[0].icon.suffix}' alt=''/>
                    ${p.location.address}<br />
                    ${p.location.postalCode} ${p.location.city}<br />
                    ${p.location.country}
                </p>
                <p class="category">${p.categories[0].name}</p>
            </div>
            `;
            const infoWindow = new GM.InfoWindow({
                content: infoWindowContent
            });
            const marker = new GM.Marker({
                position: { lat: place.venue.location.lat, lng: place.venue.location.lng },
                map: map,
                title: p.name,
                animation: GM.Animation.DROP,
                icon: {
                    url: Pepper,
                    scaledSize: new GM.Size(36, 48),
                    anchor: new GM.Point(0, 0)
                }
            });
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        });
    }

    render() {
        return (
            <div id='map' />
        );
    }
}

export default scriptLoader(
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyCA5F0pGoVUQo0ZTtUInz6Kd_XfmOW3rAI'
)(Map)
