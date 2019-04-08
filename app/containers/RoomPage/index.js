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
    Radio,
    FormLabel,
    TextField,
    Button,
    Link,
} from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers'
import { AccountCircleOutlined, MenuOutlined } from '@material-ui/icons';
import placeholderLogo from '../../images/placeholderLogo.png'



const styles = {
    root: {
        width: "100vw",
        height: "100vh",
        flexGrow: 1,
        overflow: "hidden"
    },
    appBar: {
        backgroundColor: "#BAB392"
    },
    menuButton: {
        marginLeft: "1vw"
    },
    welcomeText: {
        color: "#A2B8B7",
        marginLeft: "80vw"
    },
    logo: {
        width: 60,
        height: 50,
    },
    selector: {
        marginLeft: "2vw",
        marginTop: "2vh",
        float: "left"
    },
    datePicker: {
        color: "#71D1C5"
    },
    radioGroup: {
        marginLeft: "15vw",
        marginTop: "-4vh"
    },
    radio:{
        marginLeft:"2vw"
    }
};

const room = [
    {
        value: "standard",
        label: "New York"
    },
    {
        value: "lightLuxury",
        label: "Milan"
    },
    {
        value: "ultraLuxury",
        label: "Dubai"
    }
]
room.map(option => {
    console.log(option)
})
/* eslint-disable react/prefer-stateless-function */
class RoomPage extends React.PureComponent {
    state = {
        anchorEl: null,
        acomodacao: "normal",
        managingDate: null,
        selectedValue: 'room'
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleManageChange = event => {
        this.setState({ managingDate: new Date(event) })
    };
    handleRadioChange = event => {
        this.setState({ selectedValue: event.target.value })
    }


    render() {
        const { classes } = this.props;
        const { anchorEl, managingDate, selectedValue } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default" className={classes.appBar}>
                    <Toolbar>
                        <div id="hotelLogo">
                            <img src={placeholderLogo} className={classes.logo} />
                        </div>
                        <div id="welcomeText" className={classes.welcomeText}>
                            <Typography variant="overline" noWrap>Bem vindo, Cesar</Typography>
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
                                <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <div id="selector" className={classes.selector}>
                    <DatePicker
                        autoOk
                        label="Gerenciamento"
                        clearable
                        value={managingDate}
                        onChange={this.handleManageChange}
                        className={classes.datePicker}
                        color="inherit"
                    />
                    <div className={classes.radioGroup}>
                        <FormLabel className={classes.radio}>Quartos</FormLabel>
                        <Radio
                            checked={selectedValue === 'room'}
                            onChange={this.handleRadioChange}
                            value="room"
                            name="quartos"
                            label="Quartos"
                            aria-label="Quartos"

                        />
                        <FormLabel className={classes.radio} >Hóspedes</FormLabel>
                        <Radio
                            checked={selectedValue === 'guests'}
                            onChange={this.handleRadioChange}
                            value="guests"
                            name="Hóspedes"
                            aria-label="Hóspedes"

                        />
                        <FormLabel className={classes.radio} >Restaurante</FormLabel>
                        <Radio
                            checked={selectedValue === 'diner'}
                            onChange={this.handleRadioChange}
                            value="diner"
                            name="Restaurante"
                            aria-label="Restaurante"
                    
                        />
                        <FormLabel className={classes.radio} >Sala de Eventos</FormLabel>
                        <Radio
                            checked={selectedValue === 'events'}
                            onChange={this.handleRadioChange}
                            value="events"
                            name="Sala de Eventos"
                            aria-label="Sala de Eventos"
                    
                        />
                        <FormLabel className={classes.radio} >Estacionamento</FormLabel>
                        <Radio
                            checked={selectedValue === 'parking'}
                            onChange={this.handleRadioChange}
                            value="parking"
                            name="Estacionamento"
                            aria-label="Estacionamento"
                    
                        />
                    </div>
                </div>
            </div >
        );
    }
}

export default withStyles(styles)(RoomPage);