import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import hostname from "../Functions/Hostname";
import GlobalPieChart from "../Elements/GlobalPieChart";
import GlobalBarChart from "../Elements/GlobalBarChart";

function Home() {
  const [items, setItems] = useState([]);
  const [countryCode, selectCountryCode] = useState("");
  const [countryData, setCountryData] = useState("");
  const [globalData, setGlobalData] = useState("");
  const [ledButton, setLedButton] = useState("default");
  const [globalButton, setGlobalButton] = useState("d-none")

  useEffect(() => {
    fetch(`${hostname.back}/api/summary`)
      .then((response) => response.json())
      .then((json) => {
        setItems(json.Countries)
        setGlobalData(json.Global)
      })
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

  function checkBoxHandle(e) {
    if (globalButton === 'd-none') {
      setGlobalButton('default');
    } else {
      setGlobalButton('d-none')
    }
    return;
  }

  function led(e) {
    e.preventDefault();
    if (countryData) {
      setLedButton('d-none');
      let sendActive = countryData.TotalConfirmed - (countryData.TotalRecovered + countryData.TotalDeaths)
      setTimeout(() => {
        try {
          fetch(`${hostname.back}/api/country`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                "recovered": countryData.TotalRecovered,
                "confirmed": sendActive,
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
      }, 3000)
    }
  }

  return (
    <div>
      <h3 className="h2 mt-5"> Covid Watch 1.0 </h3>

      <Container fluid style={{ width: "90%" }}>
        <div className="mb-5" style={{ padding: 5 }} />
        <Row className="justify-content-md-center">
          <Col
            md={6}
            style={{ backgroundColor: "var(--basicred)", borderRadius: "25px" }}
          >
            <Form className="mt-3" onSubmit={mySubmit}>
              <Form.Group>
                <Form.Label className="mb-3 h5"> Select a country </Form.Label>
                <Row style={{ borderRadius: "25px" }}>
                  <Col md={9}>
                    <Form.Control as="select" className="m-2">
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
                    <Form.Check id="default-checkbox" className="float-left m-3" type="checkbox" label="show global data" onChange={checkBoxHandle} />

                  </Col>
                  <Col xl={3}>
                    <div>
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-secondary m-2"

                      />
                      <button className={'btn btn-info ' + ledButton} onClick={led}> led </button>
                    </div>
                  </Col>

                </Row>
              </Form.Group>
            </Form>


          </Col>
        </Row>

        <Row className="mt-3 justify-content-md-center">
          <Col md={5} style={{ backgroundColor: "lightblue", borderRadius: "25px", margin: "10px" }}>
            <GlobalPieChart
              scope="Total"
              recovered={countryData ? countryData.TotalRecovered : ''}
              active={countryData ? (countryData.TotalConfirmed-(countryData.TotalRecovered+countryData.TotalDeaths)) : ''}
              deaths={countryData ? countryData.TotalDeaths : ''}
              country={countryData ? countryData.Country : ''}
              date={countryData ? countryData.Date : ''}
            />
          </Col>

          <Col md={5} style={{ backgroundColor: "lightblue", borderRadius: "25px", margin: "10px" }}>
            <GlobalBarChart
              scope="Daily"
              recovered={countryData ? countryData.NewRecovered : ''}
              confirmed={countryData ? countryData.NewConfirmed : ''}
              deaths={countryData ? countryData.NewDeaths : ''}
              country={countryData ? countryData.Country : ''}
              date={countryData ? countryData.Date : ''}
            />
          </Col>
        </Row>

        <Row className="mb-3 justify-content-md-center">
          <Col md={5} className={globalButton} style={{ backgroundColor: "lightgrey", borderRadius: "25px", margin: "10px" }}>
            <GlobalPieChart
              scope="Total"
              recovered={globalData.TotalRecovered}
              active={(globalData.TotalConfirmed - (globalData.TotalRecovered + globalData.TotalDeaths))}
              deaths={globalData.TotalDeaths}
              country="Global"
            />
          </Col>

          <Col md={5} className={globalButton} style={{ backgroundColor: "lightgrey", borderRadius: "25px", margin: "10px" }}>
            <GlobalBarChart
              scope="Daily"
              recovered={globalData.NewRecovered}
              confirmed={globalData.NewConfirmed}
              deaths={globalData.NewDeaths}
              country="Global"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
