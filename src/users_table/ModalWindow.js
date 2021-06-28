import React, { Component } from 'react'
import { Grid, Container, Paper, Divider, Typography } from '@material-ui/core';
import { Table, TableRow, TableCell, TableBody, TableHead, TableContainer } from '@material-ui/core';
import { Checkbox, Tab } from '@material-ui/core';
import FullWidthTabs from './Tabs.js';
import CloseIcon from '@material-ui/icons/Close';

export default class ModalWindow extends Component {
  constructor(props) {
    super(props)
    this.showDone = this.showDone.bind(this);
    this.showActive = this.showActive.bind(this);
    this.showAll = this.showAll.bind(this);
    this.getTasks = this.getTasks.bind(this);

    this.state = {
      todos: '',
    }
  }

  static getDerivedStateFromProps( nextProps, prevState ) {
    console.log('getDerivedStateFromProps')
    let prevStateTodos = prevState.todos;
    if( prevStateTodos ) {
      if( prevStateTodos[0].userId !== nextProps.id  ) {
        console.log('Строка с именем изменилась');
        return {todos: '', indicatorReset: true}
      }
    }
    return null;
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    // if(this.state.todos) {
    //   return false
    // }
    return true
  }

  render() {
    console.log('render')
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
              {this.getTable()}
            </Paper>
          </Container>
        )
      }
    }
  }

  getTable() {
    return(
      <Grid container direction="row" justify="center" alignItems="center">
        <div className="modal-window">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item sm={11}><Typography variant="h6">To do</Typography></Grid>
            <Grid item sm={1}><CloseIcon /></Grid>
            <Divider variant="fullWidth" />
          </Grid>

            <Grid container direction="row" justify="center" alignItems="center">
              <FullWidthTabs marker={this.props.todos}>
                <Tab label="Все" onClick={this.showAll} />
                <Tab label="Завершены" onClick={this.showActive} />
                <Tab label="В работе" onClick={this.showDone} />
              </FullWidthTabs>
            </Grid>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell>Статус</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {this.getTasks()}

                </TableBody>
              </Table>
            </TableContainer>
          </div>
      </Grid>
    )
  }

  getTasks() {
    let todo = this.state.todos
      ? this.state.todos
      : this.props.todos;

    todo.map( item => {
      if( item.completed === false ) {
          item.checkbox = <Checkbox disabled color='default'></Checkbox>;
      }
      if( item.completed === true ) {
        item.title = <strike>{item.title}</strike>;
        item.checkbox = <Checkbox checked color='primary'></Checkbox>;
      }
      return item;
    })

    return(
      todo.map(item=>(
        <TableRow key={item.id}>
          <TableCell>
            <span>
              {item.title}
            </span>
          </TableCell>
          <TableCell>
            <span>
              {item.checkbox}
            </span>
          </TableCell>
      </TableRow>
      ))
    )
  }

  showAll() {
    console.log('all');

    this.setState({
      todos: this.props.todos,
    })
  }

  showActive() {
    console.log('active');

    let active = this.props.todos.filter(
      item => item.completed === true
    )
    this.setState({
      todos: active,
    })
  }

  showDone() {
    console.log('done');

    let done = this.props.todos.filter(
      item => item.completed === false
    )
    this.setState({
      todos: done,
    })
  }
}
