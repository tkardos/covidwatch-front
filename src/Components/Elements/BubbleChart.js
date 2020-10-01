import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';

function BubbleChart({keys, values, name}) {


  let state = {
    dataBubble: {
      labels: (keys) ? [keys[0], keys[1], keys[2]] : [],
      datasets: [
        {
          label: 'New confirmed',
          data: [
            {
              x: values[0],
              y: values[0],
              r: values[0]
            }
          ],
          backgroundColor: '#ff6384',
          hoverBackgroundColor: '#ff6384'
        },
        {
          label: 'New deaths',
          data: [
            {
              x: values[1],
              y: values[1],
              r: values[1]
            }
          ],
          backgroundColor: '#44e4ee',
          hoverBackgroundColor: '#44e4ee'
        },
        {
          label: 'New recovered',
          data: [
            {
              x: values[2],
              y: values[2],
              r: values[2]
            }
          ],
          backgroundColor: '#62088A',
          hoverBackgroundColor: '#62088A'
        }
      ]
    }
  };

    return (
        <MDBContainer>
          <h3 className='mt-5'>{name}</h3>
          <Bubble data={state.dataBubble} options={{ responsive: true }} />
        </MDBContainer>
    );
}

export default BubbleChart;

/*
import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';

class ChartsPage extends React.Component {
  state = {
    dataBubble: {
      labels: 'Bubble',
      datasets: [
        {
          label: 'John',
          data: [
            {
              x: 3,
              y: 7,
              r: 10
            }
          ],
          backgroundColor: '#ff6384',
          hoverBackgroundColor: '#ff6384'
        },
        {
          label: 'Peter',
          data: [
            {
              x: 3.2,
              y: 7,
              r: 10
            }
          ],
          backgroundColor: '#44e4ee',
          hoverBackgroundColor: '#44e4ee'
        },
        {
          label: 'Donald',
          data: [
            {
              x: 3.4,
              y: 7,
              r: 10
            }
          ],
          backgroundColor: '#62088A',
          hoverBackgroundColor: '#62088A'
        }
      ]
    }
  };

  render() {
    return (
      <MDBContainer>
        <h3 className='mt-5'>Bar chart</h3>
        <Bubble data={this.state.dataBubble} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default ChartsPage;
 */