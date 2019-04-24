

import React from 'react';
import PropTypes from 'prop-types';
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
import { createStructuredSelector } from 'reselect'
import injectReducer from 'utils/injectReducer'
import placeholderLogo from '../../images/placeholderLogo.png';
import { loadRadioData } from './actions'
import reducer from './reducer'
import { makeDataSelector } from './selectors'
import { compose } from '../../../../../../AppData/Local/Microsoft/TypeScript/3.4.3/node_modules/redux';
import { connect } from 'redux';



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
    radio: {
        marginLeft: "2vw"
    },
    managementRoot: {
        width: "100vw",
        height: '100vh',
        marginTop: "12vh",
        borderStyle: "solid",
    }

};

/* eslint-disable react/prefer-stateless-function */
class ManagerPage extends React.PureComponent {
    state = {
        anchorEl: null,
        acomodacao: "normal",
        managingDate: null,
        selectedValue: 'room',
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
    componentDidMount() {
        loadRadioData(this.state.selectedValue)
    }
    render() {
        const { classes } = this.props;
        const { anchorEl, managingDate, selectedValue } = this.state;
        const open = Boolean(anchorEl);
        const dados = this.props.dados
        console.log(dados)
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
                <div className={classes.managementRoot}>
                    {selectedValue === 'room' && (
                        <Typography>Room</Typography>
                    )}
                    {selectedValue === 'guests' && (
                        <Typography>Guests</Typography>
                    )}
                    {selectedValue === 'diner' && (
                        <Typography>Diner</Typography>
                    )}
                    {selectedValue === 'events' && (
                        <Typography>Events</Typography>
                    )}
                    {selectedValue === 'parking' && (
                        <Typography>Parking</Typography>
                    )}
                </div>
            </div >
        );
    }

}

Manager.propTypes = {
    grabData: PropTypes.func,
    dados: PropTypes.array
}

const mapDispatchToProps = dispatch => {
    return {
        loadRadioData: selectedValue => dispatch(loadRadioData(selectedValue))
    }
}


const mapStateToProps = createStructuredSelector({
    dados: makeDataSelector()
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'managerPage', reducer })


export default compose(withReducer, withConnect)(withStyles(styles)(ManagerPage));