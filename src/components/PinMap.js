import React, { PureComponent } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";
import { Container, Col, Row, Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";

const mapStyle = {
  width: "90%",
  height: 400,
};

const mapboxApiKey =
  "pk.eyJ1IjoidHBhc2NvYSIsImEiOiJja3I3dXVrdzEzc29uMndvNmhjcWV3NjVoIn0.scBBBg3g8asbaHfRZGpixw";

/* const params = {
    country: "pt"
} */

const CustomMarker = ({ index, marker }) => {
  return (
    <Marker longitude={marker.longitude} latitude={marker.latitude}>
      <div className="marker">
        <span>
          <b>{index}</b>
        </span>
      </div>
    </Marker>
  );
};

class MapView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 38.722252,
        longitude: -9.139337,
        zoom: 1,
      },
      tempMarker: null,
      markers: [],
    };
  }

  onSelected = (viewport, item) => {
    this.setState({
      viewport,
      tempMarker: {
        name: item.place_name,
        longitude: item.center[0],
        latitude: item.center[1],
      },
    });
  };

  add = () => {
    var { tempMarker } = this.state;

    this.setState((prevState) => ({
      markers: [...prevState.markers, tempMarker],
      tempMarker: null,
    }));
  };

  render() {
    const { viewport, tempMarker, markers } = this.state;
    return (
      <Container fluid>
        <Row className="mb-2 mt-3">
          <Col md={8} className="mx-auto">
            <h2 className="my-pin-map" style={{ color: "#6D9CD8" }}>
              My Travel Pin Map
            </h2>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={8} className="mx-auto">
            <div className="geocoder-container">
              <h5 className="me-3 print-source">Cities:</h5>
              <Geocoder
                mapboxApiAccessToken={mapboxApiKey}
                onSelected={this.onSelected}
                viewport={viewport}
                hideOnSelect={true}
                value=""
                className="print-source"
              />
              <button onClick={this.add} className="print-source ms-3">
                Add
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="omapa mb-2">
            <ReactMapGL
              mapboxApiAccessToken={mapboxApiKey}
              mapStyle="mapbox://styles/mapbox/light-v10"
              {...viewport}
              {...mapStyle}
              onViewportChange={(viewport) => this.setState({ viewport })}
              preserveDrawingBuffer={true}
              attributionControl={false}
              className="reactMap"
            >
              {tempMarker && (
                <Marker
                  longitude={tempMarker.longitude}
                  latitude={tempMarker.latitude}
                >
                  <div className="marker temporary-marker">
                    <span></span>
                  </div>
                </Marker>
              )}
              {markers.map((marker, index) => {
                return <CustomMarker marker={marker} key={index}/>;
              })}
            </ReactMapGL>
          </Col>
        </Row>
      </Container>
    );
  }
}

class PinMap extends React.Component {
  render() {
    return (
      <Container fluid className="react-to-print">
          <MapView ref={(el) => (this.componentRef = el)} />
          <ReactToPrint
            trigger={() => <Button>Print!</Button>}
            content={() => this.componentRef}
            className="mb-2"
          />
      </Container>
    );
  }
}

export default PinMap;
