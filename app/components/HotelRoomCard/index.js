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
  DialogContent,
  Button, 
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  IconButton,
   } from '@material-ui/core'
import hotelRoomImg from '../../images/hotelRoomImg.png'
import greenBall from '../../images/greenBall.png'
import redBall from '../../images/redBall.png'
import yellowBall from '../../images/yellowBall.png'
import { MeetingRoom, PriorityHigh, Block, Done, AttachMoney, Palette, Add, Remove } from '@material-ui/icons'
// import PropTypes from 'prop-types';
// import styled from 'styled-components';


//Notas sobre usuários
//Camareira - Registra consumo do quarto
//Atendente - Faz reservas
//Supervisor de Acomodação - Edita dados do quarto


//Quartos
//Check-in Check-out - Quem fizer a reserva é quem faz o check in e o check out
//letra indica bloco e o numero o andar


//Cores para vacant Status
//Verde - Disponível
//Vermelho - Ocupado (colocar dentro do diálogo data de até quando a reserva é vigente)
//Amarelo - Limpeza / Interditado

//Hóspedes
//Somente o atendente poderá manipular os hóspedes
//Dados do hóspede - CRUD - Dados Pessoais/Pagamento/
//campo pesquisar cpf 

//Restaurante
//somente supervisor do restaurante
//Estoquista - Solicitar um item / Registrar items consumidos 
//Host - Reservar mesas por quarto / Menu

//Sala de eventos - Vitrine

//Estacionamento
//Só manobrista
//tarifas extras / visualizar e alterar dados das vagas (carro ocupado qual vaga e hóspede dono do carro)



//Props taken
// -- ATENDENTE --
//numeroQuarto
//tipoQuarto
//vacant
//tipoUsuario
//precoDiaria
//ocupUntil
// -- CAMAREIRA -- 
//Lista de Produtos
  //nomeProduto
  //precoProduto
  //qtdeProduto
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
  dialog:{
    maxWidth: 1500
  },
  dialogRoot:{
    display: 'flex',
    flexWrap: 'wrap',
  },
  dialogInfoText: {
    fontSize: '0.8em',
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '2.5vw',
    marginTop: '2.5vh',
  },
  hotelRoomImgInCard:{
    width: '18vw',
    height: '18vh',
    marginLeft: '7vw'
  },
  btnReservarAtendente: {
    color: "#BAB392",
    marginLeft: "12vw",
    marginTop: "5vh"
  },
  tableAddButton: {
    height: 25,
    width: 25
  },
  btnConfirmar:{
    marginTop: '4vh',
    marginLeft: '1vw'
  },
}


class HotelRoomCard extends React.Component {
  state={
    dialogOpen: false,
    itemQted: 0,
    itemPreco: 0,
    itemPrecoTotal: 0,
    originalListaProduto: [],
    listaProduto: [],
    confirmBtn: true
  }
  componentWillMount(){
    this.setState({listaProduto: this.props.listaProduto, originalListaProduto: this.props.listaProduto})
    console.log(this.state.originalListaProduto)
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
  handleItemAdd = id =>{
    let newLista = this.state.listaProduto
    newLista.map(prd => {
      if(prd.id == id){
        prd.qtde += 1
      }
    })
    this.setState({listaProduto: newLista})
    //Still need to find a way to compare both lists to enable or disable confirm buttons
  }
  handleItemRemove = id =>{
    let newLista = this.state.listaProduto
    newLista.map(prd => {
      if(prd.id == id && prd.qtde - 1 >= 0){
        prd.qtde -= 1
      }
    })
    
    
    this.setState({listaProduto: newLista})
  }
  handleProductList = listaProduto => {
    const elements = []
    listaProduto.map(prd => {
      elements.push(
        <TableRow key={prd.id} id={prd.key}>
          <TableCell>{prd.nome}</TableCell>
          <TableCell align="right" ref={`qtde${prd.id}`}>{prd.qtde}</TableCell>
          <TableCell align="right" ref={`preco${prd.id}`}>{prd.preco}</TableCell>
          <TableCell align="right" ref={`total${prd.id}`}>{prd.preco * prd.qtde}</TableCell>
          <TableCell align="right"><IconButton color="primary" size="small" onClick={() => this.handleItemAdd(prd.id)}><Add/></IconButton></TableCell>
          <TableCell align="right"><IconButton color="secondary" size="small" onClick={() => this.handleItemRemove(prd.id)}><Remove/></IconButton></TableCell>
        </TableRow>
      )
    })
    return elements
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
              <img src={(this.props.vacant == "disp") ? greenBall : (this.props.vacant == "ocup") ? redBall : yellowBall} className={classes.cardVacantImg}/>
            </CardContent>
          </CardActionArea>
        </Card>
        <Dialog
          open={dialogOpen}
          TransitionComponent={this.Transition}
          keepMounted
          fullWidth
          maxWidth={(this.props.tipoUsuario == "atendente") ? "sm":"lg"}
          onClose={this.handlDialogClose}
          onBackdropClick={this.handleDialogClose}
          className={classes.dialog}
        >
          <DialogTitle>
            <Typography variant="overline" style={{fontSize:"0.9em"}}> Informações Adicionais </Typography>
          </DialogTitle>
          <DialogContent>
            {this.props.tipoUsuario == "atendente" && (
              <div className={classes.dialogRoot}>
                <div>
                  <Typography className={classes.dialogInfoText} variant='overline'><MeetingRoom/> {this.props.numeroQuarto}</Typography>
                  <Typography className={classes.dialogInfoText} variant='overline'>{(this.props.vacant == "inter") ? <PriorityHigh/> : (this.props.vacant == "ocup") ? <Block/> : <Done/>} {(this.props.vacant == 'disp') ? 'Disponível': (this.props.vacant == 'ocup') ? "Ocupado": (this.props.vacant == 'inter') ? "Interditado" : "Limpando"}</Typography>
                  <Typography className={classes.dialogInfoText} variant='overline'><Palette/> {this.props.tipoQuarto}</Typography>
                  <Typography className={classes.dialogInfoText} variant='overline'><AttachMoney/> {this.props.precoDiaria},00 / Dia</Typography>
                  <Typography className={classes.dialogInfoText} variant='overline'>{(this.props.vacant == "disp") ?  "Próxima reserva:": "Ocupado até:"} {this.props.ocupUntil}</Typography>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    className={classes.btnReservarAtendente}
                  >
                    Efetuar Reserva
                  </Button>
                </div>
              </div>
            )}
            {this.props.tipoUsuario == "camareira" && (
              <div >
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
                    {this.handleProductList(this.state.listaProduto)}
                  </TableBody>
                </Table>
                <Button variant="outlined"  disabled={this.state.confirmBtn} color="primary" className={classes.btnConfirmar}>
                  Confirmar
                </Button>
                <Button variant="outlined"  disabled={this.state.confirmBtn} color="secondary" className={classes.btnConfirmar}>
                  Cancelar
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
// Organizar por numero de quarto
// Busca pelo quarto
// 
HotelRoomCard.propTypes = {
  numeroQuarto: PropTypes.string.isRequired,
  tipoQuarto: PropTypes.string.isRequired,
  vacant: PropTypes.string,
  tipoUsuario: PropTypes.string.isRequired,
  precoDiaria: PropTypes.string,
};

export default withStyles(style)(HotelRoomCard);
