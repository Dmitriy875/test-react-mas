import { Table, TableRow, TableCell, TableBody, TableHead, TableContainer } from '@material-ui/core';
import React, { Component } from 'react';
import ModalWindow from './ModalWindow.js';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  cursor: {
    cursor: 'pointer',
  },
  table: {
    border: '1px solid',
    borderColor: 'lightgray'
  },
  textAlign: {
    textAlign: 'center'
  }
});

class UsersTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      users: [],
      name: '',
      id: '',
      modalVisible: false,
      todos: [],
      modalChanged: false,
      usersOutput: '',
    }
    this.usersFiltration = this.usersFiltration.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }

  componentDidMount() {
    fetch( "https://jsonplaceholder.typicode.com/users" )
    .then( res => res.json() )
    .then(
      (result) => {
        this.setState( state => ({
          isLoaded: true,
          users: result,
          error: null,
        }));
      },
      (error) => {
        this.setState( state => ({
          isLoaded: true,
          error
        }));
      }
    )
  }

  usersFiltration( name ) {
    let result;
    if( name ) {
      this.setState({
        modalVisible: false
      })
      result = this.state.users.filter( user => user.website === name )
      if( result.length < 1 ) {
        result = this.state.users.filter( user => user.name === name )
      }
    }
    this.setState({ usersOutput: result })
  }

  resetFilter() {
    if( this.state.usersOutput ) {
      this.setState({ usersOutput: false, input: false, inputType: false, })
    }
  }

  getInput( name, value ) {
    if( name ) {
      let res = value.target.id.match(/nameSelect/)
        ? 'name'
        : 'site'

      this.setState({
        input: name,
        inputType: res
      })
    } else {
      this.setState({
        input: '',
        inputType: false,
      })
    }
  }

  handleRowClick( name, id ) {
    this.setState( state => ({
      name: name,
      id: id,
      modalVisible: true
    }));

    fetch( `https://jsonplaceholder.typicode.com/users/${id}/todos` )
    .then( res => res.json() )
    .then(
      (result) => {
        this.setState( state => ({
          isLoaded: true,
          todos: result,
          error: null,
        }));
      },
      (error) => {
        this.setState( state => ({
          isLoaded: true,
          error
        }));
      }
    )
  }
  closeWindow() {
    this.setState({
      modalVisible: false
    })
  }

  render() {
    const { classes } = this.props;
    const StyledTableRow = withStyles((theme) => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);
    const {error, isLoaded} = this.state;
    let users = this.state.usersOutput
      ? this.state.usersOutput
      : this.state.users

    if( error ) {
      return <p>Error {error.message}</p>
    } else if( !isLoaded ) {
      return <p>Loading...</p>
    } else {
      return (

        <Box mt={10}>
          <Grid container direction="row" justify="center" alignItems="center" item lg={12} md={12} sm={12}>
              <Grid item lg={5} xs={12}>
                <Paper>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={5} className={classes.textAlign} item md={12} xs={12}>
                        <Grid item md={12} xs={12}>

                            <Grid container direction="row">
                              <Grid item xs={3}>
                                <FilterListIcon />
                              </Grid>
                              <Grid item xs={4}>
                                <Typography variant="h5">
                                  Фильтр
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid container direction="row" alignItems="center">
                              <Grid item xs={4}>username</Grid>
                              <Grid item xs={5}>
                                <Autocomplete
                                  id="nameSelect"
                                  freeSolo
                                  onChange={(event, value) => {this.getInput(value, event)}}
                                  disabled={this.state.inputType === 'site' ? true : false}
                                  inputValue={ (this.state.input && this.state.inputType !== 'site')? this.state.input : '' }
                                  options={this.state.users.map((option) => option.name)}
                                  renderInput={(params) => (
                                    <TextField {...params} label="Enter Username" margin="normal" variant="outlined" />
                                  )}
                                  />
                                </Grid>
                            </Grid>

                            <Grid container direction="row" alignItems="center">
                              <Grid item xs={4}>website</Grid>
                              <Grid item xs={5}>
                                <Autocomplete
                                  freeSolo
                                  id="websiteSelect"
                                  onChange={(event, value) => {this.getInput(value, event)}}
                                  disabled={this.state.inputType === 'name' ? true : false}
                                  inputValue={ (this.state.input && this.state.inputType !== 'name') ? this.state.input : '' }
                                  options={this.state.users.map((option) => option.website)}
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
                                </Grid>
                            </Grid>


                        </Grid>
                    </Grid>

                    <Box pb={1}>
                      <Grid item xs={12} container justify="flex-end">
                        <Grid item xs={2} >
                          <Button variant="outlined" color='secondary' onClick={this.resetFilter}>Сбросить</Button>
                        </Grid>
                        <Grid item xs={2}>
                          <Button variant="outlined" color='primary' onClick={() => {this.usersFiltration(this.state.input)}}>Применить</Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                      </Grid>
                    </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <StyledTableRow>
                      <TableCell className={classes.table}>Name</TableCell>
                      <TableCell className={classes.table}>Username</TableCell>
                      <TableCell className={classes.table}>Email</TableCell>
                      <TableCell className={classes.table}>Website</TableCell>
                  </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {users.map(item=>(
                      <TableRow onClick={()=>{this.handleRowClick(item.name, item.id)}} key={item.id} className={classes.cursor}>
                        <TableCell className={classes.table}>
                          <span>
                            {item.name}
                          </span>
                        </TableCell>
                        <TableCell className={classes.table}>
                          <span>
                            {item.username}
                          </span>
                        </TableCell>
                        <TableCell className={classes.table}>
                          <span>
                            {item.email}
                          </span>
                        </TableCell>
                        <TableCell className={classes.table}>
                          <span>
                            {item.website}
                          </span>
                        </TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </Paper>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>

              <ModalWindow
                name={this.state.name}
                id={this.state.id}
                visible={this.state.modalVisible}
                todos={this.state.todos}
                closeWindow={()=>{this.closeWindow()}}
                />

            </Grid>
          </Grid>
        </Box>
      )
    }
  }
}
export default withStyles(styles)(UsersTable);
