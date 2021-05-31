import React, { Component } from 'react'
import { Grid, Container, Paper } from '@material-ui/core';
import { Table, TableRow, TableCell, TableBody, TableHead, TableContainer } from '@material-ui/core';

export default class ModalWindow extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
}

  render() {
    const todo = this.props.todos;
    const isVisible = this.props.visible;
    const {error} = this.state;
    if( !isVisible ) {
      return null;
    } else {
      if( error ) {
        return <p>Error {error.message}</p>
      } else {
        return (
          <Container>
            <Paper>
              <Grid container direction="row"  justify="center" alignItems="center">
                <div className="modal-window">
                  <Container>
                    To do
                  </Container>
                  <Container>
                      <Grid container direction="row"  justify="center" alignItems="center">
                      <Grid>Все</Grid>
                      <Grid>Завершено</Grid>
                      <Grid>В работе</Grid>
                    </Grid>
                  </Container>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Статус</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>

                          {todo.map(item=>(
                            <TableRow key={item.id}>
                              <TableCell>
                                <span>
                                  {item.title}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span>
                                  {item.completed}
                                </span>
                              </TableCell>
                          </TableRow>
                          ))}

                        </TableBody>
                      </Table>
                    </TableContainer>
                  <Container>ModalWindow {this.props.name} {this.props.id} </Container>
                </div>
              </Grid>
            </Paper>
          </Container>
        )
      }
    }
  }
}
