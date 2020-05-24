import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../App.css'

import Seats from './seats.json';

export default class SeatSelection extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      seatsArray: Seats,
      dummyArray: [1,2,3,4,5,6,7,8,9,20]
    }
  }

  componentDidMount() {
    console.log('in comp = ', this.state);
  }

  render() {
    return (
      <div>
        <h1>Movie Seat Selection</h1>

        <Container fluid="true">
          <Row className="mt-2rem">
            <h4>Gold Row</h4>
          </Row>

          <Row>
            {
              this.state.seatsArray && this.state.seatsArray.length ?
                this.state.seatsArray.map((data, index) => {
                  return <Col sm="2" key={index+'____Bhavna'}>
                    {data.tname}
                  </Col>
                })
              : null
            }
          </Row>

          <Row className="mt-2rem">
            <h4>Diamond Row</h4>
          </Row>

          <Row>
            {
              this.state.seatsArray && this.state.seatsArray.length ?
                this.state.seatsArray.map((data, index) => {
                  return <Col sm="2" key={index+'____Bhavna'}>
                    {data.tname}
                  </Col>
                })
              : null
              }
          </Row>
        </Container>
      </div>
    )
  }
}