import React from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

function PieChart({ keys, values, name }) {

  let state = {
    dataPie: {
      labels: (keys) ? [keys[0], keys[1], keys[2]] : [],
      datasets: [
        {
          data: [values[0], values[1], values[2]],
          backgroundColor: [
            "#46BFBD",
            "#FDB45C",
            "#F7464A"
          ],
          hoverBackgroundColor: [
            "#5AD3D1",
            "#FFC870",
            "#FF5A5E"
          ]
        }
      ]
    }
  }

  return (
    <MDBContainer>
      <h5 className="mt-3 nameSize"> {name} </h5>
      <Pie data={state.dataPie} options={{ responsive: true }} />
    </MDBContainer>
  );
}


export default PieChart;