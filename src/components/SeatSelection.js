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
      finalAmount: 0,
      isDifferent: false,

      goldSeats: [],
      diamondSeats: [],
      seatsSelected: []
    }
  }

  componentDidMount() {
    if (this.state.seatsArray && this.state.seatsArray.length) {
      this.getSeats();
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

    goldSeats = this.markSeats(goldSeats);
    diamondSeats = this.markSeats(diamondSeats);

    this.setState({
      goldSeats: goldSeats,
      diamondSeats: diamondSeats

    });
  }

  markSeats(seatsRecieved) {
    if (seatsRecieved && seatsRecieved.length) {
      seatsRecieved.forEach((rSeat) => {
        if (parseInt(rSeat.free) === parseInt(rSeat.seatNumber)) {
          rSeat.isBlocked = false;

        } else {
          rSeat.isBlocked = true;
        }
      });
    }
    return seatsRecieved;
  }

  seatSelected(dataRecieved, e) {
    let finalSeats = [];
    let isDifferent;

    this.state.isDifferent ? dataRecieved.isBlocked = false : dataRecieved.isBlocked = true;

    finalSeats = this.state.seatsSelected && this.state.seatsSelected.length ? this.state.seatsSelected : [];
    if (finalSeats && finalSeats.length) {
      const seat = this.state.seatsSelected[0];
      if (seat.tname.toString() === dataRecieved.tname.toString()) {
        finalSeats.push(dataRecieved);
        isDifferent = false;

      } else {
        finalSeats = [];
        isDifferent = true

        this.markSeats(this.state.goldSeats);
        this.markSeats(this.state.diamondSeats);
      }

    } else {
      finalSeats.push(dataRecieved);
    }

    this.setState({
      seatsSelected: finalSeats,
      isDifferent: isDifferent

    }, () => {
      let sum = 0;

      if (finalSeats && finalSeats.length) {
        finalSeats.forEach((seat) => {
          sum = parseInt(seat.price) + sum;
        });
      }

      this.setState({
        finalAmount: sum
      });
    });
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
                        data.isBlocked == false ? 
                          " cursor-pointer bg-white"
                        : " bg-grey" 
                      )
                    }
                    onClick={
                      parseInt(data.free) == parseInt(data.seatNumber) && data.isBlocked == false?
                        this.seatSelected.bind(this, data)
                      : null
                    }
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
                        data.isBlocked == false ? 
                          " cursor-pointer bg-white"
                        : " bg-grey" 
                      )
                    }
                    onClick={
                      parseInt(data.free) == parseInt(data.seatNumber) && data.isBlocked == false?
                        this.seatSelected.bind(this, data)
                      : null
                    }
                  >
                    <p className="text-center">{data.seatNumber}</p>
                  </Col>
                })
              : null
            }
          </Row>

          <Row className="mt-2rem">
            {
              this.state.seatsSelected && this.state.seatsSelected.length ?
                <h4>Total Payable Amount</h4>
              : ''
            }
          </Row>

          <Row>
            {
              this.state.seatsSelected && this.state.seatsSelected.length ?
                <ul>
                  {
                    this.state.seatsSelected.map((data, index) => {
                      return <li key={index+'____Random'}>
                        {data.seatNumber} - {data.price} &#8377;
                      </li>
                    })
                  }
                </ul>
              : null
            }
          </Row>

          <Row>
            {
              this.state.finalAmount ?
                <b>Total Amount is : {this.state.finalAmount} Rupees Only /-</b>
              : null
            }
          </Row>

          <Row>
            {
              this.state.isDifferent ?
                <div>
                  <b>Opps</b> &#128559; You are not allowed select seats from two diffrent sections at same time.
                </div>
              : null
            }
          </Row>
        </Container>
      </div>
    )
  }
}