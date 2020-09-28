import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import hostname from '../Functions/Hostname';

function Home() {
  const [summaryData, setSummaryData] = useState([]);

  async function summaryList() {
    const url = hostname.back;
    const fetchResponse = await fetch(`${url}/api/summary`)
    const sumData = await fetchResponse.json();
    setSummaryData(sumData)
    return sumData;
  }
  
  // atmenetileg itt teszteltem a fetchet, a submit-ot kovetoen

  function mySubmit(e) {
    e.preventDefault();
    summaryList()
    console.log(summaryData[0]);
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
                      <option>1</option>
                      <option>2</option>
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