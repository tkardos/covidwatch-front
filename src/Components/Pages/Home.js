import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import hostname from "../Functions/Hostname";
import PieChart from "../Elements/PieChart";
import BubbleChart from '../Elements/BubbleChart';

function Home() {
  const [items, setItems] = useState([]);
  const [countryCode, selectCountryCode] = useState("");
  const [countryData, setCountryData] = useState("");

  useEffect(() => {
    fetch(`${hostname.back}/api/summary`)
      .then((response) => response.json())
      .then((json) => setItems(json.Countries));
  }, []);

  useEffect(() => {
    let country = items.find((item) => item.CountryCode === countryCode);
    setCountryData(country);
    console.log(items);
  }, [countryCode, items]);

  function mySubmit(e) {
    e.preventDefault();
    // console.log(e.target[0].value)
    selectCountryCode(e.target[0].value);
    return;
  }

  return (
    <div>
      <h1 className="h1-title-home mt-5"> Home page </h1>

      <Container className="w-100">
        <div className="mb-5" style={{ padding: 100 }} />
        <Row>
          <Col
            md={6}
            style={{ backgroundColor: "var(--basicred)", height: "150px" }}
          >
            <Form className="mt-3" onSubmit={mySubmit}>
              <Form.Group>
                <Form.Label className="mb-3"> Select a country </Form.Label>
                <Row style={{ borderRadius: "25px" }}>
                  <Col md={9}>
                    <Form.Control as="select">
                      {items.map((item) => {
                        let selected = "";
                        if (item.CountryCode === "HU") {
                          selected = "selected";
                        }
                        return (
                          <option
                            selected={selected}
                            key={item.CountryCode}
                            value={item.CountryCode}
                          >
                            {" "}
                            {item.Country}{" "}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                  <Col md={3}>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-secondary"
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Col>

          <Col md={6} style={{ backgroundColor: "lightblue" }}>
            <div className="m-3">
              <PieChart
                keys={
                  countryData
                    ? ["New confirmed", "New deaths", "New recovered"]
                    : ""
                }
                values={
                  countryData
                    ? [
                        countryData.NewConfirmed,
                        countryData.NewDeaths,
                        countryData.NewRecovered,
                      ]
                    : []
                }
                name="Daily Covid Data"
              ></PieChart>
              <p className="mt-3">
                {" "}
                {countryData
                  ? countryData.Date.replace("T", " ").replace("Z", " ")
                  : ""}{" "}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <BubbleChart
          keys={
            countryData
                ? ["New confirmed", "New deaths", "New recovered"]
                : ""
          }
          values={
            countryData
                ? [
                  countryData.NewConfirmed,
                  countryData.NewDeaths,
                  countryData.NewRecovered,
                ]
                : []
          }
          name="Daily Covid Data"
      ></BubbleChart>
    </div>
  );
}

export default Home;
