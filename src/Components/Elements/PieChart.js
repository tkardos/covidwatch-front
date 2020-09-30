import React from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

function PieChart({keys, values, name}) {

  let state = {
    dataPie: {
      labels: (keys) ? [keys[0], keys[1], keys[2]] : [],
      datasets: [
        {
          data: [values[0], values[1], values[2]],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C"
            // "#949FB1",
            // "#4D5360",
            // "#AC64AD"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870"
            // "#A8B3C5",
            // "#616774",
            // "#DA92DB"
          ]
        }
      ]
    }
  }

  return (
    <MDBContainer>
      <h5 className="mt-3"> {name} </h5>
      <Pie data={state.dataPie} options={{ responsive: true }} />
    </MDBContainer>
  );
}


export default PieChart;