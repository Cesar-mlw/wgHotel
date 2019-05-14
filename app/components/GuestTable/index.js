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
  IconButton
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons'
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const style = {

}
/* eslint-disable react/prefer-stateless-function */
class GuestTable extends React.Component {
  state = {
    editDialog: false
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
          <TableCell align="right"><IconButton color="primary" size="small" onClick={this.handleEditDialogOpen}><Edit /></IconButton></TableCell>
          <TableCell align="right"><IconButton color="secondary" size="small" onClick={this.handleDeleteUsuario}><Delete /></IconButton></TableCell>
        </TableRow>
      )
    })
    console.log(elements)
    return elements
  }
  handleEditDialogOpen = () => {
    this.setState({ editDialog: true })
  }
  handleEditDialogClose = () => {
    this.setState({ editDialog: false })
  }
  handleDeleteUsuario = () => {

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
      </div>
    )
  }
}

GuestTable.propTypes = {};

export default withStyles(style)(GuestTable);
