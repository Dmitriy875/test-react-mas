import { Container, Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Grid, Paper } from '@material-ui/core';

const Header = () => {
  return (
    <header>
    <Grid container direction="row" justify="center" alignItems="center" spacing={5}>
        <Grid item xs={12}>
          <Paper>
            <AppBar position='fixed'>
              <nav>
                <Container fixed>
                  <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                      <MenuIcon />
                    </IconButton>
                    <Typography>React-test для МАС Альбион</Typography>
                  </Toolbar>
                </Container>
              </nav>
            </AppBar>
          </Paper>
        </Grid>
    </Grid>
    </header>
  )
}

export default Header;
