/**
 *
 * DinerStock
 *
 */

import React from 'react';
import {
  Typography,
  withStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button
} from '@material-ui/core';
import plantaRestaurante from '../../images/plantaRestaurante.png';
import mesaRestaurante from '../../images/mesaRestaurante.png';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const style = {
  dinerRoot: {
    width: '100vh',
    height: '100vh',
  },
  dinerImgStockRoot: {
    width: '100vw',
    height: '75vh',
    overflow: 'auto',
  },
  cardRoot:{
    display: 'flex',
    flexWrap: 'wrap'
  },
  plantImg: {
    width: '100vw',
    height: '95vh',
    zIndex: '1',
    position: 'absolute',
  },
  dinerTable: {
    position: 'absolute',
    zIndex: '2',
    width: '25vw',
    height: '20vh',
    marginLeft: '35vw',
    marginTop: '36vh',
  },
  dinerTable2: {
    position: 'absolute',
    zIndex: '2',
    width: '25vw',
    height: '20vh',
    marginLeft: '65vw',
    marginTop: '36vh',
  },
  dinerTable3: {
    position: 'absolute',
    zIndex: '2',
    width: '25vw',
    height: '20vh',
    marginLeft: '35vw',
    marginTop: '66vh',
  },
  dinerTable4: {
    position: 'absolute',
    zIndex: '2',
    width: '25vw',
    height: '20vh',
    marginLeft: '65vw',
    marginTop: '66vh',
  },
};

/* eslint-disable react/prefer-stateless-function */
class DinerStock extends React.Component {
  state = {
    dinerReservationDialog: false,
    mesaId: 0,
    statusMesa: 0

  }
  Transition = props => {
    return <Slide direction="up" {...props} />;
  };
  
  handleDinerReservationDialogOpen = id => {
    this.setState({dinerReservationDialog: true, mesaId: id})
  }
  
  handleDinerReservationDialogClose = () => {
    this.setState({dinerReservationDialog: false})
  }

  render() {
    const {
      dinerReservationDialog,
      statusMesa
    } = this.state
    const { classes } = this.props;
    return (
      <div className={classes.dinerRoot}>
        <div className={classes.dinerImgStockRoot}>
          <img src={plantaRestaurante} className={classes.plantImg} />
          <div className={classes.cardRoot}>
            <Card className={classes.dinerTable} id="table1">
              <CardActionArea
                
              >
                <CardMedia
                  id="1"
                  component="img"
                  image={mesaRestaurante}
                  alt="Mesa"
                  height="152"
                  title="Mesa"
                  onClick={() => this.handleDinerReservationDialogOpen(1)}
                />
              </CardActionArea>
            </Card>
            <Card className={classes.dinerTable2} id="table2">
              <CardActionArea>
                <CardMedia
                  id="2"
                  component="img"
                  image={mesaRestaurante}
                  alt="Mesa"
                  height="152"
                  title="Mesa"
                  onClick={() => this.handleDinerReservationDialogOpen(2)}
                />
              </CardActionArea>
            </Card>
            <Card className={classes.dinerTable3} id="table1=3">
              <CardActionArea>
                <CardMedia
                  id="3"
                  component="img"
                  image={mesaRestaurante}
                  alt="Mesa"
                  height="152"
                  title="Mesa"
                  onClick={() => this.handleDinerReservationDialogOpen(3)}
                />
              </CardActionArea>
            </Card>
            <Card className={classes.dinerTable4} id="table4">
              <CardActionArea>
                <CardMedia
                  id="4"
                  component="img"
                  image={mesaRestaurante}
                  alt="Mesa"
                  height="152"
                  title="Mesa"
                  onClick={() => this.handleDinerReservationDialogOpen(4)}
                />
              </CardActionArea>
            </Card>
          </div>
        </div>
        <Dialog
          open={dinerReservationDialog}
          onClose={this.handleDinerReservationDialogClose}
          onBackdropClick={this.handleDinerReservationDialogClose}
          fullWidth
          maxWidth="md"
          TransitionComponent={this.Transition}
        >
          <DialogTitle>
            <Typography variant="display2">Reservar Mesa</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="overline">Status: {statusMesa}</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleDinerReservationClick}
              disabled = {statusMesa == "Disponível"}
            >
              Reservar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DinerStock.propTypes = {};

export default withStyles(style)(DinerStock);
