import React, { Component } from 'react'
import { Grid, Button, TextField, Container } from '@material-ui/core';

export default class Filter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      works: true
    }
  }

  render() {
    return (
      <div className="filter">
        <Container>
          <Grid container direction="row"  justify="center" alignItems="center" spacing={5}>
              <Grid item xs={12}>
                <div>
                  <h4>Фильтр</h4>
                </div>
              </Grid>
          </Grid>
        </Container>


        <Container>
          <Grid container direction="row" justify="center" alignItems="center">
              <Grid item xs={2}>
                Username
              </Grid>
              <Grid item xs={2}>
                <TextField id="outlined-search" label="Search field" type="search" variant="outlined"></TextField>
              </Grid>
          </Grid>
        </Container>


        <Container>
          <Grid container direction="row" justify="center" alignItems="center">
              <Grid item xs={2}>
                Website
              </Grid>
              <Grid item xs={2}>
                <TextField id="outlined-search" label="Website" type="search" variant="outlined"></TextField>
              </Grid>
          </Grid>
        </Container>



        <Container>
          <Grid item xs={12} container justify="flex-end">
            <Grid item xs={2} >
              <Button variant="outlined" color='secondary'>Сбросить</Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" color='primary'>Применить</Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}
