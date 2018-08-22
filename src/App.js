import React, { Component } from 'react';
import { Grid, Header, Image, Input, Loader, Segment } from 'semantic-ui-react';
import { toast, ToastContainer } from 'react-toastify';

import ListPlaces from './components/List';
import Map from './components/Map';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Logo from './images/pepper.svg';
import { FoursquareAPI as Foursquare } from './api/api';

export default class App extends Component {
    state = {
        query: 'vegan',
        near: 'Nürnberg',
        places: [],
        selectedPlace: null,
        filterQuery: '',
        dataLoading: true,
        results: false
    }

    // mounted

    componentDidMount() {
        this.getFoursquareData(this.state.query, this.state.near);
    }

    // fetch data from Foursquare

    getFoursquareData(query, near) {
        const queryParameters = {
            query,
            near,
            radius: 3600,
            limit: 36
        };

        Foursquare.get('venues/explore?' + new URLSearchParams(queryParameters))
            .then(json => {
                const places = json.data.response.groups[0].items;
                if (places.length){
                    this.setState({
                        places: places,
                        results: true,
                        dataLoading: false
                    });
                } else {
                    toast.error('No results.');
                    this.setState({
                        dataLoading: false
                    });
                }
            })
            .catch(error => {
                toast.error('Error occured while fetching data from Foursquare.');
                this.setState({
                    dataLoading: false
                });
            });
    }

    // provide fetched data via functions

    getFilteredPlaces() {
        if (this.state.results) {
            const places = this.state.places;
            const filter = this.state.filterQuery;
            if (filter.length) {
                return places.filter(place => place.venue.name.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
            } else {
                return places;
            }
        } else {
            return [];
        }
    }

    getUnfilteredDropdownOptions() {
        if (this.state.results) {
            const places = this.state.places;
            const dropdownOptions = [];
            places.forEach(place => {
                const p = place.venue;
                dropdownOptions.push(
                    { key: `${p.id}`, value: `${p.id}`, text: `${p.name}` }
                );
            });
            return dropdownOptions;
        } else {
            return [];
        }
    }

    // events

    onChangeFilterLocations = (event, data) => {
        this.setState({
            filterQuery: data.value
        });
    }

    onChangeSelectLocation = (index) => {
        this.setState({
            selectedPlace: index
        });
    }

    // render

    render() {
        const
            { dataLoading, results, selectedPlace } = this.state,
            places = this.getFilteredPlaces();

        return (

            <Grid as='main' className="App" stackable centered reversed='mobile' verticalAlign='top'>
                <Grid.Row className="row--main-content">

                    {/* Filterable list of locations */}

                    <Grid.Column width={5} id='column-restaurants'>
                        <Image id="page-logo" centered size='tiny' src={Logo} />
                        <Header id="page-heading" inverted as='h1' textAlign='center'>
                            Vegan & Vegetarian Food in Nürnberg
                        </Header>
                        <Input onChange={this.onChangeFilterLocations} icon='filter' iconPosition='left' placeholder='Filter locations' fluid />
                        {results ? <ListPlaces places={places} activeIndex={selectedPlace} onChangeSelectLocation={this.onChangeSelectLocation} /> : null}
                    </Grid.Column>

                    {/* Map of locations */}

                    <Grid.Column width={11} id='column-map'>
                        <Segment basic id='map-wrapper' role="application" aria-roledescription="Map with markers for vegetarian restaurants">
                            {results ? <Map places={places} selectedPlace={selectedPlace} onChangeSelectLocation={this.onChangeSelectLocation} /> : null}
                            {dataLoading ? <Loader inverted active size='large' content='Loading data' /> : null}
                        </Segment>
                    </Grid.Column>

                </Grid.Row>
                <ToastContainer
                    position="top-right"
                    autoClose={8000}
                />
            </Grid>

        );
    }
}
