import { Table, TableRow, TableCell, TableBody, TableHead, TableContainer } from '@material-ui/core';
import React, { Component } from 'react';
import Filter from './Filter.js';
import ModalWindow from './ModalWindow.js';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';



export default class UsersTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoaded: false,
      users: [],
      name: ''
    }
    this.handleRowClick = this.handleRowClick.bind(this);
  }


  componentDidMount() {
    fetch( "https://jsonplaceholder.typicode.com/users" )
    .then( res => res.json() )
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          users: result,
          error: null,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  handleRowClick(name) {
    alert("Wow! Dude! It works! Meet " + name)
    this.setState({
      name: name
    })
  }


  render() {
    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);


    const {error, isLoaded, users} = this.state;

    if( error ) {
      return <p>Error {error.message}</p>
    } else if( !isLoaded ) {
      return <p>Loading...</p>
    } else {
      return (
        <div className="content-table">
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={5}>
              <Paper>
            <Filter />

            <TableContainer>
              <Table>
                <TableHead>
                  <StyledTableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Website</TableCell>
                </StyledTableRow>
                </TableHead>
                <TableBody>
                  {users.map(item=>(
                    <TableRow onClick={()=>{this.handleRowClick(item.name)}}  key={item.id}>
                      <TableCell>
                        <span>
                          {item.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span>
                          {item.username}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span>
                          {item.email}
                        </span>
                      </TableCell>
                      <TableCell>
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
          <Grid item xs={3}>

            <ModalWindow name={this.state.name}/>

          </Grid>
      </Grid>
      </div>
      )
    }
  }

}
