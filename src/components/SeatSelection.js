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
      goldSeats: [],
      diamondSeats: []
    }
  }

  componentDidMount() {
    if (this.state.seatsArray && this.state.seatsArray.length) {
      this.getSeats()
    }
  }

  getSeats() {
    let goldSeats = [];
    let diamondSeats = [];

    this.state.seatsArray.forEach((seat) => {
      if (seat.tname.toString() === 'gold') {
        goldSeats.push(seat);

      } else {
        diamondSeats.push(seat);
      }
    });

    goldSeats.sort((a, b) => {
      return a.seatNumber - b.seatNumber;
    });

    diamondSeats.sort((a, b) => {
      return a.seatNumber - b.seatNumber;
    });

    this.setState({
      goldSeats: goldSeats,
      diamondSeats: diamondSeats
    });
  }

  seatSelected(dataRecieved, e) {
    console.log('e = ', e);
    console.log(dataRecieved);
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
              this.state.goldSeats && this.state.goldSeats.length ?
                this.state.goldSeats.map((data, index) => {
                  return <Col 
                    sm="2" 
                    key={index+'____Bhavna'} 
                    className={
                      "mt-2rem box" + 
                      (
                        parseInt(data.free) == parseInt(data.seatNumber) ? 
                          " cursor-pointer bg-white"
                        : " bg-grey" 
                      )
                    }
                    onClick={this.seatSelected.bind(this, data)}
                  >
                    <p className="text-center">{data.seatNumber}</p>
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
              this.state.diamondSeats && this.state.diamondSeats.length ?
                this.state.diamondSeats.map((data, index) => {
                  return <Col 
                    sm="2" 
                    key={index+'____Bhavna'} 
                    className={
                      "mt-2rem box" + 
                      (
                        parseInt(data.free) == parseInt(data.seatNumber) ? 
                          " cursor-pointer bg-white"
                        : " bg-grey" 
                      )
                    }
                    onClick={this.seatSelected.bind(this, data)}
                  >
                    <p className="text-center">{data.seatNumber}</p>
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