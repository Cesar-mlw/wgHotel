/**
 *
 * StockCard
 *
 */

import React from 'react';
import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  withStyles,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  Slide,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  DialogContent
} from '@material-ui/core';
import restaurantImg from '../../images/restaurantImg.jpg';
import frigobarImg from '../../images/frigobar.jpg';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

const style = {
  cardRoot: {
    marginTop: '4vh',
    marginLeft: '4vw',
    display: 'flex',
    flexWrap: 'wrap',
  },
  dinerCard: {
    width: 400,
    height: 325,
    marginLeft: '6vw',
  },
  fridgeCard: {
    width: 420,
    height: 325,
    marginLeft: '20vw',
  },
};
//solicitar item vai requisitar confirmação quando o usuário for receber o item
/* eslint-disable react/prefer-stateless-function */
class StockCard extends React.Component {
  state = {
    restaurantDialog: false,
    frigobarDialog: false,
  };

  handleRestauranteDialogOpen = () => {
    this.setState({ restaurantDialog: true });
  };

  handleRestauranteDialogClose = () => {
    this.setState({ restaurantDialog: false });
  };

  handleFrigobarDialogOpen = () => {
    this.setState({ frigobarDialog: true });
  };

  handleFrigobarDialogClose = () => {
    this.setState({ frigobarDialog: false });
  };

  Transition = props => {
    return <Slide direction="up" {...props} />;
  };

  render() {
    const { classes } = this.props;
    const { restaurantDialog, frigobarDialog } = this.state;
    return (
      <div className={classes.cardRoot}>
        <Card id="dinerCard" className={classes.dinerCard}>
          <CardActionArea onClick={this.handleRestauranteDialogOpen}>
            <CardMedia
              image={restaurantImg}
              component="img"
              title="Restaurante"
            />
          </CardActionArea>
          <CardContent>
            <Typography variant="overline" style={{ marginLeft: 130 }}>
              Restaurante
            </Typography>
          </CardContent>
        </Card>
        <Card id="dinerCard" className={classes.fridgeCard}>
          <CardActionArea onClick={this.handleFrigobarDialogOpen}>
            <CardMedia image={frigobarImg} component="img" title="Frigobar" />
          </CardActionArea>
          <CardContent>
            <Typography
              variant="overline"
              style={{ marginLeft: 160, marginTop: -10 }}
            >
              Frigobar
            </Typography>
          </CardContent>
        </Card>
        <Dialog
          open={restaurantDialog}
          onClose={this.handleRestauranteDialogClose}
          onBackdropClick={this.handleRestauranteDialogClose}
          TransitionComponent={this.Transition}
          keepMounted
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            <Typography variant="overline">Estoque do Restaurante</Typography>
          </DialogTitle>
          <DialogContent>
          <Table>
            <TableHead>
              <TableCell><Typography variant="overline">Nome do Produto</Typography></TableCell>
              <TableCell><Typography variant="overline">Quantidade em estoque</Typography></TableCell>
              <TableCell><Typography variant="overline">Status</Typography></TableCell>
            </TableHead>
            </Table>
          </DialogContent>
        </Dialog>
        <Dialog
          open={frigobarDialog}
          onClose={this.handleFrigobarDialogClose}
          onBackdropClick={this.handleFrigobarDialogClose}
          TransitionComponent={this.Transition}
          keepMounted
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            <Typography variant="overline">Estoque dos Frigobares</Typography>
          </DialogTitle>
          <DialogContent>
            <Table>
              <TableHead>
                <TableCell><Typography variant="overline">Nome do Produto</Typography></TableCell>
                <TableCell><Typography variant="overline">Quantidade em estoque</Typography></TableCell>
                <TableCell><Typography variant="overline">Status</Typography></TableCell>
              </TableHead>
            </Table>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

StockCard.propTypes = {};

export default withStyles(style)(StockCard);
