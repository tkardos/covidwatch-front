import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import hostname from "../Functions/Hostname";
import PieChart from "../Elements/PieChart";
import BarChart from "../Elements/BarChart";

function Home() {
  const [items, setItems] = useState([]);
  const [countryCode, selectCountryCode] = useState("");
  const [countryData, setCountryData] = useState("");
  const [ledButton, setLedButton] = useState("default");

  useEffect(() => {
    fetch(`${hostname.back}/api/summary`)
      .then((response) => response.json())
      .then((json) => setItems(json.Countries));
  }, []);

  useEffect(() => {
    let country = items.find((item) => item.CountryCode === countryCode);
    setCountryData(country);
  }, [countryCode, items]);

  function mySubmit(e) {
    e.preventDefault();
    selectCountryCode(e.target[0].value);
    return;
  }

  function led(e) {
    e.preventDefault();
    if (countryData) {
      setLedButton('d-none');
      try {
        fetch(`${hostname.back}/api/country`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              "recovered": countryData.TotalRecovered,
              "confirmed": countryData.TotalConfirmed,
              "deaths": countryData.TotalDeaths
            })
        })
          .then((response) => response.json())
          .then((json) => {            
            console.log(json)
            setLedButton('default');
            return;
          });
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <h1 className="h2 mt-5"> Covid Watch 1.0 </h1>

      <Container fluid style={{ width: "90%" }}>
        <div className="mb-5" style={{ padding: 25 }} />
        <Row className="justify-content-md-center">
          <Col
            md={6}
            style={{ backgroundColor: "var(--basicred)", height: "150px", borderRadius: "25px" }}
          >
            <Form className="mt-3" onSubmit={mySubmit}>
              <Form.Group>
                <Form.Label className="mb-3 h5"> Select a country </Form.Label>
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
                      style={{ marginRight: "10px" }}

                    />
                    <button className={'btn btn-info ' + ledButton} onClick={led}> led </button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <Row className="mt-3 justify-content-md-center">
          <Col md={5} style={{ backgroundColor: "lightblue", borderRadius: "25px", margin: "10px" }}>
            <div className="m-3">
              <PieChart
                keys={
                  countryData
                    ? ["Total recovered", "Total confirmed", "Total deaths"]
                    : ""
                }
                values={
                  countryData
                    ? [
                      countryData.TotalRecovered,
                      countryData.TotalConfirmed,
                      countryData.TotalDeaths
                    ]
                    : []
                }
                name="Total Covid Data"
              ></PieChart>
              <p className="mt-3">
                {" "}
                {countryData
                  ? countryData.Date.replace("T", " ").replace("Z", " ")
                  : ""}{" "}
              </p>
            </div>
          </Col>

          <Col md={5} style={{ backgroundColor: "lightblue", borderRadius: "25px", margin: "10px" }}>
            <div className="m-3">
              <BarChart
                keys={
                  countryData
                    ? ["Daily recovered", "Daily confirmed", "Daily deaths"]
                    : ""
                }
                values={
                  countryData
                    ? [
                      countryData.NewRecovered,
                      countryData.NewConfirmed,
                      countryData.NewDeaths
                    ]
                    : []
                }
                name="Daily Covid Data"
              ></BarChart>
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
    </div>
  );
}

export default Home;
