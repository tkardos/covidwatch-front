import React from "react";
import { Polar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

function PolarChart({keys, values, name}) {
  let state = {
    dataPolar: {
      datasets: [
        {
          data: [values[0], values[1], values[2]],
          backgroundColor: [
            "rgba(247, 70, 74, 0.5)",
            "rgba(70, 191, 189, 0.5)",
            "rgba(253, 180, 92, 0.5)"
            // "rgba(148, 159, 177, 0.5)",
            // "rgba(77, 83, 96, 0.5)"
          ],
          label: "My dataset" // for legend
        }
      ],
      labels: (keys) ? [keys[0], keys[1], keys[2]] : []
    }
  }

  return (
    <MDBContainer>
      <h5 className="mt-3"> {name} </h5>
      <Polar data={state.dataPolar} options={{ responsive: true }} />
    </MDBContainer>
  );
}


export default PolarChart;