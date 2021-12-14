import React from 'react';
import DropDown from './DropDown';
import './styling/Graph.css';
import FormControl from '@mui/material/FormControl';
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

interface Props {

}

interface State {

}

const data = [
    { argument: 'Monday', value: 30 },
    { argument: 'Tuesday', value: 20 },
    { argument: 'Wednesday', value: 10 },
    { argument: 'Thursday', value: 50 },
    { argument: 'Friday', value: 60 },
];

class Graph extends React.Component<Props, State> {
  state: State = {
      data: {}
  };



  render() {
    return (
    <div>
        <h1 style={{ textAlign: 'center' }}>Smart Homes Electrical Consumption</h1>
        <div className='form'>
            <FormControl sx={{ m: 1, width: 1 }}>
                <DropDown label='Serial Number'/>
            </FormControl>
            <FormControl sx={{ m: 1, width: 1 }}>
                <DropDown label='Device ID'/>
            </FormControl>
        </div>
        <Paper>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />

          <LineSeries valueField="value" argumentField="argument" />
          <Animation />
        </Chart>
      </Paper>
    </div>
    );
  }
}

export default Graph;