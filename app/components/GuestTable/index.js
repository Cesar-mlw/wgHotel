/**
 *
 * GuestTable
 *
 */

import React from 'react';
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
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons'
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const style = {

}
/* eslint-disable react/prefer-stateless-function */
class GuestTable extends React.Component {
  state = {
    editDialog: false,
    deleteDialog: false,
    usrId: ""
  }
  Transition = props => {
    return <Slide direction="up" {...props} />
  }
  handleGuestList = () => {
    const elements = []
    this.props.guestList.forEach(gst => {
      elements.push(
        <TableRow key={gst.id} id={gst.key}>
          <TableCell>{gst.name}</TableCell>
          <TableCell align="right" >{(gst.hospedado) ? "Hospedado" : "Não Hospedade"}</TableCell>
          <TableCell align="right" >{gst.meioPagamento}</TableCell>
          <TableCell align="right"><IconButton color="primary" size="small" onClick={() => this.handleEditDialogOpen(gst.id)}><Edit /></IconButton></TableCell>
          <TableCell align="right"><IconButton color="secondary" size="small" onClick={() => this.handleDeleteDialogOpen(gst.id)}><Delete /></IconButton></TableCell>
        </TableRow>
      )
    })
    return elements
  }
  handleEditDialogOpen = (id) => {
    this.setState({ editDialog: true, usrId: id })
  }
  handleEditDialogClose = () => {
    this.setState({ editDialog: false, usrId: "" })
  }
  handleDeleteDialogOpen = (id) => {
    this.setState({ deleteDialog: true, usrId: id })
  }
  handleDeleteDialogClose = () => {
    this.setState({ deleteDialog: false, usrId: "" })
  }
  getUsuario = (id) => {
    let usr = this.props.guestList.filter(usr => usr.id == id)
    return usr[0].name
  }
  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableCell><Typography variant="overline">Nome</Typography></TableCell>
            <TableCell align='right'><Typography variant="overline">Estado</Typography></TableCell>
            <TableCell align='right'><Typography variant="overline">Meio de Pagamento</Typography></TableCell>
            <TableCell align='right'><Typography variant="overline">Editar</Typography></TableCell>
            <TableCell align='right'><Typography variant="overline">Excluir</Typography></TableCell>
          </TableHead>
          <TableBody>
            {this.handleGuestList()}
          </TableBody>
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
        </Dialog>
        <Dialog
          open={this.state.deleteDialog}
          TransitionComponent={this.Transition}
          keepMounted
          fullWidth
          maxWidth="sm"
          onClose={this.handleDeleteDialogClose}
          onBackdropClick={this.handleDeleteDialogClose}
        >
          <DialogTitle>
            <Typography variant="overline">Deletar Usuário</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="deleteDialogText">
              Você te certeza que quer deletar o(a) usuário(a) - {this.getUsuario(this.state.usrId)}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleDeleteDialogClose}
              color="primary"
            >
              Sim
            </Button>
            <Button
              onClick={this.handleDeleteDialogClose}
              color="secondary"
            >
              Não
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

GuestTable.propTypes = {};

export default withStyles(style)(GuestTable);
