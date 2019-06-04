/**
 *
 * MainPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Cookies from 'universal-cookie'
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
import { DatePicker } from 'material-ui-pickers';
import { AccountCircleOutlined, MenuOutlined, Close } from '@material-ui/icons';
import tripad from '../../images/trip.png';
import faceb from '../../images/face.png';
import instaIcon from '../../images/insta.png';
import placeholderLogo from '../../images/logo.png';
import hotelMainImage from '../../images/hotelMainImage.jpg';
import infoImage from '../../images/infoImage.jpg';

const restText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris scelerisque viverra orci sit amet volutpat. Maecenas egestas egestas mi eu tincidunt. Phasellus consectetur velit ultricies dui consequat, ut pretium mi rhoncus. Suspendisse tempus libero in auctor volutpat. Aenean tincidunt leo egestas tellus egestas lacinia. Donec neque augue, porttitor a tincidunt sit amet, posuere id quam. Aenean ultrices lorem orci, non sagittis nunc hendrerit at. Ut tempus tortor eu turpis luctus, a condimentum risus suscipit. Sed quis est sit amet libero convallis lacinia sit amet eu leo. Ut lacinia sollicitudin mauris, sit amet eleifend ante vulputate vitae. Aliquam erat volutpat.';

const cookies = new Cookies()

const styles = {
  root: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  grow: {
    flexGrow: 1,
    height: 50,
    marginLeft: '13vw',
  },
  socialMedias: {
    flexGrow: 1,
    width: 47,
    height: 33,
    paddingLeft: '0.5vw',
  },
  socialMediasFace: {
    flexGrow: 1,
    width: 43,
    height: 32,
    paddingLeft: '0.5vw',
  },
  socialMediasInsta: {
    flexGrow: 1,
    width: 50,
    height: 36,
    paddingLeft: '0.5vw',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  carousel: {
    width: '100vw',
    height: '70vh',
  },
  reservations: {
    width: '100vw',
    height: '15vh',
    marginTop: '3vh',
    marginLeft: '15vw',
    float: 'left',
  },
  datePicker: {
    marginTop: '2vh',
    marginLeft: '8vw',
    color: '#00BFDF',
    textColor: '#00BFDF',
  },
  reservationButton: {
    marginTop: '3.5vh',
    marginLeft: '8vw',
    background: '#00BFDF',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  appBar: {
    backgroundColor: '#DEFAFF',
  },
  infoRoot: {
    width: '100vw',
    height: '75vh',
  },
  infoBlock: {
    width: '100vw',
    height: '25vh',
  },
  infoImgsLeft: {
    width: '50vw',
    height: '50vh',
    float: 'left',
  },
  infoText: {
    marginLeft: '64vw',
    color: '#00BFDF',
  },
  infoParagraphRight: {
    width: '45vw',
    marginTop: '6vh',
    marginLeft: '53vw',
  },
  infoTextLeft: {
    color: '#00BFDF',
    marginTop: '50vh',
    marginLeft: '17vw',
  },
  infoImgsRight: {
    width: '50vw',
    height: '50vh',
    marginTop: '-57vh',
    marginLeft: '50vw',
    float: 'left',
  },
  infoParagraphLeft: {
    width: '45vw',
    marginLeft: '2vw',
    marginTop: '8vh',
  },
  infoTextRightThird: {
    color: '#00BFDF',
    width: '50vw',
    heigth: '10vw',
    marginTop: '25vh',
    marginLeft: '67vw',
  },
  infoParagraphRightThird: {
    width: '40vw',
    heigth: '40vw',
    marginLeft: '55vw',
    marginTop: '10vh',
  },
  pageFooter: {
    width: '100vw',
    height: '10vh',
    marginTop: '112vh',
  },
  footerInfoText: {
    marginLeft: '0.5vw',
    opacity: 0.5,
    float: 'left',
  },
  footerLinks: {
    textDecoration: 'none',
    color: '#00BFDF',
    marginLeft: '10vh',
    fontSize: '1.6em',
  },
  welcomeText: {
    color: '#A2B8B7',
    marginRight: '1vw',
    marginTop: '1vh',
  },
  appBarRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  monthYearTextField: {
    width: '6vw',
    float: 'left',
  },
};

const room = [
  {
    value: 'standard',
    label: 'New York',
  },
  {
    value: 'lightLuxury',
    label: 'Milan',
  },
  {
    value: 'ultraLuxury',
    label: 'Dubai',
  },
];
/* eslint-disable react/prefer-stateless-function */
class MainPage extends React.PureComponent {
  state = {
    anchorEl: null,
    acomodacao: '',
    chegada: null,
    saida: null,
    logged: false, // TESTING
    loginDialog: false,
    loginUsrTextField: '',
    loginPssTextField: '',
    snackOpen: false,
    snackMessage: '',
    tpUsuario: '',
    usrRegistertDialog: false,
    // Register User
    usrNomeCompleto: '', //1
    usrProfissao: '', //6
    usrTelefone: '', //5
    usrNacionalidade: '', //8
    usrDtNascimento: null, //2
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
    usrPersonalInfoDialog: false,
    usrRegisterTextFieldsComplete: false,
    usrPaymentInfoDialog: false,
    usrPaymentInfoTextFieldComplete: false,
    usrPaymentCardNumber: '',
    usrPaymentCVV: '',
    usrPaymentExpMonth: '',
    usrPaymentExpYear: '',
    usrPaymentName: '',
    //------
    //Reservation Answer
    reservationAnswerDialog: false,
    reservationAnswerText: '',
    //------
    payementMethodsList: [],
    occupationList: [],
    roomType: [],
    usrDbId: null,
    usrDBName: '',
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  Transition = props => {
    return <Slide direction="up" {...props} />;
  };

  handleUsrRegisterDialogClose = () => {
    this.setState({ usrRegistertDialog: false });
  };

  handleUsrRegisterDialogOpen = () => {
    this.setState({ usrRegistertDialog: true });
  };

  

  handleClickReserva = () => {
    let date = Date.parse(this.state.saida);
    let arrival = Date.parse(this.state.chegada);
    if (date < arrival) {
      this.makeSnack('A data de chegada deve ser depois da de chegada');
      this.setState({ chegada: null, saida: null });
      return;
    }
    if (this.state.logged) {
        let usrPaymentInfo = true;
        if (usrPaymentInfo) {
          let resp = true;
          if (
            this.state.acomodacao == '' ||
            this.state.chegada == null ||
            this.state.saida == null
          ) {
            this.makeSnack('Preencha todos os campos antes de prosseguir');
          } else {
            if (!resp) {
              this.setState({
                reservationAnswerDialog: true,
                reservationAnswerText:
                  'Infelizmente o quarto solicitado não está disponível',
              });
            } else {
              this.setState({
                reservationAnswerDialog: true,
                reservationAnswerText: `Seu quarto do tipo ${
                  this.state.acomodacao == 'standard'
                    ? 'New York'
                    : this.state.acomodacao == 'lightLuxury'
                      ? 'Milan'
                      : 'Dubai'
                } foi reservado`,
              });
            }
          }
        } else {
          this.setState({ usrPaymentInfoDialog: true });
        }
      
    } else {
      this.makeSnack(
        'Registre-se ou faça o login antes de efetuar uma reserva',
      );
      this.setState({ loginDialog: true });
    }
  };

  handleUsrDatNascimentoChange = date => {
    this.setState({ usrDtNascimento: date });
  };

  handleReservationAnswerDialogClose = () => {
    this.setState({ reservationAnswerDialog: false });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleAcomodacaoChange = event => {
    this.setState({ acomodacao: event.target.value });
  };

  handleRegisterClick = () => {
    if (this.state.usrLogin != '' && this.state.usrSenha != '') {
      axios
        .post(
          'http://wg-tech-homologacao.herokuapp.com/user',
          { username: this.state.usrLogin, password: this.state.usrSenha },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          let data = response.data;
          console.log(data);
          if (data.success) {
            this.setState({
              usrSenha: '',
              usrDbId: data.return.id,
            });
            this.makeSnack('Registrado com sucesso');
          } else {
            this.makeSnack('Erro ao registrar usuário, tente novamente');
          }
        })
        .catch(err => console.log(err));
    } else {
      this.makeSnack('Preencha todos os campos antes prosseguir');
    }

    this.handleUsrRegisterDialogClose();
  };

  handleChegadaChange = event => {
    this.setState({ chegada: new Date(event) });
  };

  handleUsrPaymentInfoDialogClose = () => {
    this.setState({ usrPaymentInfoDialog: false });
  };

  handleUsrPaymentInfoDialogOpen = () => {
    this.setState({ usrPaymentInfoDialog: true });
  };

  checkUserInfo = () => {
    axios.get(`http://wg-tech-homologacao.herokuapp.com/person/user/${this.state.usrDbId}`)
      .then(response => {
        let data = response.data
        if(data.return == null){
          this.setState({usrPersonalInfoDialog: true})
        }
        else if(data.return != null){
          this.setState({usrDBName: data.return.name})
          cookies.set('usrName', data.return.name)
          cookies.set('usrDbId', this.state.usrDbId)
        }
        if(data.error){
          console.error(data.error)
        }
      })
  }

  handleSaidaChange = event => {
    this.setState({ saida: new Date(event) });
  };

  handleLoginDialogOpen = () => {
    this.setState({ loginDialog: true });
  };

  handleLoginDialogClose = () => {
    this.setState({ loginDialog: false });
  };

  handleLoginTextFieldChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleUsrRegisterTextChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  makeSnack = message => {
    this.setState({ snackOpen: true, snackMessage: message });
  };

  eatSnack = () => {
    this.setState({ snackOpen: false, snackMessage: '' });
  };

  handleRegisterClickLink = () => {
    this.setState({ loginDialog: false, usrRegistertDialog: true });
  };

  handleUsrPersonalInfoDialogOpen = () => {
    this.setState({ usrPersonalInfoDialog: true });
  };

  handleUsrPersonalInfoDialogClose = () => {
    this.setState({ usrPersonalInfoDialog: false });
  };


  handleUsrPersonalInfoRegisterClick = () => {
    if (
      this.state.usrNomeCompleto != '' &&
      this.state.usrDocMed != '' &&
      this.state.usrDtNascimento != '' &&
      this.state.usrNacionalidade != '' &&
      this.state.usrId != '' &&
      this.state.usrProfissao != '' &&
      this.state.usrSexo != ''
    ) {
      axios.post("http://wg-tech-homologacao.herokuapp.com/person", {
        name: this.state.usrNomeCompleto, 
        document: this.state.usrId, 
        birth: this.state.usrDtNascimento,
        nationality: this.state.usrNacionalidade,
        deficient: this.state.usrDocMed == '' ? false : true,
        deficientDocument: this.state.usrDocMed,
        gender: this.state.usrSexo,
        OccupationId: this.state.usrProfissao,
        UserId: this.state.usrDbId,
      })
      .then(response => {
        let data = response.data
        if(data.success){
          this.makeSnack("Informações pessoais registradas com sucesso")
          cookies.set('usrName', this.state.usrNomeCompleto)
          cookies.set('usrDbId', this.state.usrDbId)
        }
        else if(data.error){
          console.error(data.error)
        }
      })
      
      this.makeSnack('Dados Registrados com sucesso');
      this.setState({ usrPersonalInfoDialog: false });
    } else {
      this.makeSnack('Preencha todos os dados necessários');
    }
  };

  handleUsrPaymentInfoTextChange = name => event => {
    this.setState({ [name]: event.target.value });
    this.handleUsrPaymentInfoTextFieldCompletion();
  };



  handleUsrPaymentInfoRegister = () => {
    if (
      this.state.usrPaymentName == '' ||
      this.state.usrPaymentCVV == '' ||
      this.state.usrPaymentCardNumber == '' ||
      this.state.usrPaymentExpMonth == '' ||
      this.state.usrPaymentExpYear == ''
    ) {
      this.makeSnack('Preencha todos os campos antes de prosseguir');
    } else {
      this.makeSnack('Dados registrados com sucesso');
      this.setState({ usrPaymentInfoDialog: false });
    }
  };

  handleClickLogin = () => {
    if (
      this.state.loginUsrTextField != '' &&
      this.state.loginPssTextField != ''
    ) {
      axios
        .get('http://wg-tech-homologacao.herokuapp.com/user', {
          params: {
            email: this.state.loginUsrTextField,
          },
        })
        .then(response => {
          let data = response.data;
          if (data.success) {
            if(data.return == null){
              this.makeSnack("E-mail ou senha incorreto")
              this.setState({anchorEl: null, loginDialog: false})
            }
            if (data.return.password == this.state.loginPssTextField) {
              this.setState({
                logged: true,
                loginDialog: false,
                anchorEl: null,
                tpUsuario: 'admin',
                usrDbId: data.return.id
              });
              this.checkUserInfo();
            }
            else{
              this.setState({anchorEl: null, loginDialog: false})
              this.makeSnack("E-mail ou senha Incorreta")
            }
          } else {
            this.makeSnack('Falha ao realizar login, tente novamente');
          }
        });
    } else {
      this.makeSnack('Preencha todos os campos antes de prosseguir');
    }
  };

  handlePaymentMethodCall = () => {
    axios
      .get('https://wg-tech-homologacao.herokuapp.com/paymentmethods', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        let data = response.data.return;
        this.setState({ payementMethodsList: data });
      })
      .catch(err => console.log(err));
  };

  handleOccupationCall = () => {
    axios
      .get('https://wg-tech-homologacao.herokuapp.com/persons/occupations', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        let data = response.data.return;
        this.setState({ occupationList: data });
      })
      .catch(err => console.log(err));
  };

  handleRoomTypeCall = () => {
    axios
      .get('https://wg-tech-homologacao.herokuapp.com/bedrooms/types', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        let data = response.data.return;
        this.setState({ roomType: data });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.handlePaymentMethodCall();
    this.handleOccupationCall();
    this.handleRoomTypeCall();
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
      logged,
      reservationAnswerDialog,
      reservationAnswerText,
      payementMethodsList,
      occupationList,
      usrPersonalInfoDialog,
      usrPaymentInfoDialog,
      usrPaymentCVV,
      usrPaymentCardNumber,
      usrPaymentExpMonth,
      usrPaymentExpYear,
      usrPaymentName,
      usrDbId,
      usrDBName
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
            {logged ? (
              <div className={classes.appBarRoot}>
                <div id="welcomeText" className={classes.welcomeText}>
                  <Typography variant="overline" noWrap>
                    Bem vindo(a), {usrDBName}
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
                    <MenuItem onClick={this.handleClose}>
                      Minhas Reservas
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            ) : (
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
                  <MenuItem onClick={this.handleUsrRegisterDialogOpen}>
                    Crie uma Conta
                  </MenuItem>
                  <MenuItem onClick={this.handleLoginDialogOpen}>
                    Já Possuo uma Conta
                  </MenuItem>
                </Menu>
              </div>
            )}
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
            {this.state.roomType.map(option => (
              <MenuItem
                key={option.id}
                value={option.id}
                style={{ textColor: '#00BFDF' }}
              >
                {option.type}
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
            onClick={this.handleClickReserva}
          >
            Reservar
          </Button>
        </div>
        <div id="hotelInfoRes" className={classes.infoRoot}>
          <div id="info_block_restaurant" className={classes.infoBlock}>
            <img src={infoImage} className={classes.infoImgsLeft} />
            <Typography
              id="nss_restaurante"
              variant="display1"
              className={classes.infoText}
            >
              Nosso Restaurante
            </Typography>
            <Typography
              variant="overline"
              className={classes.infoParagraphRight}
            >
              {restText}
            </Typography>
          </div>
          <div id="info_block_loja" className={classes.infoBlock}>
            <Typography variant="display1" className={classes.infoTextLeft}>
              Nossas Lojas
            </Typography>
            <Typography
              variant="overline"
              className={classes.infoParagraphLeft}
            >
              {restText}
            </Typography>
            <img src={infoImage} className={classes.infoImgsRight} />
          </div>
          <div id="info_block_restaurant" className={classes.infoBlock}>
            <img
              src={infoImage}
              style={{ marginTop: '6vh' }}
              className={classes.infoImgsLeft}
            />
            <Typography
              id="nss_restaurante"
              variant="display1"
              className={classes.infoTextRightThird}
            >
              Espaços do Hotel
            </Typography>
            <Typography
              variant="overline"
              className={classes.infoParagraphRightThird}
            >
              {restText}
            </Typography>
          </div>
        </div>
        <div id="pageFooter" className={classes.pageFooter}>
          <div id="infoText" className={classes.footerInfoText}>
            <Typography variant="overline">contato@wgmanagement.com</Typography>
            <Typography variant="overline">+55(11)995841564</Typography>
          </div>
          <div id="links" className={classes.footerLinks}>
            <Typography>
              <Link href="javascript;;" className={classes.footerLinks}>
                NewsLetter
              </Link>
              <Link href="javascript;;" className={classes.footerLinks}>
                Contato Empresarial
              </Link>
              <Link href="javascript;;" className={classes.footerLinks}>
                Informações Legais
              </Link>
              <Link href="javascript;;" className={classes.footerLinks}>
                Trabalhe Conosco
              </Link>
              <Link
                href={
                  this.state.tpUsuario == 'guest' || this.state.tpUsuario == ''
                    ? '/'
                    : '/management'
                }
                className={classes.footerLinks}
              >
                Área Administrativa
              </Link>
            </Typography>
          </div>
        </div>
        <Dialog
          open={this.state.loginDialog}
          onClose={this.handleLoginDialogClose}
          onBackdropClick={this.handleLoginDialogClose}
          maxWidth="md"
        >
          <DialogTitle>Bem vindo(a)! Por favor, faça o Login</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              name="loginUsrTextField"
              id="usrTextField"
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
            <Link
              component="button"
              variant="body2"
              onClick={this.handleRegisterClickLink}
            >
              Login
            </Link>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickLogin}>Login</Button>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRegisterClick} color="primary">
              Cadastrar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={usrPersonalInfoDialog}
          TransitionComponent={this.Transition}
          keepMounted
          fullWidth
          maxWidth="md"
          onClose={this.handleUsrPersonalInfoDialogClose}
        >
          <DialogTitle>
            <Typography variant="headline">Informações pessoais</Typography>
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
              required
            />
            <DatePicker
              margin="normal"
              label="Data de Nascimento"
              value={usrDtNascimento}
              onChange={this.handleUsrDatNascimentoChange}
              fullWidth
              style={{ marginBottom: '-1vh' }}
              disableFuture
              required
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
              required
            />
            <div style={{ marginTop: '1vh' }}>
              <InputLabel htmlFor="sexSelect">Sexo</InputLabel>
              <Select
                id="sexSelect"
                value={usrSexo}
                onChange={this.handleUsrRegisterTextChange('usrSexo')}
                placeholder="Sexo"
                fullWidth
                required
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
              required
            />
            <div style={{ marginTop: '1vh' }}>
              <InputLabel htmlFor="profissao">Profissão</InputLabel>
              <Select
                id="profissao"
                value={usrProfissao}
                onChange={this.handleUsrRegisterTextChange('usrProfissao')}
                placeholder="Engenheiro"
                fullWidth
                required
              >
                {occupationList.map(occ => (
                  <MenuItem key={occ.id} value={occ.id}>
                    {occ.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
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
              required
            />
            <TextField
              margin="normal"
              id="endereco"
              label="Endereço"
              type="text"
              value={usrEndereco}
              onChange={this.handleUsrRegisterTextChange('usrEndereco')}
              placeholder="Rua Abobrinha"
              style={{ width: '23vw' }}
              required
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
              required
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
              <InputLabel htmlFor="cidadeSelect">Cidade</InputLabel>
              <Select
                value={usrCidade}
                id="cidadeSelect"
                onChange={this.handleUsrRegisterTextChange('usrCidade')}
                placeholder="São Paulo"
                fullWidth
                required
              >
                <MenuItem value="saoPaulo">São Paulo</MenuItem>
                <MenuItem value="rioDeJaneiro">Rio de Janeiro</MenuItem>
                <MenuItem value="beloHorizonte">Belo Horizonte</MenuItem>
              </Select>
            </div>
            <div style={{ marginTop: '1vh' }}>
              <InputLabel htmlFor="estadoSelect">Estado</InputLabel>
              <Select
                id="estadoSelect"
                value={usrEstado}
                onChange={this.handleUsrRegisterTextChange('usrEstado')}
                placeholder="São Paulo"
                fullWidth
                required
              >
                <MenuItem value="saoPaulo">São Paulo</MenuItem>
                <MenuItem value="rioDeJaneiro">Rio de Janeiro</MenuItem>
                <MenuItem value="minasGerais">Minas Gerais</MenuItem>
              </Select>
            </div>
            <div style={{ marginTop: '1vh' }}>
              <InputLabel htmlFor="paisSelect">País</InputLabel>
              <Select
                id="paisSelect"
                value={usrPais}
                onChange={this.handleUsrRegisterTextChange('usrPais')}
                placeholder="Brasil"
                fullWidth
                required
              >
                <MenuItem value="Brasil">Brasil</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="russia">Rússia</MenuItem>
              </Select>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleUsrPersonalInfoRegisterClick}
              color="primary"
            >
              Cadastrar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={usrPaymentInfoDialog}
          TransitionComponent={this.Transition}
          keepMounted
          fullWidth
          maxWidth="md"
          onClose={this.handleUsrPaymentInfoDialogClose}
        >
          <DialogTitle>
            <Typography variant="headline">Informações fiscais</Typography>
          </DialogTitle>
          <DialogContent>
            <div style={{ marginTop: '1vh' }}>
              <InputLabel htmlFor="meioPagamento">Meio de Pagamento</InputLabel>
              <Select
                id="meioPagamento"
                value={usrMeioDePagamento}
                onChange={this.handleUsrRegisterTextChange(
                  'usrMeioDePagamento',
                )}
                placeholder="Cartão de Crédito"
                fullWidth
              >
                {payementMethodsList.map(py => (
                  <MenuItem key={py.id} value={py.id}>
                    {py.method}
                  </MenuItem>
                ))}
              </Select>
            </div>
            {this.state.usrMeioDePagamento == 1 ||
            this.state.usrMeioDePagamento == 2 ? (
              <div style={{ float: 'left' }}>
                <TextField
                  margin="normal"
                  id="cardNumber"
                  label="Número do Cartão"
                  type="text"
                  value={usrPaymentCardNumber}
                  onChange={this.handleUsrPaymentInfoTextChange(
                    'usrPaymentCardNumber',
                  )}
                  placeholder="2222333344445555"
                  fullWidth
                  required
                />
                <TextField
                  margin="normal"
                  id="cardName"
                  label="Nome Impresso no Cartão"
                  type="text"
                  value={usrPaymentName}
                  onChange={this.handleUsrPaymentInfoTextChange(
                    'usrPaymentName',
                  )}
                  placeholder="Bernardo Favaretto"
                  fullWidth
                  required
                />
                <TextField
                  margin="normal"
                  id="cardCVV"
                  label="CVV"
                  type="text"
                  value={usrPaymentCVV}
                  onChange={this.handleUsrPaymentInfoTextChange(
                    'usrPaymentCVV',
                  )}
                  placeholder="555"
                  required
                />
                <div>
                  <TextField
                    id="cardMonth"
                    label="Mês"
                    type="text"
                    value={usrPaymentExpMonth}
                    onChange={this.handleUsrPaymentInfoTextChange(
                      'usrPaymentExpMonth',
                    )}
                    placeholder="01 - 12"
                    required
                    className={classes.monthYearTextField}
                  />
                  <Typography variant="display1" style={{ marginTop: '2vh' }}>
                    {' '}
                    /{' '}
                  </Typography>
                  <TextField
                    id="carYear"
                    label="Ano"
                    type="text"
                    value={usrPaymentExpYear}
                    onChange={this.handleUsrPaymentInfoTextChange(
                      'usrPaymentExpYear',
                    )}
                    placeholder="10 - 27"
                    required
                    className={classes.monthYearTextField}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleReservationAnswerDialogClose}
              color="primary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={reservationAnswerDialog}
          TransitionComponent={this.Transition}
          keepMounted
          fullWidth
          maxWidth="md"
          onClose={this.handleReservationAnswerDialogClose}
          onBackdropClick={this.handleReservationAnswerDialogClose}
        >
          <DialogTitle>
            <Typography variant="headline">Reserva WgManagement</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography
              variant="overline"
              style={{ marginTop: '3vh', fontSize: '0.8em' }}
            >
              {reservationAnswerText}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleReservationAnswerDialogClose}
              color="primary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
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
            </IconButton>,
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
