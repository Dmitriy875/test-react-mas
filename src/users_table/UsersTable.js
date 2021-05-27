import { Table, TableRow, TableCell, TableBody, TableHead, TableContainer } from '@material-ui/core';
import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';


export default class UsersTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoaded: false,
      users: [],
    }
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
                <TableRow>
                <TableCell>
                  <span key={item.id}>
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
      </div>
      )
    }
  }

}
