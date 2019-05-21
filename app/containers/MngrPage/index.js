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
import StockCard from '../../components/StockCard/Loadable'
import finalLogo from '../../images/logo.png';
import HotelRoomCard from '../../components/HotelRoomCard/Loadable';
import GuestList from '../../components/GuestTable/Loadable';
import { getRadioData, getProductData } from './actions';
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
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  Select,
  DialogActions,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Slide
} from '@material-ui/core';
import { AccountCircleOutlined } from '@material-ui/icons';
import { DatePicker } from 'material-ui-pickers';
import injectReducer from 'utils/injectReducer';
import {
  makeRadioDataSelector,
  makeProductListSelector,
  makeGuestDataSelector,
} from './selectors';
import reducer from './reducer';

const styles = {
  root: {
    width: '100vw',
    height: '100vh',
    flexGrow: 1,
    overflow: 'hidden',
  },
  appBar: {
    backgroundColor: '#DEFAFF',
  },
  menuButton: {
    marginLeft: '1vw',
  },
  welcomeText: {
    color: '#A2B8B7',
    marginLeft: '62vw',
  },
  logo: {
    height: 50,
  },
  selector: {
    marginLeft: '2vw',
    marginTop: '2vh',
    float: 'left',
  },
  datePicker: {
    color: '#71D1C5',
  },
  radioGroup: {
    marginLeft: '15vw',
    marginTop: '4vh',
  },
  radio: {
    marginLeft: '2vw',
  },
  managementRoot: {
    width: '100vw',
    height: '100vh',
    marginTop: '12vh',
  },
  hotelCard: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '2vh',
    marginLeft: '2vw',
  },
  guestTextField: {
    marginLeft: '45vw',
    color: '#BAB392',
  },
  roomTextField: {
    marginRight: '20vw',
    marginLeft: '45vw',
    color: '#BAB392',
  },
  roomBtn: {
    marginTop: '15vh',
    marginBottom: '-6vh',
    color: '#BAB392',
  },
  stockTab:{
    marginTop: '15vh'
  },
  stockSolBtn:{
    marginTop: '2vh',
    marginLeft: '2vw'
  },
  requestRoot:{},
  restaurantTable: {
    marginTop: '3vh'
  },

};

/* eslint-disable react/prefer-stateless-function */
export class MngrPage extends React.Component {
  state = {
    anchorEl: null,
    acomodacao: 'normal',
    managingDate: null,
    selectedValue: 'room',
    roomTextField: '',
    guestTextField: '',
    usrRegisterDialog: false,
    //campos para o registro de hospede
    usrNomeCompleto: '', //1
    usrProfissao: '', //6
    usrTelefone: '', //5
    usrNacionalidade: '', //8
    usrDtNascimento: new Date('1999-01-16'), //2
    usrSexo: '', //4
    usrId: '', //3
    usrDocMed: '', //7
    usrEndereco: '', //9
    usrEnderecoNumero: '', //9
    usrEnderecoComplemento: '', //9
    usrCidade: '', //10
    usrEstado: '', //11
    usrPais: '', //12
    usrMeioDePagamento: '',
    //----------------
    //Estados para radio Estoque
    stockTabValue: 0,
    itemRequestDialog: false,
    itemRegisterDialog: false,
    itemRequestSelect: '',
    itemRequestQtde: 0
    //----------------
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  Transition = props => {
    return <Slide direction='up' {...props} />
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleManageChange = event => {
    this.setState({ managingDate: new Date(event) });
  };

  handleRadioChange = event => {
    this.props.getRadioDataDispatcher(event.target.value);
    this.setState({ selectedValue: event.target.value });
  };

  handleRoomTextFieldChange = event => {
    this.setState({ roomTextField: event.target.value });
  };

  handleGuestTextFieldChange = event => {
    this.setState({ guestTextField: event.target.value });
  };

  handleStockTabChange = (event, value) => {
    this.setState({stockTabValue: value})
  }

  handleUsrRegisterTextChange = name => event => {
    if (name == 'usrEnderecoNumero') {
      if (event.target.value < 0) {
        return;
      }
    }
    this.setState({ [name]: event.target.value });
  };

  handleDatNascimento = date => {
    this.setState({ usrDtNascimento: date });
  };

  handleUsrRegisterDialogOpen = () => {
    this.setState({ usrRegisterDialog: true });
  };

  handleUsrRegisterDialogClose = () => {
    this.setState({ usrRegisterDialog: false });
  };

  handleItemRequestDialogClose = () => {
    this.setState({itemRequestDialog: false})
  }

  handleItemRequestDialogOpen = () => {
    this.setState({itemRequestDialog: true})
  }

  handleItemRequestTextChange = name => event => {
    this.setState({[name] : event.target.value})
  }

  componentDidMount() {
    this.props.getRadioDataDispatcher('room');
    this.props.getProductList();
  }

  render() {
    const { classes } = this.props;
    const {
      anchorEl,
      selectedValue,
      roomTextField,
      guestTextField,
      usrNomeCompleto,
      usrId,
      usrCidade,
      usrDocMed,
      usrDtNascimento,
      usrEndereco,
      usrEstado,
      usrNacionalidade,
      usrPais,
      usrProfissao,
      usrSexo,
      usrTelefone,
      usrRegisterDialog,
      usrEnderecoNumero,
      usrEnderecoComplemento,
      usrMeioDePagamento,
      stockTabValue,
      itemRegisterDialog,
      itemRequestDialog,
      itemRequestSelect,
      itemRequestQtde,
    } = this.state;
    const open = Boolean(anchorEl);
    console.log(this.props.roomData)
    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static" color="default" className={classes.appBar}>
            <Toolbar>
              <div id="hotelLogo">
                <img src={finalLogo} className={classes.logo} />
              </div>
              <div id="welcomeText" className={classes.welcomeText}>
                <Typography variant="overline" noWrap>
                  Bem vindo, Cesar
                </Typography>
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
                color="primary"
              />
              <FormLabel className={classes.radio}>Hóspedes</FormLabel>
              <Radio
                checked={selectedValue === 'guests'}
                onChange={this.handleRadioChange}
                value="guests"
                name="Hóspedes"
                aria-label="Hóspedes"
                color="primary"
              />
              <FormLabel className={classes.radio}>Restaurante</FormLabel>
              <Radio
                checked={selectedValue === 'diner'}
                onChange={this.handleRadioChange}
                value="diner"
                name="Restaurante"
                aria-label="Restaurante"
                color="primary"
              />
              <FormLabel className={classes.radio}>Estoque</FormLabel>
              <Radio
                checked={selectedValue === 'stock'}
                onChange={this.handleRadioChange}
                value="stock"
                name="Estoque"
                aria-label="Estoque"
                color="primary"
              />
              <FormLabel className={classes.radio}>Estacionamento</FormLabel>
              <Radio
                checked={selectedValue === 'parking'}
                onChange={this.handleRadioChange}
                value="parking"
                name="Estacionamento"
                aria-label="Estacionamento"
                color="primary"
              />
            </div>
          </div>
          <div className={classes.managementRoot}>
            {selectedValue === 'room' && (
              <div>
                <div className={classes.roomTextField}>
                  <TextField
                    id="roomSearchTextField"
                    label="Número do Quarto"
                    placeholder="1101"
                    value={roomTextField}
                    onChange={this.handleRoomTextFieldChange}
                  />
                </div>
                <div className={classes.hotelCard}>
                  <HotelRoomCard
                    numeroQuarto="1101"
                    tipoQuarto="Milan"
                    vacant="disp"
                    tipoUsuario="supAcomod"
                    precoDiaria="R$1200"
                    ocupUntil="02/12/2019"
                    listaProduto={this.props.productList}
                  />
                  <HotelRoomCard
                    numeroQuarto="1101"
                    tipoQuarto="Milan"
                    vacant="ocup"
                    tipoUsuario="atendente"
                    precoDiaria="R$1200"
                    ocupUntil="05/05/2019"
                    listaProduto={this.props.productList}
                  />
                  <HotelRoomCard
                    numeroQuarto="1101"
                    tipoQuarto="Milan"
                    vacant="inter"
                    tipoUsuario="atendente"
                    precoDiaria="R$1200"
                    ocupUntil="09/05/2019"
                    listaProduto={this.props.productList}
                  />
                  <HotelRoomCard
                    numeroQuarto="1101"
                    tipoQuarto="Milan"
                    vacant="clean"
                    tipoUsuario="camareira"
                    precoDiaria="R$1200"
                    ocupUntil="02/05/2019"
                    listaProduto={this.props.productList}
                  />
                  <HotelRoomCard
                    numeroQuarto="1101"
                    tipoQuarto="Milan"
                    vacant="disp"
                    tipoUsuario="atendente"
                    precoDiaria="R$1200"
                    ocupUntil="15/07/2019"
                    listaProduto={this.props.productList}
                  />
                  <HotelRoomCard
                    numeroQuarto="1101"
                    tipoQuarto="Milan"
                    vacant="ocup"
                    tipoUsuario="atendente"
                    precoDiaria="R$1200"
                    ocupUntil="19/08/2019"
                    listaProduto={this.props.productList}
                  />
                </div>
              </div>
            )}
            {selectedValue === 'guests' && (
              <div>
                <div className={classes.roomBtn}>
                  <Button
                    variant="outlined"
                    color="default"
                    onClick={this.handleUsrRegisterDialogOpen}
                  >
                    Registrar Usuário
                  </Button>
                </div>
                <div className={classes.guestTextField}>
                  <TextField
                    id="guestSearchTextField"
                    label="Nome do Hóspede"
                    placeholder="Bernardo Favaretto"
                    value={guestTextField}
                    onChange={this.handleGuestTextFieldChange}
                  />
                </div>
                <GuestList guestList={this.props.guestData} />
                <Dialog
                  open={usrRegisterDialog}
                  onClose={this.handleUsrRegisterDialogClose}
                  onBackdropClick={this.handleUsrRegisterDialogClose}
                  fullWidth
                  maxWidth="md"
                >
                  <DialogTitle>
                    <Typography variant="overline">
                      Registrar novo hóspede
                    </Typography>
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      id="nomeCompleto"
                      type="text"
                      label="Nome Completo"
                      value={usrNomeCompleto}
                      onChange={this.handleUsrRegisterTextChange(
                        'usrNomeCompleto',
                      )}
                      margin="normal"
                      fullWidth
                      placeholder="Bernardo Favaretto"
                    />
                    <DatePicker
                      margin="normal"
                      label="Data de Nascimento"
                      value={usrDtNascimento}
                      onChange={this.handleDatNascimento}
                      fullWidth
                      style={{ marginBottom: '-1vh' }}
                      disableFuture
                    />
                    <TextField
                      margin="normal"
                      id="id"
                      label="ID"
                      type="text"
                      value={usrId}
                      onChange={this.handleUsrRegisterTextChange('usrId')}
                      fullWidth
                      helperText="Passport number or country Id number"
                    />
                    <div style={{ marginTop: '1vh' }}>
                      <InputLabel htmlFor="sexSelect">Sexo</InputLabel>
                      <Select
                        id="sexSelect"
                        value={usrSexo}
                        onChange={this.handleUsrRegisterTextChange('usrSexo')}
                        placeholder="Sexo"
                        fullWidth
                      >
                        <MenuItem value="feminino">Feminino</MenuItem>
                        <MenuItem value="masculino">Masculino</MenuItem>
                        <MenuItem value="outros">Outros</MenuItem>
                      </Select>
                    </div>
                    <TextField
                      margin="normal"
                      id="telefone"
                      label="Telefone"
                      type="number"
                      value={usrTelefone}
                      onChange={this.handleUsrRegisterTextChange('usrTelefone')}
                      fullWidth
                      placeholder="(11)92222-2222"
                    />
                    <TextField
                      margin="normal"
                      id="profissao"
                      label="Profissão"
                      type="text"
                      value={usrProfissao}
                      onChange={this.handleUsrRegisterTextChange(
                        'usrProfissao',
                      )}
                      fullWidth
                      placeholder="Engenheiro"
                    />
                    <TextField
                      margin="normal"
                      id="documentoMedico"
                      label="Documento Médico"
                      type="text"
                      value={usrDocMed}
                      onChange={this.handleUsrRegisterTextChange('usrDocMed')}
                      fullWidth
                      helperText="Inserir somente se hóspede apresenta deficiência física"
                    />
                    <TextField
                      margin="normal"
                      id="nacionalidade"
                      label="Nacionalidade"
                      type="text"
                      value={usrNacionalidade}
                      onChange={this.handleUsrRegisterTextChange(
                        'usrNacionalidade',
                      )}
                      fullWidth
                      placeholder="Brasileiro"
                    />
                    <div style={{ marginTop: '1vh' }}>
                      <InputLabel htmlFor="meioPagamento">
                        Meio de Pagamento
                      </InputLabel>
                      <Select
                        id="meioPagamento"
                        value={usrMeioDePagamento}
                        onChange={this.handleUsrRegisterTextChange(
                          'usrMeioDePagamento',
                        )}
                        placeholder="Cartão de Crédito"
                        fullWidth
                      >
                        <MenuItem value="cartaoCredito">
                          Cartão de Crédito
                        </MenuItem>
                        <MenuItem value="cartaoDebito">
                          Cartão de Débito
                        </MenuItem>
                        <MenuItem value="cheque">Cheque</MenuItem>
                        <MenuItem value="dinheiro">Dinheiro</MenuItem>
                        <MenuItem value="tranferencia">Transferência</MenuItem>
                      </Select>
                    </div>
                    <TextField
                      margin="normal"
                      id="endereco"
                      label="Endereço"
                      type="text"
                      value={usrEndereco}
                      onChange={this.handleUsrRegisterTextChange('usrEndereco')}
                      placeholder="Rua Abobrinha"
                      style={{ width: '23vw' }}
                    />
                    <TextField
                      margin="normal"
                      id="enderecoNumero"
                      label="Número"
                      type="number"
                      value={usrEnderecoNumero}
                      onChange={this.handleUsrRegisterTextChange(
                        'usrEnderecoNumero',
                      )}
                      placeholder="25"
                      style={{ width: '5vw', marginLeft: '2vw' }}
                    />
                    <TextField
                      margin="normal"
                      id="enderecoComplemento"
                      label="Complemento"
                      type="text"
                      value={usrEnderecoComplemento}
                      onChange={this.handleUsrRegisterTextChange(
                        'usrEnderecoComplemento',
                      )}
                      placeholder="ap 22"
                      style={{ width: '12vw', marginLeft: '2vw' }}
                    />
                    <div style={{ marginTop: '1vh' }}>
                      <InputLabel htmlFor="sexSelect">Cidade</InputLabel>
                      <Select
                        value={usrCidade}
                        onChange={this.handleUsrRegisterTextChange('usrCidade')}
                        placeholder="São Paulo"
                        fullWidth
                      >
                        <MenuItem value="saoPaulo">São Paulo</MenuItem>
                        <MenuItem value="rioDeJaneiro">Rio de Janeiro</MenuItem>
                        <MenuItem value="beloHorizonte">
                          Belo Horizonte
                        </MenuItem>
                      </Select>
                    </div>
                    <div style={{ marginTop: '1vh' }}>
                      <InputLabel htmlFor="sexSelect">Estado</InputLabel>
                      <Select
                        value={usrEstado}
                        onChange={this.handleUsrRegisterTextChange('usrEstado')}
                        placeholder="São Paulo"
                        fullWidth
                      >
                        <MenuItem value="saoPaulo">São Paulo</MenuItem>
                        <MenuItem value="rioDeJaneiro">Rio de Janeiro</MenuItem>
                        <MenuItem value="minasGerais">Minas Gerais</MenuItem>
                      </Select>
                    </div>
                    <div style={{ marginTop: '1vh' }}>
                      <InputLabel htmlFor="sexSelect">País</InputLabel>
                      <Select
                        value={usrPais}
                        onChange={this.handleUsrRegisterTextChange('usrPais')}
                        placeholder="Brasil"
                        fullWidth
                      >
                        <MenuItem value="Brasil">Brasil</MenuItem>
                        <MenuItem value="Canada">Canada</MenuItem>
                        <MenuItem value="russia">Rússia</MenuItem>
                      </Select>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleUsrRegisterDialogClose} color="secondary">
                      Cancelar
                    </Button>
                    <Button onClick={this.handleUsrRegisterDialogClose} color="primary">
                      Registrar
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )}
            {selectedValue === 'diner' && <Typography>Diner</Typography>}
            {selectedValue === 'stock' && (
              <div>
                <div className={classes.stockTab}>
                  <Tabs
                    value={stockTabValue}
                    onChange={this.handleStockTabChange}
                    variant='fullWidth'
                  >
                    <Tab label="Estoque" />
                    <Tab label="Solicitar Itens"/>
                  </Tabs>
                </div>
                {stockTabValue == 0 && (
                  <StockCard />
                )}
                {stockTabValue == 1 && (
                  <div className={classes.requestRoot}>
                    <div className={classes.stockSolBtn}>
                      <Button variant="outlined" color="primary" onClick={this.handleItemRequestDialogOpen}>Solicitar Item</Button>
                      <Button variant="outlined" color="primary" style={{marginLeft: '2vw'}}>Cadastrar um Item</Button>
                    </div>
                    <div className={classes.restaurantTable}>
                      <Typography variant='headline'>Restaurante</Typography>
                      <Table>
                        <TableHead>
                          <TableCell><Typography variant='overline'>Produto Solicitado</Typography></TableCell>
                          <TableCell><Typography variant='overline'>Data da Solicitação</Typography></TableCell>
                          <TableCell><Typography variant='overline'>Quantidade Solicitada</Typography></TableCell>
                          <TableCell><Typography variant='overline'>Receber</Typography></TableCell>
                          <TableCell><Typography variant='overline'>Cancelar</Typography></TableCell>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                      </Table>
                    </div>
                    <div className={classes.restaurantTable}>
                      <Typography variant='headline'>Frigobar</Typography>
                      <Table >
                        <TableHead>
                          <TableCell><Typography variant='overline'>Produto Solicitado</Typography></TableCell>
                          <TableCell><Typography variant='overline'>Data da Solicitação</Typography></TableCell>
                          <TableCell><Typography variant='overline'>Quantidade Solicitada</Typography></TableCell>
                          <TableCell><Typography variant='overline'>Receber</Typography></TableCell>
                          <TableCell><Typography variant='overline'>Cancelar</Typography></TableCell>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                      </Table>
                    </div>
                    <Dialog
                      open={itemRequestDialog}
                      onClose={this.handleItemRequestDialogClose}
                      onBackdropClick={this.handleItemRequestDialogClose}
                      fullWidth
                      maxWidth="md"
                      TransitionComponent={this.Transition}
                    > 
                    <DialogTitle>
                      <Typography variant='headline'>Solicitar Produto</Typography>
                    </DialogTitle>
                    <DialogContent>
                      <InputLabel htmlFor="requestProduto">Produto</InputLabel>
                      <Select
                        id="requestProduto"
                        value={itemRequestSelect}
                        onChange={this.handleItemRequestTextChange('itemRequestSelect')}
                        fullWidth
                      >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="cocaCola">Coca-Cola</MenuItem>
                        <MenuItem value="redLabel">Red Label</MenuItem>
                        <MenuItem value="chocolate">Chocolate Godiva</MenuItem>
                      </Select>
                      <TextField 
                        value={itemRequestQtde}
                        onChange={this.handleItemRequestTextChange('itemRequestQtde')}
                        type="number"
                        margin="normal"
                        id="itemRequestQtdeTextField"
                        
                        placeholde="2"
                      />
                    </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
              
            )}
            {selectedValue === 'parking' && <Typography>Parking</Typography>}
          </div>
        </div>
      </div>
    );
  }
}

MngrPage.propTypes = {
  roomData: PropTypes.array,
  productList: PropTypes.array,
  guestData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  roomData: makeRadioDataSelector(),
  productList: makeProductListSelector(),
  guestData: makeGuestDataSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRadioDataDispatcher: selectedValue =>
      dispatch(getRadioData(selectedValue)),
    getProductList: () => dispatch(getProductData()),
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
