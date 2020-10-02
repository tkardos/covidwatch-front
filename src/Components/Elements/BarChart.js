import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

function PolarChart({keys, values, name}) {
  let state = {
    dataBar: {
      labels: (keys) ? [keys[0], keys[1], keys[2]] : [],
      datasets: [
        {
          label: "Covid cases",
          data: [values[0], values[1], values[2]],
          backgroundColor: [
            "rgba(113, 205, 205,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 134,159,0.4)",
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(113, 205, 205, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 134,159, 1)"
          ]
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }

  return (
    <MDBContainer>
      <h5 className="mt-3"> {name} </h5>
      <Bar data={state.dataBar} options={{ responsive: true }} />
    </MDBContainer>
  );
}


export default PolarChart;