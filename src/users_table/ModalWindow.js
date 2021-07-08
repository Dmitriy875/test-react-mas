import React, { Component } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core';
import { Table, TableRow, TableCell, TableBody, TableHead, TableContainer } from '@material-ui/core';
import { Checkbox, Tab } from '@material-ui/core';
import FullWidthTabs from './Tabs.js';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  cursor: {
    cursor: 'pointer'
  },
  tasks: {
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  tasksCell: {
    minWidth: '90%',
  },
  modal: {
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'tomato',
      position: 'absolute',
      maxWidth: '300px',
      top: '38vh',
      right: '10vh',
      overflow: 'hidden',
    },
  }
});

class ModalWindow extends Component {
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

            <Paper>
              {this.getTable()}
            </Paper>

        )
      }
    }
  }

  getTable() {
    const { classes } = this.props;
    return(
      <Box maxHeight={'60vh'} className={classes.tasks}>
        <Grid container direction="column" justify="center" alignItems="center" className={classes.modal}>

          <Grid container justify="center" alignItems="center" padding={5}>
            <Grid item sm={11}><Typography variant="h6">To do</Typography></Grid>
            <Grid item sm={1}><CloseIcon className={classes.cursor} onClick={() => {this.props.closeWindow()}}/></Grid>
          </Grid>

            <Grid container justify="center" alignItems="center">
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

      </Grid>
    </Box>
    )
  }

  getTasks() {
    const { classes } = this.props;
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
          <TableCell className={classes.tasksCell}>
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
export default withStyles(styles, { withTheme: true })(ModalWindow);
