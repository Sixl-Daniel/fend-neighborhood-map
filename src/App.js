import React, { Component } from 'react';
// import { ApolloProvider } from "react-apollo";
// import { Query } from "react-apollo";
import { Dropdown, Grid, Header, Image, Loader, Segment } from 'semantic-ui-react';
import { toast, ToastContainer } from 'react-toastify';

import Map from './components/Map';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Logo from './images/pepper.svg';
import { FoursquareAPI as Foursquare } from './api/api';

export default class App extends Component {
    state = {
        selected: null,
        query: 'vegan',
        city: 'Nürnberg',
        places: [],
        dataLoading: true
    }

    componentDidMount() {
        this.getFoursquareData(this.state.query, this.state.city);
    }

    getFoursquareData(query, city) {
        const queryParameters = {
            query: query,
            near: city
        };

        Foursquare.get('venues/explore?' + new URLSearchParams(queryParameters))
            .then(json => {
                const places = json.data.response.groups[0].items;
                if (places.length){
                    this.setState({
                        places,
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
                const errorMsg = 'Error occured while fetching data from Foursquare'
                toast.error(errorMsg + '.');
                // console.error(errorMsg + ':\n' + error);
                this.setState({
                    dataLoading: false
                });
            });
    }

    render() {
        const { places, dataLoading } = this.state;

        const dropdownOptions = [];

        places.forEach(place => {
            place = place.venue;
            dropdownOptions.push(
                { key: `${place.id}`, value: `${place.id}`, text: `${place.name}`}
            );
        });

        return (
            <Grid as='main' className="App" stackable centered reversed='mobile' verticalAlign='top'>
                <Grid.Row className="row--main-content">
                    <Grid.Column width={5} id='column-restaurants'>
                            <Image id="page-logo" centered size='tiny' src={Logo} />
                            <Header dividing inverted as='h1' textAlign='center'>
                                Vegan & Vegetarian Food in Nürnberg
                            </Header>
                        <Dropdown placeholder='Select location' fluid search deburr selection options={dropdownOptions} />
                            <Segment>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt delectus culpa vitae. Ad cum sapiente dolore provident eius et minus. Minima reprehenderit, unde aperiam omnis velit similique illo quis nihil vitae. Dolorum, numquam eveniet? Inventore enim fugiat quidem tenetur ullam natus nostrum nemo tempore esse omnis sed illo, saepe quasi reprehenderit dolore animi itaque iste officiis at est, veritatis harum accusantium placeat. Quod dignissimos ad tempora iure sed fugit obcaecati quia necessitatibus nulla nemo illum, repudiandae magni maiores dicta? Dolorum illo non ipsa reprehenderit excepturi pariatur, quisquam unde dolore quo tempore aliquid delectus corrupti commodi eveniet exercitationem, praesentium fugit nulla.</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt delectus culpa vitae. Ad cum sapiente dolore provident eius et minus. Minima reprehenderit, unde aperiam omnis velit similique illo quis nihil vitae. Dolorum, numquam eveniet? Inventore enim fugiat quidem tenetur ullam natus nostrum nemo tempore esse omnis sed illo, saepe quasi reprehenderit dolore animi itaque iste officiis at est, veritatis harum accusantium placeat. Quod dignissimos ad tempora iure sed fugit obcaecati quia necessitatibus nulla nemo illum, repudiandae magni maiores dicta? Dolorum illo non ipsa reprehenderit excepturi pariatur, quisquam unde dolore quo tempore aliquid delectus corrupti commodi eveniet exercitationem, praesentium fugit nulla.</p>
                            </Segment>
                    </Grid.Column>
                    <Grid.Column width={11} id='column-map'>
                        <Segment basic id='map-wrapper' role="application" aria-roledescription="Map with markers for vegetarian restaurants">
                            {places.length && (<Map places={places} />)}
                            {dataLoading && (<Loader inverted active size='large' content='Loading data' />)}
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
