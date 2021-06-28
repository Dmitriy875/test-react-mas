/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function InputForm(props) {
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={props.userNames.map((option) => option.name)}
        renderInput={(params) => (
          <TextField {...params} label="Enter Username" margin="normal" variant="outlined" />
        )}
      />
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={props.userNames.map((option) => option.website)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter website name"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </div>
  );
}
