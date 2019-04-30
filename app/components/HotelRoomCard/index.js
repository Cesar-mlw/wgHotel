/**
 *
 * HotelRoomCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types'
import { Card, CardActionArea, CardMedia, CardContent, Typography, withStyles, Dialog, Slide, DialogTitle, DialogContent } from '@material-ui/core'
import hotelRoomImg from '../../images/hotelRoomImg.png'
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
            </CardContent>
          </CardActionArea>
        </Card>
        <Dialog
          open={dialogOpen}
          TransitionComponent={this.Transition}
          keepMounted
          onClose={this.handlDialogClose}
          onBackdropClick={this.handleDialogClose}
        >
          <DialogTitle>
            Informações sobre o quarto {this.props.numeroQuarto}
          </DialogTitle>
          <DialogContent>

          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

HotelRoomCard.propTypes = {
  numeroQuarto: PropTypes.string.isRequired,
  tipoQuarto: PropTypes.string.isRequired,
};

export default withStyles(style)(HotelRoomCard);
