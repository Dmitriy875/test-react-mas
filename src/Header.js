import { Container, Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Header = () => {
  return (
    <header>
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
    </header>
  )
}

export default Header;
