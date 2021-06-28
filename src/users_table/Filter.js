import React, { Component } from 'react'
import { Grid, Button, TextField, Container, Typography } from '@material-ui/core';
import InputForm from './InputForms.js';

export default class Filter extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className="filter">
        <Container>
          <Grid container direction="row"  justify="center" alignItems="center" spacing={5}>
              <Grid item xs={12}>
                <div>
                  <Typography variant="h5">
                    Фильтр
                    <InputForm userNames={this.props.users}/>
                  </Typography>
                </div>
              </Grid>
          </Grid>
        </Container>

        <Container>
          <Grid item xs={12} container justify="flex-end">
            <Grid item xs={2} >
              <Button variant="outlined" color='secondary'>Сбросить</Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" color='primary' onClick={()=>{alert('works')}}>Применить</Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}
