/**
 *
 * GuestTable
 *
 */

import React from 'react';
import axios from 'axios'
import {
  Dialog,
  withStyles,
  DialogTitle,
  DialogContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Slide,
  IconButton,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';
import { Edit, Delete } from '@material-ui/icons';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const style = {
  tableMain: {
    marginTop: '5vh',
  },
};
/* eslint-disable react/prefer-stateless-function */
class GuestTable extends React.Component {
  state = {
    editDialog: false,
    deleteDialog: false,
    usrId: '',
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
    profissaoList: []
  };
  Transition = props => {
    return <Slide direction="up" {...props} />;
  };
  handleGuestList = () => {
    const elements = [];
    this.props.guestList.forEach(gst => {
      elements.push(
        <TableRow key={gst.id} id={gst.id}>
          <TableCell>{gst.Person.name}</TableCell>
          <TableCell align="right">
            {gst.checkIn ? 'Hospedado' : 'Não Hospedade'}
          </TableCell>
          <TableCell align="right">{gst.PaymentMethod.method}</TableCell>
          <TableCell align="right">
            <IconButton
              color="primary"
              size="small"
              onClick={() => this.handleEditDialogOpen(gst.id)}
            >
              <Edit />
            </IconButton>
          </TableCell>
          <TableCell align="right">
            <Button
              variant="outlined"
              color={gst.checkIn ? 'secondary' : 'primary'}
            >
              {gst.checkIn ? 'Check-out' : 'Check-in'}
            </Button>
          </TableCell>
        </TableRow>,
      );
    });
    return elements;
  };
  handleEditDialogOpen = id => {
    this.setState({ editDialog: true, usrId: id });
    let gst = this.props.guestList.filter(gst => gst.id == id)
    this.setState({
      usrNomeCompleto: gst[0].Person.name,
      usrId: gst[0].Person.document,
      usrNacionalidade: gst[0].Person.nationality,
      usrDtNascimento: gst[0].Person.birth,
      usrSexo: gst[0].Person.gender,
      usrProfissao: gst[0].Person.OccupationId
    })
  };
  handleUsrEditTextChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleEditDialogClose = () => {
    this.setState({ editDialog: false, usrId: '' });
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
        this.setState({ profissaoList: data });
      })
      .catch(err => console.log(err));
  };

  handleDeleteDialogOpen = id => {
    this.setState({ deleteDialog: true, usrId: id });
  };
  handleDeleteDialogClose = () => {
    this.setState({ deleteDialog: false, usrId: '' });
  };
  getUsuario = id => {
    let usr = this.props.guestList.filter(usr => usr.id == id);
    return usr[0].name;
  };
  componentDidMount() {
    this.handleOccupationCall();
  }
  render() {
    const { classes } = this.props;
    const {
      usrId,
      usrCidade,
      usrDocMed,
      usrDtNascimento,
      usrEndereco,
      usrEnderecoComplemento,
      usrEnderecoNumero,
      usrEstado,
      usrMeioDePagamento,
      usrNacionalidade,
      usrNomeCompleto,
      usrPais,
      usrProfissao,
      usrSexo,
      usrTelefone,
    } = this.state;
    return (
      <div>
        <Table className={classes.tableMain}>
          <TableHead>
            <TableCell>
              <Typography variant="overline">Nome</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="overline">Estado</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="overline">Meio de Pagamento</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="overline">Editar</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="overline">Check-in / Check-out</Typography>
            </TableCell>
          </TableHead>
          <TableBody>{this.handleGuestList()}</TableBody>
        </Table>
        <Dialog
          open={this.state.editDialog}
          TransitionComponent={this.Transition}
          keepMounted
          fullWidth
          maxWidth="md"
          onClose={this.handleEditDialogClose}
          onBackdropClick={this.handleEditDialogClose}
        >
          <DialogTitle>
            <Typography variant="overline">Editar Hóspede</Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              id="nomeCompleto"
              type="text"
              label="Nome Completo"
              value={usrNomeCompleto}
              onChange={this.handleUsrEditTextChange('usrNomeCompleto')}
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
              onChange={this.handleUsrEditTextChange('usrId')}
              fullWidth
              helperText="Passport number or country Id number"
            />
            <div style={{ marginTop: '1vh' }}>
              <InputLabel htmlFor="sexSelect">Sexo</InputLabel>
              <Select
                id="sexSelect"
                value={usrSexo}
                onChange={this.handleUsrEditTextChange('usrSexo')}
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
              onChange={this.handleUsrEditTextChange('usrTelefone')}
              fullWidth
              placeholder="(11)92222-2222"
            />
            <div style={{ marginTop: '1vh' }}>
              <InputLabel htmlFor="occSelect">Profissão</InputLabel>
              <Select
                id="occSelect"
                value={usrProfissao}
                onChange={this.handleUsrEditTextChange(
                  'usrProfissao',
                )}
                placeholder="Engenheiro"
                fullWidth
              >
                {this.state.profissaoList.map(occ => (
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
              onChange={this.handleUsrEditTextChange('usrDocMed')}
              fullWidth
              helperText="Inserir somente se hóspede apresenta deficiência física"
            />
            <TextField
              margin="normal"
              id="nacionalidade"
              label="Nacionalidade"
              type="text"
              value={usrNacionalidade}
              onChange={this.handleUsrEditTextChange('usrNacionalidade')}
              fullWidth
              placeholder="Brasileiro"
            />
            <div style={{ marginTop: '1vh' }}>
              <InputLabel htmlFor="meioPagamento">Meio de Pagamento</InputLabel>
              <Select
                id="meioPagamento"
                value={usrMeioDePagamento}
                onChange={this.handleUsrEditTextChange('usrMeioDePagamento')}
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
              onChange={this.handleUsrEditTextChange('usrEndereco')}
              placeholder="Rua Abobrinha"
              style={{ width: '23vw' }}
            />
            <TextField
              margin="normal"
              id="enderecoNumero"
              label="Número"
              type="number"
              value={usrEnderecoNumero}
              onChange={this.handleUsrEditTextChange('usrEnderecoNumero')}
              placeholder="25"
              style={{ width: '5vw', marginLeft: '2vw' }}
            />
            <TextField
              margin="normal"
              id="enderecoComplemento"
              label="Complemento"
              type="text"
              value={usrEnderecoComplemento}
              onChange={this.handleUsrEditTextChange('usrEnderecoComplemento')}
              placeholder="ap 22"
              style={{ width: '12vw', marginLeft: '2vw' }}
            />
            <div style={{ marginTop: '1vh' }}>
              <InputLabel htmlFor="sexSelect">Cidade</InputLabel>
              <Select
                value={usrCidade}
                onChange={this.handleUsrEditTextChange('usrCidade')}
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
                onChange={this.handleUsrEditTextChange('usrEstado')}
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
                onChange={this.handleUsrEditTextChange('usrPais')}
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
            <Button
              onClick={this.handleUsrRegisterDialogClose}
              color="secondary"
            >
              Cancelar
            </Button>
            <Button onClick={this.handleUsrRegisterDialogClose} color="primary">
              Editar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

GuestTable.propTypes = {};

export default withStyles(style)(GuestTable);
