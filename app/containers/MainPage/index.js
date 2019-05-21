/**
 *
 * MainPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectMainPage from './selectors';
import reducer from './reducer';

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
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  withStyles,
  TextField,
  Button,
  Link,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Snackbar,
  Slide,
  InputLabel,
  Select,
} from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers'
import { AccountCircleOutlined, MenuOutlined, Close } from '@material-ui/icons';
import tripad from '../../images/trip.png'
import faceb from '../../images/face.png'
import instaIcon from '../../images/insta.png'
import placeholderLogo from '../../images/logo.png'
import hotelMainImage from '../../images/hotelMainImage.jpg'
import infoImage from '../../images/infoImage.jpg'

const restText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris scelerisque viverra orci sit amet volutpat. Maecenas egestas egestas mi eu tincidunt. Phasellus consectetur velit ultricies dui consequat, ut pretium mi rhoncus. Suspendisse tempus libero in auctor volutpat. Aenean tincidunt leo egestas tellus egestas lacinia. Donec neque augue, porttitor a tincidunt sit amet, posuere id quam. Aenean ultrices lorem orci, non sagittis nunc hendrerit at. Ut tempus tortor eu turpis luctus, a condimentum risus suscipit. Sed quis est sit amet libero convallis lacinia sit amet eu leo. Ut lacinia sollicitudin mauris, sit amet eleifend ante vulputate vitae. Aliquam erat volutpat."

const styles = {
  root: {
    flexGrow: 1,
    overflow: "hidden"
  },
  grow: {
    flexGrow: 1,
    height: 50,
    marginLeft: '13vw'

  },
  socialMedias: {
    flexGrow: 1,
    width: 47,
    height: 33,
    paddingLeft: "0.5vw",

  },
  socialMediasFace: {
    flexGrow: 1,
    width: 43,
    height: 32,
    paddingLeft: "0.5vw",

  },
  socialMediasInsta: {
    flexGrow: 1,
    width: 50,
    height: 36,
    paddingLeft: "0.5vw",

  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  carousel: {
    width: "100vw",
    height: "70vh",

  },
  reservations: {
    width: "100vw",
    height: "15vh",
    marginTop: "3vh",
    marginLeft: "15vw",
    float: "left",
  },
  datePicker: {
    marginTop: "2vh",
    marginLeft: "8vw",
    color: '#00BFDF',
    textColor: '#00BFDF'
  },
  reservationButton: {
    marginTop: "3.5vh",
    marginLeft: "8vw",
    background: '#00BFDF',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  appBar: {
    backgroundColor: "#DEFAFF"
  },
  infoRoot: {
    width: "100vw",
    height: "75vh",
  },
  infoBlock: {
    width: "100vw",
    height: "25vh"
  },
  infoImgsLeft: {
    width: "50vw",
    height: "50vh",
    float: "left",
  },
  infoText: {
    marginLeft: "64vw",
    color: "#00BFDF",
  },
  infoParagraphRight: {
    width: "45vw",
    marginTop: "6vh",
    marginLeft: "53vw",
  },
  infoTextLeft: {
    color: "#00BFDF",
    marginTop: "50vh",
    marginLeft: "17vw"
  },
  infoImgsRight: {
    width: "50vw",
    height: "50vh",
    marginTop: "-57vh",
    marginLeft: "50vw",
    float: "left",
  },
  infoParagraphLeft: {
    width: "45vw",
    marginLeft: "2vw",
    marginTop: "8vh",
  },
  infoTextRightThird: {
    color: "#00BFDF",
    width: "50vw",
    heigth: "10vw",
    marginTop: "25vh",
    marginLeft: "67vw",

  },
  infoParagraphRightThird: {
    width: "40vw",
    heigth: "40vw",
    marginLeft: "55vw",
    marginTop: "10vh"

  },
  pageFooter: {
    width: "100vw",
    height: "10vh",
    marginTop: "112vh",
  },
  footerInfoText: {
    marginLeft: "0.5vw",
    opacity: 0.5,
    float: "left"
  },
  footerLinks: {
    textDecoration: "none",
    color: "#00BFDF",
    marginLeft: "10vh",
    fontSize: "1.6em"
  },
  welcomeText: {
    color: "#A2B8B7",
    marginRight: '1vw',
    marginTop: '1vh'
  },
  appBarRoot:{
    display: 'flex',
    flexWrap: 'wrap',
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
/* eslint-disable react/prefer-stateless-function */
class MainPage extends React.PureComponent {
  state = {
    anchorEl: null,
    acomodacao: "normal",
    chegada: null,
    saida: null,
    logged: false, // TESTING
    loginDialog: false,
    loginUsrTextField: 'Cheddar',
    loginPssTextField: '1234',
    snackOpen: false,
    snackMessage: "",
    tpUsuario: "",
    usrRegistertDialog: false,
    // Register User
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
    usrLogin: '',
    usrSenha: '',
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  Transition = props => {
    return <Slide direction="up" {...props} />;
  };

  handleUsrRegisterDialogClose = () => {
    this.setState({usrRegistertDialog: false})
  }

  handleUsrRegisterDialogOpen = () => {
    this.setState({usrRegistertDialog: true})
  }

  handleUsrDatNascimentoChange = date => {
    this.setState({usrDtNascimento: date})
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleAcomodacaoChange = event => {
    this.setState({ acomodacao: event.target.value })
  };

  handleChegadaChange = event => {
    this.setState({ chegada: new Date(event) })
  };

  handleSaidaChange = event => {
    this.setState({ saida: new Date(event) })
  };

  handleLoginDialogOpen = () => {
    this.setState({ loginDialog: true })
  }

  handleLoginDialogClose = () => {
    this.setState({ loginDialog: false })
  }

  handleLoginTextFieldChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  handleUsrRegisterTextChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  makeSnack = message => {
    this.setState({snackOpen: true, snackMessage: message})
  }

  eatSnack = () => {
    this.setState({snackOpen: false, snackMessage: ""})
  }

  handleClickLogin = () => {
    if (this.state.loginUsrTextField == "Cheddar" && this.state.loginPssTextField == "1234") {
      this.setState({ logged: true, loginDialog: false, anchorEl: null, tpUsuario: "admin" })
      this.makeSnack("Logged as Cesar Moura Leite Westphal")
    }
    else{
      this.setState({ loginDialog: false, anchorEl: null })
      this.makeSnack("Usuário ou senha incorretos")
    }
  }

  render() {
    const { classes } = this.props;
    const { 
      anchorEl, 
      acomodacao, 
      saida, 
      chegada, 
      snackOpen,
      usrCidade,
      usrDocMed,
      usrDtNascimento,
      usrEndereco,
      usrEnderecoComplemento,
      usrEnderecoNumero,
      usrEstado,
      usrId,
      usrMeioDePagamento,
      usrNacionalidade,
      usrNomeCompleto,
      usrPais,
      usrProfissao,
      usrSexo,
      usrTelefone,
      usrRegistertDialog,
      usrLogin,
      usrSenha,
      logged   
    } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <div id="socialMedias">
              <img src={tripad} className={classes.socialMedias} />
              <img src={faceb} className={classes.socialMediasFace} />
              <img src={instaIcon} className={classes.socialMediasInsta} />
            </div>
            <div className={classes.grow} id="logo">
              <img src={placeholderLogo} className={classes.grow} />
            </div>
            {(this.state.logged) ? (
              <div className={classes.appBarRoot}>
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
                    <MenuItem onClick={this.handleClose}>Minhas Reservas</MenuItem>
                  </Menu>
                </div>
              </div>) : (<div id="menu">
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
                  <MenuItem onClick={this.handleUsrRegisterDialogOpen}>Crie uma Conta</MenuItem>
                  <MenuItem onClick={this.handleLoginDialogOpen}>Já Possuo uma Conta</MenuItem>
                </Menu>
              </div>)}
          </Toolbar>
        </AppBar>
        <div id="carrousel">
          <img src={hotelMainImage} className={classes.carousel} />
        </div>
        <div id="reservations" className={classes.reservations}>
          <TextField
            id="tpAcomodacao"
            select
            label="Acomodação"
            value={acomodacao}
            onChange={this.handleAcomodacaoChange}
            helperText="Selecione o tipo de acomodação"
            margin="normal"
            color="inherit"
          >
            {room.map(option => (
              <MenuItem key={option.value} value={option.value} style={{ textColor: '#00BFDF' }}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <DatePicker
            autoOk
            label="Data de Chegada"
            clearable
            disablePast
            value={chegada}
            onChange={this.handleChegadaChange}
            className={classes.datePicker}
            color="inherit"
          />
          <DatePicker
            autoOk
            label="Data de Saída"
            clearable
            disablePast
            value={saida}
            onChange={this.handleSaidaChange}
            className={classes.datePicker}
            color="inherit"
          />
          <Button
            variant="text"
            color="inherit"
            className={classes.reservationButton}
          >
            Reservar
          </Button>
        </div>
        <div id="hotelInfoRes" className={classes.infoRoot}>
          <div id="info_block_restaurant" className={classes.infoBlock}>
            <img src={infoImage} className={classes.infoImgsLeft} />
            <Typography id="nss_restaurante" variant="display1" className={classes.infoText}>Nosso Restaurante</Typography>
            <Typography variant='overline' className={classes.infoParagraphRight}>{restText}</Typography>
          </div>
          <div id="info_block_loja" className={classes.infoBlock}>
            <Typography variant="display1" className={classes.infoTextLeft}>Nossas Lojas</Typography>
            <Typography variant='overline' className={classes.infoParagraphLeft}>{restText}</Typography>
            <img src={infoImage} className={classes.infoImgsRight} />
          </div>
          <div id="info_block_restaurant" className={classes.infoBlock}>
            <img src={infoImage} style={{ marginTop: '6vh' }} className={classes.infoImgsLeft} />
            <Typography id="nss_restaurante" variant="display1" className={classes.infoTextRightThird}>Espaços do Hotel</Typography>
            <Typography variant='overline' className={classes.infoParagraphRightThird}>{restText}</Typography>
          </div>
        </div>
        <div id="pageFooter" className={classes.pageFooter}>
          <div id="infoText" className={classes.footerInfoText}>
            <Typography variant="overline">contato@wgmanagement.com</Typography>
            <Typography variant="overline">+55(11)995841564</Typography>
          </div>
          <div id="links" className={classes.footerLinks}>
            <Typography>
              <Link href="javascript;;" className={classes.footerLinks}>NewsLetter</Link>
              <Link href="javascript;;" className={classes.footerLinks}>Contato Empresarial</Link>
              <Link href="javascript;;" className={classes.footerLinks}>Informações Legais</Link>
              <Link href="javascript;;" className={classes.footerLinks}>Trabalhe Conosco</Link>
              <Link href={(this.state.tpUsuario == "guest" || this.state.tpUsuario == "") ? "/" : "/management"} className={classes.footerLinks}>Área Administrativa</Link>
            </Typography>
          </div>
        </div>
        <Dialog
          open={this.state.loginDialog}
          onClose={this.handleLoginDialogClose}
          onBackdropClick={this.handleLoginDialogClose}
          maxWidth="md"
        >
          <DialogTitle>
            Bem vindo(a)! Por favor, faça o Login
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              name="loginUsrTextField"
              id="pssTextField"
              label="Usuário"
              type="text"
              value={this.state.loginUsrTextField}
              onChange={this.handleLoginTextFieldChange('loginUsrTextField')}
              fullWidth
            />
            <TextField
              margin="normal"
              name="loginPssTextField"
              id="pssTextField"
              label="Senha"
              type="password"
              value={this.state.loginPssTextField}
              onChange={this.handleLoginTextFieldChange('loginPssTextField')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickLogin}>
              Login
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={usrRegistertDialog}
          TransitionComponent={this.Transition}
          keepMounted
          fullWidth
          maxWidth="md"
          onClose={this.handleUsrRegisterDialogClose}
          onBackdropClick={this.handleUsrRegisterDialogClose}
        >
          <DialogTitle>
            <Typography variant="overline">Cadastro WgManagement</Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              id="nomeCompleto"
              type="text"
              label="Nome Completo"
              value={usrNomeCompleto}
              onChange={this.handleUsrRegisterTextChange('usrNomeCompleto')}
              margin="normal"
              fullWidth
              placeholder="Bernardo Favaretto"
            />
            <TextField
              id="login"
              type="text"
              label="E-mail"
              value={usrLogin}
              onChange={this.handleUsrRegisterTextChange('usrLogin')}
              margin="normal"
              fullWidth
              placeholder="bfavaretto@gmail.com"
            />
            <TextField
              id="senha"
              type="password"
              label="Senha"
              value={usrSenha}
              onChange={this.handleUsrRegisterTextChange('usrSenha')}
              margin="normal"
              fullWidth
            />
            <DatePicker
              margin="normal"
              label="Data de Nascimento"
              value={usrDtNascimento}
              onChange={this.handleUsrDatNascimentoChange}
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
              onChange={this.handleUsrRegisterTextChange('usrProfissao')}
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
              onChange={this.handleUsrRegisterTextChange('usrNacionalidade')}
              fullWidth
              placeholder="Brasileiro"
            />
            <div style={{ marginTop: '1vh' }}>
              <InputLabel htmlFor="meioPagamento">Meio de Pagamento</InputLabel>
              <Select
                id="meioPagamento"
                value={usrMeioDePagamento}
                onChange={this.handleUsrRegisterTextChange('usrMeioDePagamento')}
                placeholder="Cartão de Crédito"
                fullWidth
              >
                <MenuItem value="cartaoCredito">Cartão de Crédito</MenuItem>
                <MenuItem value="cartaoDebito">Cartão de Débito</MenuItem>
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
              onChange={this.handleUsrRegisterTextChange('usrEnderecoNumero')}
              placeholder="25"
              style={{ width: '5vw', marginLeft: '2vw' }}
            />
            <TextField
              margin="normal"
              id="enderecoComplemento"
              label="Complemento"
              type="text"
              value={usrEnderecoComplemento}
              onChange={this.handleUsrRegisterTextChange('usrEnderecoComplemento')}
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
                <MenuItem value="beloHorizonte">Belo Horizonte</MenuItem>
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
            <Button onClick={this.handleUsrRegisterDialogClose} color="primary">
              Cadastrar
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar 
          anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
          open={snackOpen}
          onClose={this.eatSnack}
          message={<span id="snackMessage">{this.state.snackMessage}</span>}
          autoHideDuration={2000}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.eatSnack}
            >
              <Close />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

MainPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mainPage: makeSelectMainPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mainPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(withStyles(styles)(MainPage));