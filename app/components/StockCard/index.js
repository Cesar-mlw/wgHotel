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
  Typography
} from '@material-ui/core';
import restaurantImg from '../../images/restaurantImg.jpg'
import PropTypes from 'prop-types';
// import styled from 'styled-components';

const style = {
  cardRoot: {
    marginTop: '4vh',
    marginLeft: '4vw'
  },
  dinerCard: {
    width: 400,
  },
};

/* eslint-disable react/prefer-stateless-function */
class StockCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.cardRoot}>
        <Card id="dinerCard" className={classes.dinerCard}>
          <CardActionArea>
            <CardMedia 
              image={restaurantImg}
              component='img'
              title="Restaurante"
            />
          </CardActionArea>
          <CardContent>
            <Typography variant="overline" style={{marginLeft: 130}}>Restaurante</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

StockCard.propTypes = {};

export default withStyles(style)(StockCard);
