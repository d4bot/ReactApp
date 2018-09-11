import React from 'react';
import classNames from 'classnames';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { renderRoutes } from 'react-router-config';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { isMobile } from 'react-device-detect';
import Menu from './Menu';
import { main } from '../styles';

const titleList = { 
  '/videogame': 'Videojuegos',
  '/myVideogames': 'Mis Videojuegos'
};

@observer
//@withStyles(main, { withTheme: true })
class Main extends React.Component {
  @observable pageState = {};

  constructor (props) {
    super(props);
  
    this.pageState = {
      open: isMobile ? false : true//ARREGLAR
    };
  }

  handleMenuOpen = () => {
    this.pageState.open = true;
  }

  handleMenuClose = () => {
    this.pageState.open = false;
  }

  render () {
    const { route, theme, classes, location } = this.props;
    const { open } = this.pageState;
    //console.log(location, titleList[location.pathname])

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Menu"
              className={classNames(classes.menuButton, open && classes.hide)}
              onClick={this.handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              { titleList[location.pathname] }
            </Typography>
          </Toolbar>
        </AppBar>
        <Menu
          open={open}
          handleMenuClose={this.handleMenuClose}
          classes={classes}
          theme={theme}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/*<Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>*/}
          { 
            // Child components will be rendered here.
            renderRoutes(route.routes)
          }
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(main, { withTheme: true })(Main);