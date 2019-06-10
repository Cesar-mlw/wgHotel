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
  BarChart,
  Bar,
  Cell,
} from 'recharts';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

//Linha / Barra / Rosca
const dataLine = [
  { mes: 'Janeiro', earnings: 100.0 },
  { mes: 'Fevereiro', earnings: 200.0 },
  { mes: 'Março', earnings: 300.0 },
  { mes: 'Abril', earnings: 350.0 },
  { mes: 'Maio', earnings: 315.0 },
  { mes: 'Junho', earnings: 185.0 },
  { mes: 'Julho', earnings: 85.0 },
  { mes: 'Agosto', earnings: 45.0 },
  { mes: 'Setembro', earnings: 150.0 },
  { mes: 'Outubro', earnings: 300.0 },
  { mes: 'Novembro', earnings: 400.0 },
  { mes: 'Dezembro', earnings: 500.0 },
];

const dataBar = [
  {produto: 'Coca-Cola', spendings: 120000.00},
  {produto: 'Blue Label', spendings: 620000.00},
  {produto: 'Chocolates Godiva', spendings: 820000.00},
  {produto: 'Springles', spendings: 20000.00},
]
/* eslint-disable react/prefer-stateless-function */
class Charts extends React.Component {
  

  render() {
    return (
      <div >
        <div style={{float: 'left'}}>
          <LineChart width={500} height={300} data={dataLine}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="earnings" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div style={{float: 'left', marginLeft: '5vw'}}>
          <BarChart
            width={550}
            height={300}
            data={dataBar}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="produto"/>
            <YAxis dataKey="spendings"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="spendings" fill="#8884d8"/>
          </BarChart>
        </div>
      </div>
    );
  }
}

Charts.propTypes = {};

export default Charts;
