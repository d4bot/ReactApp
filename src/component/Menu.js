import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';

@observer
class Menu extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let { classes, theme, open, handleMenuClose } = this.props;
    
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleMenuClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <div>
          <List
            component="nav"
          >
            <ListItem
              button
              component={Link}
              to="/"
            >
              <Tooltip title="Inicio" placement="bottom-end">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                disableTypography
                primary={<Typography variant="body2" style={{ color: 'white'}}>Inicio</Typography>}
                
              />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/myVideogames"
            >
              <Tooltip title="Mis Videojuegos" placement="bottom-end">
                <ListItemIcon>
                  <VideogameAssetIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                disableTypography
                primary={<Typography variant="body2" style={{color: 'white'}}>Mis Videojuegos</Typography>}
                
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  }
}

export default Menu;