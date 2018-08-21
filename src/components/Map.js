import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import { toast } from 'react-toastify';
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

    initMap() {
        // map
        const centerPoint = { lat: 49.452102, lng: 11.076665 };
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: centerPoint,
            zoom: 15
        });
        const styledMapType = new window.google.maps.StyledMapType(MapStyle);
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

        // marker
        this.props.places.forEach(place => {
            const marker = new window.google.maps.Marker({
                position: { lat: place.venue.location.lat, lng: place.venue.location.lng },
                map: map,
                title: place.venue.name,
                animation: window.google.maps.Animation.DROP,
                icon: {
                    url: Pepper,
                    scaledSize: new window.google.maps.Size(36, 48)
                }
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
