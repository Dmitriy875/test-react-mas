import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

export default function FullWidthTabs(props) {
  let [value, setValue] = React.useState(0);
  let [marker, setMarker] = React.useState(0);

  if( marker !== props.marker ) {
    setMarker(props.marker)
    setValue(0)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {props.children}
        </Tabs>
      </AppBar>
    </div>
  );
}
