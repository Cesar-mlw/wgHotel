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
  TextField,
  Button,
  Link,
} from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers'
import { AccountCircleOutlined, MenuOutlined } from '@material-ui/icons';
import tripad from '../../images/tripad.png'
import faceb from '../../images/faceb.png'
import instaIcon from '../../images/instaIcon.jpg'
import placeholderLogo from '../../images/placeholderLogo.png'
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
    width: 60,
    height: 50,
    marginLeft: "17vw"
  },
  socialMedias: {
    flexGrow: 1,
    width: 55,
    height: 32,
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
    color: '#ADA788',
    textColor: '#ADA788'
  },
  reservationButton: {
    marginTop: "3.5vh",
    marginLeft: "8vw",
    background: '#ADA788',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  appBar: {
    backgroundColor: "#BAB392"
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
    color: "#ABA586",
  },
  infoParagraphRight: {
    width: "45vw",
    marginTop: "6vh",
    marginLeft: "53vw",
    color: "#ABA586",
  },
  infoTextLeft: {
    color: "#ABA586",
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
    color: "#ABA586",
  },
  infoTextRightThird: {
    color: "#ABA586",
    width: "50vw",
    heigth: "10vw",
    marginTop: "25vh",
    marginLeft: "67vw",

  },
  infoParagraphRightThird: {
    color: "#ABA586",
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
  footerLinks:{
    textDecoration: "none",
    color: "#A2B8B7",
    marginLeft: "10vh",
    fontSize: "1.6em"
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
class HomePage extends React.PureComponent {
  state = {
    anchorEl: null,
    acomodacao: "normal",
    chegada: null,
    saida: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

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

  render() {
    const { classes } = this.props;
    const { anchorEl, acomodacao, saida, chegada } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <div id="socialMedias">
              <img src={tripad} className={classes.socialMedias} />
              <img src={faceb} className={classes.socialMedias} />
              <img src={instaIcon} className={classes.socialMedias} />
            </div>
            <div className={classes.grow} id="logo">
              <img src={placeholderLogo} className={classes.grow} />
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
              <MenuItem key={option.value} value={option.value} style={{ textColor: '#ADA788' }}>
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
            variant="flat"
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
            <img src={infoImage} className={classes.infoImgsLeft} />
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
                <Link href="/management" className={classes.footerLinks}>Área Administrativa</Link>
              </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);