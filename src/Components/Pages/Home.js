import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import hostname from '../Functions/Hostname';

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${hostname.back}/api/summary`)
    .then(response => response.json())
    .then(json => setItems(json))
  }, [])
  
  // atmenetileg itt teszteltem a fetchet, a submit-ot kovetoen

  function mySubmit(e) {
    e.preventDefault();
    console.log(e.target[0].value)
    return;
  }

  return (
    <div>
      <h1 className='h1-title-home'> Home page </h1>

      <Container className="w-100">
        <div className="mb-5" style={{ height: 100 }} />
        <Row>
          <Col md={6} style={{ backgroundColor: "pink", height: 200 }}>
            <Form className="mt-3" onSubmit={mySubmit}>
              <Form.Group controlId="selectCountry">

                <Form.Label className="mb-3"> Select a country </Form.Label>
                <Row>
                  <Col md={9} >
                    <Form.Control as="select">
                      {/* e.target[0].value = the country code */}
                      {items.map(item => {
                        return <option key={item.CountryCode} value={item.CountryCode}> {item.Country} </option>
                      })}
                    </Form.Control>
                  </Col>
                  <Col md={3}>
                    <input type="submit" value="Submit" className="btn btn-secondary" />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Col>

          <Col md={6} style={{ backgroundColor: "lightblue", height: 200 }}>
            <div className="mt-3">
              Container 2
          </div>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Home;