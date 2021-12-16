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
import { Animation, ValueScale } from '@devexpress/dx-react-chart';
import axios from 'axios';

interface Props {

}

interface State {
  data: any[];
  serialData: any[];
  deviceData: any[];
  Serial_Number: string;
  Device_ID: string;
}

class Graph extends React.Component<Props, State> {
  state: State = {
    data: [{ argument: 'Monday', value: 1 }, { argument: 'Tuesday', value: 2 }],
    serialData: [],
    deviceData: [],
    Serial_Number: '',
    Device_ID: ''
  }

  componentDidMount = () => {
    axios.get('http://localhost:8000/unique_date_time')
      .then(res => {
        let dataTemp: any[] = [];
        for(let index in res.data.result) {
          axios.get('http://localhost:8000/chunks/' + res.data.result[index].DateTime)
            .then(res => {
              for(let i in res.data.result) {
                dataTemp.push({ DateTime: res.data.result[i].DateTime, Wattage: +res.data.result[i].Wattage })
              }
            })
            .catch(err => console.log(err));
        }
        this.setState({
          data: dataTemp,
          serialData: [],
          deviceData: []
        });
      })
      .catch(err => console.log(err));
  }

  handleInputChange = (property: string, value: string) => {
    if(property === 'Serial_Number') {
      axios.get('http://localhost:8000/serial/' + value)
        .then(res => {
          let dataTemp: any[] = [];
          for(let index in res.data.result) {
            let objTemp = { DateTime: res.data.result[index].DateTime, wattage_mains: +res.data.result[index].wattage_mains, wattage_always_on: +res.data.result[index].wattage_always_on }
            dataTemp.push(objTemp);
          }
          this.setState({
            data: [],
            serialData: dataTemp,
            deviceData: [],
            Serial_Number: value,
            Device_ID: ''
          });
        })
        .catch(err => console.log(err));
    } else {
      if(this.state.Serial_Number.length === 0) {
        return;
      } else {
        axios.get('http://localhost:8000/id/' + value + ':' + this.state.Serial_Number)
          .then(res => {
            let dataTemp: any[] = [];
            for(let index in res.data.result) {
              let objTemp = { DateTime: res.data.result[index].DateTime, Wattage: res.data.result[index].Wattage }
              dataTemp.push(objTemp);
            }
            this.setState({
              data: [],
              serialData: [],
              deviceData: [dataTemp],
              Device_ID: value
            });
          })
          .catch(err => console.log(err))
      }
    }
  }

  render() {
    return (
    <div>
        <h1 style={{ textAlign: 'center' }}>Smart Homes Electrical Consumption</h1>
        <div className='form'>
            <FormControl sx={{ m: 1, width: 1 }}>
                <DropDown label='Serial Number' dataToFetch='Serial_Number' handleInputChange={this.handleInputChange} />
            </FormControl>
            <FormControl sx={{ m: 1, width: 1 }}>
                <DropDown label='Device ID' dataToFetch='Device_ID' handleInputChange={this.handleInputChange} />
            </FormControl>
        </div>
        <Paper>
        <Chart data={(this.state.data.length !== 0 ? this.state.data : (this.state.serialData.length !== 0 ? this.state.serialData : this.state.deviceData ))}>
          <ValueScale name="wattage" />
          <ArgumentAxis />
          <ValueAxis scaleName="wattage" showGrid={false} showLine={true} showTicks={true} />
          {this.state.serialData.length === 0 &&
            this.state.serialData.map((item, index) => {
              return <LineSeries key={index} valueField={this.state.data[index].wattage_mains} argumentField={this.state.data[index].DateTime} scaleName="wattage" />
            })
            &&
            this.state.serialData.map((item, index) => {
              return <LineSeries key={index} valueField={this.state.data[index].wattage_always_on} argumentField={this.state.data[index].DateTime} scaleName="wattage" />
            })
          }
          {/* display by device id */}
          {/* display all */}
          <Animation />
        </Chart>
      </Paper>
    </div>
    );
  }
}

export default Graph;