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
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  FormControl,
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


//Estacionamento
//Só manobrista
//tarifas extras / visualizar e alterar dados das vagas (carro ocupado qual vaga e hóspede dono do carro)


// Listar somente que realizou a reserva


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
  root: {
    marginLeft: '1vw',
    marginTop: '1vh'
  },
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
  },
  title: {
    marginBottom: 0.5
  },
  cardVacantImg: {
    width: 25,
    height: 25,
    marginLeft: '18.5vw',
    marginTop: '-8vh'
  },
  dialog: {
    maxWidth: 1500
  },
  dialogRoot: {
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
  hotelRoomImgInCard: {
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
  btnConfirmar: {
    marginTop: '4vh',
    marginLeft: '1vw'
  },
  supAcomodRoot: {
    marginTop:'1vh',
    display: 'flex',
    flexWrap: 'wrap'
  },
  supAcomodSelect:{
    width: '40vw'
  },
  supAcomodBtn:{
    marginLeft: '2vw'
  },
}

class HotelRoomCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      itemQted: 0,
      itemPreco: 0,
      itemPrecoTotal: 0,
      listaProduto: JSON.parse(JSON.stringify(this.props.listaProduto)),
      confirmBtn: true,
      supAcomodRoomState: this.props.tipoQuarto,
      
    }
  }
  Transition = props => {
    return <Slide direction='up' {...props} />
  }
  handleDialogClose = () => {
    this.setState({ dialogOpen: false })
  }
  handleDialogOpen = () => {
    this.setState({ dialogOpen: true })
  }
  handleItemAdd = id => {
    let newLista = this.state.listaProduto
    if(this.state.confirmBtn){
      this.setState({confirmBtn: false})
    }
    newLista.forEach(prd => {
      if(prd.id == id) prd.qtde ++
    })
    this.setState({ listaProduto: newLista })
    //Still need to find a way to compare both lists to enable or disable confirm buttons
  }
  handleItemRemove = id => {
    let newLista = this.state.listaProduto
    if(this.state.confirmBtn){
      this.setState({confirmBtn: false})
    }
    newLista.forEach(prd => {
      if (prd.id == id && prd.qtde - 1 >= 0) {
        prd.qtde -= 1
      }
    })
    this.setState({ listaProduto: newLista })
  }
  handleCancelarItem = () => {
    this.setState({listaProduto: JSON.parse(JSON.stringify(this.props.listaProduto)), confirmBtn: true})
  }
  handleConfirmarItem = () => {
    //chamar api para registrar no banco
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
          <TableCell align="right"><IconButton color="primary" size="small" onClick={() => this.handleItemAdd(prd.id)}><Add /></IconButton></TableCell>
          <TableCell align="right"><IconButton color="secondary" size="small" onClick={() => this.handleItemRemove(prd.id)}><Remove /></IconButton></TableCell>
        </TableRow>
      )
    })
    return elements
  }
  handleRoomStateChange = event => {
    this.setState({ supAcomodRoomState: event.target.value })
  }
  handleSupAcomodConfirm = () => {
    //call action to store state inside database
  }
  handleSupAcomodCancel = () => {
    this.setState({supAcomodRoomState: this.props.tipoQuarto})
  }
  render() {
    const { classes } = this.props
    const { dialogOpen, confirmBtn, supAcomodRoomState } = this.state
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
              <img src={(this.props.vacant == "disp") ? greenBall : (this.props.vacant == "ocup") ? redBall : yellowBall} className={classes.cardVacantImg} />
            </CardContent>
          </CardActionArea>
        </Card>
        <Dialog
          open={dialogOpen}
          TransitionComponent={this.Transition}
          keepMounted
          fullWidth
          maxWidth={(this.props.tipoUsuario == "atendente") ? "sm" : "lg"}
          onClose={this.handlDialogClose}
          onBackdropClick={this.handleDialogClose}
          className={classes.dialog}
        >
          <DialogTitle>
            <Typography variant="overline" style={{ fontSize: "0.9em" }}> Informações Adicionais </Typography>
          </DialogTitle>
          <DialogContent>
            {this.props.tipoUsuario == "atendente" && (
              <div className={classes.dialogRoot}>
                <div>
                  <Typography className={classes.dialogInfoText} variant='overline'><MeetingRoom /> {this.props.numeroQuarto}</Typography>
                  <Typography className={classes.dialogInfoText} variant='overline'>{(this.props.vacant == "inter") ? <PriorityHigh /> : (this.props.vacant == "ocup") ? <Block /> : <Done />} {(this.props.vacant == 'disp') ? 'Disponível' : (this.props.vacant == 'ocup') ? "Ocupado" : (this.props.vacant == 'inter') ? "Interditado" : "Limpando"}</Typography>
                  <Typography className={classes.dialogInfoText} variant='overline'><Palette /> {this.props.tipoQuarto}</Typography>
                  <Typography className={classes.dialogInfoText} variant='overline'><AttachMoney /> {this.props.precoDiaria},00 / Dia</Typography>
                  <Typography className={classes.dialogInfoText} variant='overline'>{(this.props.vacant == "disp") ? "Próxima reserva:" : "Ocupado até:"} {this.props.ocupUntil}</Typography>
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
                <Button variant="outlined" disabled={confirmBtn} onClick={this.handleConfirmarItem} color="primary" className={classes.btnConfirmar}>
                  Confirmar
                </Button>
                <Button variant="outlined" disabled={confirmBtn} onClick={this.handleCancelarItem} color="secondary" className={classes.btnConfirmar}>
                  Cancelar
                </Button>
              </div>
            )}
            {this.props.tipoUsuario == "supAcomod" && (
              <div className={classes.supAcomodRoot}>
                <FormControl variant="outlined" style={{minWidth:120}}>
                  <InputLabel
                  >
                    Tipo de Quarto
              </InputLabel>
                  <Select
                    value={supAcomodRoomState}
                    onChange={this.handleRoomStateChange}
                    className={classes.supAcomodSelect}
                    input={
                      <OutlinedInput
                        labelWidth={115}
                        name="Tipo de Quarto"
                        id="tipoQuarto"
                      />
                    }
                  >
                    <MenuItem value="Milan">Milan</MenuItem>
                    <MenuItem value="New York">New York</MenuItem>
                    <MenuItem value="Dubai">Dubai</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="outlined" onClick={this.handleSupAcomodConfirm} className={classes.supAcomodBtn} color="primary" disabled={(this.state.supAcomodRoomState == this.props.tipoQuarto)}>
                    Confirmar
                </Button>
                <Button variant="outlined" onClick={this.handleSupAcomodCancel} className={classes.supAcomodBtn} color="secondary" disabled={(this.state.supAcomodRoomState == this.props.tipoQuarto)}>
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
  listaProduto: PropTypes.array.isRequired
};

export default withStyles(style)(HotelRoomCard);
