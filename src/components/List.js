import React, { Component } from 'react';
import { Accordion, List } from 'semantic-ui-react';
import { toast } from 'react-toastify';

import { FoursquareAPI as Foursquare } from '../api/api';

class ListPlaces extends Component {

    handleClick = (event, data) => {
        console.log(data.index);
        const selectedIndex = data.index;
        const activeIndex = this.props.activeIndex;
        const newIndex = activeIndex === selectedIndex ? null : selectedIndex;
        this.props.onChangeSelectLocation(newIndex);
    }

    // build accordion

    generatePlaces = () => {
        const { activeIndex } = this.props;

        return this.props.places.map( (place, index) => {
            const p = place.venue;
            const cat = p.categories[0];
            return (
                <React.Fragment key={'place-list-'+p.id}>
                    <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>{p.name}</Accordion.Title>
                    <Accordion.Content active={activeIndex === index}>
                        <List relaxed>
                            <List.Item>
                                <List.Icon color='red' name='map marker alternate' size='large' verticalAlign='middle' />
                                <List.Content>
                                    <List.Header>Address</List.Header>
                                    <List.Description>
                                        {p.location.address} &middot; {p.location.postalCode} {p.location.city} &middot; {p.location.country}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon color='red' name='tag' size='large' verticalAlign='middle' />
                                <List.Content>
                                    <List.Header>Category</List.Header>
                                    <List.Description>{cat.name}</List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Accordion.Content>
                </React.Fragment>
            )
        });
    }

    // get details from foursquare

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

    render() {
        return (
            <Accordion className='list-places' styled>
                {this.generatePlaces()}
            </Accordion>
        )
    }

}

export default ListPlaces;
