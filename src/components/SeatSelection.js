import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Seats from './seats.json';

export default class SeatSelection extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      seatsArray: Seats,
    }
  }

  componentDidMount() {
    console.log('in comp = ', this.state);
  }

  render() {
    return (
      <div>
        <h1> Hello React</h1>

        <Container>
          <Row>
            <Col sm="2">
              YOU
            </Col>
          </Row>
        </Container>

        {/* {
          this.state.seatsArray && this.state.seatsArray.length ?
            this.state.seatsArray.map((seat, index) => {
              <div key={index}>
                { seat.tname} 
              </div>
            })
          : null
        } */}
      </div>
    )
  }
}