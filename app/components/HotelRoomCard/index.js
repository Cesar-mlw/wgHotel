/**
 *
 * HotelRoomCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types'
import { 
  Card, 
  CardActionArea, 
  CardMedia, 
  CardContent, 
  Typography, 
  withStyles, 
  Dialog, 
  Slide, 
  DialogTitle, 
  DialogContent, } from '@material-ui/core'
import hotelRoomImg from '../../images/hotelRoomImg.png'
import greenBall from '../../images/greenBall.png'
import redBall from '../../images/redBall.png'
import yellowBall from '../../images/yellowBall.png'
import { MeetingRoom } from '@material-ui/icons'
// import PropTypes from 'prop-types';
// import styled from 'styled-components';


//Notas sobre usuários
//Camareira - Registra consumo do quarto
//Atendente - Faz reservas
//Supervisor de Acomodação - Edita dados do quarto

//Cores para vacant Status
//Verde - Disponível
//Vermelho - Ocupado (colocar dentro do diálogo data de até quando a reserva é vigente)
//Amarelo - Limpeza / Interditado

const style = {
  root:{
    marginLeft:'1vw',
    marginTop: '1vh'
  },
  card:{
    maxWidth: 345,
  },
  media:{
    objectFit: 'cover',
  },
  title:{
    marginBottom: 0.5
  },
  cardVacantImg: {
    width: 25,
    height: 25,
    marginLeft: '18.5vw',
    marginTop: '-8vh'
  },
  dialogInfoText: {
    fontSize: '0.8em',
    display: 'flex',
    flexWrap: 'wrap',
    float: 'left',
    marginLeft: '2.5vw'
  }
}
class HotelRoomCard extends React.Component {
  state={
    dialogOpen: false,
  }
  Transition = props => {
    return <Slide direction='up' {...props}/>
  } 
  handleDialogClose = () =>{
    this.setState({dialogOpen: false})
  }
  handleDialogOpen = () => {
    this.setState({dialogOpen: true})
  }
  
  render() {
    const { classes } = this.props
    const { dialogOpen } = this.state
    console.log(this.props.vacant)
    return (
      <div className={classes.root}>
        <Card className={classes.card} onClick={this.handleDialogOpen}>
          <CardActionArea>
            <CardMedia
              component='img'
              alt='Interior do Quarto'
              height='140'
              image={hotelRoomImg}
              title='Interior do Quarto'
            />
            <CardContent>
              <Typography className={classes.title} gutterBottom variant='overline' >Número do Quarto: {this.props.numeroQuarto}</Typography>
              <Typography variant='caption'>Tipo do Quarto: {this.props.tipoQuarto}</Typography>
              <img src={(this.props.vacant == "disp") ? greenBall : (this.props.vacant == "ocup") ? redBall : yellowBall} className={classes.cardVacantImg}/>
            </CardContent>
          </CardActionArea>
        </Card>
        <Dialog
          open={dialogOpen}
          TransitionComponent={this.Transition}
          keepMounted
          fullWidth
          onClose={this.handlDialogClose}
          onBackdropClick={this.handleDialogClose}
        >
          <DialogTitle>
            Informações Adicionais
          </DialogTitle>
          <DialogContent>
            {this.props.tipoUsuario == "atendente" && (
              <div>
                <Typography className={classes.dialogInfoText} variant='overline'><MeetingRoom/> {this.props.numeroQuarto}</Typography>
                <Typography className={classes.dialogInfoText} variant='overline'>Estado: {(this.props.vacant == 'disp') ? 'Disponível': (this.props.vacant == 'ocup') ? "Ocupado": (this.props.vacant == 'inter') ? "Interditado" : "Limpando"}</Typography>
                <Typography className={classes.dialogInfoText} variant='overline'>Tier: {this.props.tipoQuarto}</Typography>
                <Typography className={classes.dialogInfoText} variant='overline'>Preço da Diária: {this.props.precoDiaria},00</Typography>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

HotelRoomCard.propTypes = {
  numeroQuarto: PropTypes.string.isRequired,
  tipoQuarto: PropTypes.string.isRequired,
  vacant: PropTypes.string,
  tipoUsuario: PropTypes.string.isRequired,
  precoDiaria: PropTypes.string,
};

export default withStyles(style)(HotelRoomCard);
