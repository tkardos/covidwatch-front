import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import hostname from "../Functions/Hostname";
import GlobalPieChart from "../Elements/GlobalPieChart";
import GlobalBarChart from "../Elements/GlobalBarChart";

function Home() {
  const [items, setItems] = useState([]);
  const [countryCode, selectCountryCode] = useState("");
  const [countryData, setCountryData] = useState("");
  const [globalData, setGlobalData] = useState("");
  const [globalButton, setGlobalButton] = useState("d-none")
  const [deathRateDisplay, setDeathRateDisplay] = useState(false)

  const ccode = useRef('');

  useEffect(() => {
    fetch(`https://api.covid19api.com/summary`)
      .then((response) => response.json())
      .then((json) => {
        setItems(json.Countries)
        let globalDeaths = (json.Global.TotalDeaths / json.Global.TotalRecovered * 100).toFixed(2)
        setGlobalData(prevState => ({
          ...json.Global, DeathRate: globalDeaths
        }))
      })
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    let country = items.find((item) => item.CountryCode === countryCode);
    if (country) {
      if (country.TotalRecovered === 0) {
        country.DeathRate = "N/A"
      } else {
        country.DeathRate = (country.TotalDeaths / country.TotalRecovered * 100).toFixed(2);
      }
    }

    if (isSubscribed === true) {
      setCountryData(country);
    }
    return () => {
      isSubscribed = false
    }

  }, [ccode.current]);


  function mySubmit(e) {
    e.preventDefault();
    selectCountryCode(e.target[0].value);
    ccode.current = e.target[0].value
    return;
  }

  function globalViewHandle(e) {
    if (globalButton === 'd-none') {
      setGlobalButton('default');
    } else {
      setGlobalButton('d-none')
    }
    return;
  }

  function deathRateHandle(e) {
    if (deathRateDisplay === false) {
      setDeathRateDisplay(true)
    } else {
      setDeathRateDisplay(false)
    }
    return;
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
                <Form.Label className="mb-3 h5 nameSize"> Select a country </Form.Label>
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
                    <Form.Check id="default-checkbox" className="float-left m-3" type="checkbox" label="show global data" onChange={globalViewHandle} />
                    <Form.Check id="deathrate-checkbox" className="float-left m-3" type="checkbox" label="death stats" onChange={deathRateHandle} />
                  </Col>
                  <Col l={3}>

                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-secondary m-2"
                      style={{ width: "140px" }}

                    />

                  </Col>

                </Row>
              </Form.Group>
            </Form>


          </Col>
        </Row>

        <Row className="mt-3 justify-content-md-center">
          <Col md={5} style={{ backgroundColor: "lightblue", borderRadius: "25px" }}>

            <GlobalPieChart
              scope="Total"
              recovered={countryData ? countryData.TotalRecovered : ''}
              active={countryData ? (countryData.TotalConfirmed - (countryData.TotalRecovered + countryData.TotalDeaths)) : ''}
              deaths={countryData ? countryData.TotalDeaths : ''}
              country={countryData ? countryData.Country : ''}
              date={countryData ? countryData.Date : ''}
              deathRate={countryData && deathRateDisplay === true ? countryData.DeathRate : ''}
            />
          </Col>
          <div style={{ margin: "5px" }}></div>

          <Col md={5} style={{ backgroundColor: "lightblue", borderRadius: "25px" }}>
            <GlobalBarChart
              scope="Daily"
              recovered={countryData ? countryData.NewRecovered : ''}
              confirmed={countryData ? countryData.NewConfirmed : ''}
              deaths={countryData ? countryData.NewDeaths : ''}
              country={countryData ? countryData.Country : ''}
              date={countryData ? countryData.Date : ''}
              deathshow={deathRateDisplay === true && countryData ? true : false}
            />
          </Col>
        </Row>

        <Row className="mt-3 mb-3 justify-content-md-center">
          <Col md={5} className={globalButton} style={{ backgroundColor: "lightgrey", borderRadius: "25px" }}>
            <GlobalPieChart
              scope="Total"
              recovered={globalData.TotalRecovered}
              active={(globalData.TotalConfirmed - (globalData.TotalRecovered + globalData.TotalDeaths))}
              deaths={globalData.TotalDeaths}
              country="Global"
              date={items[0] ? items[0].Date : ''}
              deathRate={globalData && deathRateDisplay === true ? globalData.DeathRate : ''}
            />
          </Col>

          <div style={{ margin: "5px" }}></div>

          <Col md={5} className={globalButton} style={{ backgroundColor: "lightgrey", borderRadius: "25px" }}>
            <GlobalBarChart
              scope="Daily"
              recovered={globalData.NewRecovered}
              confirmed={globalData.NewConfirmed}
              deaths={globalData.NewDeaths}
              country="Global"
              date={items[0] ? items[0].Date : ''}
              deathshow={deathRateDisplay === true ? true : false}
            />
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default Home;
