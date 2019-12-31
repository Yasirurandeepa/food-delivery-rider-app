import React from "react";
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import NewHeader from "./NewHeader";
import SideMenu from "./SideMenu";
import NewFooter from "./NewFooter";

class Location extends React.Component {

    state = {
        stores: [{latitude: 6.9368, longitude: 79.8525},
            {latitude: 6.9271, longitude: 79.8612},
            {latitude: 6.9385, longitude: 79.8613},
            {latitude: 6.9156, longitude: 79.8612},
            {latitude: 6.9236, longitude: 79.8638},
            {latitude: 6.9199, longitude: 79.8590}],
        lat: 6.9368, long: 79.8525
    };

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }} onClick={() => console.log("You clicked me!")}/>
        })
    };

    render() {
        return (
            <div style={{backgroundColor: "black"}}>
                <NewHeader/>
                <SideMenu/>
                <Map
                    google={this.props.google}
                    zoom={15}
                    // , left: "30%", top: "10%"
                    style={{position: "absolute", left: "30%", top: "-50%", margin: "auto"}}
                    initialCenter={{lat: 6.9271, lng: 79.8612}}
                    scrollwheel={false}
                    disableDoubleClickZoom={true}
                >
                    {this.displayMarkers()}
                </Map>
                <NewFooter/>
            </div>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDv9W_Ay061YZIrv5lOV5bP5Xj3I7MZiQQ'
})(Location);