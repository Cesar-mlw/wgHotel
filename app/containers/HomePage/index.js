/* eslint-disable react/prop-types */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  withStyles,
} from '@material-ui/core';
import { AccountCircleOutlined, MenuOutlined } from '@material-ui/icons';
import tripad from '../../images/tripad.png'
import faceb from '../../images/faceb.png'
import instaIcon from '../../images/instaIcon.jpg'
import placeholderLogo from '../../images/placeholderLogo.png'
import hotelMainImage from '../../images/hotelMainImage.jpg'

const styles = {
  root: {
    flexGrow: 1,
    overflow: "hidden"
  },
  grow: {
    flexGrow: 1,
    width: 60,
    height: 50,
    marginLeft: "17vw"
  },
  socialMedias:{
    flexGrow: 1,
    width:55,
    height:32,
    paddingLeft: "0.5vw",
    
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  carousel:{
    maxWidth: "100vw",
    maxHeight: "70vh",
    
  },
};

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div id="socialMedias">
                <img src={tripad} className={classes.socialMedias}/>
                <img src={faceb} className={classes.socialMedias}/>
                <img src={instaIcon} className={classes.socialMedias}/>
            </div>
            <div className={classes.grow} id="logo">
              <img src={placeholderLogo} className={classes.grow}/>
            </div>
            <div id="menu">
              <IconButton
                aria-owns="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
                className={classes.menuButton}
              >
                <AccountCircleOutlined />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Crie uma Conta</MenuItem>
                <MenuItem onClick={this.handleClose}>Já Possuo uma Conta</MenuItem>
                <MenuItem onClick={this.handleClose}>Minhas Reservas</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <div id="carrousel" className={classes.carousel}>
          <img src={hotelMainImage}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);