import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';

interface Props {
    label: string;
    dataToFetch: string;
    handleInputChange: (property: string, value: string) => void;
}

interface State {
  options: any[]
}

class DropDown extends React.Component<Props, State> {
    state: State = {
      options: []
    };

    componentDidMount = () => {
      if(this.props.dataToFetch === 'Serial_Number') {
        axios.get('http://localhost:8000/unique_serial')
          .then(res => {
            let optionsTemp = [];
            for(let index in res.data.result) {
              optionsTemp.push(res.data.result[index]);
            }
            this.setState({
              options: optionsTemp
            });
          })
          .catch(err => console.log(err));
      }
    }

    handleChange = (e: { target: { value: any; }; }) => {
      this.props.handleInputChange(this.props.dataToFetch, e.target.value);
    }

    render() {
      if(this.props.dataToFetch === 'Serial_Number') {
        return(
          <div>
              <InputLabel>{this.props.label}</InputLabel>
              <Select sx={{ width: '1' }} onChange={this.handleChange}>
                {this.state.options.map((item, index) => {
                  return <MenuItem key={index} value={item.Serial_Number}>{item.Serial_Number}</MenuItem>
                })}
              </Select>
          </div>
        );
      }
      return (
        <div>
            <InputLabel>{this.props.label}</InputLabel>
            <Select sx={{ width: '1' }} onChange={this.handleChange}>
                <MenuItem value={'mains'}>Main</MenuItem>
                <MenuItem value={'always_on'}>Always_On</MenuItem>
            </Select>
        </div>
      );
    }
}

export default DropDown;