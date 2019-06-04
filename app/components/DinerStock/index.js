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
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.dinerRoot}>
        <div className={classes.dinerImgStockRoot}>
          <img src={plantaRestaurante} className={classes.plantImg} />
          <div className={classes.cardRoot}>
            <Card className={classes.dinerTable} id="table1">
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={mesaRestaurante}
                  alt="Mesa"
                  height="152"
                  title="Mesa"
                />
              </CardActionArea>
            </Card>
            <Card className={classes.dinerTable2} id="table2">
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={mesaRestaurante}
                  alt="Mesa"
                  height="152"
                  title="Mesa"
                />
              </CardActionArea>
            </Card>
            <Card className={classes.dinerTable3} id="table1=3">
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={mesaRestaurante}
                  alt="Mesa"
                  height="152"
                  title="Mesa"
                />
              </CardActionArea>
            </Card>
            <Card className={classes.dinerTable4} id="table4">
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={mesaRestaurante}
                  alt="Mesa"
                  height="152"
                  title="Mesa"
                />
              </CardActionArea>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

DinerStock.propTypes = {};

export default withStyles(style)(DinerStock);
