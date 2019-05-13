/**
 *
 * MngrPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import finalLogo from '../../images/logo.png';
import HotelRoomCard from '../../components/HotelRoomCard/Loadable'
import { getRadioData, getProductData } from './actions'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
} from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers'
import { AccountCircleOutlined, MenuOutlined } from '@material-ui/icons';
import injectReducer from 'utils/injectReducer';
import { makeRadioDataSelector, makeProductListSelector } from './selectors';
import reducer from './reducer';


const styles = {
  root: {
    width: "100vw",
    height: "100vh",
    flexGrow: 1,
    overflow: "hidden"
  },
  appBar: {
    backgroundColor: "#DEFAFF"
  },
  menuButton: {
    marginLeft: "1vw"
  },
  welcomeText: {
    color: "#A2B8B7",
    marginLeft: "62vw"
  },
  logo: {
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
    marginTop: "4vh"
  },
  radio: {
    marginLeft: "2vw"
  },
  managementRoot: {
    width: "100vw",
    height: '100vh',
    marginTop: "12vh",
  },
  hotelCard: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '2vh',
    marginLeft: '2vw',
  },
  roomTextField: {
    marginTop: '6vw',
    marginLeft: '45vw',
    color: '#BAB392',
  },
};
/* eslint-disable react/prefer-stateless-function */
export class MngrPage extends React.Component {
  state = {
    anchorEl: null,
    acomodacao: "normal",
    managingDate: null,
    selectedValue: 'room',
    roomTextField: '',
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
    this.props.getRadioData(event.target.value)
    this.setState({ selectedValue: event.target.value })
    
  }
  handleRoomTextFieldChange = event => {
    this.setState({ roomTextField: event.target.value })
  }
  handleGuestList = (guestList) => {

  }
  componentDidMount() {
    this.props.getRadioDataDispatcher("guests")
    getProductData()
  }
  render() {
    const { classes } = this.props;
    const { anchorEl, selectedValue, roomTextField } = this.state;
    const open = Boolean(anchorEl);
    console.log(this.props.radioData)
    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static" color="default" className={classes.appBar}>
            <Toolbar>
              <div id="hotelLogo">
                <img src={finalLogo} className={classes.logo} />
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
              <div>
                <div className={classes.roomTextField}>
                  <TextField
                    id="roomSearchTextField"
                    label="Número do quarto"
                    placeholder="1101"
                    value={roomTextField}
                    onChange={this.handleRoomTextFieldChange}
                  />
                </div>
                <div className={classes.hotelCard}>
                  <HotelRoomCard
                    numeroQuarto='1101'
                    tipoQuarto='Milan'
                    vacant='disp'
                    tipoUsuario='supAcomod'
                    precoDiaria='R$1200'
                    ocupUntil="02/12/2019"
                    listaProduto={this.props.productList}
                  />
                  <HotelRoomCard
                    numeroQuarto='1101'
                    tipoQuarto='Milan'
                    vacant='ocup'
                    tipoUsuario='atendente'
                    precoDiaria='R$1200'
                    ocupUntil="05/05/2019"
                    listaProduto={this.props.productList}
                  />
                  <HotelRoomCard
                    numeroQuarto='1101'
                    tipoQuarto='Milan'
                    vacant='inter'
                    tipoUsuario='atendente'
                    precoDiaria='R$1200'
                    ocupUntil="09/05/2019"
                    listaProduto={this.props.productList}
                  />
                  <HotelRoomCard
                    numeroQuarto='1101'
                    tipoQuarto='Milan'
                    vacant='clean'
                    tipoUsuario='camareira'
                    precoDiaria='R$1200'
                    ocupUntil="02/05/2019"
                    listaProduto={this.props.productList}
                  />
                  <HotelRoomCard
                    numeroQuarto='1101'
                    tipoQuarto='Milan'
                    vacant='disp'
                    tipoUsuario='atendente'
                    precoDiaria='R$1200'
                    ocupUntil="15/07/2019" 
                    listaProduto={this.props.productList}
                    />
                  <HotelRoomCard
                    numeroQuarto='1101'
                    tipoQuarto='Milan'
                    vacant='ocup'
                    tipoUsuario='atendente'
                    precoDiaria='R$1200'
                    ocupUntil="19/08/2019" 
                    listaProduto={this.props.productList}
                    />
                </div>
              </div>
            )}
            {selectedValue === 'guests' && (
              <Table>
              <TableHead>
                <TableCell><Typography variant="overline">Produto</Typography></TableCell>
                <TableCell align='right'><Typography variant="overline">Quantidade Consumida</Typography></TableCell>
                <TableCell align='right'><Typography variant="overline">Preço</Typography></TableCell>
                <TableCell align='right'><Typography variant="overline">Preço Total</Typography></TableCell>
                <TableCell align='right'><Typography variant="overline">Adicionar</Typography></TableCell>
                <TableCell align='right'><Typography variant="overline">Remover</Typography></TableCell>
              </TableHead>
              <TableBody>
                
              </TableBody>
            </Table>
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
      </div>
    );
  }
}

MngrPage.propTypes = {
  radioData: PropTypes.array,
  productList: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  radioData: makeRadioDataSelector(),
  productList: makeProductListSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRadioDataDispatcher: selectedValue =>
      dispatch(getRadioData(selectedValue)),
    getProductList: () =>
      dispatch(getProductData())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mngrPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(withStyles(styles)(MngrPage));

