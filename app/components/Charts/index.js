/**
 *
 * Charts
 *
 */

import React from 'react';
import { 
  LineChart, 
  Line,  
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

//Linha / Barra / Rosca
const data = [
  {mes: 'Janeiro', earnings: 100.000},
  {mes: 'Fevereiro', earnings: 200.000},
  {mes: 'Março', earnings: 300.000},
  {mes: 'Abril', earnings: 350.000},
  {mes: 'Maio', earnings: 315.000},
  {mes: 'Junho', earnings: 185.000},
  {mes: 'Julho', earnings: 85.000},
  {mes: 'Agosto', earnings: 45.000},
  {mes: 'Setembro', earnings: 150.000},
  {mes: 'Outubro', earnings: 300.000},
  {mes: 'Novembro', earnings: 400.000},
  {mes: 'Dezembro', earnings: 500.000},
]
/* eslint-disable react/prefer-stateless-function */
class Charts extends React.Component {
  render() {
    return (
      <div>
        <LineChart
          width={500}
          height={300}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="mes"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="earnings" stroke="#82ca9d"/>
        </LineChart>
      </div>
    );
  }
}

Charts.propTypes = {};

export default Charts;
