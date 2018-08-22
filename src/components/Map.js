import React, { Component } from 'react';
import { toast } from 'react-toastify';

import { FoursquareClientId, GoogleMapsApiUrl } from '../api/api';

import MapStyle from '../MapStyle';
import Pepper from '../images/pepper.svg';
import PepperMark from '../images/pepper-mark.svg';
import FourSquareAttribution from '../images/foursquare-attribution/powered-by-foursquare-grey.svg';

class GoogleMap extends Component {

    componentDidMount() {
        const googleMapsSrc = GoogleMapsApiUrl;
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

            console.log(p)

            const foursquareLink = 'https://foursquare.com/v/' + encodeURIComponent(p.name) + '/' + p.id + '?ref=' + FoursquareClientId;


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
                <p class='foursquare-link'>
                    <a target='_blank' href=${foursquareLink}>
                        <i aria-hidden='true' class='red foursquare large icon middle aligned'></i> Visit page on Foursquare
                    </a>
                </p>
                <div class='ui divider'></div>
                <p class='foursquare-attribution'>
                    <img class='foursquare-attribution' src=${FourSquareAttribution} alt='Powered by Foursquare' />
                </p>
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

export default GoogleMap;

const loadScript = (src) => {
    const ref = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
