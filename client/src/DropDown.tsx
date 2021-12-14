import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface Props {
    label: string;
    // value: ?
}

interface State {

}

class DropDown extends React.Component<Props, State> {
    state: State = {

    };

    handleChange = () => {

    }

    

    render() {
        return (
          <div>
              <InputLabel id="demo-simple-select-label">{this.props.label}</InputLabel>
              {/* <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={this.handleChange}
  > */}
              <Select sx={{ width: '1' }}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
          </div>
        );
    }
}

export default DropDown;