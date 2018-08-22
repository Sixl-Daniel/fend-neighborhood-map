import React, { Component } from 'react';
import { toast } from 'react-toastify';

import MapStyle from '../MapStyle';
import Pepper from '../images/pepper.svg';
import PepperMark from '../images/pepper-mark.svg';

class Map extends Component {

    componentDidMount() {
        const googleMapsSrc = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCA5F0pGoVUQo0ZTtUInz6Kd_XfmOW3rAI&callback=onGoogleMapsLoaded';
        window.onGoogleMapsLoaded = this.onGoogleMapsLoaded;
        loadScript(googleMapsSrc);
        window.setTimeout(() => {
            if (!window.google) {
                toast.error('There was an error loading Google Maps..');
            }
        }, 3000)
    }

    componentDidUpdate = () => {
        this.initMap();
    }

    onGoogleMapsLoaded = () => {
        this.initMap();
    }

    initMap() {

        const { places, selectedPlace } = this.props;
        const GM = window.google.maps;

        // map
        const centerPoint = { lat: 49.4529119, lng: 11.0736865 };
        const map = new GM.Map(document.getElementById('map'), {
            center: centerPoint,
            zoom: 16
        });

        // style map
        const styledMapType = new GM.StyledMapType(MapStyle);
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

        // boundaries
        const bounds = new GM.LatLngBounds();

        // marker
        places.forEach( (place, index) => {
            const p = place.venue;
            const cat = p.categories[0];

            const animation = selectedPlace===index ? GM.Animation.BOUNCE : null;
            const mapIcon = selectedPlace === index ? PepperMark : Pepper;
            const scaledSizeX = selectedPlace === index ? '72' : '36';
            const scaledSizeY = selectedPlace === index ? '144' : '72';

            const infoWindowContent =
            `
            <div class="maps-info-window">
                <h2>${p.name}</h2>
                <p class="address">
                    <img 'category-icon' src='${cat.icon.prefix}bg_32${cat.icon.suffix}' alt='' title='${cat.name}'/>
                    ${p.location.address}<br />
                    ${p.location.postalCode} ${p.location.city}<br />
                    ${p.location.country}
                </p>
                <p class='category'>${cat.name}</p>
            </div>
            `;
            const infoWindow = new GM.InfoWindow({
                content: infoWindowContent
            });
            const marker = new GM.Marker({
                position: { lat: p.location.lat, lng: p.location.lng },
                map: map,
                title: p.name,
                animation: animation,
                icon: {
                    url: mapIcon,
                    scaledSize: new GM.Size(scaledSizeX, scaledSizeY),
                    anchor: new GM.Point(0, 0)
                }
            });
            bounds.extend(marker.position);
            marker.addListener('rightclick', () => {
                infoWindow.open(map, marker);
            });
            marker.addListener('click', () => {
                this.props.onChangeSelectLocation(index);
            });
        });

        // fit map in boundaries
        map.fitBounds(bounds);

    }

    render() {
        return (
            <div id='map' role="application" aria-roledescription="Map of vegan and vegetarian places" />
        );
    }
}

export default Map;

const loadScript = (src) => {
    const ref = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
